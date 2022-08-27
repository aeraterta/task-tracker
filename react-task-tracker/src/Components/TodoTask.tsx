import React, {ChangeEvent} from "react";
import Checkbox from "./Checkbox";
import { ITask } from "./Interfaces";
import { AiFillDelete } from 'react-icons/ai';

interface Props {
  task: ITask;
  deleteTask(taskNameToDelete: string, taskIdToDelete: string): void;
  checkBoxChange(event: ChangeEvent<HTMLInputElement>): void;
}


const TodoTask = ({ task, deleteTask, checkBoxChange }: Props) => {
  let idString = String(task.id);
  let checkBoxName = 'checkBox' + String(idString);
  return (
    <div className="task">
      <Checkbox
          name={checkBoxName} 
          handleChange={checkBoxChange}
          isChecked={task.isdone}
          label={idString} 
        />      
      <div className="content">

        <div className="contentItems">
          <label>Task: </label>
          <div>{task.taskname}</div>
        </div>

        <div className="contentItems">
          <label>Due: </label>
          <div>{task.taskdue}</div>
        </div>

        <div className="contentItems">
          <label>Done: </label>
          <div>{task.taskdone}</div>
        </div>
        
      </div>
      <button
        onClick={() => {
          deleteTask(task.taskname, idString);
        }}
      >
        <h1><AiFillDelete /></h1>
      </button>
    </div>
  );

};

export default TodoTask;
