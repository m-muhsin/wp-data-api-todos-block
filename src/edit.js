import { __ } from '@wordpress/i18n';

import { useBlockProps } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { Button, CheckboxControl, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { Icon, edit, close } from '@wordpress/icons'
import { STORE_KEY } from './store/constants';

import './editor.scss';

export default function Edit() {

	// The todo item title that's currently being added/edited.
	const [currentTodo, setCurrentTodo] = useState('');

	// The todo item ID that's currently being edited.
	const [editing, setEditing] = useState(undefined);

	// Fetche todo items, etc. from the data store.
	const [todos, todosLength, doneLength, pendingLength] = useSelect((select) => {
		const store = select(STORE_KEY);
		const todos = store.getTodos();
		const todosLength = store.getTodosLength();
		const doneLength = store.getDoneTodosLength();
		const pendingLength = store.getPendingTodosLength();
		return [todos, todosLength, doneLength, pendingLength]
	});

	const actions = useDispatch(STORE_KEY);

	const handleFormSubmit = (event) => {
		event.preventDefault();
		if (editing) {
			actions?.updateTodo(editing, currentTodo);
			setEditing(undefined);
		} else {
			actions?.addTodo(currentTodo);
		}
		setCurrentTodo('');
	}

	const handleNewTodoChange = (value) => {
		setCurrentTodo(value);
	}

	const editTodo = (id) => {
		setEditing(id);
		setCurrentTodo(todos.find(todo => todo.id === id).title);
	}
	return (
		<div  {...useBlockProps()}>
			<h4>{__('Todo List', 'wp-data-api-todos-block')}</h4>
			<ul className="todos">
				{
					todos.map((todo) => (
						<li key={todo.id} className="todo">
							<CheckboxControl
								className={`todo__title${todo.completed ? ' todo__title--done' : ''}`}
								label={todo.title}
								checked={todo.completed}
								onChange={() => {
									actions?.toggleTodo(todo.id);
								}}
							/>
							<Button
								className="todo__remove"
								onClick={() => editTodo(todo.id)}
							>
								<Icon icon={edit} />
							</Button>
							<Button
								className="todo__remove"
								onClick={() => actions?.deleteTodo(todo.id)}
							>
								<Icon icon={close} />
							</Button>
						</li>
					))
				}
			</ul>
			<form className="todo__form" onSubmit={handleFormSubmit}>
				<TextControl value={currentTodo} onChange={handleNewTodoChange} />
				<Button type="submit" isPrimary>
					{editing ? __('Update Item', 'wp-data-api-todos-block') : __('Add Item', 'wp-data-api-todos-block')}
				</Button>
			</form>

			<div>
				<h5>Stats</h5>
				<ul className="todo__stats">
					<li>{__('All', 'wp-data-api-todos-block') + ': ' + todosLength}</li>
					<li>{__('Completed') + ': ' + doneLength}</li>
					<li>{__('Pending') + ': ' + pendingLength}</li>
				</ul>
			</div>
		</div>
	);
}
