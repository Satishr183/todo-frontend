import React, {useState} from 'react'
import "./styles.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Todo() {
  const navigate = useNavigate()

  const [post,setPost] =useState({
    title:"",
    description:'',
    option:[0].value
})

const handleChange=(e)=>{
  const {name,value}=e.target
 setPost((prev)=>{
  return {
      ...prev,
      [name]:value
 }
 })
 console.log(post)
}

const handleSubmit = async(e)=>{
  e.preventDefault()
  let response = await axios.post('http://localhost:4000/createTodo',post)
  navigate("todo-list")
  console.log(response.data)
}
  return (
    <div>
      <h1>Todo</h1>
      <form >
        <input className="input__box" name='title' type="text" value={post.title} onChange={handleChange} placeholder="Enter Title" /><br />
        <input className="input__box" name='description' type="text" value={post.description} onChange={handleChange} placeholder="Enter Description" /><br />
        <select name="option" value={post.option} onChange={handleChange}><br />
        {/* <option value="">--Todo State--</option> */}
      {["Open","In-Progress","Completed"].map((items,index)=>{
       return <option value={items} key={index}>{ items }</option>
      })}
        </select><br /><br />
        <button onClick={handleSubmit} type="submit" className="input-submit">
        GO
      </button>
      </form>
    </div>
  )
}

export default Todo