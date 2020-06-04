import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';

import {
    TASKS_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    ACTUAL_TASK,
    UPDATE_TASK,
    CLEAN_TASK
} from '../../types';
import axiosClient from '../../config/axios';

const TaskState = props => {
    const initialState = {
        projectTasks: [],
        taskError: false,
        selectedTask: null
    }

    // Create dispatch and State
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    //Create Functions


    //Tasks of a specific project
    const getTasks = async project => {

        console.log(project);

        try {
            const result = await axiosClient.get('/api/tasks', { params: { project }});
            console.log(result);
            dispatch({
                type: TASKS_PROJECT,
                payload: result.data.tasks
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Add new task to selected project
    const addTask = async task => {
        console.log(task);
        try {
            const result = await axiosClient.post('/api/tasks', task);
            console.log(result);
            dispatch({
                type: ADD_TASK,
                payload: task
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Task Form Error
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }

    //Delete tasks by ID
    const deleteTask = async (id, project) => {
        try {
            await axiosClient.delete(`/api/tasks/${id}`, { params: { project } });
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Update Task
    const updateTask = async task => {
        try {
            const result = await axiosClient.put(`/api/tasks/${task._id}`, task);
            dispatch({
                type: UPDATE_TASK,
                payload: result.data.task
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Select Task for edition
    const setActualTask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        })
    }

    //Clean Task
    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        })
    }

    return (
        <TaskContext.Provider
            value={{
                projectTasks: state.projectTasks,
                taskError: state.taskError,
                selectedTask: state.selectedTask,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                setActualTask,
                updateTask,
                cleanTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );
}

export default TaskState;