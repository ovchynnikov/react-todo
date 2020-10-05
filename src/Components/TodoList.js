import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';

function TodoList(props){
    return (
        <ul>
            <FlipMove duration={350} easing="ease-in-out">
        { props.todos.map((todo, index )=> {
            return (      
            <TodoItem 
            todo={todo} 
            key={todo.id} 
            index={index} 
            onChange={props.onToggle}
            priority={todo.priority}/>
            )
        }) }
        </FlipMove>
        </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onToggle: PropTypes.func.isRequired
}

export default TodoList;