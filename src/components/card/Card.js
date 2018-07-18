import React from 'react';
import { Link } from 'react-router-dom';
import { SIZES } from '../../constants';
import './card.css';
import '../../bootstrap.css';

import { MapPin, Calendar } from 'react-feather';

const Card = ({
  image,
  title,
  difficulty,
  tags,
  dates,
  location
}) => {
return <div className="cards">
          <img src={image}/>
          <div className="info">
            <div className="container">
                <div className="row">
                    <h1 className="col">{title}</h1>
                    <div className="difficulty col">
                        💪 {difficulty}
                    </div>
                </div>
                <div className="card-line row">
                    <span><Calendar /></span>{dates}
                </div>
                <div className="card-line last-line row">
                    <span><MapPin /></span>{location}
                </div>
                <div className="card-tags row">
                    <div className="card-tag col">
                        {tags}
                    </div>                                                          
                </div>
            </div>
            </div>
        </div>

}
export default Card;
