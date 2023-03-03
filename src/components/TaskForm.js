import React from 'react'

const TaskForm = ({name, onInputChange, createTask, isEditting, editTask}) => {
    return (
        <form className='task-form' onSubmit={isEditting === true ? editTask : createTask}>
            <input type="text" placeholder='Add a Task' name='name' value={name} onChange={onInputChange} />
            <button type='submit'>{isEditting === true ? "Edit" : "Add"}</button>
        </form>
    )
}

export default TaskForm