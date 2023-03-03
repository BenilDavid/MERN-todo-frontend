import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Task from './Task'
import TaskForm from './TaskForm'
import axios from 'axios';
import { URL } from '../App';

const TaskList = () => {
    const [formData, setFormData] = useState({
        name: "",
        completed: false
    })
    const [allTask, setAllTask] = useState([]);
    const [isEditting, setIsEditting] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [completedTasks, setCompletedTasks] = useState(0);
    const { name } = formData;

    useEffect(() => {
        getAllTask();
    }, [])

    useEffect(() => {
        const completed = allTask.filter((task) => {
            return task.completed === true
        })
        setCompletedTasks(completed.length)
    }, [allTask])

    const onInputChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value })
    }

    // get all task
    const getAllTask = async () => {
        try {
            const { data } = await axios.get(`${URL}/api/tasks`);
            // console.log(data);
            setAllTask(data);
        } catch (error) {
            toast.error(error.message)
        }
    }

    // create a task
    const createTask = async (e) => {
        e.preventDefault();
        // console.log(formData);
        if (name === "") {
            toast.error("please add a task");
        }
        try {
            await axios.post(`${URL}/api/tasks`, formData);
            setFormData({ ...formData, name: "" });
            toast.success("task added sucessfully");
            getAllTask();
        } catch (error) {
            toast.error(error.message);
        }
    }

    // delete a task
    const deleteTask = async (id) => {
        try {
            await axios.delete(`${URL}/api/tasks/${id}`);
            toast.success("task removed sucessfully");
            getAllTask();
        } catch (error) {
            toast.error(error.message);
        }
    }

    // get single task
    const getSingleTask = async (id) => {
        try {
            const { data } = await axios.get(`${URL}/api/tasks/${id}`);
            // toast.success("edit task sucessfully");
            setIsEditting(true);
            setTaskId(data._id)
            setFormData({ ...formData, name: data.name });
            // console.log('single task', data);
            getAllTask();
        } catch (error) {
            toast.error(error.message);
        }
    }

    // edit task
    const editTask = async (e) => {
        e.preventDefault();
        // console.log(formData);
        if (name === "") {
            toast.error("please choose a task");
        }
        try {
            await axios.put(`${URL}/api/tasks/${taskId}`, formData);
            toast.success("edited task sucessfully");
            setFormData({ ...formData, name: "" });
            setIsEditting(false);
            getAllTask();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const taskCompleted = async (task) => {
        const newFormData = {
            name: task.name,
            completed: !(task.completed)
        }
        try {
            await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
            getAllTask();
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div>
            <h3>Task Manager</h3>
            <TaskForm onInputChange={onInputChange} name={name} createTask={createTask} editTask={editTask} isEditting={isEditting} />
            <div className='--flex-between -pb'>
                <p><b>Total Tasks:</b> {allTask.length}</p>
                <p><b>Completed Tasks:</b> {completedTasks}</p>
            </div>
            <hr />
            {allTask.map((data, index) => {
                return <Task key={data._id} taskData={data} index={index} deleteTask={deleteTask} getSingleTask={getSingleTask} taskCompleted={taskCompleted} />
            })}
        </div>
    )
}

export default TaskList