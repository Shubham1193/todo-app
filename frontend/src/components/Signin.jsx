import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./signin.css"
const Signin = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      navigate('/todos')
    }
  })

  async function signin() {
    console.log(name , pass)
    try {
      const response = await axios.post('http://localhost:3000/signin', {
        username: name,
        password: pass,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log("User logged in Successfully");
      navigate("/todos")


    } catch (error) {
      alert("user not found");
      navigate("/signup")
      console.error('Error during signup:', error.message);
    }
  }

  return (

    <>
      
       <div className='container'>
      <div className='title'><h1>Login</h1></div>
      <div class="max-w-sm mx-auto" >
        <div class="mb-5">
          
          <label for="email" class="block mb-2 text-m font-medium text-gray-900 dark:text-white">Your UserName</label>
          <input type="text" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Username" autoComplete='false' required onChange={(e) => setName(e.target.value)} />
        </div>
        <div class="mb-5">
          <label for="password" class="block mb-2 text-m font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Password"required onChange={(e) => setPass(e.target.value)} />
        </div>

        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ width: "100%" }} onClick={signin}>Login</button>

        <p id="helper-text-explanation" class="mt-3 text-sm text-gray-500 dark:text-gray-400">Don't have an Account !    </p>

        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ width: "100%" }} onClick={() => { navigate("/signup") }}>Register Now</button>

      </div>
      </div>
    </>

    //  <div className='container'>
    //     <h1>Todo Maker</h1>
    //     <h1>Signin Account</h1>
    //     <input type='text' placeholder='Enter Username' onChange={(e) => setName(e.target.value)}/>
    //     <input type='password' placeholder='Enter Password'onChange={(e) => setPass(e.target.value)}/>
    //     <button onClick={signin}>Signin</button>
    //     <h2>Don't have a account</h2>
    //     <button onClick={() => {navigate("/signup")}}>Signup</button>
    // </div> 

  )
}

export default Signin