import React, { FC, ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Components/Interfaces";

import Axios from 'axios'
import NavigationComponent from "./Components/NavigationComponent";

const App: FC = () => {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState("");
  const [todoList, setTodoList] = useState<ITask[]>([]);

  useEffect(() => {
    Axios.get('http://localhost:5000/api/todo')
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
    const link = 'http://localhost:5000/api/todo' + '/' + String(event.target.id)
    Axios.put(link)
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
      const res = await Axios.post('http://localhost:5000/api/todo', newTask );
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

    const link = 'http://localhost:5000/api/todo' + '/' + taskIdToDelete
    Axios.delete(link)
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
