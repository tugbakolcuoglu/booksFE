import { createBookApi, getBooksApi } from "./apiCalls.js";
import { createBookCard, handleSubmitUpdateForm, handleUpdateButtonClick } from "./helpers.js";




const createBookForm = document.getElementById("create-book-form");
const updateBookForm = document.getElementById("update-book");



const data = await getBooksApi();
data.books.forEach(book => createBookCard(book));



createBookForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const bookType = document.getElementById("book-type").value;
    const isAvailable = document.getElementById("isAvailable").checked;

    const newBook = { title, author, bookType, isAvailable };
    const createdBook = await createBookApi(newBook);

    if (createdBook) {
        location.reload();
    } else {
        alert("Kitap olusturulamadi!");
    }
});


const updateButtons = document.querySelectorAll("#updateButton");



updateButtons.forEach(button => {
    button.addEventListener("click", handleUpdateButtonClick);
});


updateBookForm.addEventListener("submit", handleSubmitUpdateForm);