/* ==========================================
   PLAYLIST
========================================== */
const playlist = [
  {
    title: "Escondendo o Ouro",
    artist: "Zé Neto e Cristiano",
    src: "./src/music/Escondendo o Ouro - Ze neto e Cristiano.mpeg",
    cover: "./src/Iamgens/foto 6.jpeg"
  },
  {
    title: "Adore You",
    artist: "Miley Cyrus",
    src: "./src/music/Adore You - Miley Cyrus.mpeg",
    cover: "./src/Iamgens/foto 5.jpeg"
  },
  {
    title: "Incondicional",
    artist: "Luan Santana",
    src: "./src/music/Incondicional - Luan Santana.mpeg",
    cover: "./src/Iamgens/foto 2.jpeg"
  }
];

/* ==========================================
   SELETORES DE ELEMENTOS
========================================== */
const audioPlayer   = document.getElementById("audio-player");
const playPauseBtn  = document.getElementById("play-pause-btn");
const prevTrackBtn  = document.getElementById("previous-track-btn");
const nextTrackBtn  = document.getElementById("next-track-btn");
const progressBar   = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl   = document.getElementById("total-time");
const coverEl       = document.getElementById("player-cover");
const titleEl       = document.getElementById("music-title");
const artistEl      = document.getElementById("music-artist");

const mainText      = document.getElementById("main-text");
const prevBtn       = document.getElementById("prev-text");
const nextBtn       = document.getElementById("next-text");

/* ==========================================
   VARIÁVEIS DE CONTROLE
========================================== */
let currentTrackIndex = 0;
let isPlaying = false;

// Textos para exibição central
const textos = [
  "Todos os dias eu me pego admirando a sorte que tenho por ter você na minha vida. Você não é apenas minha esposa, é minha melhor amiga, meu porto seguro e a razão de tantos sorrisos meus. Cada gesto seu, cada olhar, cada palavra carrega uma beleza que transforma os meus dias.Com você, aprendi que o amor verdadeiro não está apenas nos momentos grandiosos, mas na simplicidade do cotidiano: ",
  "no abraço depois de um dia cansativo, no café compartilhado, nas risadas que só nós entendemos. Você torna tudo mais leve, mais bonito e mais completo.  Obrigado por ser essa pessoa incrível, por me inspirar a ser melhor e por me mostrar que juntos somos capazes de superar qualquer coisa. Quero que saiba que cada instante ao seu lado é um presente que guardo no coração. E, acima de tudo, quero continuar escrevendo a nossa história, lado a lado, com amor, cumplicidade e sonhos compartilhados.  Eu te amo hoje, amanhã e em todos os dias que ainda vamos viver juntos.",
  "Quando você diz que me ama; Saiba que eu te amo mais; E quando você diz que precisa de mim; Saiba que eu preciso de você mais; Garota, eu adoro você"
];
let textoAtual = 0;

/* ==========================================
   FUNÇÕES DO PLAYER
========================================== */

// Carregar uma música da playlist
function loadTrack(index) {
  const track = playlist[index];
  audioPlayer.src = track.src;
  coverEl.src = track.cover;
  titleEl.textContent = track.title;
  artistEl.textContent = track.artist;
  audioPlayer.load();
}

// Play / Pause
function togglePlayPause() {
  if (!isPlaying) {
    audioPlayer.play().catch(err => console.log(err));
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audioPlayer.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
  isPlaying = !isPlaying;
}

// Próxima música
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  isPlaying = true;
}

// Música anterior
function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  isPlaying = true;
}

// Atualizar barra de progresso
function updateProgress() {
  if (audioPlayer.duration) {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progressPercent;
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    totalTimeEl.textContent = formatTime(audioPlayer.duration);
  }
}

// Formatar tempo em minutos:segundos
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

/* ==========================================
   EVENTOS DO PLAYER
========================================== */
playPauseBtn.addEventListener("click", togglePlayPause);
nextTrackBtn.addEventListener("click", nextTrack);
prevTrackBtn.addEventListener("click", prevTrack);

// Atualização contínua da barra de progresso
audioPlayer.addEventListener("timeupdate", updateProgress);

// Avança para próxima música quando a atual termina
audioPlayer.addEventListener("ended", nextTrack);

// Atualiza tempo total ao carregar a música
audioPlayer.addEventListener("loadedmetadata", updateProgress);

// Controle manual da barra de progresso
progressBar.addEventListener("input", () => {
  audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

/* ==========================================
   FUNDO DE BOLHAS
========================================== */
function createBubbles(totalBubbles = 100) {
  const colors = ['#800080', '#ff0000']; // Roxa e Vermelha
  const bubblesContainer = document.createElement('div');
  bubblesContainer.classList.add('background-bubbles');
  document.body.appendChild(bubblesContainer);

  for (let i = 0; i < totalBubbles; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // Tamanho aleatório
    const size = Math.random() * 25 + 15; // 15px a 40px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Posição horizontal aleatória
    bubble.style.left = `${Math.random() * 100}%`;

    // Velocidade e duração aleatória da animação
    const duration = Math.random() * 20 + 10; // 10s a 30s
    bubble.style.animationDuration = `${duration}s`;

    // Delay aleatório
    bubble.style.animationDelay = `${Math.random() * 20}s`;

    // Cor gradiente
    const color = colors[Math.floor(Math.random() * colors.length)];
    bubble.style.background = `radial-gradient(circle, ${color}, transparent)`;

    bubblesContainer.appendChild(bubble);
  }
}

// Criar bolhas ao iniciar
createBubbles(1000);

/* ==========================================
   TEXTOS CENTRAIS
========================================== */

// Atualiza o texto central
function atualizarTexto() {
  mainText.textContent = textos[textoAtual];
}

// Botão Próximo
nextBtn.addEventListener("click", () => {
  textoAtual = (textoAtual + 1) % textos.length;
  atualizarTexto();
});

// Botão Voltar
prevBtn.addEventListener("click", () => {
  textoAtual = (textoAtual - 1 + textos.length) % textos.length;
  atualizarTexto();
});

/* ==========================================
   INICIALIZAÇÃO
========================================== */
loadTrack(currentTrackIndex);
atualizarTexto();
