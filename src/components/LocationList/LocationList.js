import React from 'react';
import './LocationList.css';
import Button from '../../components/button/Button'

export default class LocationList extends React.Component {
  render(){
    let {
      onDelete,
      locations,
      canDelete
    } = this.props;

    return <div className="dashboard-location">
              <h1>Locations</h1><div className="row">
          {locations.map((location) => {
            return <div className="col justify-content-center"><div className="dashboard-location-item" key={location.id}>
              <div className="row justify-content-center"><h2>{ location.title }</h2></div>
              <div className="row justify-content-center"><img src={ location.image }/></div>
              <div className="row justify-content-center"><Button disabled={!canDelete} className="delete-button" onClick={() => onDelete(location.id)}>
                Delete
              </Button></div>
            </div></div>
            })
                }

    </div></div>;
  }
}
