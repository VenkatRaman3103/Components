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

function flatTheObj(data, result = []) {
    if (typeof data == "object") {
        Object.keys(data).map((key) => {
            flatTheObj(data[key], result);
        });
    } else {
        result.push(data);
    }

    return result;
}

console.log(flatTheObj(data));
