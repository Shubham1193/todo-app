import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name , setName] = useState("");
    const [pass , setPass] = useState("");

    const navigate = useNavigate()

    async function signup() {
        try {
          const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username : name , password : pass }),
          });
    
          if (!response.ok) {
            throw new Error('Signup failed');
          }
    
          console.log('Signup successful');
        } catch (error) {
          console.error('Error during signup:', error.message);
        }
      }
    //   async function signup() {
    //     try {
    //       const response = await axios.post('http://localhost:3000/signup', {
    //         username: name,
    //         password: pass,
    //       });
    
    //       console.log('Signup successful');
    //     } catch (error) {
    //       console.error('Error during signup:', error.message);
    //     }
    //   }

  return (
    // <div>
    //     <h1>Create Account</h1>
    //     <input type='text' placeholder='Enter Username' onChange={(e) => setName(e.target.value)}/>
    //     <input type='password' placeholder='Enter Password'onChange={(e) => setPass(e.target.value)}/>
    //     <button onClick={signup}>SignUp</button>
    //     <h2>Already have a account</h2>
    //     <button onClick={() => {navigate("/signin")}}>Signin</button>
    // </div>
    <>
    {/* <div className='title'><h1>Todo Maker</h1></div> */}
    <div className='container'>
    <div className='title'><h1>Create Account</h1></div>
      <div class="max-w-sm mx-auto" >
        <div class="mb-5">
          
          <label for="email" class="block mb-2 text-m font-medium text-gray-900 dark:text-white">Your UserName</label>
          <input type="text" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Username" autoComplete='false' required onChange={(e) => setName(e.target.value)} />
        </div>
        <div class="mb-5">
          <label for="password" class="block mb-2 text-m font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Password"required onChange={(e) => setPass(e.target.value)} />
        </div>

        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ width: "100%" }} onClick={signup}>Register Now</button>

        <p id="helper-text-explanation" class="mt-3 text-sm text-gray-500 dark:text-gray-400">Already have an account !    </p>

        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ width: "100%" }} onClick={() => { navigate("/signin") }}>Login</button>

      </div>

    </div>
  </>
  )
}

export default Signup