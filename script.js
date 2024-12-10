const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleReadStatus() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read === "true");
    myLibrary.push(newBook);
    displayLibrary();
}

function displayLibrary() {
    const libraryDisplay = document.getElementById("libraryDisplay");
    libraryDisplay.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-content">
                <p><strong>${book.title}</strong></p>
                <p>By: ${book.author}</p>
                <p>Pages: ${book.pages}</p>
                <p>Read: ${book.read ? "Yes" : "No"}</p>
            </div>
            <button data-index="${index}" class="toggleRead">Toggle Read</button>
            <button data-index="${index}" class="removeBook">Remove</button>
        `;

        libraryDisplay.appendChild(card);
    });

    attachCardButtons();
}

function attachCardButtons() {
    document.querySelectorAll(".removeBook").forEach(button => {
        button.addEventListener("click", () => {
            const index = button.dataset.index;
            myLibrary.splice(index, 1);
            displayLibrary();
        });
    });

    document.querySelectorAll(".toggleRead").forEach(button => {
        button.addEventListener("click", () => {
            const index = button.dataset.index;
            myLibrary[index].toggleReadStatus();
            displayLibrary();
        });
    });
}

// Manejo del formulario y del modal
document.getElementById("newBookBtn").addEventListener("click", () => {
    document.getElementById("bookFormDialog").showModal();
});

document.getElementById("cancelBtn").addEventListener("click", () => {
    document.getElementById("bookFormDialog").close();
});

document.getElementById("bookForm").addEventListener("submit", event => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;

    addBookToLibrary(title, author, pages, read);
    document.getElementById("bookFormDialog").close();
    document.getElementById("bookForm").reset();
});

// Pruebas iniciales
addBookToLibrary("1984", "George Orwell", 328, "true");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, "false");
