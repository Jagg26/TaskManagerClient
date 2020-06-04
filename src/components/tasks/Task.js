import React, { useContext } from 'react';

import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Task = ({ task }) => {

    //Get State of selected project
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    //Get State of selected tasks
    const tasksContext = useContext(taskContext);
    const { deleteTask, getTasks, updateTask, setActualTask } = tasksContext;


    //Extract Actual Project
    const [actualProject] = project;

    //Function for delete
    const taskDelete = id => {
        deleteTask(id, actualProject._id);

        getTasks(actualProject.id);
    }

    //Task Status Function
    const changeStatus = task => {
        if(task.status) {
            task.status = false;
         
        } else {
            task.status = true;
        }
        updateTask(task);
    }

    //Add an actual task to edition
    const selectTask = task => {
        setActualTask(task);
    }

    return (
        <li className="tarea sombra">
            <p>{task.name}</p>

            <div className="estado">
                {task.status
                    ?
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => changeStatus(task)}
                        >Complete</button>
                    )
                    :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => changeStatus(task)}
                        >Incomplete</button>
                    )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => selectTask(task)}
                >Edit</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => taskDelete(task._id)}
                >Delete</button>
            </div>
        </li>
    );
}

export default Task;