import { useState } from "react"

// these onAdd and onDelete props are passed using the prop drilling
export default function NewTask({onAdd}){
    const [enteredTask,setEnteredTask] = useState('');

    function handleChange(event){
        setEnteredTask(event.target.value);
    }

    function handleClick(){
        if(enteredTask.trim() === ''){
            return;
        }
        onAdd(enteredTask);
        setEnteredTask('');
    }
    
    return <div className="flex items-center gap-4">
        <input type="text" className="w-64 px-4 py-1 rounded-sm bg-stone-200" onChange={handleChange} value={enteredTask}/>
        {/* so here the button will send the task entered to the app component */}
        <button  className="text-stone-700 hover:text-stone-950" onClick={handleClick}>Add Task</button>
    </div>
}