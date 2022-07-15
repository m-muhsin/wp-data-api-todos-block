export const fetchTodosFromLocalStorage = (key) => {
    const todos = localStorage.getItem(key);
    try {
        return JSON.parse(todos)
    } catch (e) {
        console.log('error', e.message)
        return null;
    }
}

export const saveTodosInLocalStorage = (key, todos) => {
    localStorage.setItem(key, JSON.stringify(todos));
}
