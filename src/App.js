import { useState } from "react";
import TodoList from "./components/TodoList";
import AddTask from "./components/AddTask";

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      title: "Setup React JS",
      status: "done",
      isTrash: false,
      priority: 1,
      created_on: new Date(),
    },
    {
      id: 2,
      title: "React JSX",
      status: "done",
      isTrash: false,
      priority: 3,
      created_on: new Date(),
    },
    {
      id: 3,
      title: "React Components",
      status: "done",
      isTrash: false,
      priority: 2,
      created_on: new Date(),
    },

    {
      id: 4,
      title: "React Props",
      status: "todo",
      isTrash: false,
      priority: 1,
      created_on: new Date(),
    },
    {
      id: 5,
      title: "React State",
      status: "todo",
      isTrash: false,
      priority: 1,
      created_on: new Date(),
    },
    {
      id: 6,
      title: "React Hooks",
      status: "done",
      isTrash: false,
      priority: 2,
      created_on: new Date(),
    },
  ]);

  const onAddNewTask = (newTask) => {
    setTodoList((prevTodoList) => [...prevTodoList, newTask]);
  };

  const handleListUpdate = (list) => {
    let updatedList = todoList.map((item) => {
      if (item.id === list.id) {
        return { ...item, ...list };
      }
      return item;
    });

    setTodoList(updatedList);
  };

  const pendingList = todoList.filter(
    (list) => !list.isTrash && list.status === "todo"
  );
  const doneList = todoList.filter(
    (list) => !list.isTrash && list.status === "done"
  );
  const trashList = todoList.filter((list) => list.isTrash);

  return (
    <div className="App">
      <div className="d-flex justify-content-center align-items-center m-2 p-2">
        <AddTask onAdd={onAddNewTask} />
      </div>
      <div className="row w-100 pt-2 p-4">
        <div className="col-12 col-sm-6 col-md-3 p-2">
          <TodoList
            listName="All Task"
            icon="bi bi-list"
            list={todoList}
            onUpdateList={handleListUpdate}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-3 p-2">
          <TodoList
            listName="Todo"
            icon="bi bi-list-task"
            list={pendingList}
            onUpdateList={handleListUpdate}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-3 p-2">
          <TodoList
            listName="Done"
            icon="bi bi-check2-all"
            list={doneList}
            onUpdateList={handleListUpdate}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-3 p-2">
          <TodoList
            listName="Trash"
            icon="bi bi-trash3"
            list={trashList}
            onUpdateList={handleListUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
