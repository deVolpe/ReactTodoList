import React, {Component} from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

  state = {
    label: ''
  }

  isExistLabel = (list, label) => {
    const isExist = list.some(el => el.label === label)
    return isExist;
  };

  onLabelChange = (e) => {
    this.setState({label: e.target.value});
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {label} = this.state;
    if (label !== '') {
      if (!this.isExistLabel(this.props.todoList, label)) {
        this.props.onAddItem(this.state.label);
      }
    }
    this.setState({label: ''});
  };

  render() {

    const {label} = this.state;
    const {todoList} = this.props;
    const isContain = this.isExistLabel(todoList, label);

    let style = 'form-control ';

    if (isContain) {
      style += 'is-invalid';
    } else {
      style += 'is-valid';
    }

    if (!label.length) {
      style = 'form-control';
    }

    return (
      <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
        <input type="text" className={style} onChange={this.onLabelChange} placeholder="Add to do item" value={label}/>
        <button className="btn btn-outline-secondary">Add item</button>
      </form>
    );
  };
}
