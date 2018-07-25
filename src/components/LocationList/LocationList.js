import React from 'react';
import './LocationList.css';

export default class LocationList extends React.Component {
  render(){
    let {
      onDelete,
      locations,
      canDelete
    } = this.props;

    return <div className="dashboard-location">
              <h1>Locaties</h1>
          {locations.map((location) => {
            return <div className="col"><div className="dashboard-location-item" key={location.id}>
              <h2>{ location.title }</h2>
              <button disabled={!canDelete} className="delete-button" onClick={() => onDelete(location.id)}>
                Delete
              </button>
            </div></div>
            })
                }

    </div>;
  }
}
