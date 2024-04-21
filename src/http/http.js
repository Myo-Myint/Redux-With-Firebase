export const putData =async (data) => {
    const respone = await fetch(`https://redux-test-a7844-default-rtdb.europe-west1.firebasedatabase.app/cart.json`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    } )
    return respone;
}

export const fetchData = async () => {
    const response = await fetch(`https://redux-test-a7844-default-rtdb.europe-west1.firebasedatabase.app/cart.json`);
    return response;
}