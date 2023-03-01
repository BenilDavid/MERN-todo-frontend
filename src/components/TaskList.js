import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Task from './Task'
import TaskForm from './TaskForm'
import axios from 'axios';
import {URL} from '../App';

const TaskList = () => {
    const [formData, setFormData] = useState({
        name: "",
        completed: false
    })
    const [allTask, setAllTask] = useState([]);

    const { name } = formData;

useEffect(() => {
    getAllTask();
}, [])

    const onInputChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value })
    }

// get all task
const getAllTask = async () => {
try {
    const { data } = await axios.get(`${URL}/api/tasks`);
    console.log(data);
    setAllTask(data);
} catch (error) {
    toast.error(error.message)
}
}
    // create a task
    const createTask = async (e) => {
        e.preventDefault();
        console.log(formData);
        if(name === ""){
            toast.error("please add a task");
        }
        try {
            await axios.post(`${URL}/api/tasks`, formData);
            setFormData({...formData, name: ""});
            toast.success("task added sucessfully");
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div>
            <h3>Task Manager</h3>
            <TaskForm onInputChange={onInputChange} name={name} createTask={createTask} />
            <div className='--flex-between -pb'>
                <p><b>Total Tasks:</b> 0</p>
                <p><b>Completed Tasks:</b> 0</p>
            </div>
            <hr />
            {allTask.map((data, index) => {
                return <Task key={index} taskData={data} index={index} />
            })}
        </div>
    )
}

export default TaskList