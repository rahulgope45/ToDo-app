import React, { useState } from "react";



function Todoform(){

    const[inputvalue,envalue] = useState("")
    const[handlevalue,fvalue] = useState("")

    const handledinputvalue = (e) =>{
        envalue(e.target.value)
    }

    const saveinput = () =>{
        fvalue(inputvalue)
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
                <button >
                    {onclick = saveinput}
                    Add
                </button>
            </div>
            <div>
                
                <p>{handlevalue}</p>
            </div>
            

        </div>
    )
}

export default Todoform

