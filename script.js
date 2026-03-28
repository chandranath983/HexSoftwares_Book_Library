let books = [
  { id: 1, title: "Atomic Habits", category: "Non-Fiction", image: "images/atomic.jpg", borrowed: false },
  { id: 2, title: "The Alchemist", category: "Fiction", image: "images/alchemist.jpg", borrowed: false },
  { id: 3, title: "Brief History of Time", category: "Science", image: "images/time.jpg", borrowed: false },
  { id: 4, title: "Rich Dad Poor Dad", category: "Non-Fiction", image: "images/rich.jpg", borrowed: false },
  { id: 5, title: "Harry Potter", category: "Fiction", image: "images/harry.jpg", borrowed: false }
];

let history = JSON.parse(localStorage.getItem("history")) || [];

// DISPLAY BOOKS
function displayBooks(data) {
  const list = document.getElementById("book-list");
  list.innerHTML = "";

  data.forEach((book) => {
    list.innerHTML += `
      <div class="card">
        <img src="${book.image}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
        <div class="card-content">
          <h3>${book.title}</h3>
          <p>${book.category}</p>
          <button onclick="toggleBorrow(${book.id})">
            ${book.borrowed ? "🔄 Return" : "📖 Borrow"}
          </button>
        </div>
      </div>
    `;
  });
}

// BORROW / RETURN FUNCTION
function toggleBorrow(id) {
  let book = books.find(b => b.id === id);

  book.borrowed = !book.borrowed;

  history.push({
    title: book.title,
    action: book.borrowed ? "Borrowed" : "Returned",
    date: new Date().toLocaleString()
  });

  localStorage.setItem("history", JSON.stringify(history));

  displayBooks(books);
  displayHistory();
}

// DISPLAY HISTORY
function displayHistory() {
  const list = document.getElementById("history");
  list.innerHTML = "";

  history.slice().reverse().forEach(item => {
    list.innerHTML += `
      <div class="card">
        <div class="card-content">
          <h3>${item.title}</h3>
          <p>${item.action}</p>
          <p>${item.date}</p>
        </div>
      </div>
    `;
  });
}

// SEARCH
document.getElementById("search").addEventListener("input", function () {
  let value = this.value.toLowerCase();

  let filtered = books.filter(b =>
    b.title.toLowerCase().includes(value)
  );

  displayBooks(filtered);
});

// FILTER
function filterBooks(event, category) {
  document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  if (category === "All") {
    displayBooks(books);
  } else {
    let filtered = books.filter(b => b.category === category);
    displayBooks(filtered);
  }
}

// INIT
displayBooks(books);
displayHistory();