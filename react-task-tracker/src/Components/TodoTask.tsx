import React, {ChangeEvent} from "react";
import { ITask } from "./Interfaces";

interface Props {
  task: ITask;
  deleteTask(taskNameToDelete: string, taskIdToDelete: string): void;
  checkBoxChange(event: ChangeEvent<HTMLInputElement>): void;
}

const TodoTask = ({ task, deleteTask, checkBoxChange }: Props) => {
  let idString = String(task.id);
  let checkBoxName = 'checkBox' + String(idString);

  let className = task.isdone? "task hello" : "task"
  console.log(task);
  return (
    <div className={className}>
      <div className="content">
        <span>{task.taskname}</span>
        <span>{task.taskdue}</span>
      </div>
      <input 
        type="checkbox"  
        name={checkBoxName} 
        id={idString}  
        onChange={checkBoxChange}
      />
      <button
        onClick={() => {
          deleteTask(task.taskname, idString);
        }}
      >
        X
      </button>
    </div>
  );
};

export default TodoTask;
