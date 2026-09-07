const collectionGrid = document.querySelector(".collection-modal .items-grid");

const sceneries = [SCENERIES.canalCity, SCENERIES.islandCastle, SCENERIES.cosmicVortex]
const banners = [SCENERIES.darkCastle, SCENERIES.darkTower, SCENERIES.floatingCastle]

// Initialize Card Collection on Load
window.onload = function () {
  document.body.style.background = `
    var(--overlay-gradient),
    url("${getRandomItem(sceneries)}")
    center / cover no-repeat
  `;

  populateCollection();
};

function toggleModal(name, force) {
  const shouldHide = force !== undefined ? !force : undefined;
  const modalEl = document.querySelector(`.modal.${name}`);
  modalEl.classList.toggle("hidden", force);
  document.body.classList.toggle("no-scroll", !modalEl.classList.contains("hidden"));
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

function populateCollection() {
  collectionGrid.innerHTML = "";

  collectionGrid.innerHTML = CARD_LIBRARY.map((item) => {
    const itemCost = Math.floor((item.atk + item.hp) / 10);
    return `
      <div class="item ${item.rarity}">
        <div class="artwork" style="background-image: url('${item.artwork}')"></div>
        <div class="card-overlay"></div>
        <div class="card-header">
            <span class="name truncated">${item.name}</span>
            <div class="cost">${itemCost}</div>
        </div>
        <div class="card-footer">
          <span>⚔️ ${item.atk}</span>
          <span>💚 ${item.hp}</span>
        </div>
      </div>
    `;
  }).join("");
}
