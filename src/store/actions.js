import { dispatch } from '@wordpress/data';
import { POPULATE_TODOS, DELETE_TODO, TOGGLE_TODO, ADD_TODO, UPDATE_TODO } from './types'
import {
    deleteTodoControl,
    toggleTodoControl,
    createTodo,
    updateTodoControl
} from './controls'

export function populateTodos(todos) {
    return {
        type: POPULATE_TODOS,
        todos,
    };
}

export function* addTodo(title) {
    try {
        const todo = yield createTodo(title);
        return {
            type: ADD_TODO,
            todo,
        };
    } catch (error) {
        return dispatch('core/notices').createErrorNotice(
            error.message || 'Could not create todo.'
        );
    }
}

export function* updateTodo(id, title) {
    const updated = yield updateTodoControl(id, title);

    return {
        type: UPDATE_TODO,
        item: updated
    }
}

export function* deleteTodo(id) {
    yield deleteTodoControl(id);

    return {
        type: DELETE_TODO,
        id
    }
}

export function* toggleTodo( id ) {

    yield toggleTodoControl(id);

    return {
        type: TOGGLE_TODO,
        id
    }
}