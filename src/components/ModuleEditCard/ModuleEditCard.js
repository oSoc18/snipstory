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

    return <div className="story-module row">
        <div className="col-md-8">
          <h1 className="type-title row">({order + 1}) { type }</h1>
          <div className="row">
            <p>{ text }</p>
          </div>
        </div>
        <div className="module-button-container col-md-1">
            <button disabled={deleteDisabled} className="module-delete row" onClick={(e) => {
              if (window.confirm("This is IRREVERSIBLE!"))
                onDelete(e);
            }}>delete</button>
            <button disabled={orderDisabled} className="module-up row" onClick={(e) => onOrderUp(e)}>Up</button>
            <button disabled={orderDisabled} className="module-down row" onClick={(e) => onOrderDown(e)}>Down</button>
        </div>
    </div>;
  }
}
