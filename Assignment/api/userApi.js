const link_api = 'http://192.168.0.6:3000/users' 

export const fetchUsers = async () => {
    try {
        const response = await fetch(link_api);
        const data = await response.json();
        // console.log(data);

        return data;
    } catch (error) {
        console.error(error);
    }
}

export const createUser = async (user) => {
    try {
        const response = await fetch(link_api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}




