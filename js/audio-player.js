/**
 * LOS ANGELES CLUB - AUDIO SYNTHESIZER & PLAYLIST ENGINE
 * Provides instant club rhythm and music preview without external audio URL dependencies.
 */

class ClubAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.currentTrackIndex = 0;
    this.timerId = null;
    this.tempo = 126; // BPM
    this.step = 0;

    this.playlist = [
      {
        id: 1,
        title: "Club Mix • Martin Garrix Live",
        bpm: 128,
        genre: "EDM / Electro House",
        synthScale: [220, 261.63, 293.66, 329.63, 392.00, 440]
      },
      {
        id: 2,
        title: "Deep House Sunset • Ibiza Vibes",
        bpm: 122,
        genre: "Deep House",
        synthScale: [196, 220, 246.94, 293.66, 329.63, 392]
      },
      {
        id: 3,
        title: "Tech-House Underground • Berlin Beat",
        bpm: 130,
        genre: "Tech House / Techno",
        synthScale: [146.83, 164.81, 196.00, 220.00, 261.63, 293.66]
      }
    ];

    this.dom = {
      toggleBtn: document.getElementById('audio-toggle-btn'),
      prevBtn: document.getElementById('audio-prev-btn'),
      nextBtn: document.getElementById('audio-next-btn'),
      icon: document.getElementById('audio-icon'),
      title: document.getElementById('now-playing-text'),
      visualizer: document.getElementById('audio-visualizer')
    };

    this.init();
  }

  init() {
    if (!this.dom.toggleBtn) return;

    this.dom.toggleBtn.addEventListener('click', () => this.togglePlay());
    
    if (this.dom.prevBtn) {
      this.dom.prevBtn.addEventListener('click', () => this.prevTrack());
    }

    if (this.dom.nextBtn) {
      this.dom.nextBtn.addEventListener('click', () => this.nextTrack());
    }

    this.updateTrackDisplay();
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  togglePlay() {
    this.initContext();
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  }

  play() {
    this.isPlaying = true;
    this.dom.icon.classList.remove('fa-play');
    this.dom.icon.classList.add('fa-pause');
    this.dom.visualizer.classList.add('playing');

    const track = this.playlist[this.currentTrackIndex];
    this.tempo = track.bpm;
    const intervalMs = (60 / this.tempo / 4) * 1000; // 16th notes

    this.step = 0;
    this.timerId = setInterval(() => {
      this.triggerStep(this.step % 16);
      this.step++;
    }, intervalMs);
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.dom.icon.classList.remove('fa-pause');
    this.dom.icon.classList.add('fa-play');
    this.dom.visualizer.classList.remove('playing');
  }

  prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    this.updateTrackDisplay();
    if (this.isPlaying) {
      this.stop();
      this.play();
    }
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    this.updateTrackDisplay();
    if (this.isPlaying) {
      this.stop();
      this.play();
    }
  }

  updateTrackDisplay() {
    const track = this.playlist[this.currentTrackIndex];
    if (this.dom.title) {
      this.dom.title.textContent = track.title;
    }
  }

  // Synthesizes dynamic club beat per step
  triggerStep(stepIndex) {
    if (!this.audioCtx) return;
    const t = this.audioCtx.currentTime;

    // Kick on 0, 4, 8, 12 (4-on-the-floor beat)
    if (stepIndex % 4 === 0) {
      this.playKick(t);
    }

    // Hi-hat on offbeats (2, 6, 10, 14)
    if (stepIndex % 4 === 2) {
      this.playHiHat(t);
    }

    // Melodic Synth Arpeggio
    if (stepIndex % 2 === 0 || stepIndex % 3 === 0) {
      const track = this.playlist[this.currentTrackIndex];
      const noteFreq = track.synthScale[stepIndex % track.synthScale.length];
      this.playSynth(t, noteFreq);
    }
  }

  playKick(time) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.12);

    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(time);
    osc.stop(time + 0.15);
  }

  playHiHat(time) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'highpass' in osc ? 'triangle' : 'square';
    osc.frequency.setValueAtTime(8000, time);

    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(time);
    osc.stop(time + 0.06);
  }

  playSynth(time, freq) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.05, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(time);
    osc.stop(time + 0.2);
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.clubAudio = new ClubAudioEngine();
});
