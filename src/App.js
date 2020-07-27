import React, {useEffect} from 'react';
import TodoList from './Components/TodoList';
import Context from './context';
import AddTodo from './Components/AddTodo';
import Loader from './Components/Loader';
import Modal from './Components/Modal/Modal';
import github from './images/github.png';

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  
  useEffect(() => {
    fetch('http://jsonplaceholder.typicode.com/todos?_limit=15')
    
     .then(response => response.json())
     .then(todos => {
       setTimeout(() => {
        setTodos(todos)
        setLoading(false)
       }, 1100)
     } 
    )
     
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
      <div className='titleHeader'><h1><span>React</span> to-do list</h1></div>
      
       <div className='wrapper'>
         
          {  }
         <AddTodo onCreate={addTodoItem}/>
         {loading && <Loader />}
        {todos.length ? (<TodoList todos={todos} onToggle={toggleTodo} />) : loading ? null : (<Modal />)}
       </div>
       <footer><a href="https://github.com/ovchynnikov/react-todo"><img src={github} alt="GitHub image"></img>GitHub</a></footer>
    </Context.Provider>
  );
}

export default App;
