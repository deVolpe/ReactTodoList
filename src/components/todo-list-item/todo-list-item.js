import React from "react";

import "./todo-list-item.css";

const TodoListItem = ({
  label,
  onDeleted,
  onToggleDone,
  onToggleImportant,
  done,
  important
}) => {

  let classNames = 'todo-list-item';

  if (done) {
    classNames += ' done';
  }

  if (important) {
    classNames += ' important';
  }

  return (<span className={classNames}>
    <span className="todo-list-item-label" onClick={onToggleDone}>
      {label}
    </span>
    <button className="btn btn-outline-success btn-small float-right" onClick={onToggleImportant}>
      <i className="fa fa-exclamation"/>
    </button>
    <button type="button" className="btn btn-outline-danger btn-small float-right" onClick={onDeleted}>
      <i className="fa fa-trash-o"/>
    </button>
  </span>);
}

export default TodoListItem;
