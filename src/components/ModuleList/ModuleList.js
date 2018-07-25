import React from 'react';
import './ModuleList.css';
import ModuleEditCard from '../ModuleEditCard/ModuleEditCard';
import Button from '../../components/button/Button'

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
      getEditUrl,
      modules
    } = this.props;

    return <div className="module-list-root col">
      <div className="row">
        <h1>Modules</h1>
      </div>
      <div className="row">
      <Button
        onClick={onReset}
        disabled={!canSaveOrReset}
        className="reset-button"
        size="small"
        >
        Reset
      </Button>
      <Button
        onClick={onSaveOrder}
        disabled={!canSaveOrReset}
        className="save-button"
        size="small"
        >
        Save
      </Button>
      </div>
      {modules.map((module, index) => {

                return <ModuleEditCard
                  deleteDisabled={!canDelete}
                  editUrl={getEditUrl(module.id)}
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
