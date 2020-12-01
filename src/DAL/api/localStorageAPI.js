const addItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const getItem = key => JSON.parse(localStorage.getItem(key));

export {
    addItem,
    getItem
};