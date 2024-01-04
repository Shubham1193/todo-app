import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"






export function Todos() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/signin")
        } else {
            getData();
        }


    }, [])


    async function getData() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:3000/getTodo", {
                headers: {
                    Authorization: token,
                }
            });
            console.log(response.data.todos);
            setTodos(response.data.todos)
        } catch (error) {
            console.log(error);
        }
    }

    async function completed(id) {
        alert("Gajab ")
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:3000/completedtodo/${id}`, {}, {
                headers: {
                    Authorization: token,
                }
            })
            setTodos(response.data.todos);
        } catch (error) {
            console.log(error)
        }
    }

    async function deletetodo(id) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.delete(`http://localhost:3000/deletetodo/${id}`, {
                headers: {
                    Authorization: token,
                }
            })
            setTodos(response.data.todos)
        } catch (error) {
            console.log(error)
        }
    }

    async function addTodo() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                "http://localhost:3000/addtodo",
                {
                    title: title,
                    description: description
                },
                {
                    headers: {
                        Authorization: token
                    }
                }
            );
            // alert("Todo added");
            setTodos(response.data.todos);
        } catch (error) {
            console.log(error);
        }
    }

    function logout() {
        localStorage.removeItem('token');
        navigate('/signin')
    }



    return (
        <div className='containertodo'>
            <div className='title'><h1>Add Todo</h1></div>
            <div class="max-w-sm mx-auto" >
                <div class="mb-5">


                    <input type="text" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter title" onChange={e => setTitle(e.target.value)} required />
                </div>
                <div class="mb-5">

                    <input type="text" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter description" onChange={e => setDescription(e.target.value)} />
                </div>

                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ width: "100%" }} onClick={addTodo}>Add Todo</button>
              
               
                

                <div className="todos">
                    {todos.map(function (todo) {
                        return (


                            <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-between'  , alignItems : 'center'}}>
                                <div>
                                    <h1>{todo.title}</h1>
                                    <h2>{todo.description}</h2></div>
                                {todo.completed ? (
                                    <button class="text-white bg-blue-700 hover:bg-blue-800   rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => deletetodo(todo._id)} style={{height:'50%',width:'30%'}}>Delete</button>
                                ) : (
                                    <button
                                    style={{height:'50%',width:'30%'}}
                                        onClick={() => completed(todo._id)}
                                        class="text-white bg-blue-700 hover:bg-blue-800   rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Done
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
                {/* 
       

        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ width: "100%" }} onClick={logout}>Logout</button> */}

            </div>

        </div>
        // <div>

        //    <div>
        //     <div>
        //         <h2>Add New Todo</h2>
        //         <input type="text" placeholder="Enter title" onChange={e => setTitle(e.target.value)}></input>
        //         <input type="text" placeholder="Enter description" onChange={e => setDescription(e.target.value)}></input>
        //         <button onClick={addTodo}>Add todo</button>
        //     </div>
        //     {todos.map(function(todo) {
        //         return (


        //             <div key={todo.id}>
        //                 <h1>{todo.title}</h1>
        //                 <h2>{todo.description}</h2>
        //                 {todo.completed ? (
        //                     <button style={{ color: "green" }} onClick={() => deletetodo(todo._id)}>Delete</button>
        //                 ) : (
        //                     <button
        //                         style={{ color: "red" }}
        //                         onClick={() => completed(todo._id)}
        //                     >
        //                         Mark as complete
        //                     </button>
        //                 )}
        //             </div>
        //         );
        //     })}
        //     <button onClick={logout}>Logout</button>
        // </div>
        // </div>

    )
}