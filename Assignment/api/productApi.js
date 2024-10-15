export const link_api = 'http://10.24.29.36:3000'

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

export const updateProduct = async (categoryID, product) => {
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

export const addFavouriteItem = async (userID, favouriteItems) => {
    try {
        const response = await fetch(`${link_api}/favouriteItems`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userID,
                items: favouriteItems
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to add favourite items. Status: ${response.status}, Error: ${errorText}`);
            throw new Error(`Failed to add favourite items. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Added favourite items:', data);
        return data;
    } catch (error) {
        console.error('Error in addFavouriteItem:', error);
    }
};


export const updateFavouriteItems = async (userID, favouriteItems) => {
    try {
        const updateUrl = `${link_api}/favouriteItems/${userID}`;
        console.log('Updating favourites at:', updateUrl);
        const response = await fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userID,
                items: favouriteItems
            })
        });
        if (!response.ok) {
            throw new Error('Failed to update favourite items');
        }
        const data = await response.json();
        console.log('Updated favourite items:', data);
        return data;
    } catch (error) {
        console.error('Error in updateFavouriteItems:', error);
    }
};


export const fetchFavouriteItems = async (userID) => {
    try {
        const response = await fetch(`${link_api}/favouriteItems?userId=${userID}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching favourite items:', error);
        return [];
    }
}

export const fetchCartItems = async (userID) => {
    try {
        const response = await fetch(`${link_api}/cartItems?userId=${userID}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return [];
    }
}

export const addCartItem = async (userID, cartItems) => {
    try {
        const response = await fetch(`${link_api}/cartItems`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userID,
                items: cartItems
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to add cart items. Status: ${response.status}, Error: ${errorText}`);
            throw new Error(`Failed to add cart items. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Added cart items:', data);
        return data;
    } catch (error) {
        console.error('Error in addCartItem:', error);
    }
}

export const updateCartItems = async (userID, cartItems) => {
    try {
        const updateUrl = `${link_api}/cartItems/${userID}`;
        console.log('Updating cart items at:', updateUrl);
        const response = await fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userID,
                items: cartItems
            })
        });
        if (!response.ok) {
            throw new Error('Failed to update cart items');
        }
        const data = await response.json();
        console.log('Updated cart items:', data);
        return data;
    } catch (error) {
        console.error('Error in updateCartItems:', error);
    }
}
