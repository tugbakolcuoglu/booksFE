import { deleteBookApi, updateBookApi } from "./apiCalls.js";


const updateBookForm = document.getElementById("update-book");

/**
 * kartlarin icindeki update butonunna tiklanininca gerceklesecek islemii tanimlar
 */
export const handleUpdateButtonClick = (event) => {
  const button = event.target;
  const bookId = button.getAttribute("data-id");
  const title = button.closest(".card").querySelector(".card-title").innerHTML;
  const author = document.getElementById(`author-${bookId}`).innerHTML.replace("Author: ", "");
  const isAvailable = button.getAttribute("data-isAvailable") === "true";

  updateBookForm.querySelector("#update-book-id").value = bookId;
  updateBookForm.querySelector("#update-title").value = title;
  updateBookForm.querySelector("#update-author").value = author;
  updateBookForm.querySelector("#update-isAvailable").checked = isAvailable;
}



/**
 * update formunun submit islemi gerceklestiginde yapilacaklari tanimlar
 */
export const handleSubmitUpdateForm = async (e) => {

  e.preventDefault();
  const id = updateBookForm.querySelector("#update-book-id").value;
  const title = updateBookForm.querySelector("#update-title").value;
  const author = updateBookForm.querySelector("#update-author").value;
  const isAvailable = updateBookForm.querySelector("#update-isAvailable").checked;
  const updatedBook = { title, author, isAvailable };

  const result = await updateBookApi(id, updatedBook);

  if (result) {
    alert("Kitap basariyla guncellendi!");
    location.reload();
  } else {
    alert("Kitap guncellenemedi!");
  }
}




/**
 * API'den gelen kitap bilgilerini kullanarak bir kitap karti olusturur ve sayfaya ekler
 */
export const createBookCard = (book) => {
  const booksContainer = document.getElementById("books-container");

  const bookCard = document.createElement("div");
  bookCard.classList.add("card", "mb-3");
  bookCard.setAttribute("data-id", book.id);
  bookCard.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p id="author-${book.id}" class="card-text">Author: ${book.author}</p>
            <p class="card-text">Available: ${book.isAvailable ? "Yes" : "No"}</p>
            <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            <button id="updateButton" data-id="${book.id}" data-isAvailable="${book.isAvailable}" class="btn btn-primary btn-sm update-btn">Update</button>
        </div>
    `;
  const deleteBtn = bookCard.querySelector(".delete-btn"); {
    deleteBtn.addEventListener("click", async () => {
      const confirmDelete = confirm(`${book.title} kitabini silmek istediginize emin misiniz?`);
      if (!confirmDelete) return;

      const success = await deleteBookApi(book.id);
      if (success) {
        bookCard.remove();
      }
    });
    booksContainer.appendChild(bookCard);
  };
}