import React from 'react'

const TaskForm = ({name, onInputChange, createTask}) => {
    return (
        <form className='task-form' onSubmit={createTask}>
            <input type="text" placeholder='Add a Task' name='name' value={name} onChange={onInputChange} />
            <button type='submit'>Add</button>
        </form>
    )
}

export default TaskForm