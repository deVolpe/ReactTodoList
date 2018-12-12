import React from "react";

import TodoListItem from "../todo-list-item";

import "./todo-list.css"

const TodoList = ({todoObject, onDeleted, onToggleDone,onToggleImportant}) => {
  const element = todoObject.map(item => {
    const {
      id,
      ...itemProps
    } = item;
    return (
      <span key={id} className="list-group-item">
        <TodoListItem {...itemProps} onDeleted={() => onDeleted(id)}
        onToggleDone={()=>onToggleDone(id)}
        onToggleImportant={()=>onToggleImportant(id)}/>
      </span>
    );
  });

  return (<ul className="list-group todo-item">{element}</ul>);
};

export default TodoList;
