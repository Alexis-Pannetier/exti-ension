import { printLine } from './modules/print';

console.log('Content script works!');

// printLine("Using the 'printLine' function from the Print Module");

export const setStorage = (name, data) => {
    return chrome.storage.sync.set({ [name]: data });
}

export const getStorage = (name) => {
    return chrome.storage.sync.get(name);
}
