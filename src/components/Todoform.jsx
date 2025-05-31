import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useState } from "react";



function Todoform(){

    const[inputvalue,envalue] = useState("") //for tracking input
    const[handlevalue,fvalue] = useState([]) //for saving the input
                                             //saving it in a array



    const handledinputvalue = (e) =>{
        envalue(e.target.value)
    }

    const saveinput = () =>{
        if(inputvalue.trim() !== ""){
            fvalue([...handlevalue,{text : inputvalue,completed:false}])
            envalue("")
        }
    }

    //deleting the task one at a time

    const inputDelete = (deletehandle) =>{

        const deletelist = handlevalue.filter((_,index) => index !== deletehandle)
        fvalue(deletelist)
        
    }
  

    //adding slect feature that will make completed task lin through task
    const toggleinput = (index) =>{

        const updatetoggle = [...handlevalue]
        updatetoggle[index].completed = !updatetoggle[index].completed
        fvalue(updatetoggle)

    }



    return (
        <div className="Containerofbox">
            <div className="boxofcontainer">
                <h1 className="headingofcontainer">Add Your Tasks </h1>
            </div>
            <div>
                <input
                type="text"
                placeholder="Add Your Task"
                value={inputvalue}
                onChange={handledinputvalue}>
                </input>
                <button onClick = {saveinput}>
                    
                    Add
                </button>
            </div>
            <div>
                {handlevalue.map((item,index)=>(
                    
                    <p key={index}

                    style={{textDecoration : item.completed ? "line-through" : "none"}}
                    
                    >
                        *{item.text}

                    <input type="radio"
                    name={`completed-${index}`}
                    onClick={() => toggleinput(index)}
                    
                    >

                    </input>
                    <button onClick={() => inputDelete(index)}> 
                        
                        ❌
                        </button>
                        
                    </p>
                    
                ))}
                
                
               
            </div>
            

        </div>
    )
}

export default Todoform

