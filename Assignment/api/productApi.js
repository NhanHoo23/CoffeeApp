const link_api = 'http://192.168.0.6:3000/'

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${link_api}/categories`);
        const data = await response.json();
        // console.log(data);

        return data;
    } catch (error) {
        console.error(error);
    }   
}

export const updateProduct = async (categoryID,product) => {
    try {
        const response = await fetch(`${link_api}/categories/${categoryID}/products/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error(error);
    }   
}
