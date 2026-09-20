# ==============================================================================
# DOCKERFILE - LOS ANGELES CLUB & VIP LOUNGE (FULLSTACK CMS & WEB APP)
# ==============================================================================

FROM node:18-alpine

# Definir diretório de trabalho no container
WORKDIR /app

# Instalar dependências do sistema necessárias para compilação leve (se aplicável)
RUN apk add --no-cache tzdata

# Configurar fuso horário
ENV TZ=America/Sao_Paulo

# Copiar manifesto de dependências primeiro para cache eficiente de camadas
COPY package*.json ./

# Instalação limpa de dependências para produção
RUN npm ci --only=production

# Copiar todo o código-fonte da aplicação
COPY . .

# Criar pastas de persistência com permissões adequadas
RUN mkdir -p /app/data /app/uploads /app/admin

# Expor a porta da aplicação
EXPOSE 3000

# Variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=3000

# Healthcheck para monitoramento de integridade
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/api/content || exit 1

# Comando de inicialização
CMD ["node", "server.js"]
