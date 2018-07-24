import React from 'react';
import './ImageThumbnail.css'

const ImageThumbnail = ({ imageSource = 'placeholder', ...props }) => {
  const styles = {
    display: 'inline-block',
    width: '10em',
    height: '10em',
    margin: '0 1em',
    backgroundImage: 'url(' + imageSource + ')',
    backgroundSize: 'cover'
  };

  return <div className="rounded-circle round-button" style={styles} {...props} />;
};

export default ImageThumbnail;
