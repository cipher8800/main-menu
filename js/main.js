const collectionGrid = document.querySelector(".collection-modal .items-grid");

// Initialize Card Collection on Load
window.onload = function () {
  document.body.style.background = `
    var(--overlay-gradient),
    url("assets/images/backgrounds/${randomInt(0, 2)}.jpg")
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

  collectionGrid.innerHTML = CARDS_DATA
    .map(
      (item) => `
      <div class="item ${item.rarity}">
        <div class="artwork" style="background-image: url('${item.artwork}')"></div>
        <div class="card-overlay"></div>
        <div class="card-header">
            <span class="name">${item.name}</span>
            <div class="cost">${item.cost}</div>
        </div>
        <div class="card-footer">
          ${item.type}
        </div>
      </div>
    `,
    )
    .join("");
}
