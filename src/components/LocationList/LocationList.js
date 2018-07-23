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
      <h1>Locations</h1>
      {locations.map((location) => {
        return <div className="dashboard-location" key={location.id}>
          <h2>Location</h2>
          <p>{ location.title }</p>
          <button disabled={!canDelete} className="delete-button" onClick={() => onDelete(location.id)}>
            Delete
          </button>
        </div>
        })
            }
    </div>;
  }
}
