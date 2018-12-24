import React from "react";

import TodoListItem from "../todo-list-item";

import "./todo-list.css"

const TodoList = ({ todoList, onDeleted, onToggleDone,onToggleImportant }) => {
  const element = todoList.map(item => {
    const {
      id,
      ...itemProps
    } = item;
    return (
      <span key={id} className="list-group-item justify-content-between align-items-center">
        <TodoListItem {...itemProps} onDeleted={() => onDeleted(id)}
        onToggleDone={()=>onToggleDone(id)}
        onToggleImportant={()=>onToggleImportant(id)}/>
      </span>
    );
  });

  return (<ul className="list-group todo-item">{element}</ul>);
};

export default TodoList;
