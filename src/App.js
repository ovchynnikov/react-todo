import React, {useEffect} from 'react';
import TodoList from './Components/TodoList';
import Context from './context';
import AddTodo from './Components/AddTodo';
import Loader from './Components/Loader';
import Modal from './Components/Modal/Modal';
import github from './images/github.png';
import Lnkdn from './images/Lnkdn.png';
import LoginForm from './Components/LoginForm/LoginForm';

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [isLoggedIn, setLoggedIn] = React.useState(false)


    useEffect(() => {
      const localTodos = localStorage.getItem('todos') || '[]'
      // console.log('LocalStorage.getItem: ', JSON.parse(localTodos))
       setTodos(JSON.parse(localTodos))
       setLoading(false)
   }, [])

    useEffect(() => {
      const todoList = JSON.stringify(todos)
      localStorage.setItem('todos', todoList)
    }, [todos])



    // useEffect(() => {
    //  const localTodos = JSON.parse(localStorage.getItem('todos'))
    // 
      // fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      // .then(response => response.json())
      // .then(todos => {
        // setTimeout(() => {
          //  setTodos(todos)
          //  setLoading(false)
        // }, 1100)
      // } 
    //  )
    // 
    // }, [])
    // /* empty array is the dependancy list for that callback function request. imitation ComponentDidMount*/


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

const localToken = localStorage.getItem('token')

function autoLogin(){
  if(localToken !== null | undefined){
    setLoggedIn(true)
  }
}

function onLogin(){
  setLoggedIn(true)
}

function logoutHandler(){
  localStorage.removeItem('token')
  window.location.reload();
}

function clearAllHandler(){
  setTodos([])
}

if(isLoggedIn === true){
  return (
    <Context.Provider value={{ removeItem }}>
      <div className='titleHeader'><h1><span>React</span> to-do list</h1></div>
      
       <div className='wrapper'>
         <AddTodo onCreate={addTodoItem} />
         
         {loading && <Loader />}
        {todos.length ? (<TodoList todos={todos} onToggle={toggleTodo} />) : loading ? null : (<Modal />)}
        <div>
          <button className="logoutButton" onClick={logoutHandler}>Log out</button>
          <button className="removeAllButton" onClick={clearAllHandler}>Remove All</button>
        </div>
       </div>
       <footer><a href="https://github.com/ovchynnikov/react-todo"><img src={github} alt="GitHub"></img>GitHub</a>
               <a href="https://www.linkedin.com/in/oleksii-ovchynnikov-159675129/"><img className="lnkdin" src={Lnkdn} alt="LinkedIn"></img>LinkedIn</a>
       </footer>
    </Context.Provider>
  );
} else {
  return (
    <Context.Provider value={{ removeItem }}>
    <div className='titleHeader'><h1><span>React</span> to-do list</h1></div>
      <div className='wrapper'>
         <LoginForm onLogin={ onLogin } autoLogin={ autoLogin }/>
      </div>
      <footer><a href="https://github.com/ovchynnikov/react-todo"><img src={github} alt="GitHub"></img>GitHub</a>
               <a href="https://www.linkedin.com/in/oleksii-ovchynnikov-159675129/"><img className="lnkdin" src={Lnkdn} alt="LinkedIn"></img>LinkedIn</a>
      </footer>
      </Context.Provider>
  )
}
  
}

export default App;
