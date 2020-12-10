const getUser = () => {
    if(!document.cookie) return null;
    return JSON.parse(decodeURIComponent(document.cookie).split('=')[1]);
}

export {
    getUser
};