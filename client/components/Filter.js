import React from 'react';

const Filter = (props) => {
	const setFilter = (newFilter) => props.setFilter(newFilter);
	return (
		<section className='filter'>
			<p className='filter__text'>{`${props.count} items left`}</p>
			<div className='filter__buttonDiv'>
				<button
					className={
						props.filter === 'all' ? 'filter__button--active' : 'filter__button'
					}
					onClick={() => setFilter('all')}
				>
					All
				</button>
				<button
					className={
						props.filter === 'false'
							? 'filter__button--active'
							: 'filter__button'
					}
					onClick={() => setFilter('false')}
				>
					Active
				</button>
				<button
					className={
						props.filter === 'true'
							? 'filter__button--active'
							: 'filter__button'
					}
					onClick={() => setFilter('true')}
				>
					Completed
				</button>
			</div>
			<button className='filter__button' onClick={props.deleteAll}>
				Clear completed
			</button>
		</section>
	);
};
export default Filter;
