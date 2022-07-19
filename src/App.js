import React,{useEffect} from "react";
import Todolist from "./Todo/Todolist";
import Context from "./context";
import Loader from "./loader";
import Modal from "./Modal/modal";

const AddTodo = React.lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve(import('./AddTodo'))
  },3000)
}))

function App() {
const [todos, setTodos] = React.useState([])
const [loading, setLoading ] = React.useState(true)
useEffect( ()=>{
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then(response => response.json())
  .then(todos => {
    setTimeout(() =>{
      setTodos(todos)
      setLoading(false)
    }, 2000)
  })
} ,[])


function toggleTodo(id) {
  setTodos (
    todos.map(todo =>{
    if (todo.id === id) {
      todo.compeleted = !todo.compeleted
    }
    return todo
  })
  )
}

function removetodo(id) {
  setTodos(todos.filter(todo => todo.id !== id))
} 

function addTodo(title){
  setTodos(todos.concat([{
    title,
    id: Date.now(),
    compeleted: false
  }]))
}

  return (
    <Context.Provider value={{removetodo}} >
      <div className="wrapper">
      <h1> React </h1>
      <Modal></Modal>

      <React.Suspense fallback={<p>Loading...</p>}>
        <AddTodo  onCreate={addTodo} ></AddTodo>
      </React.Suspense>
      

      {loading && <Loader></Loader>}

      {todos.length ? (
        <Todolist todos={todos} onToggle={toggleTodo}></Todolist>
      ) : (
        loading ? null : (
          <p>No todos!</p>
        )
      )}
      
    </div>
    </Context.Provider>
    
  )
    
}

export default App;
