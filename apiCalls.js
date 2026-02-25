const API_BASE_URL = "http://localhost:5181/api";
export const getBooksApi = async () => {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) {
        alert("Failed to fetch books");}
    return await response.json();
}
export const getBookByIdApi = async (id) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);  
    if (!response.ok) {
        alert("Failed to fetch book details");}
    return await response.json();
}
export const createBookApi = async (book) => {
    const response = await fetch(`${API_BASE_URL}/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    });
    if (!response.ok) {
        alert("Failed to create book");}
    return await response.json();
}
export const deleteBookApi = async (id) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) {
        alert("Kitap silinemedi!");
        return false;
    }
    return true;
}