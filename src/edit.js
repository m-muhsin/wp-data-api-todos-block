/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { Button, CheckboxControl, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {

	const [newTodo, setNewTodo] = useState('');

	const todos = useSelect((select) => {
		return select('wp-todo-list/todos').getTodos();
	});
	console.log('todos',todos)

	const actions = useDispatch('wp-todo-list/todos');

	const handleFormSubmit = (event) => {
		event.preventDefault();
		console.log('handleFormSubmit');
		actions?.addTodo(newTodo);
		setNewTodo('');
	}

	const handleNewTodoChange = (value) => {
		setNewTodo(value);
	}
	return (
		<div  {...useBlockProps()}>

			<ul className="todos">
				{
					todos.map((todo) => (
						<li key={todo.id} className="todo">
							<CheckboxControl
								className="todo__title"
								label={todo.title}
								checked={todo.completed}
								onChange={() => {
									actions?.toggleTodo(todo.id);
								}}
							/>
							<Button
								className="todo__remove"
								onClick={() => actions?.deleteTodo(todo.id)}
							>
								&times;
							</Button>
						</li>
					))
				}
			</ul>
			<form className="todo__form" onSubmit={handleFormSubmit}>
				<TextControl value={newTodo} onChange={handleNewTodoChange} />
				<Button type="submit" isPrimary>Add Item</Button>
			</form>
		</div>
	);
}