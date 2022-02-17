
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

//get attr
export const getAttr = async() => {
    const response = await fetch(`http://localhost:8000/contract/attr`, {
        method : "GET"
    })

    const data = await response.json();
    return data;
}

//get attr vs colum user
export const getColumAttrAndColumnUser = async() => {
    const response = await fetch(`http://localhost:8000/contract/attrAndValue`, {
        method : "GET"
    })

    const data = await response.json();
    return data;
}

export const editContract = async(id, content, url) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, content: content })
    };
    fetch('http://localhost:8000/contract/edit/', requestOptions)
        .then(response => response.json())
}

//add attr
export const addAttr = async(attr) => {
    console.log(1)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attr: attr})
    };
    return fetch('http://localhost:8000/contract/addAttr/', requestOptions)
        .then(response => response.json())
   
    
    

}


