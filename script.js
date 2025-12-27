// Elementos globales
const unlockSound = document.getElementById("unlockSound");

// Inicializar todas las tarjetas de desbloqueo
document.querySelectorAll('.unlock-card').forEach(initCard);

function initCard(card) {
  const id = card.dataset.id; // ID único para localStorage (1, 2, 3...)
  const waitTime = parseInt(card.dataset.wait) || 15; // Tiempo específico o 15s por defecto
  
  // Elementos dentro de esta tarjeta específica
  const likeBtn = card.querySelector(".like-btn");
  const subBtn = card.querySelector(".sub-btn");
  const downloadBtn = card.querySelector(".download-btn");
  const timerBox = card.querySelector(".timer");
  const countEl = card.querySelector(".count");
  const fakeCounter = card.querySelector(".fake-counter");

  // Variables de estado locales para esta tarjeta
  let liked = false;
  let subscribed = false;
  let countdownInterval;

  // Contador fake independiente
  let fakeUsers = 120 + Math.floor(Math.random() * 50);
  setInterval(() => {
    if (fakeCounter) {
      fakeUsers += Math.floor(Math.random() * 3);
      fakeCounter.innerText = `🌟 ${fakeUsers} personas desbloqueando ahora`;
    }
  }, 1500 + Math.random() * 1000);

  // --- Eventos ---

  // 1. Botón Like
  likeBtn.onclick = () => {
    if (liked) return;
    window.open(likeBtn.dataset.link, "_blank");
    liked = true;
    likeBtn.innerHTML = "✅ Like Completado";
    startCountdown(waitTime, () => unlockSubBtn(false));
  };

  // 2. Botón Suscribirse
  subBtn.onclick = () => {
    if (subscribed) return;
    window.open(subBtn.dataset.link, "_blank");
    subscribed = true;
    subBtn.innerHTML = "✅ Suscripción Completada";
    startCountdown(waitTime, () => unlockButton(false));
  };

  // 3. Botón Descarga
  downloadBtn.onclick = () => {
    window.open(downloadBtn.dataset.link, "_blank");
  };

  // --- Funciones Auxiliares ---

  function startCountdown(seconds, callback) {
    if (countdownInterval) clearInterval(countdownInterval);
    timerBox.classList.remove("hidden");
    let time = seconds;
    countEl.innerText = time;
    countdownInterval = setInterval(() => {
      time--;
      countEl.innerText = time;
      if (time <= 0) {
        clearInterval(countdownInterval);
        if (callback) callback();
      }
    }, 1000);
  }

  function unlockSubBtn(instant) {
    timerBox.classList.add("hidden");
    subBtn.disabled = false;
    subBtn.classList.remove("locked");
    subBtn.innerHTML = "🔔 Suscribirse al Canal";
  }

  function unlockButton(instant) {
    timerBox.classList.add("hidden");
    downloadBtn.disabled = false;
    downloadBtn.classList.remove("locked");
    downloadBtn.innerHTML = "⬇️ Ir al Link";
    
    if (!instant) {
      unlockSound.play();
      if (navigator.vibrate) navigator.vibrate(200);
      launchConfetti();
    }
  }
}

// Confeti simple
function launchConfetti() {
  for (let i = 0; i < 50; i++) {
    const div = document.createElement("div");
    div.className = "confetti";
    div.style.left = Math.random() * 100 + "%";
    
    // el uso de los acentos graves ` ` 
    div.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`;
    
    div.style.animationDuration = (Math.random() * 3 + 2) + "s";
    document.body.appendChild(div);

    // Asegúrate de que diga "setTimeout"
    setTimeout(() => { 
      div.remove(); 
    }, 5000);
  }
}