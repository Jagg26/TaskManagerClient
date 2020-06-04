import React, { Fragment, useContext } from 'react';
import Task from './Task';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const TasksList = () => {

    //Get State of selected project
    const projectsContext = useContext(projectContext);
    const { project, deleteProject } = projectsContext;

    //Get State of selected tasks
    const tasksContext = useContext(taskContext);
    const { projectTasks } = tasksContext;

    //If there´s no selected project
    if (!project) return <h2>Select a Project</h2>

    //Array destructuring
    const [actualProject] = project;

    //Delete Project
    const onClickDelete = () => {
        deleteProject(actualProject._id)
    }

    return (
        <Fragment>
            <h2>Project: {actualProject.name}</h2>

            <ul className="listado-tareas">
                {projectTasks.length === 0
                    ? (<li className="tarea"><p>You don't have any tasks yet</p></li>)

                    :
                    <TransitionGroup>
                        {projectTasks.map(task => (
                            <CSSTransition
                                key={task.id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Task
                                    task={task}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickDelete}
            >Delete Project  &times;</button>
        </Fragment>
    );
}

export default TasksList;