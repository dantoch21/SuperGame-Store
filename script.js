let library = [];
let currentGameTitle = "";

function showPage(page) {
  let content = document.getElementById("content");

  if (page === "sale") {
    content.innerHTML = `
      <h2>Spring sale</h2>
      <div class="game-grid">
        ${createGame("ASTRO BOT", 4.8, 1999, "Astro Bot.png")}
        ${createGame("Spider-Man 2", 4.9, 2299, "Spider-Man.png")}
        ${createGame("Rise of the ronin", 4.1, 2299, "Rise of the Ronin.png")}
        ${createGame("NBA 2K25", 3.1, 3940, "NBA 2K25.png")}
        ${createGame("Helldivers 2", 4.0, 1199, "HELLDRIVERS ll.png")}
      </div>`;
  }

  if (page === "main") {
    content.innerHTML = `
      <h2>All Games</h2>
      <div class="game-grid">
        ${createGame("Horizon Forbidden West", 4.8, 1699, "Horizon.png")}
        ${createGame("The Last of Us II", 4.1, 1199, "The Last of Us ll.png")}
        ${createGame("Cyberpunk 2077", 3.7, 1499, "Cyberpunk 2077.png")}
        ${createGame("Resident Evil 2", 4.2, 1199, "Resident Evil 2.png")}
        ${createGame("A Way Out", 4.0, 1049, "A Way out.png")}
        ${createGame("Rust", 3.7, 1499, "Rust.png")}
      </div>`;
  }

  if (page === "library") {
    showLibrary();
  }

  if (page === "search") {
    content.innerHTML = `
      <h2>Search Games</h2>
      <input type="text" id="searchInput" placeholder="Enter game title..." oninput="filterSearchResults()">
      <div id="search-results" class="game-grid">
        ${getAllGamesHTML()}
      </div>`;
  }
}

function createGame(title, rating, price, imageName) {
  let isInLibrary = library.some(game => game.title === title);
  let buttonHTML = "";

  if (isInLibrary) {
    buttonHTML = `<button class="btn buy-btn" onclick="showPaymentForm('${title}')">Buy</button>`;
  } else {
    buttonHTML = `<button class="btn add-to-cart-btn" onclick="addToLibrary('${title}', ${rating}, ${price}, '${imageName}')">Add to cart</button>`;
  }

  return `
    <div class="game-card">
      <img src="${imageName}" alt="${title}" class="game-image">
      <div>${title}</div>
      <div>Rating: ${rating}</div>
      <div>Price: ${price} UAH</div>
      ${buttonHTML}
    </div>`;
}

function addToLibrary(title, rating, price, imageName) {
  library.push({ title, rating, price, imageName });
  alert(title + " added to cart!");
}

function showPaymentForm(title) {
  currentGameTitle = title;
  document.getElementById("payment-title").textContent = "Buy: " + title;
  document.getElementById("payment-form").style.display = "flex";
}

function confirmPayment() {
  alert("Thank you for your purchase!");
  library = library.filter(game => game.title !== currentGameTitle);
  document.getElementById("payment-form").style.display = "none";
  showLibrary();
}

function cancelPayment() {
  document.getElementById("payment-form").style.display = "none";
  currentGameTitle = "";
}

function showLibrary() {
  let content = document.getElementById("content");

  if (library.length === 0) {
    content.innerHTML = "<h2>Library is empty :(</h2>";
    return;
  }

  let gamesHTML = "";
  let total = 0;

  for (let game of library) {
    gamesHTML += createGame(game.title, game.rating, game.price, game.imageName);
    total += game.price;
  }

  content.innerHTML = `
    <h2>Your Library</h2>
    <div class="game-grid">${gamesHTML}</div>
    <h3>Total: ${total} UAH</h3>`;
}

let allGames = [
  { title: "ASTRO BOT", rating: 4.8, price: 1999, imageName: "Astro Bot.png" },
  { title: "Spider-Man 2", rating: 4.9, price: 2299, imageName: "Spider-Man.png" },
  { title: "Rise of the ronin", rating: 4.1, price: 2299, imageName: "Rise of the Ronin.png" },
  { title: "NBA 2K25", rating: 3.1, price: 3940, imageName: "NBA 2K25.png" },
  { title: "Helldivers 2", rating: 4.0, price: 1199, imageName: "HELLDRIVERS ll.png" },
  { title: "Horizon Forbidden West", rating: 4.8, price: 1699, imageName: "Horizon.png" },
  { title: "The Last of Us II", rating: 4.1, price: 1199, imageName: "The Last of Us ll.png" },
  { title: "Cyberpunk 2077", rating: 3.7, price: 1499, imageName: "Cyberpunk 2077.png" },
  { title: "Resident Evil 2", rating: 4.2, price: 1199, imageName: "Resident Evil 2.png" },
  { title: "A Way Out", rating: 4.0, price: 1049, imageName: "A Way out.png" },
  { title: "Rust", rating: 3.7, price: 1499, imageName: "Rust.png" }
];

function getAllGamesHTML() {
  let html = "";
  for (let game of allGames) {
    html += createGame(game.title, game.rating, game.price, game.imageName);
  }
  return html;
}

function filterSearchResults() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let resultsDiv = document.getElementById("search-results");

  let filtered = allGames.filter(game => game.title.toLowerCase().includes(input));

  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<p>No games found :(</p>";
    return;
  }

  let html = "";
  for (let game of filtered) {
    html += createGame(game.title, game.rating, game.price, game.imageName);
  }

  resultsDiv.innerHTML = html;
}
