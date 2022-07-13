import { POPULATE_TODOS, DELETE_TODO, TOGGLE_TODO, ADD_TODO } from './types';

const DEFAULT_STATE = {
	items: [],
};

const reducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {

		case POPULATE_TODOS: {
			return { ...state, items: action.todos };
        };

        case ADD_TODO: {
            return {
                ...state,
                items: [...state.items, action.todo],
            }
        };

        case DELETE_TODO: {
            return { ...state, items: state.items.filter(item => item.id !== action.id) }
        };

        case TOGGLE_TODO: {
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id === action.id) {
                        return { ...item, completed: !item.completed };
                    }
                    return item;
                })
            }
        }

		default:
			return state;
	}
};

export default reducer;
