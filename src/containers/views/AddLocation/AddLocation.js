import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormField from '../../../components/form/FormField';
import mapboxgl from 'mapbox-gl';
import './AddLocation.css'
import Button from '../../../components/button/Button'
import { firebaseDatabase, firebaseStorage } from '../../../helpers/firebase';

import FileField from '../../../components/filefield/FileField';
import moment from 'moment';

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

  componentWillUnmount() {
    this.map.remove();
  }

  onClick(evt) {
    this.marker.setLngLat(evt.lngLat);
  }

  render() {
    let {
      pristine,
      submitting,
      match: { params: { storyId } },
      history,
      handleChange,
      user
    } = this.props;

    return <div className="AddLocation">
      <h1>Add location</h1>
      <form onSubmit={this.props.handleSubmit(({ motivation, title, image }) => {
        let imagePromise = firebaseStorage()
              .ref()
              .child(user.uid)
              .child("story")
              .child("locations")
              .child(moment().format('YYYYMMDD_hhmmss'))
              .child(title)
              .put(image);

        return new Promise((resolve, reject) => {
          imagePromise.then(task => {
            let image = task.metadata.downloadURLs[0];
            let lngLat = this.marker.getLngLat();

            firebaseDatabase
            .ref('stories/')
            .child(storyId)
            .child("locations")
            .push({
              motivation,
              title,
              lngLat,
              image
            })
            .catch(err => reject(err))
            .then(() => resolve())
            .then(history.push(`/teacher/dashboard/${storyId}`));
          });
        });
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
        <div>
          <Field
            name="image"
            type="file"
            label="Image"
            component={FileField}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" disabled={pristine || submitting}>Add location</Button>


      </form>
    </div>
  }
}

export default reduxForm({ form: 'addLocation' })(AddLocation);

