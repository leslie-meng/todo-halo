import React from 'react';
import Filter from './Filter';
import SingleTodo from './SingleTodo';

const App = () => {
	let [change, setChange] = React.useState(false);
	let [filter, setFilter] = React.useState('all');
	let [todos, setTodos] = React.useState([]);
	let [input, setInput] = React.useState('');
	let [allTrue, setAllTrue] = React.useState(true);
	const mounted = React.useRef(true);
	let count = 0;

	React.useEffect(async () => {
		mounted.current = true;
		if (todos.length && !change) return;

		const response = await (
			await fetch('https://todo-halo.herokuapp.com/todos')
		).json();
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
		todos.forEach((each) => changeDone(each, allTrue));
		setAllTrue(!allTrue);
	};
	const deleteItem = async (id) => {
		const res = await fetch(`https://todo-halo.herokuapp.com/todos/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		});
		if (res) setChange(true);
	};
	const deleteAll = () => {
		todos.forEach((each) => {
			if (each.isDone) return deleteItem(each.id);
		});
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
				{todos && todos.length ? (
					<>
						{todos.map((each) => {
							if (filter === 'all' || filter == `${each.isDone}`) {
								count += 1;
								return (
									<SingleTodo
										content={each.content}
										isDone={each.isDone}
										key={each.id}
										id={each.id}
										handleClick={changeDone}
										delete={deleteItem}
									/>
								);
							}
						})}
						<Filter
							deleteAll={deleteAll}
							count={count}
							setFilter={setFilter}
							filter={filter}
						/>
					</>
				) : null}
			</section>
		</>
	);
};
export default App;
