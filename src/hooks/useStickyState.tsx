import {useState, useEffect} from 'reactn';

/**
 * Works like useState but values persist to local storage
 * @link https://www.joshwcomeau.com/snippets/react-hooks/use-sticky-state/
 * @param {string} key The key
 * @param {any} defaultValue The default value
 */
const useStickyState = (key: string, defaultValue: unknown) => {
    const [value, setValue] = useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    });
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
};

export default useStickyState;
