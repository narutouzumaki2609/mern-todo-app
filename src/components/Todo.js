import React, { useEffect, useState } from "react";
import './Todo.css'
import TodoCard from "./TodoCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Update from "./Update";

let UpdateArray=[]
const Todo = () => {
    const id = sessionStorage.getItem('id')
    const [Inputs, setInputs] = useState({ title: "", body: "" })
    const [Array, setArray] = useState([])
    const show = () => {
        document.getElementById("textarea").style.display = 'block';
    }

    const change = (e) => {
        setInputs({ ...Inputs, [e.target.name]: e.target.value })
    }
    const Submit = async () => {
        if (Inputs.title === "" || Inputs.body === "") {
            toast.error("title or body can't be empty")
        }
        else {
            if (id) {

                const response = await axios.post('http://localhost:4000/api/v2/addTask', {
                    title: Inputs.title,
                    body: Inputs.body,
                    id: id,
                });
                console.log(Inputs)
                // setArray([...Array,Inputs]);
                setInputs({ title: "", body: "" })
                toast.success("Your task is added")

            }
            else {
                setArray([...Array, Inputs]);
                console.log(Array)
                setInputs({ title: "", body: "" })
                toast.success("Your task is added")
                toast.error("Your task is added but not saved! please  SignUp")

            }
        }

    }
    useEffect(() => {
        const fetch = async () => {
            try {
                console.log(id)
                const response = await axios.get(`http://localhost:4000/api/v2/getTask/${id}`);
                // console.log(response.data.list)
                setArray(response.data.list)
            }
            catch (err) {
                console.log(err)
            }
        }
        if (id) {
            fetch();
        }
        else {
            toast.error("SignUp First!!")
        }
    }, [Submit])

    const del = async (cardid) => {
        if (id) {
            try {
                console.log(cardid)
                const delet = await axios.delete(`http://localhost:4000/api/v2/deleteTask/${cardid}`, { data: { id: id } })
                // console.log(delet)
                toast.success("Your task is Deleted.")

            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            toast.error("SignUp First!!")
        }
        // Array.splice(id, 1);
        // setArray([...Array]);

    }
    const dis = (value) => {
        console.log(value)
        document.getElementById("todo-update").style.display = value;
    }
    const update=(value)=>{
        // console.log(Array[value])
        UpdateArray=Array[value]
    }
    return (
        <>
            <div className="todo">
                <ToastContainer />
                <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
                    <div className="d-flex flex-column todo-inputs-div w-50 p-1">
                        <input
                            type="text"
                            placeholder="Title"
                            className="my-2 p-2 todo-inputs"
                            name="title"
                            value={Inputs.title}
                            onClick={show}
                            onChange={change}
                        />
                        <textarea
                            id="textarea"
                            type="text"
                            placeholder="Body"
                            name="body"
                            value={Inputs.body}
                            onChange={change}
                            className="p-2 todo-inputs"
                        />
                    </div>
                    <div className="w-50 d-flex justify-content-end my-3">
                        <button className="home-btn px-2 py-1" onClick={Submit}>Add</button>
                    </div>

                </div>
                <div className="todo-body">
                    <div className="container-fluid">
                        <div className="row">
                            {Array &&
                                Array.map((item, index) => (
                                    <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                                        <TodoCard title={item.title} body={item.body} id={item._id} delid={del} updateId={index} display={dis} toBeupdate={update}/>

                                    </div>

                                ))}

                        </div>
                    </div>
                </div>
            </div>
            <div className="todo-update" id="todo-update">
                <div className="container update">
                    <Update display={dis} update={UpdateArray}/>
                </div>
            </div>
        </>
    )
}

export default Todo