import React from 'react';
import './ModuleEditCard.css';
import { Trash, Edit, ChevronUp, ChevronDown } from 'react-feather';
import Link from '../../../node_modules/react-router-dom/Link';


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

    return <div className="story-module row justify-content-between">
        <div className="col-md-11">
          <h1 className="type-title row">({order + 1}) { type }</h1>
          <div className="row">
            <p>{ text }</p>
          </div>
        </div>
        <div className="col-md-1">
          <div className="module-button-container float-right">
              <Link disabled={deleteDisabled} className="module-delete row" to="#" onClick={(e) => {
                if (window.confirm("This is IRREVERSIBLE!"))
                  onDelete(e);
              }}><Trash size="20"/></Link>
              <Link className="module-edit row" to="#"><Edit size="20" /></Link>
              <div className="row module-up-down-container align-self-end">
                <Link disabled={orderDisabled} className="module-up" to="#" onClick={(e) => onOrderUp(e)}><ChevronUp size="20"/></Link>
                <Link disabled={orderDisabled} className="module-down" to="#" onClick={(e) => onOrderDown(e)}><ChevronDown size="20"/></Link>
              </div>
          </div>
        </div>
    </div>;
  }
}
