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
