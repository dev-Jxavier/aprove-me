export const setLocalStorage = (key:string, value: unknown) => {
    if (typeof localStorage !== 'undefined') {
        const valueString = typeof value !== "string" ? JSON.stringify(value) : value
        localStorage.setItem(key, valueString)
    }
}

export const getLocalStorage = (key: string) => {
    if (typeof localStorage !== 'undefined') {
        const localStorageValue = localStorage.getItem(key);
        if (!localStorageValue) return null;

        try {
            return JSON.parse(localStorageValue);
        } catch (error) {
          return localStorageValue;
        }
    }
    return null;
}

export const deleteLocalStorage = (key: string) => {
    localStorage.removeItem(key)
}