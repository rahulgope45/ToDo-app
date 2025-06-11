import { text } from "@fortawesome/fontawesome-svg-core"
import React,{useState} from "react"

function Todoapp(){
     const [input,setInput] = useState("")
    const [striked,setStriked] =useState([])
    //Junrol dates
    const [jdateY,setJdateY] =useState(new Date().getFullYear())
    const [jdateD,setJdateD] =useState(new Date().getDate())
    const [jDateM,setJdateM] =useState(new Date().getMonth())
    const [jdateT,setJdateT] =useState(new Date().toLocaleTimeString())

    const [journal,setJounral] =useState("")
    const [jounralEnteries,setEnteries] = useState([])

    const completedTasks = striked.filter((item) => item.completed).length;

    //setting up table

    const [activestate,setState] = useState('Tasks')
    const renderTable = ()=>{

   
     //footer
    
    
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

    //Jounral Part
    const saveJounral =() =>{
        if(journal.trim() !== ""){
            const waqtYear = new Date().toLocaleTimeString()
            const waqtdate =new Date().getDate()
            const waqtMonth = new Date().getMonth()
            const waqtSaal = new Date().getFullYear()
            const waqtDay = new Date().toLocaleDateString("en-US", { weekday: "long" })
            setEnteries([...jounralEnteries,{text :journal,Waqt : waqtYear,WaqtDa: waqtdate ,WaqtM:waqtMonth,WaqtY:waqtSaal,WaqtDay:waqtDay}])
            setJounral("")

        }
    }
    //delete Journal
    function deleteJ  (index){
        setEnteries(jounralEnteries.filter((_,i)=> i !== index))

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
                <p>Date: {jdateD}/{jDateM}/{jdateY}</p>
                <p>Time: {jdateT}</p>
                <div>
                    <textarea placeholder="Dear Diary..." className="diary-textarea" value={journal}
                     onChange={(e) => setJounral(e.target.value)}/>
                    <br/>
                    <button onClick={saveJounral}>Add</button>
                    
                    <ol>
                        {jounralEnteries.map((entry,index) =>
                            (<li key={index} className="diary-entry">
                                Date: {entry.WaqtDa}/{entry.WaqtM}/{entry.WaqtY}<br/>
                                Day:{entry.WaqtDay}<br/>
                                Time: {entry.Waqt}<br/>
                                <br/>
                                {entry.text}
                                <br/>
                                <button onClick={() =>deleteJ(index)} >Delete</button>
                            </li>))}
                           
                                
                            

                    </ol>
                

                </div>
                
            </div>

        default: 
        return null
        
    }


    }



    return(
        <><div className="container-box">
             <div className="heading"> 
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
        {/* Footer */}
        <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
            <p>Tasks: {striked.length}</p>
           <p>Completed Tasks: {completedTasks}</p>

        </div>
        </div>
       
        
        
        </>
    )

}

export default Todoapp

