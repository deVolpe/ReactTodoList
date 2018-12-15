import React, { Component } from "react";

import "./search-panel.css"


export default class SearchPanel extends Component {

  state = {
    term: ''
  };

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  };

  render() {

    const { term } = this.state;

    return (
      <div className="search-input">
        <input type="text"
           className="form-control"
           value={term}
           placeholder="type of search"
           onChange={this.onSearchChange}/>
      </div>
    );
  };
}
