export const getTodos = (state, param) => {
    return state.items;
}

export const getTodosLength = (state) => {
    return state.items.length;
}

export const getDoneTodosLength = (state) => {
    return state.items.filter(item => item.completed).length;
}

export const getPendingTodosLength = (state) => {
    return state.items.filter(item => !item.completed).length;
}
