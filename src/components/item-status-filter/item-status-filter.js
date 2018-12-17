import React, {Component} from "react";

import "./item-status-filter.css";

export default class ItemStatusFilter extends Component {

  state = {
    active: true,
    done: true
  };

  onFilterActive = () => {
    const {active} = this.state;
    this.setState({
      active: !active
    });
    this.props.onFilterActive(active);
  };

  onFilterDone = () => {
    const {done} = this.state;
    this.setState({
      done: !done
    });
    this.props.onFilterDone(done);
  };

  render() {

    const {active, done} = this.state;

    let firstClassName = "btn btn-outline-secondary";
    let secondClassName = "btn btn-outline-secondary";
    if (!active) {
      firstClassName = "btn btn-outline-success";
    }

    if (!done) {
      secondClassName = "btn btn-outline-success";
    }

    return (<div className="btn-group">
      <button className="btn btn-info">All</button>
      <button className={firstClassName} onClick={this.onFilterActive}>Active</button>
      <button className={secondClassName} onClick={this.onFilterDone}>Done</button>
    </div>);
  };
}
