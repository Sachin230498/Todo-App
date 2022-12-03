import React from 'react'
import { useState,useEffect } from 'react'
import "./style.css"

const getLocalData = () => {
  const lists = localStorage.getItem("mytodoist")
  if(lists){
    return JSON.parse(lists)
  }
  else{
    return ("");
  }
}

//show Item
const Todo = () => {
  const [inputdata,setInputData] = useState("")
  const [item, setItem] = useState(getLocalData())
  const [isEditItem, setIsEditItem] = useState("")
  const [togglebutton, setToggleButton] = useState(false)

//add the item function
  const addItem = () => {
    if(!inputdata){
      alert("plz fill the data")
    }else if (inputdata && togglebutton){
       setItem(
        item.map((curElem) => {
          if (curElem.id === isEditItem){
          return {... curElem, name: inputdata}
          };
          return curElem;
        })
       );
       setInputData("");
       setIsEditItem(null);
       setToggleButton(false);
    }
    else{
       const myNewInputData = {
        id: new Date().getTime().toString(),
        name:inputdata
       }
      setItem([...item, myNewInputData])
      setInputData("")
    }
  }


//edit the items
const editItem = (index) => {
  const item_todo_edited = item.find((curElem) => {
    return curElem.id === index;
  })
  setInputData(item_todo_edited.name)
  setIsEditItem(index)
  setToggleButton(true)
}


//how to delete
const deleteItem = (index) => {
  const updatedItem = item.filter((curElem) => {
    return curElem.id !== index;
  })
  setItem(updatedItem)
}

//remove all the elements
const removeAll = () =>{
  return setItem([])
}

//add in ls
useEffect(() => {
localStorage.setItem("mytodoist", JSON.stringify(item))
}, [item])


  return (
    <div>
      <div className='main-div'>
         <div className='child-div'>
          <figure>
            <img src="./images/todo.svg" alt="todo-logo" />
            <figcaption>Add Your Task Here</figcaption>
          </figure>
          <div className='addItems'>
            <input
              type="text"
              placeholder="✍ Add Item"
             className="form-control"
            value={inputdata}
           onChange={(event) => 
            setInputData(event.target.value)}
             />
             {togglebutton ? (
               <i className="fa fa-edit add-btn" onClick={addItem}></i> 
             ):( 
             <i className="fa fa-plus add-btn" onClick={addItem}></i> 
             )}

          </div>
           {/* show the item */}                
              <div className='showItems'>
                     {item.map((curElem, index) => {
                      return (     
                        <div className='eachItem' key={curElem.id}>
                          <h3>{curElem.name}</h3>
                          <div className='todo-btn'>
                           <i className="far fa-edit add-btn"
                           onClick={() => editItem(curElem.id)}></i>


                           <i className="far fa-trash-alt add-btn" 
                              onClick={()=> {deleteItem(curElem.id)}}></i>
                    
                          </div>
                        </div>
                      )
                     })}
              </div>
                

                {/* Remove all button */}
                 <div className='showItems'>
                 <button className='btn effect04' data-sm-link-text="Remove All"
                 onClick={removeAll}>
                <span> CHECK LIST</span> 
                 </button>
                 </div>
         </div>
      </div>
    </div>
  )
}

export default Todo
