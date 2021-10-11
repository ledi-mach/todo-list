import React, { useState } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';

const TodoApp = () => {
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState([]);

    const handleChange = (e) => {
        setTask(e.target.value);
    }

    const AddTask = () => {
        if (task !== "") {
            const taskInfos = {
                id: Math.floor(Math.random() * 1000),
                value: task,
                isCompleted: false,
            }
            setTaskList([...taskList, taskInfos]);
        }
    };

    const deletetask = (e, id) => {
        e.preventDefault();
        setTaskList(taskList.filter((data) => data.id !== id));
    }

    const taskCompleted = (e, id) => {
        e.preventDefault();

        const element = taskList.findIndex((data) => data.id === id);
        console.log(element)

        const newTaskList = [...taskList];
        newTaskList[element] = {
            ...newTaskList[element],
            isCompleted: true,
        }

        setTaskList(newTaskList);
    }

    return (
        <div className='wrapper'>

            <h1 className="title">Lista de tarefas</h1> <br />
            <input
                type='text'
                className='text'
                name='text'
                id='text'
                onChange={(e) => handleChange(e)}
                placeholder='Digite nova tarefa'
            />
            <button
                className='add-btn'
                onClick={AddTask}
            > Add </button> <br />

            {taskList.length > 0 ?
                <div className='allTasks'>
                    <ul>
                        {taskList.map((data, id) => {
                            return <li className={data.isCompleted ? 'crossText' : 'listItem'}
                            key={id}>{data.value}
                                <div className='spanIcons'>
                                    <span className='completed'
                                        onClick={(e) => taskCompleted(e, data.id)}
                                    ><FaCheckCircle /></span>

                                    <span className='delete'
                                        onClick={(e) => deletetask(e, data.id)}
                                    ><BsTrashFill /></span>
                                </div>
                            </li>
                        })}
                    </ul> </div> : <p className='noTasks'>Sem tarefas no momento!</p>}
        </div>
    );

}
export default TodoApp;
