import React, {Component} from "react";

import TodoList from "../todo-list";
import SearchPanel from "../search-panel";
import AppHeader from "../app-header";
import ItemStatusFilter from "../item-status-filter"
import ItemAddForm from '../item-add-form';

import "./main-app.css";

export default class MainApp extends Component {

  maxId = 100;

  state = {
    todoList: [
      this.createTodoItem("Coffee Drink"), this.createTodoItem("Leader is main human"), this.createTodoItem("Create Awesome app")
    ],
    term: '',
    active: false,
    done: false
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

  onSearchChange = (term) => {
    this.setState({term});
  };

  onFilterDone = (done) => {
    this.setState({done});
  };

  onFilterActive = (active) => {
    this.setState({active});
  };

  onShowAll = () => {
    this.setState({done: false, active: false});
  }

  search(items, term) {

    if (term.length === 0) {
      return items;
    }

    return items.filter(item => item.label.includes(term));
  };

  filter(list, done, active) {

    let newList = [...list];

    if (done) {
      newList = list.filter(el => el.done === done);
    }

    if (active) {
      newList = list.filter(el => el.important === active);
    }

    return newList;
  };

  render() {

    const {todoList, term, done, active} = this.state;

    const doneCount = todoList.filter((el) => el.done).length;
    const todoCount = todoList.length - doneCount;

    const list = this.search(todoList, term);
    const visible = this.filter(list, done, active);

    return (<div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount}/>
      <div className="top-panel d-flex">
        <SearchPanel onSearchChange={this.onSearchChange}/>
        <ItemStatusFilter onFilterDone={this.onFilterDone} onFilterActive={this.onFilterActive} onShowAll={this.onShowAll}/>
      </div>
      <TodoList todoList={visible} onDeleted={this.onDeleteItem} onToggleDone={this.onToggleDone} onToggleImportant={this.onToggleImportant}/>
      <ItemAddForm onAddItem={this.addNewTodoItem} todoList={todoList}/>
    </div>);
  };
}
