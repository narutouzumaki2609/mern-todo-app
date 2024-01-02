import React, { useEffect } from 'react'
import { useState } from 'react'
import "./Todo.css"
import axios from 'axios'
const Update = (props) => {
    
    // const id=sessionStorage.getItem('id');
    const [Inputs, setInputs] = useState({ title: props.update.title, body:props.update.body })
    const Change = (e) => {
        setInputs({ ...Inputs, [e.target.name]: e.target.value })
    }
    const Submit=async ()=>{
        try{
        const response=await axios.put(`http://localhost:4000/api/v2/updateTask/${props.update._id}`);
        console.log(response)
        props.display("none");
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        setInputs({
            title:props.update.title,
            body:props.update.body
        })
    },[Submit])
    return (
        <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
            <h3>Update your task</h3>
            <input type='text' className='todo-inputs my-4 w-100 p-3' name='title' value={Inputs.title} onChange={Change}/>
            <textarea className='todo-inputs w-100 p-3' name='body' value={Inputs.body} onChange={Change} />
            <div className='d-flex p-1'>
            <button className='btn btn-dark my-4' onClick={Submit}>Update</button>
            <button className='btn btn-danger my-4 mx-3' onClick={()=>{props.display("none")}}>close</button>
            </div>
        </div>

    )
}

export default Update
