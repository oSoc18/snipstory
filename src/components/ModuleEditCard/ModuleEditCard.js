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
      deleteDisabled,
      orderDisabled,
      text } = this.props;

    return <div>
      <h2 className="type-title">({order + 1}) { type }</h2>
      <div>
        { text }
      </div>
      <div className="module-button-container">
        <button disabled={deleteDisabled} className="module-delete" onClick={(e) => {
          if (window.confirm("This is IRREVERSIBLE!"))
            onDelete(e);
        }}>delete</button>
        <button disabled={orderDisabled} className="module-up" onClick={(e) => onOrderUp(e)}>Up</button>
        <button disabled={orderDisabled} className="module-down" onClick={(e) => onOrderDown(e)}>Down</button>
      </div>
    </div>;
  }
}
