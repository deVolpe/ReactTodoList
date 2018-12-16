import React, {Component} from "react";

import TodoList from "../todo-list";
import SearchPanel from "../search-panel";
import AppHeader from "../app-header";
import ItemStatusFilter from "../item-status-filter"
import ItemAddForm from '../item-add-form';

import "./main-app.css";

export default class RenderPage extends Component {

  maxId = 100;

  state = {
    todoList: [
      this.createTodoItem("Coffee Drink"),
      this.createTodoItem("Leader is main human"),
      this.createTodoItem("Create Awesome app")
    ],
    term: ''
  };

  createTodoItem(label) {
    return {
      label,
      done: false,
      important: false,
      id: this.maxId++
    };
  };

  addNewTodoItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({todoList}) => {

      const newTodoList = [
        ...todoList,
        newItem
      ];
      return {todoList: newTodoList};
    });
  };

  onDeleteItem = (id) => {
    this.setState(({todoList}) => {
      const idx = todoList.findIndex((el) => el.id === id);

      const newTodoList = [
        ...todoList.slice(0, idx),
        ...todoList.slice(idx + 1)
      ];
      return {todoList: newTodoList};
    });
  };

  toggleProperty = (arr, id, propName) => {

    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    };
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  };

  onToggleDone = (id) => {
    this.setState(({todoList}) => {
      return {
        todoList: this.toggleProperty(todoList, id, 'done')
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({todoList}) => {
      return {
        todoList: this.toggleProperty(todoList, id, 'important')
      };
    });
  };

  onSearchChange=(term)=>{
    this.setState({ term });
  };

  search(items, term ) {

    if (term.length === 0) {
      return items;
    }

    return items.filter(item => item.label.indexOf(term) > -1);
  };

  render() {

    const {todoList, term} = this.state;

    const doneCount = todoList.filter((el) => el.done).length;

    const visible = this.search(todoList, term);

    const todoCount = todoList.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter/>
        </div>
        <TodoList todoList={visible} onDeleted={this.onDeleteItem} onToggleDone={this.onToggleDone} onToggleImportant={this.onToggleImportant}/>
        <ItemAddForm onAddItem={this.addNewTodoItem}/>
      </div>
    );
  };
}

typeof inspect
