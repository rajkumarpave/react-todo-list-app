import React, { useMemo, useState } from "react";

function TodoList(props) {
  const {
    listName = "",
    icon = "",
    list = [],
    onUpdateList = () => {},
  } = props;

  const [searchText, setSearchText] = useState("");

  const handleDone = (listID) => {
    const foundItem = list.find((item) => {
      return item.id === listID;
    });

    if (foundItem) {
      let updatedItem = { ...foundItem, status: "done" };
      onUpdateList(updatedItem);
    }
  };

  const handleUndo = (listID) => {
    const foundItem = list.find((item) => {
      return item.id === listID;
    });

    if (foundItem) {
      let updatedItem = { ...foundItem, status: "todo" };
      onUpdateList(updatedItem);
    }
  };

  const handleDelete = (listID) => {
    const foundItem = list.find((item) => {
      return item.id === listID;
    });

    if (foundItem) {
      let updatedItem = { ...foundItem, isTrash: true };
      onUpdateList(updatedItem);
    }
  };

  const handleRestore = (listID) => {
    const foundItem = list.find((item) => {
      return item.id === listID;
    });

    if (foundItem) {
      let updatedItem = { ...foundItem, isTrash: false };
      onUpdateList(updatedItem);
    }
  };

  const renderList = useMemo(() => {
    if (searchText) {
      return list.filter((item) => {
        return item.title.toLowerCase().includes(searchText);
      });
    }
    return list;
  }, [searchText, list]);

  return (
    <div className="m-2">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="fw-bold fs-3">
          {listName} <span className="fs-5">({renderList.length})</span>
        </h2>
        <span className="fs-3">
          <i className={icon}></i>
        </span>
      </div>
      <div className="w-100 my-2">
        <div className="input-group input-group-sm">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="d-flex flex-column gap-2">
        {renderList.length === 0 ? (
          <h1 className="fw-bold text-center fs-5 text-secondary m-2 mt-4">
            No Task
          </h1>
        ) : (
          renderList.map((item, idx) => {
            const taskbackgroundColor =
              parseInt(item.priority) === 1
                ? "bg-danger-subtle"
                : parseInt(item.priority) === 2
                ? "bg-warning-subtle"
                : parseInt(item.priority) === 3
                ? "bg-info-subtle"
                : "";

            return (
              <div
                key={idx}
                className={`d-flex flex-column border rounded shadow ${taskbackgroundColor}`}
              >
                <div className="d-flex justify-content-between align-items-center p-2">
                  <span
                    className={
                      item.status === "done"
                        ? "text-decoration-line-through"
                        : ""
                    }
                  >
                    {item.title}
                  </span>
                  <span className="d-flex gap-1">
                    {item.isTrash ? (
                      <button
                        onClick={() => handleRestore(item.id)}
                        className="btn btn-sm btn-secondary"
                      >
                        <i className="bi bi-arrow-counterclockwise"></i>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            item.status === "done"
                              ? handleUndo(item.id)
                              : handleDone(item.id)
                          }
                          className={
                            item.status === "done"
                              ? "btn btn-sm btn-primary"
                              : "btn btn-sm btn-success"
                          }
                        >
                          <i
                            className={
                              item.status === "done"
                                ? "bi bi-pencil"
                                : "bi bi-check-lg"
                            }
                          ></i>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="btn btn-sm btn-danger"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </>
                    )}
                  </span>
                </div>
                <div className="d-flex justify-content-end align-items-center p-2">
                  <span>
                    {`created on ${item.created_on.getDate()}-${
                      item.created_on.getMonth() + 1
                    }-${item.created_on.getFullYear()}`}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default TodoList;
