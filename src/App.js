import React, {useEffect} from 'react';
import TodoList from './Components/TodoList';
import Context from './context';
import AddTodo from './Components/AddTodo';
import Loader from './Components/Loader';
import Modal from './Components/Modal/Modal';
import LoginForm from './Components/LoginForm/LoginForm';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

library.add(faTrash);

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [isLoggedIn, setLoggedIn] = React.useState(false)
  const [sortedTodo, setSortedTodo] = React.useState([])

    useEffect(() => {
      const localTodos = localStorage.getItem('todos') || '[]'
      // console.log('LocalStorage.getItem: ', JSON.parse(localTodos))
       setTodos(JSON.parse(localTodos).sort((a,b) => b.priority - a.priority))
       setSortedTodo(JSON.parse(localTodos).sort((a,b) => b.priority - a.priority))
       setLoading(false)
   }, [])

   

    useEffect(() => {
      
      //make array sory by priority here
      const todoList = JSON.stringify(todos.sort((a,b) => b.priority - a.priority));
      setSortedTodo(JSON.stringify(todos.sort((a,b) => b.priority - a.priority)));
      localStorage.setItem('todos', todoList)
    }, [sortedTodo, todos])



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

function removeItem(id) {
  setTodos(todos.filter(todo => todo.id !== id))
}

function upPriority(id) {
  setSortedTodo(
    todos.map(todo => {
      if (todo.id === id){
        
        todo.priority += 1 
      }
      return todo
    })
  )
}

function downPriority(id) {
  setSortedTodo(
    todos.map(todo => {
      if (todo.id === id){
        todo.priority -= 1 
      }
      return todo
    })
  )
}


function addTodoItem(title) {
  setTodos(todos.concat([
    {
      title,
      id: Date.now(),
      completed: false,
      priority: 0
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
  180)
}

if (isLoggedIn === true) {
  return (
    <Context.Provider value={ { removeItem, upPriority, downPriority } }>
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
       <Footer />
    </Context.Provider>
  );
} else {
  return (
    <Context.Provider value={{ removeItem }}>
       {/* <Header /> */}
      <div className='wrapper'>
         <LoginForm onLogin={ onLogin } autoLogin={ autoLogin }/>
      </div>
      {/* <Footer /> */}
      </Context.Provider>
  )
}
  
}

export default App;
