import React from 'react';

const SingleTodo = (props) => {
	return (
		<section className='todo'>
			<div
				className={props.isDone ? 'todo__box--checked' : 'todo__box'}
				onClick={() => props.handleClick(props, !props.isDone)}
			></div>
			<h2 className={props.isDone ? 'todo__desc--strike' : 'todo__desc'}>
				{props.content}
			</h2>
			<button onClick={() => props.delete(props.id)} className='todo__delete'>
				x
			</button>
		</section>
	);
};

export default SingleTodo;
