import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'
import Signup from './components/Signup'
import Signin from './components/Signin'
import {BrowserRouter , Routes , Route} from "react-router-dom"
import HomeScreen from './components/HomeScreen'


// useEffect hook
function App() {
  const [todos, setTodos] = useState([]);

//  async function getdata(){
//   const res = await fetch("http://localhost:3000/todos")
//   const data = await res.json();
//   console.log(data);
//  }

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Signup/>}/>
        <Route path="signin" element={<Signin/>}/>
        <Route index element={<HomeScreen/>}/>
        <Route path="todos" element={<Todos/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
