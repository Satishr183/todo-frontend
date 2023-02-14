import React, {useState,useEffect} from 'react'
import axios from "axios"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
})

function TodoList() {

const [data,setData] = useState([])


const onDragEnd = (result) => {
  if (!result.destination) {
    return;
  }

  const reorderedItems = reorder(
    data,
    result.source.index,
    result.destination.index
  );

  console.log({ reorderedItems });
  setData(reorderedItems);
};

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

<DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {data.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className="card"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.title}
                      <button>edit</button>
                      <button onClick={()=> deletePost(item._id)}>delete</button>
                    </div>
                    
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className='left'style={{width:"50%", border:"2px solid black",padding:"20px",marginLeft:"10px"}}>
          RIGHT   
      </div>
    </div>
  )
}

export default TodoList