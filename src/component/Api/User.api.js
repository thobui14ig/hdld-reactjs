export const getAllUser = async() => {
    const response = await fetch(`http://localhost:8000/user`, {
        method : "GET"
    })

    const data = await response.json();
    return data;
}

export const getInfoUser = async(id) => {
    const response = await fetch(`http://localhost:8000/user/${id}`, {
        method : "GET"
    })

    const data = await response.json();
    return data;
}

export const getColumnUser = async(id) => {
    const response = await fetch(`http://localhost:8000/user/column`, {
        method : "GET"
    })

    const data = await response.json();
    return data;
}

export const getUserAndAttr = async(id) => {
    console.log(id)
    const response = await fetch(`http://localhost:8000/user/userAndAttr/${id}`, {
        method : "GET"
    })

    const data = await response.json();
    return data;
}

export const getDataContractById = async(id) => {
    console.log(id)
    const response = await fetch(`http://localhost:8000/user/contentContractByUser/${id}`, {
        method : "GET"
    })

    const data = await response.json();
    return data;
}
