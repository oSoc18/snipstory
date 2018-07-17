import React from 'react';
import './ModuleList.css';

export default class ModuleList extends React.Component {
  render(){
    let {
      story,
      deleteModule
    } = this.props;

    return <div className="module-list-root">
      {story.modules && Object.keys(story.modules).map((moduleId, index) => {
                let module = story.modules[moduleId];

                return <ModuleEditCard
                  onDelete={() => deleteModule(story.id, moduleId)}
                  onOrderUp={() => 0}
                  onOrderDown={() => 9}
                  text={module.text}
                  key={index}
                  order={module.order}
                  type={module.contentType} />
                })
            }
    </div>;
  }
}
