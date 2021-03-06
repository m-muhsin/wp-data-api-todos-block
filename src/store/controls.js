import {
    FETCH_TODOS,
    DELETE_TODO_FROM_STORAGE,
    TOGGLE_TODO_IN_STORAGE,
    CREATE_TODO_IN_STORAGE,
    UPDATE_TODO_IN_STORAGE,
} from './types';
import {
    saveTodosInLocalStorage,
    fetchTodosFromLocalStorage,
} from './utils';
import { sampleData } from './constants';

import { STORE_KEY } from './constants';

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

export const updateTodoControl = (id, title) => {
    return {
        type: UPDATE_TODO_IN_STORAGE,
        id,
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
        let todosFromLocalStorage = fetchTodosFromLocalStorage(STORE_KEY);
        if (!todosFromLocalStorage) {
            saveTodosInLocalStorage(STORE_KEY, sampleData);
            todosFromLocalStorage = sampleData;
        }
        return todosFromLocalStorage;
    },
    DELETE_TODO_FROM_STORAGE(action) {
        const todosFromLocalStorage = fetchTodosFromLocalStorage(STORE_KEY);
        const items = todosFromLocalStorage.filter(todo => todo.id !== action.id);
        saveTodosInLocalStorage(STORE_KEY, items);
        return items;
    },
    TOGGLE_TODO_IN_STORAGE(action) {
        const todosFromLocalStorage = fetchTodosFromLocalStorage(STORE_KEY);
        const items = todosFromLocalStorage?.map(todo => {
            if (todo.id === action.id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        saveTodosInLocalStorage(STORE_KEY, items);
        return items;
    },
    CREATE_TODO_IN_STORAGE(action) {
        const todosFromLocalStorage = fetchTodosFromLocalStorage(STORE_KEY);
        const highestId = todosFromLocalStorage?.reduce((highest, todo) => Math.max(highest, todo.id), 0);
        const newTodo = {
            title: action.title,
            id: highestId + 1,
            completed: false
        }
        const items = [...todosFromLocalStorage, newTodo];
        saveTodosInLocalStorage(STORE_KEY, items);
        return newTodo;
    },
    UPDATE_TODO_IN_STORAGE(action) {
        const todosFromLocalStorage = fetchTodosFromLocalStorage(STORE_KEY);
        let updatedTodo;
        const updatedTodos = todosFromLocalStorage.map(todo => {
            if (todo.id === action.id) {
                updatedTodo = { ...todo, title: action.title };
                return { ...todo, title: action.title };
            }
            return todo;
        });
        saveTodosInLocalStorage(STORE_KEY, updatedTodos);
        return updatedTodo;
    },
};
