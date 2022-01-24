export const getAllUser = async() => {
    const response = await fetch(`http://localhost:8000/user`, {
        method : "GET"
    })

    const data = await response.json();
    return data;
}
