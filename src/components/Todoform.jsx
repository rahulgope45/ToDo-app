import { text } from "@fortawesome/fontawesome-svg-core"
import React,{useState} from "react"

function Todoapp(){

    //setting up table

    const [activestate,setState] = useState('Tasks')
    const renderTable = ()=>{

    const [input,setInput] = useState("")
    const [striked,setStriked] =useState([])
    //button color
    const [clicked,setClicked] = useState(false)
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

    const filterratedtasks = ()=>{

    }

    switch(activestate){
        case 'Tasks':
            return <div className="Container-app">
            
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

        case 'Active-Tasks':
            return <div>
                <h2>Active Tasks</h2>
                <ol>
                    {striked.map((items,index)=>(
                        <li key={index}>
                            {items.text}
                        </li>
                    ))}
                </ol>
            </div>

        case 'Completed-Tasks':
            return <div>
                <h2>Completed Tasks</h2>
                 <ol>
                    {striked
                .filter(items => items.completed)  // only completed tasks
                .map((items, index) => (
                    <li key={index}>{items.text}</li>
                ))
            }

                </ol>
            </div>

        case 'Journal':
            return <div>
                <h2>Journal</h2>
            </div>

        default: 
        return null
        
    }


    }



    return(
        <><div className="heading"> 
                <h1>Taskify</h1>
            </div>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button onClick={() => setState('Tasks')}
            
            >Tasks</button>
            <button onClick={() => setState('Active-Tasks')}>Active-Tasks</button>
            <button onClick={() => setState('Completed-Tasks')}>Completed-Tasks</button>
            <button onClick={() => setState('Journal')}>Journal</button>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
            {renderTable()}
        </div>
        
        
        </>
    )

}

export default Todoapp

