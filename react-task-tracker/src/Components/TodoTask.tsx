import React, {ChangeEvent} from "react";
import Checkbox from "./Checkbox";
import { ITask } from "./Interfaces";

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
      <div className="content">
        <span>{task.taskname}</span>
        <span>{task.taskdue}</span>
      </div>
      <Checkbox
          name={checkBoxName} 
          handleChange={checkBoxChange}

          isChecked={task.isdone}
          label={idString} 
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
