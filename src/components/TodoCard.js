import React from "react";
import './Todo.css'
import { Link , useNavigate} from "react-router-dom";
const TodoCard=(props)=>{
    const navigate=useNavigate();
    
    const helper=()=>{
        props.display("block");
        props.toBeupdate(props.updateId)
    }
    return(
        <div className="p-3 todo-card">
            <div>
                <h5>{props.title}</h5>
                <p className="todo-card-p">
                    {props.body}
                
                </p>
                <div className="d-flex justify-content-between">
                <button className="home-btn card-btn px-2 py-1" onClick={helper}>Update</button>
                <button className="home-btn card-btn px-2 py-1" onClick={()=>{props.delid(props.id);}}>Delete</button>
                </div>
            </div>
        </div>
    )
}
export default TodoCard