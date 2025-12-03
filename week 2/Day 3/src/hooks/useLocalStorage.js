import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const newValue = value instanceof Function ? value(storedValue) : value;
            setStoredValue(newValue);
            window.localStorage.setItem(key, JSON.stringify(newValue));
        } catch { }
    };

    return [storedValue, setValue];
};

export default useLocalStorage;
