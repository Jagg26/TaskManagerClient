import React, { useContext, useState, useEffect } from 'react';

import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const FormTask = () => {

    //Get if project is active
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    //Get State of selected tasks
    const tasksContext = useContext(taskContext);
    const { addTask, taskError, selectedTask, validateTask, getTasks, 
            updateTask ,cleanTask } = tasksContext;

    // Effect 
    useEffect(() => {
        if (selectedTask !== null) {
            setTask(selectedTask)
        } else {
            setTask({
                name: ''
            })
        }
    }, [selectedTask, getTasks]);

    //Form's State
    const [task, setTask] = useState({
        name: ''
    });

    //Extract project name
    const { name } = task;

    //If there´s no selected project
    if (!project) return null;

    //Array destructuring
    const [actualProject] = project;

    //Read form's values
    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    //onSubmit
    const onSubmit = e => {
        e.preventDefault();

        //Validate
        if (name.trim() === '') {
            validateTask();
            return;
        }

        //Check if it's edit or add
        if (selectedTask === null) {
            //New task
            task.project = actualProject._id;
            addTask(task);
        } else {
            //Update existing task
            updateTask(task);

            //Clean selected Task form the State
            cleanTask();
        }

        //Get Tasks and Filter
        getTasks(actualProject.id);

        //Reset Form
        setTask({
            name: ''
        })


    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Task name..."
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={selectedTask ? 'Edit Task' : "Add Task"}
                    />
                </div>
            </form>

            {taskError ? <p className="mensaje error">Task name is required</p> : null}
        </div>
    );
}

export default FormTask;