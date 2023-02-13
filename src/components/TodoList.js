import React, {useState,useEffect} from 'react'
import axios from "axios"

function TodoList() {

const [data,setData] = useState([])

useEffect(()=>{
 axios.get('http://localhost:4000/getTodos').then(res=> setData(res.data.data))
 .catch(err=>console.log(err))
},[])

const deletePost = (id) => {
  axios.delete(`http://localhost:4000/deleteTodo/${id}`)
  .then(res=>console.log(res))
  .catch(err=>console.log(err.message))

  window.location.reload()
}
// console.log(data)
  return (
    <div style={{display:"flex",padding:"20px"}}>
      
      <div className='left' style={{width:"50%", border:"2px solid blue",padding:"20px",marginRight:"10px"}}>
        {data.map((item,index)=>{
          return (
            <div style={{width:"35%",margin:"1rem auto",border:"2px solid red",padding:"10px"}} key={index}>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <p>{item.option}</p>
            <button>edit</button>
            <button onClick={()=> deletePost(item._id)}>delete</button>
          </div>
          )
        })}
          
      </div>
      <div className='left'style={{width:"50%", border:"2px solid black",padding:"20px",marginLeft:"10px"}}>
          RIGHT   
      </div>
    </div>
  )
}

export default TodoList