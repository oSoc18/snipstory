import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormField from '../../../components/form/FormField';
import mapboxgl from 'mapbox-gl';
import './AddLocation.css'
import { firebaseDatabase } from '../../../helpers/firebase';
import Button from '../../../components/button/Button'
const  { DOM: { textarea } } = React

mapboxgl.accessToken = 'pk.eyJ1IjoiYXphaG1lZDA5NiIsImEiOiJjampyNnh6OTYyajlxM3dwYmFvMnc0dTV4In0.7X4yOZDGwbjF4zx4s0kw6A';


class AddLocation extends React.Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [5, 50],
      zoom: 6
    });

    this.marker = new mapboxgl.Marker()
    .setLngLat([4.33, 50.80])
    .addTo(this.map);

    this.map.on('click', this.onClick.bind(this));
  }

  onClick(evt){
    this.marker.setLngLat(evt.lngLat);
  }

  render() {
    let {
      pristine,
      submitting,
      match: { params: {storyId} },
      history
    } = this.props;

    return <div className="AddLocation">
      <h1>Add location</h1>
      <form onSubmit={this.props.handleSubmit(({motivation, title}) => {
        let lngLat = this.marker.getLngLat();
        firebaseDatabase
        .ref('stories/')
        .child(storyId)
        .child("locations")
        .push({
          motivation,
          title,
          lngLat
        }).then(() => history.push(`/teacher/dashboard/${storyId}`));
      })}>
      <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.css' rel='stylesheet' />
      <div id="map"></div>
      <div>
        <Field
            name="title"
            component={FormField}
            type="text"
            label="Title"
            required
        />
      </div>
      <div>
        <Field
            name="motivation"
            component={FormField}
            label="Motivation"
            type="text"
            required
        />
      </div>

      <Button type="submit" disabled={pristine || submitting}>Add location</Button>

      </form>
    </div>
  }
}

export default reduxForm({ form: 'addLocation'})(AddLocation);

