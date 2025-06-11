import { text } from "@fortawesome/fontawesome-svg-core"
import React,{useState,useEffect} from "react"
import { motion,AnimatePresence } from "framer-motion";

function Todoapp(){
     const [input,setInput] = useState("")
    const [striked,setStriked] =useState(()=>{
        const savedTasks =localStorage.getItem("Tasks")
        return savedTasks ? JSON.parse(savedTasks) : [] 
        })
    //Junrol dates
    const [jdateY,setJdateY] =useState(new Date().getFullYear())
    const [jdateD,setJdateD] =useState(new Date().getDate())
    const [jDateM,setJdateM] =useState(new Date().getMonth())
    const [jdateT,setJdateT] =useState(new Date().toLocaleTimeString())

    const [journal,setJounral] =useState("")
    const [jounralEnteries,setEnteries] = useState(() => {
        const savedJounral = localStorage.getItem("JTasks")
        return savedJounral ? JSON.parse(savedJounral) : []
    })

    const completedTasks = striked.filter((item) => item.completed).length;

    //unnessary animation

    const [expandindex,setexpandIn] = useState(null)
    const toggleExpand =(i) =>{
                                setexpandIn(expandindex ===i ? null:i)
                            }


   

    // //reading storage
    // useEffect(()=>{
    //     const savedTasks = JSON.parse(localStorage.getItem("Tasks"))
    //     if(savedTasks){
    //         setStriked(savedTasks)
    //     }
    // },[])

     //storing
    useEffect(() =>{
        localStorage.setItem("Tasks",JSON.stringify(striked))
    },[striked])

    useEffect(() =>{
        localStorage.setItem("JTasks",JSON.stringify(jounralEnteries))
    },[jounralEnteries])




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
                    <motion.li 
                    key={index} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
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
                        </motion.li>)) }
                        
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
                        {jounralEnteries.map((entry,index) =>(



                    <motion.li
      layout
      initial={{ borderRadius: 10 }}
      key={index}
      className="diary-entry"
      onClick={() => toggleExpand(index)}
      style={{ cursor: "pointer" }}
    >
      <strong>Date:</strong> {entry.WaqtDa}/{entry.WaqtM}/{entry.WaqtY}
      <br />
      <strong>Day:</strong> {entry.WaqtDay}
      <br />
      <strong>Time:</strong> {entry.Waqt}
      <br />

      <AnimatePresence initial={false}>
        {expandindex === index && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden", marginTop: "0.5rem" }}
          >
            <p>{entry.text}</p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent toggle
                deleteJ(index);
              }}
            >
              Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
                        ))}
                            
                            
                            
                        
                    
                           
                                
                            

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
         <div style={{ display: 'flex', marginBottom: '1rem' }} className="Button-container">
            <motion.button whileHover={{ scale: 1.1 }}
                         whileTap={{ scale: 0.95 }}
            onClick={() => setState('Tasks')}
            className="Button-class"
            
            
            >Tasks</motion.button>
            <motion.button whileHover={{ scale: 1.1 }}
                           whileTap={{ scale: 0.95 }}
            onClick={() => setState('Active-Tasks')}
            className="Button-class"
            >Active-Tasks</motion.button>
            <motion.button whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }} 
            onClick={() => setState('Completed-Tasks')}
            className="Button-class"
            >Completed-Tasks</motion.button>
            <motion.button whileHover={{ scale: 1.1 }}
                           whileTap={{ scale: 0.95 }}
            onClick={() => setState('Journal')}
            className="Button-class"
            >Journal</motion.button>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc' }} className="render-table">
            {renderTable()}
        </div>
        {/* Footer */}
        <div style={{ padding: '1rem', border: '1px solid #ccc' }} className="footer-container">
            <h2 className="fotter-one">Tasks: {striked.length}</h2>
           <h2 className="fotter-two">Completed Tasks: {completedTasks}</h2>

        </div>
        </div>
       
        
        
        </>
    )

}

export default Todoapp

