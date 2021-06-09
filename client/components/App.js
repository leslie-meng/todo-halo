import React from 'react';
import SingleTodo from './SingleTodo';

const App = () => {
	let [change, setChange] = React.useState(false);
	let [todos, setTodos] = React.useState([]);
	let [input, setInput] = React.useState('');
	let [allTrue, setAllTrue] = React.useState(true);
	const mounted = React.useRef(true);

	React.useEffect(async () => {
		mounted.current = true;
		if (todos.length && !change) return;

		const response = await (
			await fetch('https://todo-halo.herokuapp.com/todos')
		).json();
		console.log(response);
		if (mounted.current) setTodos(response.sort((a, b) => a.id - b.id));
		if (change) setChange(false);
		if (!mounted.current) mounted.current = true;
	}, [change, todos.id]);
	const handleSubmit = async (event) => {
		event.preventDefault();
		const res = await fetch('https://todo-halo.herokuapp.com/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ content: input, isDone: false }),
		});
		setInput('');
		setChange(true);

		return res.data;
	};
	const changeDone = async (todo, bool) => {
		const res = await fetch(
			`https://todo-halo.herokuapp.com/todos/${todo.id}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ content: todo.content, isDone: bool }),
			}
		);
		if (res.ok) setChange(true);
		return res.data;
	};
	const markAll = () => {
		console.log(allTrue, 'before');
		todos.forEach((each) => changeDone(each, allTrue));
		setAllTrue(!allTrue);
		console.log(allTrue, 'after');
	};
	const deleteItem = async (id) => {
		const res = await fetch(`https://todo-halo.herokuapp.com/todos/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		});
		if (res) setChange(true);
	};
	return (
		<>
			<header>
				<h1 className='header__text'>Todos</h1>
			</header>
			<section className='content'>
				<section className='form'>
					<button
						className={todos ? 'form__toggle--active' : 'form__toggle'}
						onClick={markAll}
					>
						{'>'}
					</button>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							onChange={(event) => setInput(event.target.value)}
							value={input}
							className='form__input'
							placeholder='What needs to be done?'
						></input>
					</form>
				</section>
				{todos && todos.length
					? todos.map((each) => (
							<SingleTodo
								content={each.content}
								isDone={each.isDone}
								key={each.id}
								id={each.id}
								handleClick={changeDone}
								delete={deleteItem}
							/>
					  ))
					: null}
			</section>
		</>
	);
};
export default App;
