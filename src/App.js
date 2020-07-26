import React, {useEffect} from 'react';
import TodoList from './Components/TodoList';
import Context from './context';
import AddTodo from './Components/AddTodo';


function App() {
  const [todos, setTodos] = React.useState([])
  
  useEffect(() => {
    fetch('http://jsonplaceholder.typicode.com/todos?_limit=10')
    
     .then(response => response.json())
     .then(todos => {setTodos(todos)})
     
  }, [])  /* empty array is the dependancy list for that callback function request*/

function toggleTodo(id) {
  setTodos(
    todos.map(todo => {
      if (todo.id === id){
        todo.completed = !todo.completed
      }
      return todo
    })
  )
}

function removeItem(id){
  setTodos(todos.filter(todo => todo.id !== id))
}

function addTodoItem(title){
  setTodos(todos.concat([
    {
      title,
      id: Date.now(),
      completed: false
    }
]))
}
  return (
    <Context.Provider value={{ removeItem }}>
       <div className='wrapper'>
         <h1>React tutorial</h1>
         <AddTodo onCreate={addTodoItem}/>
        {todos.length ? <TodoList todos={todos} onToggle={toggleTodo} /> : <p>You don't have todos</p>}
       </div>
    </Context.Provider>
  );
}

export default App;
