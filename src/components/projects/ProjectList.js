import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import AlertContext from '../../context/alerts/alertContext';

const ProjectList = () => {

    //Get State of the projects list
    const projectsContext = useContext(projectContext);
    const { message, projects, getProjects } = projectsContext;

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    //Get Projects when components load
    useEffect(() => {

        //In case of Error
        if(message) {
            showAlert(message.msg, message.category);
        }

        getProjects();
    // eslint-disable-next-line
    }, [message]);

    //Check if Projects has content
    if (projects.length === 0) return <p>You don't have projects. Start creating a new one</p>;

    return (

        <ul className="listado-proyectos">

    {alert ? ( <div className={`alerta ${alert.category}`}>{alert.msg}</div> ) : null}

            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Project

                            project={project}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default ProjectList;