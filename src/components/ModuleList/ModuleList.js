import React from 'react';
import './ModuleList.css';
import ModuleEditCard from '../ModuleEditCard/ModuleEditCard';

export default class ModuleList extends React.Component {
  render(){
    let {
      onDelete,
      canDelete,
      canChangeOrder,
      canSaveOrReset,
      onReset,
      upOrder,
      downOrder,
      onSaveOrder,
      modules
    } = this.props;

    return <div className="module-list-root">
      <button
        onClick={onReset}
        disabled={!canSaveOrReset}
        className="reset-button">
        Reset
      </button>
      <button
        onClick={onSaveOrder}
        disabled={!canSaveOrReset}
        className="save-button">
        Save
      </button>
      {modules.map((module, index) => {

                return <ModuleEditCard
                  deleteDisabled={!canDelete}
                  orderDisabled={!canChangeOrder}
                  onDelete={() => onDelete(module.id)}
                  onOrderUp={() => upOrder(module.id)}
                  onOrderDown={() => downOrder(module.id)}
                  text={module.text}
                  key={index}
                  order={module.order}
                  type={module.contentType} />
                })
            }
    </div>;
  }
}
