import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddTask(props) {
  const { onAdd } = props;
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState(1);

  const onAddNewTask = () => {
    let newTask = {
      id: uuidv4(),
      title: newTaskText,
      status: "todo",
      isTrash: false,
      priority: newTaskPriority,
      created_on: new Date(),
    };
    onAdd(newTask);
    setNewTaskText("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center gap-2">
      <div>
        <select
          className="form-select form-select"
          style={{ width: "75px" }}
          onChange={(e) => {
            setNewTaskPriority(e.target.value);
          }}
          value={newTaskPriority}
        >
          <option
            // selected={newTaskPriority === 1}
            className="bg-danger-subtle"
            value={1}
          >
            P1
          </option>
          <option
            // selected={newTaskPriority === 2}
            className="bg-warning-subtle"
            value={2}
          >
            P2
          </option>
          <option
            // selected={newTaskPriority === 3}
            className="bg-info-subtle"
            value={3}
          >
            P3
          </option>
        </select>
      </div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Write a Task..."
          name="task"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
      </div>
      <button className="btn btn-sm btn-primary" onClick={onAddNewTask}>
        Add
      </button>
    </div>
  );
}

export default AddTask;
