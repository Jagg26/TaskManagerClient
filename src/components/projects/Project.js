import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Project = ({ project }) => {

    //Get State of selected project
    const projectsContext = useContext(projectContext);
    const { actualProject } = projectsContext;

    //Get State of selected tasks
    const tasksContext = useContext(taskContext);
    const { getTasks } = tasksContext;

    //Add to the new project 
    const selectProject = id => {
        actualProject(id); //Fix an actual project
        getTasks(id); //Filter tasks
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => selectProject(project._id) }
            >{project.name}</button>
        </li>
    );
}

export default Project;