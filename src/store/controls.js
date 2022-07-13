import { FETCH_TODOS, DELETE_TODO_FROM_STORAGE, TOGGLE_TODO_IN_STORAGE, CREATE_TODO_IN_STORAGE } from './types';
import { sampleData, saveTodosInLocalStorage, fetchTodosFromLocalStorage } from './utils';

export const fetchTodos = () => {
    return {
        type: FETCH_TODOS,
    };
};

export const createTodo = (title) => {
    return {
        type: CREATE_TODO_IN_STORAGE,
        title
    }
}

export const deleteTodoControl = (id) => {
    return {
        type: DELETE_TODO_FROM_STORAGE,
        id
    }
}

export const toggleTodoControl = (id) => {
    return {
        type: TOGGLE_TODO_IN_STORAGE,
        id
    }
}

export default {
    FETCH_TODOS() {
        let todosFromLocalStorage = fetchTodosFromLocalStorage();
        if (!todosFromLocalStorage) {
            saveTodosInLocalStorage(sampleData);
            todosFromLocalStorage = sampleData;
        }
        return todosFromLocalStorage;
    },
    DELETE_TODO_FROM_STORAGE(action) {
        const todosFromLocalStorage = fetchTodosFromLocalStorage();
        const items = todosFromLocalStorage.filter(todo => todo.id !== action.id);
        saveTodosInLocalStorage(items);
        return items;
    },
    TOGGLE_TODO_IN_STORAGE(action) {
        const todosFromLocalStorage = fetchTodosFromLocalStorage();
        const items = todosFromLocalStorage?.map(todo => {
            if (todo.id === action.id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        saveTodosInLocalStorage(items);
        return items;
    },
    CREATE_TODO_IN_STORAGE(action) {
        const todosFromLocalStorage = fetchTodosFromLocalStorage();
        const highestId = todosFromLocalStorage?.reduce((highest, todo) => Math.max(highest, todo.id), 0);
        const newTodo = {
            title: action.title,
            id: highestId + 1,
            completed: false
        }
        const items = [...todosFromLocalStorage, newTodo];
        saveTodosInLocalStorage(items);
        return newTodo;
    }
};
