import { createBookApi, getBooksApi, deleteBookApi, updateBookApi} from "./apiCalls.js"; 

const app = document.getElementById("app");
const booksContainer = document.getElementById("books-container");

const createBookCard = (book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card", "mb-3");
    bookCard.setAttribute("data-id", book.id); 
    bookCard.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">Author: ${book.author}</p>
            <p class="card-text">Available: ${book.isAvailable ? "Yes" : "No"}</p>
            <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            <button class="btn btn-primary btn-sm update-btn">Update</button>
        </div>
    `;
    const deleteBtn = bookCard.querySelector(".delete-btn");{
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
const data = await getBooksApi();
data.books.forEach(book => createBookCard(book));


const createBookForm = document.getElementById("create-book-form");
createBookForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const bookType = document.getElementById("book-type").value;
    const isAvailable = document.getElementById("isAvailable").checked;
    
    const newBook = { title, author, bookType, isAvailable };
    const createdBook = await createBookApi(newBook);
    
    if(createdBook) {
        createBookCard(createdBook);
        createBookForm.reset();
    }
});
const updateBookForm=document.getElementById("update-Book");
updateBookForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const id=document.getElementById("update-id").value;
    const title=document.getElementById("update-title").value;
    const author=document.getElementById("update-author").value;
    const bookType=document.getElementById("update-book-type").value;
    const isAvailable=document.getElementById("update-isAvailable").checked;
    const updatedBook={title,author,bookType,isAvailable};
    const result=await updateBookApi(id,updatedBook);
    if(result){
        alert("Kitap basariyla guncellendi!");
        location.reload();
    }else{
        alert("Kitap guncellenemedi!");
    }   
});