import React from 'react'
import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa"

const Task = ({ taskData, index, deleteTask, getSingleTask , taskCompleted}) => {
    return (
        <div className={taskData.completed ? "task completed" : "task"}>
            <p><b>{index + 1}.</b> <span>{taskData.name}</span></p>
            <div className="task-icons">
                <FaCheckDouble onClick={() => taskCompleted(taskData)} />
                <FaEdit onClick={() => getSingleTask(taskData._id)} />
                <FaRegTrashAlt onClick={() => deleteTask(taskData._id)} />
            </div>
        </div>
    )
}

export default Task