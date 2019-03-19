import React, { useState } from "react";

import "./search-panel.css";

function SearchPanel(props) {
  const [term, setTerm] = useState("");

  const onSearchChange = e => {
    const term = e.target.value;
    setTerm(term);
    props.onSearchChange(term);
  };

  return (
    <div className="search-input">
      <input
        type="text"
        className="form-control"
        value={term}
        placeholder="type of search"
        onChange={onSearchChange}
      />
    </div>
  );
}

export default SearchPanel;
