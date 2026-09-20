const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'los_angeles_club_super_secret_jwt_key_2026';

// Middlewares
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Directories
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const ADMIN_DIR = path.join(__dirname, 'admin');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(ADMIN_DIR)) fs.mkdirSync(ADMIN_DIR, { recursive: true });

// Static Files
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/admin', express.static(ADMIN_DIR));
app.use(express.static(__dirname));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
    const uniqueName = `lac_${Date.now()}_${sanitized}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif|svg/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) {
      return cb(null, true);
    }
    cb(new Error('Apenas imagens (JPG, PNG, WebP, GIF, SVG) são permitidas.'));
  }
});

// Helper Functions for JSON storage
function readJson(filename, defaultValue) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf8');
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Erro ao ler ${filename}:`, err);
    return defaultValue;
  }
}

function writeJson(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Erro ao gravar ${filename}:`, err);
    return false;
  }
}

// Initial Admin User Setup
function initUsers() {
  const users = readJson('users.json', []);
  if (users.length === 0) {
    const defaultPassword = 'admin123';
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(defaultPassword, salt);
    users.push({
      id: 'usr_admin',
      username: 'admin',
      name: 'Diretoria / Admin Geral',
      passwordHash: hash,
      createdAt: new Date().toISOString()
    });
    writeJson('users.json', users);
    console.log('[AUTH] Usuário padrão criado: admin / admin123');
  }
}
initUsers();

// Auth Middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Não autorizado. Token ausente.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Sessão expirada ou token inválido.' });
  }
}

// ==========================================
// 1. ROTAS DE AUTENTICAÇÃO
// ==========================================

// Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Usuário e senha são obrigatórios.' });
  }

  const users = readJson('users.json', []);
  const user = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase());

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ success: false, message: 'Usuário ou senha incorretos.' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    message: 'Login realizado com sucesso!',
    token,
    user: { id: user.id, username: user.username, name: user.name }
  });
});

// Verificar sessão
app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});

// Alterar credenciais
app.put('/api/auth/change-password', authMiddleware, (req, res) => {
  const { currentPassword, newUsername, newPassword, newName } = req.body;
  const users = readJson('users.json', []);
  const userIndex = users.findIndex(u => u.id === req.user.id);

  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
  }

  if (!bcrypt.compareSync(currentPassword, users[userIndex].passwordHash)) {
    return res.status(400).json({ success: false, message: 'Senha atual incorreta.' });
  }

  if (newUsername && newUsername.trim().length >= 3) {
    users[userIndex].username = newUsername.trim();
  }
  if (newName && newName.trim().length >= 2) {
    users[userIndex].name = newName.trim();
  }
  if (newPassword && newPassword.trim().length >= 6) {
    users[userIndex].passwordHash = bcrypt.hashSync(newPassword.trim(), 10);
  }

  users[userIndex].updatedAt = new Date().toISOString();
  writeJson('users.json', users);

  res.json({
    success: true,
    message: 'Dados de acesso atualizados com sucesso!',
    user: { id: users[userIndex].id, username: users[userIndex].username, name: users[userIndex].name }
  });
});

// ==========================================
// 2. ROTAS DE CONTEÚDO E CUSTOMIZAÇÃO (CMS)
// ==========================================

// Obter todo o conteúdo do site (Público)
app.get('/api/content', (req, res) => {
  const content = readJson('content.json', {});
  res.json({ success: true, data: content });
});

// Atualizar conteúdo do site (Protegido Admin)
app.put('/api/content', authMiddleware, (req, res) => {
  const updatedContent = req.body;
  if (!updatedContent || typeof updatedContent !== 'object') {
    return res.status(400).json({ success: false, message: 'Dados inválidos fornecidos.' });
  }

  const success = writeJson('content.json', updatedContent);
  if (success) {
    res.json({ success: true, message: 'Conteúdo do site atualizado com sucesso!', data: updatedContent });
  } else {
    res.status(500).json({ success: false, message: 'Falha ao gravar arquivo de conteúdo.' });
  }
});

// Upload de arquivo de imagem / logotipo
app.post('/api/upload', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Nenhum arquivo enviado.' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    message: 'Arquivo enviado com sucesso!',
    fileUrl,
    filename: req.file.filename,
    size: req.file.size
  });
});

// ==========================================
// 3. ROTAS DE RESERVAS VIP
// ==========================================

// Listar reservas (Protegido Admin)
app.get('/api/reservations', authMiddleware, (req, res) => {
  const reservations = readJson('reservations.json', []);
  res.json({ success: true, data: reservations });
});

// Criar reserva (Público - do formulário do site)
app.post('/api/reservations', (req, res) => {
  const { name, email, phone, sector, sectorName, date, time, guests, combo, comboName, totalEstimate } = req.body;

  if (!name || !email || !phone || !date) {
    return res.status(400).json({ success: false, message: 'Preencha todos os campos obrigatórios.' });
  }

  const reservations = readJson('reservations.json', []);
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newReservation = {
    id: `LAC-${randomNum}-VIP`,
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    sector: sector || 'bistro',
    sectorName: sectorName || 'Mesa Bistrô',
    date,
    time: time || '23:00',
    guests: guests || '4',
    combo: combo || 'none',
    comboName: comboName || 'Sem Combo Adicional',
    totalEstimate: totalEstimate || 'A calcular',
    status: 'Pendente',
    createdAt: new Date().toISOString()
  };

  reservations.unshift(newReservation);
  writeJson('reservations.json', reservations);

  res.status(201).json({
    success: true,
    message: 'Solicitação de reserva registrada com sucesso!',
    voucher: newReservation
  });
});

// Atualizar status de reserva (Protegido Admin)
app.put('/api/reservations/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const reservations = readJson('reservations.json', []);
  const index = reservations.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Reserva não encontrada.' });
  }

  reservations[index].status = status || reservations[index].status;
  reservations[index].updatedAt = new Date().toISOString();
  writeJson('reservations.json', reservations);

  res.json({ success: true, message: 'Status da reserva atualizado!', data: reservations[index] });
});

// Excluir reserva (Protegido Admin)
app.delete('/api/reservations/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  let reservations = readJson('reservations.json', []);
  const initialLen = reservations.length;
  reservations = reservations.filter(r => r.id !== id);

  if (reservations.length === initialLen) {
    return res.status(404).json({ success: false, message: 'Reserva não encontrada.' });
  }

  writeJson('reservations.json', reservations);
  res.json({ success: true, message: 'Reserva excluída com sucesso!' });
});

// ==========================================
// 4. ROTAS DE LISTA VIP (GUESTLIST)
// ==========================================

// Listar membros lista VIP (Protegido Admin)
app.get('/api/guestlist', authMiddleware, (req, res) => {
  const guestlist = readJson('guestlist.json', []);
  res.json({ success: true, data: guestlist });
});

// Cadastrar na lista VIP (Público)
app.post('/api/guestlist', (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Nome e E-mail são obrigatórios.' });
  }

  const guestlist = readJson('guestlist.json', []);
  const randomCode = `VIP-LAC-${Math.floor(1000 + Math.random() * 9000)}`;
  const entry = {
    id: randomCode,
    name: name.trim(),
    email: email.trim(),
    phone: phone ? phone.trim() : '',
    code: randomCode,
    discount: '20% OFF',
    createdAt: new Date().toISOString()
  };

  guestlist.unshift(entry);
  writeJson('guestlist.json', guestlist);

  res.status(201).json({
    success: true,
    message: 'Cadastro na Lista VIP confirmado!',
    entry
  });
});

// ==========================================
// 5. ROTAS DE CONTATOS & MENSAGENS
// ==========================================

// Listar mensagens (Protegido Admin)
app.get('/api/contacts', authMiddleware, (req, res) => {
  const contacts = readJson('contacts.json', []);
  res.json({ success: true, data: contacts });
});

// Enviar mensagem (Público)
app.post('/api/contacts', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Nome, e-mail e mensagem são obrigatórios.' });
  }

  const contacts = readJson('contacts.json', []);
  const newMsg = {
    id: `MSG-${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    phone: phone ? phone.trim() : '',
    subject: subject ? subject.trim() : 'Mensagem Geral',
    message: message.trim(),
    createdAt: new Date().toISOString()
  };

  contacts.unshift(newMsg);
  writeJson('contacts.json', contacts);

  res.status(201).json({
    success: true,
    message: 'Sua mensagem foi enviada com sucesso ao nosso Concierge VIP!',
    data: newMsg
  });
});

// ==========================================
// 6. DASHBOARD STATS OVERVIEW
// ==========================================

app.get('/api/stats', authMiddleware, (req, res) => {
  const reservations = readJson('reservations.json', []);
  const guestlist = readJson('guestlist.json', []);
  const contacts = readJson('contacts.json', []);
  const content = readJson('content.json', {});

  const pendingReservations = reservations.filter(r => r.status === 'Pendente').length;
  const confirmedReservations = reservations.filter(r => r.status === 'Confirmado').length;

  res.json({
    success: true,
    stats: {
      totalReservations: reservations.length,
      pendingReservations,
      confirmedReservations,
      totalGuestlist: guestlist.length,
      totalMessages: contacts.length,
      totalEvents: (content.events || []).length,
      totalDjs: (content.djs || []).length
    }
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🔥 LOS ANGELES CLUB & LOUNGE VIP SERVER ATIVO 🔥`);
  console.log(`🌐 Site Público:      http://localhost:${PORT}`);
  console.log(`🎛️ Painel Admin CMS:  http://localhost:${PORT}/admin`);
  console.log(`====================================================`);
});
