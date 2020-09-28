import React, {useEffect} from 'react';
import TodoList from './Components/TodoList';
import Context from './context';
import AddTodo from './Components/AddTodo';
import Loader from './Components/Loader';
import Modal from './Components/Modal/Modal';
import github from './images/github.png';
import Lnkdn from './images/Lnkdn.png';
import LoginForm from './Components/LoginForm/LoginForm';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Header from './Components/Header/Header';

library.add(faTrash);

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

let githubUrl = "https://github.com/ovchynnikov/react-todo";
let linkedInUrl = "https://www.linkedin.com/in/oleksii-ovchynnikov-159675129/"

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

function removeItem(id) {
  setTodos(todos.filter(todo => todo.id !== id))
}

function addTodoItem(title) {
  setTodos(todos.concat([
    {
      title,
      id: Date.now(),
      completed: false
    }
]))
}

const localToken = localStorage.getItem('token')

function autoLogin() {
  if(localToken !== null | undefined){
    setLoggedIn(true)
  }
}

function onLogin() {
  setLoggedIn(true)
}

function logoutHandler() {
  localStorage.removeItem('token')
  localStorage.removeItem('userEmail')
  window.location.reload();
}

function clearAllHandler(e) {
  console.log(e)
    setTimeout(()=> { setTodos([]) },
  200)
}

if (isLoggedIn === true) {
  return (
    <Context.Provider value={ { removeItem } }>
      <Header />
       <div className='wrapper'>
         <AddTodo onCreate={addTodoItem} />
        
         { loading && <Loader /> }
        { todos.length ? (
        <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (<Modal />) }
        
        
          <button className="logoutButton" onClick={e => window.confirm("Are you sure you want to Logout?") && logoutHandler() }>Log out</button>
          <button className="removeAllButton" 
          onClick={e => window.confirm("Are you sure you want Remove All items?") && clearAllHandler() }>Remove All</button>
        
       </div>
       <footer><a href={githubUrl}><img src={github} alt="GitHub"></img>GitHub</a>
               <a href={linkedInUrl}><img className="lnkdin" src={Lnkdn} alt="LinkedIn"></img>LinkedIn</a>
       </footer>
    </Context.Provider>
  );
} else {
  return (
    <Context.Provider value={{ removeItem }}>
       {/* <Header /> */}
      <div className='wrapper'>
         <LoginForm onLogin={ onLogin } autoLogin={ autoLogin }/>
      </div>
      {/* <footer><a href={githubUrl}><img src={github} alt="GitHub"></img>GitHub</a>
               <a href={linkedInUrl}><img className="lnkdin" src={Lnkdn} alt="LinkedIn"></img>LinkedIn</a>
      </footer> */}
      </Context.Provider>
  )
}
  
}

export default App;
