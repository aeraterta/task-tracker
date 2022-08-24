import React, { FC, ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Components/Interfaces";

import Axios from 'axios'
import NavigationComponent from "./Components/NavigationComponent";

const App: FC = () => {
  //var datenow = new Date().toLocaleDateString("en-CA");

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
    console.log(event.target.id);
  };

  const addTask = async () => {
    if (task === ""){
      console.log("Empty task name");    
    }
    else {
      try{
        const newTask = { taskname: task, taskdue: deadline, isdone: false , datedone: ""};
        const res = await Axios.post('http://localhost:5000/api/todo', newTask );
        console.log(res.data);
        let taskId = Number(res.data.id);

        const taskContent = { id: taskId, taskname: task, taskdue: deadline, isdone: false , datedone: ""};
        setTodoList([...todoList, taskContent]);
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
      <NavigationComponent></NavigationComponent>
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Add Task Here!"
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="date"
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} checkBoxChange={checkBoxChange} deleteTask={deleteTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
