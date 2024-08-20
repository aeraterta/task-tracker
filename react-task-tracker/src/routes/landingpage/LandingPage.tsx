import React, { FC, ChangeEvent, useEffect, useState } from "react";
import "./LandingPage.css";
import TodoTask from '../../components/TodoTask';
import { ITask } from '../../components/Interfaces';

import Axios from 'axios'
import NavigationComponent from '../../components/NavigationComponent';

const host = process.env.BACKEND_HOST || 'localhost';
const port = process.env.BACKEND_PORT || 5000;
let baseURL = `http://${host}:${port}/api`


const LandingPage: FC = () => {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState("");
  const [todoList, setTodoList] = useState<ITask[]>([]);

  useEffect(() => {
    document.title = "Task Tracker App"
  }, [])

  useEffect(() => {
    Axios.get(`${baseURL}/todo`)
    .then (res => {
      console.log("Fetching data: ");
      setTodoList(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(event.target.value);
    }
  };

  const checkBoxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    Axios.put(`${baseURL}/todo/${event.target.id}`)
    .then (res => {
      const newItems = todoList.map(todoList => {
        if (Number(event.target.id) === todoList.id) {
          let stat = !todoList.isdone;
          return { ...todoList, isdone: stat, tstamp: res.data}
        }
        return todoList;
      });
      setTodoList(newItems);
    }).catch(err => {
      console.log(err);
    })

  };

  const addTask = async () => {
    if (task === ""){
      console.log("Error: Empty task name!")  
      alert("Error: Empty task name!");
    }else{
      if (new Date(deadline) < new Date()) {
        alert("Error: Cannot set passed date!");
      }else {
        const newTask = { taskname: task, taskdue: deadline, isdone: false , tstamp: null};
        Axios.post(`${baseURL}/todo`, newTask )
        .then (res => {
          setTodoList([...todoList, res.data]);
          setTask("");
          setDeadline("");
        }).catch(err => {
          console.log(err);
        })
      }
    }

  };

  const deleteTask = (taskNameToDelete: string, taskIdToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskname !== taskNameToDelete;
      })
    );
    Axios.delete(`${baseURL}/todo/${taskIdToDelete}`)
    .then (res => {
      //console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <div className="pageTitle">
            <h1>Task Tracker</h1>
          </div>
          <label>Task: </label>
          <input
            type="text"
            placeholder="Add Task Here!"
            name="task"
            value={task}
            onChange={handleChange}
          />
          <label>Deadline: </label>
          <input
            type="date"
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
          <button onClick={addTask}>Add</button>
        </div>
        <div className="navBar">
          <NavigationComponent></NavigationComponent>
        </div>
      </div>
      <div className="todoList">
        <h1>Tasks List: </h1>
        {todoList.length !== 0 ? (
          todoList.map((task: ITask, key: number) => {
            return <TodoTask key={key} task={task} checkBoxChange={checkBoxChange} deleteTask={deleteTask} />;
        })
        ) : (
          <h3>No task to show</h3>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
