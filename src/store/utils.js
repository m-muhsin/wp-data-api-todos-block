export const STORE_NAME = 'wp-todo-list/todos';

export const fetchTodosFromLocalStorage = () => {
    const todos = localStorage.getItem(STORE_NAME);
    try {
        return JSON.parse(todos)
    } catch (e) {
        console.log('error', e.message)
        return null;
    }
}

export const saveTodosInLocalStorage = (todos) => {
    localStorage.setItem(STORE_NAME, JSON.stringify(todos));
}

export const sampleData = [
    { userId: 1, id: 1, title: 'Buy Milk', completed: false },
    { userId: 1, id: 2, title: 'Gardening', completed: false },
    { userId: 1, id: 3, title: 'Complete Project Nova', completed: false },
];
