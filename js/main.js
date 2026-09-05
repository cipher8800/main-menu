// Initialize Card Collection on Load
window.onload = function () {
  
  document.body.style.background = `
    var(--overlay-gradient),
    url("assets/images/backgrounds/${randomInt(0, 2)}.jpg")
    center / cover no-repeat
  `;

  // populateCollection();
};

function openModal(id) {
  document.getElementById(id).classList.add("active");
}

function closeModal(id) {
  playAudio("click");
  document.getElementById(id).classList.remove("active");
}

function triggerMatchmaking(modeName) {
  alert(`Entering Matchmaking Queue for: ${modeName}! Searching for worthy opponents...`);
  closeModal("play-modal");
}

function toggleSetting(element) {
  playAudio("click");
  element.classList.toggle("active");
  if (element.id === "particles-toggle") {
    particlesEnabled = element.classList.contains("active");
  }
}

const cardsData = [
  { name: "Ignis Dragon Lord", cost: 8, type: "Mythic Creature", rarity: "legendary", bg: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80" },
  { name: "Astral Spellweaver", cost: 3, type: "Mage", rarity: "epic", bg: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80" },
  { name: "Shadowblade Assassin", cost: 4, type: "Rogue", rarity: "rare", bg: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80" },
  { name: "Celestial Aegis", cost: 5, type: "Holy Spell", rarity: "legendary", bg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80" },
  { name: "Frostbite Elemental", cost: 2, type: "Elemental", rarity: "common", bg: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=400&q=80" },
  { name: "Void Phoenix", cost: 6, type: "Mythic Bird", rarity: "epic", bg: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80" },
];

function populateCollection() {
  const grid = document.getElementById("card-grid");
  grid.innerHTML = "";

  cardsData.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.className = `tcg-card ${card.rarity}`;
    cardEl.innerHTML = `
                    <div class="tcg-card-art" style="background-image: url('${card.bg}')"></div>
                    <div class="tcg-card-overlay"></div>
                    <div class="tcg-card-header">
                        <span class="card-name">${card.name}</span>
                        <div class="card-cost">${card.cost}</div>
                    </div>
                    <div class="tcg-card-footer">
                        <span class="card-type">${card.type}</span>
                    </div>
                `;

    // Interactive 3D Card Tilt Effect
    cardEl.addEventListener("mousemove", (e) => {
      const rect = cardEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -18;
      const rotateY = ((x - centerX) / centerX) * 18;

      cardEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    cardEl.addEventListener("mouseleave", () => {
      cardEl.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });

    cardEl.addEventListener("mouseenter", () => playAudio("hover"));

    grid.appendChild(cardEl);
  });
}
