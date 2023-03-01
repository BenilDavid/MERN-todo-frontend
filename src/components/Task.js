import React from 'react'
import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa"

const Task = ({taskData, index}) => {
    return (
        <div className='task'>
            <p><b>{index + 1}.</b> {taskData.name}</p>
            <div className="task-icons">
                <FaCheckDouble />
                <FaEdit />
                <FaRegTrashAlt />
            </div>
        </div>
    )
}

export default Task