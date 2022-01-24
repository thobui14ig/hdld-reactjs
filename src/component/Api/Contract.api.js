
export const getContract = async() => {
    const response = await fetch(`http://localhost:8000/contract`, {
        method : "GET"
    })

    const data = await response.json();
    return data;
}

export const getContractById = async(id) => {
    const response = await fetch(`http://localhost:8000/contract/${id}`, {
        method : "GET"
    })

    const data = await response.json();
    return data;
}
