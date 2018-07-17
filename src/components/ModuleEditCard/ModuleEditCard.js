import React from 'react';
import './ModuleEditCard.css';


export default class ModuleEditCard extends React.Component {
  render(){
    let {
      type,
      onDelete,
      onOrderUp,
      order,
      onOrderDown,
      text } = this.props;

    return <div>
      <div>{order}</div>
      <h2 className="type-title">{ type }</h2>
      <div>
        { text }
      </div>
      <div className="module-button-container">
        <button className="module-delete" onClick={(e) => onDelete(e)}>delete</button>
        <button className="module-up" onClick={(e) => onOrderUp(e)}>Up</button>
        <button className="module-down" onClick={(e) => onOrderDown(e)}>Down</button>
      </div>
    </div>;
  }
}
