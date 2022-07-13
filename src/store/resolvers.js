import { dispatch } from '@wordpress/data';
import { fetchTodos } from './controls';
import { populateTodos } from './actions';

export function* getTodos() {
    try {
        const todos = yield fetchTodos();
        return populateTodos(todos);
    } catch {
        return dispatch('core/notices').createErrorNotice(
            'Could not fetch todos.'
        );
    }
}
