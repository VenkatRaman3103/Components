const data = [
    {
        type: "app",
        label: "Apps",
        content: {
            item1: {
                icon: "red",
                heading: "heading 1",
                description: "1 incididunt ut labore et dolore magna aliqua",
            },
            item2: {
                icon: "red",
                heading: "heading 2",
                description: "2 incididunt ut labore et dolore magna aliqua",
            },
            item3: {
                icon: "red",
                heading: "heading 3",
                description: "3 incididunt ut labore et dolore magna aliqua",
            },
        },
    },
    {
        type: "app",
        label: "Apps",
        content: {
            item1: {
                icon: "red",
                heading: "heading 1",
                description: "1 incididunt ut labore et dolore magna aliqua",
            },
            item2: {
                icon: "red",
                heading: "heading 2",
                description: "2 incididunt ut labore et dolore magna aliqua",
            },
            item3: {
                icon: "red",
                heading: "heading 3",
                description: "3 incididunt ut labore et dolore magna aliqua",
            },
        },
    },
];

export function flatTheObj(data, result = [], path = "") {
    if (typeof data === "object" && data !== null) {
        Object.entries(data).forEach(([key, value]) => {
            flatTheObj(value, result, path ? `${path}.${key}` : key);
        });
    } else {
        result.push({ path, value: data });
    }

    return result;
}

console.log(flatTheObj(data));
