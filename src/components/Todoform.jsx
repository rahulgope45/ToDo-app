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
            fvalue([...handlevalue,inputvalue])
            envalue("")
        }
    }

    //deleting the task one at a time

    const inputDelete = (deletehandle) =>{

        const deletelist = handlevalue.filter((_,index) => index !== deletehandle)
        fvalue(deletelist)
        
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
                    
                    <p key={index}>*{item}
                    <button onClick={() => inputDelete(index)}> 
                        
                        ❌
                        </button>
                        <input type="radio"></input>
                    </p>
                    
                ))}
                
                
               
            </div>
            

        </div>
    )
}

export default Todoform

