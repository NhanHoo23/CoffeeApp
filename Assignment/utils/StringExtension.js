export const splitName = (name) => {
    if (name.includes("Beans")) {
        const words = name.split(" ");

        const title = words.slice(0, 2).join(" ");
        const description = words.slice(2).join(" ");

        return {
            title,
            description
        };
    } else {
        const [title, ...description] = name.split(" ");

        return {
            title,
            description: description.join(" ")
        };
    }
};