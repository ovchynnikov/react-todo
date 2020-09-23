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
  const [dummyTodos, setDummyTodos] = React.useState(false)

    useEffect(() => {
    
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
       .then(response => response.json())
       .then(todos => {
         setTimeout(() => {
            setTodos(todos)
            setLoading(false)
         }, 1100)
       } 
      )
       
    }, [])
        /* empty array is the dependancy list for that callback function request*/
  


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

function onFetchDummy(){
  setDummyTodos(true)
}
console.log(isLoggedIn) // ============================== console log 

function logoutHandler(){
  localStorage.removeItem('token')
  window.location.reload();
}


if(isLoggedIn === true){
  return (
    <Context.Provider value={{ removeItem }}>
      <div className='titleHeader'><h1><span>React</span> to-do list</h1></div>
      
       <div className='wrapper'>
         <AddTodo onCreate={addTodoItem} onClick={onFetchDummy}/>
         
         {loading && <Loader />}
        {todos.length && dummyTodos ? (<TodoList todos={todos} onToggle={toggleTodo} />) : loading ? null : (<Modal />)}
        <button className="logoutButton" onClick={logoutHandler}>Log out</button>
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
