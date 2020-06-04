import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {

    //Get State of the form
    const projectsContext = useContext(projectContext);
    const { form, formerror, showForm, addProject, showError } = projectsContext;

    //State
    const [project, setProject] = useState({
        name: ''
    });

    // Destructuring
    const { name } = project;

    //onChange
    const onChangeProject = e => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    //onSubmit
    const onSubmitProject = e => {
        e.preventDefault();

        //Validation
        if(name === ''){
            showError();
            return;
        } 

        //Add to the State
        addProject(project);

        //Reset Form
        setProject({
            name:''
        })
    }


    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={ () => showForm() }
            >New Project</button>

            { form
                    ? (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProject}
                        >
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Project Name"
                                name="name"
                                value={name}
                                onChange={onChangeProject}
                            />

                            <input
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Add New Project"
                            />

                        </form>
                    ) : null }

                {formerror ? <p className="mensaje error">Project Name is required</p> : null}
        </Fragment>
    );
}

export default NewProject;