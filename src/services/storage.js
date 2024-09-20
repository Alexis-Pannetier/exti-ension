export const setStorage = (name, data) => {
    return chrome.storage.sync.set({ [name]: data });
}

export const getStorage = (name) => {
    return chrome.storage.sync.get(name);
}