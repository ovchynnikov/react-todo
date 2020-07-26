import React from 'react';
import TodoList from './Components/TodoList';


function App() {
  const todos = [
    { id: 1, completed: false, title: 'Buy milk'},
    { id: 2, completed: false, title: 'Buy apples'},
    { id: 3, completed: false, title: 'Buy 2 forks'}
  ]
  return (
    <div className='wrapper'>
      <h1>React tutorial</h1>
      <TodoList todos={todos}/>
    </div>
    
  );
}

export default App;
