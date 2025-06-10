import { text } from "@fortawesome/fontawesome-svg-core"
import React,{useState} from "react"

function Todoapp(){

    //setting up table

    const [activestate,setState] = useState('')
    const renderTable = ()=>{
        
    }


    const [input,setInput] = useState("")
    const [striked,setStriked] =useState([])
    function HandleInput(){
        // const newInput = document.getElementById("Tasks").value
        // document.getElementById("Tasks").value = "" //

        
        

    }

    const saveInput =()=>{
        if(input.trim() !== ""){
            setStriked([...striked,{text: input , completed : false}])
            // setInput(i => [...i,newInput])
            setInput("") //
        }
    }

    function deleteInputs(index){
        setStriked(striked.filter((_,i) => i !== index))  
    }

    const toogleinput = (index)=>{
        const updateToogle = [...striked]
        updateToogle[index].completed = !updateToogle[index].completed
        setStriked(updateToogle)


    }


    // using switch case here to make tabs

    


   



    return(
        <>
        <div className="Container-app">
            <div className="heading"> 
                <h1>Taskify</h1>
            </div>
            <div className="Task-container">
                <input type="text" value={input}
                    onChange={(e) => setInput(e.target.value)}
                       placeholder=" Enter Your task"/>
                    <button onClick={saveInput}>Add</button>
            </div>
            <div>
                <ol >
                    {striked.map((items,index) => (
                    <li key={index} 
                    style={{textDecoration : items.completed ? "line-through" : "none",}}
                    
                    >{items.text}

                    <input type="radio"
                name={`completed-${index}`}
                onClick={() => toogleinput(index)}
                style={{accentColor : striked[index].completed ? "red"  : "green",
                    backgroundColor: striked[index].completed ? "red"  : "green",
                }}
                />
                     
                    <button onClick={() =>deleteInputs(index)}>
                        Delete
                        </button>
                        </li>)) }
                        
                </ol>

            </div>

        </div>
        
        </>
    )

}

export default Todoapp

