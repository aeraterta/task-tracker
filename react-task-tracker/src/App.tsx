import React, { FC, ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Components/Interfaces";

import Axios from 'axios'
import NavigationComponent from "./Components/NavigationComponent";

const host = process.env.BACKEND_HOST || 'localhost';
const port = process.env.BACKEND_PORT || 5000;
let baseURL = `http://${host}:${port}/api`


const App: FC = () => {

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
      //console.log(res.data);
      setTodoList(res.data);
    }).catch(err => {
      console.log(err);
    })
};

const addTask = async () => {
  if (task === ""){
    console.log("Error: Empty task name!")  
    alert("Error: Empty task name!");
  }
  else {
    try{
      const newTask = { taskname: task, taskdue: deadline, isdone: false , datedone: ""};
      const res = await Axios.post(`${baseURL}/todo`, newTask );
      console.log(res.data);

      setTodoList([...todoList, res.data]);
      setTask("");
      setDeadline("");
    }catch (error){
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
        console.log(errorMessage);
      }
      else {
        console.log(error);
      }
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
      console.log(res.data);
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
          // <p>Here1</p>
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

export default App;
