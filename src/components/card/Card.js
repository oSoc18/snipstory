import React from 'react';
import { Link } from 'react-router-dom';
import { SIZES } from '../../constants';
import './card.css';

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
                    <h1 className="col-10">{title}</h1>
                    <div className="difficulty col-2">
                        💪&nbsp;{difficulty}
                    </div>
                </div>
                <div className="card-line row">
                    <div class="col-12">                    
                        <span><Calendar size={16} /></span>{dates}
                    </div>
                </div>
                <div className="card-line last-line row">
                    <div class="col-12">                    
                        <span><MapPin size={16} /></span>{location}
                    </div>
                </div>
                <div className="card-tags row">
                    <div className="card-tag">
                            {tags}
                    </div>
                    <div className="card-tag year-tag">
                        1ste middelbaar
                    </div>
                    <div className="card-tag year-tag">
                        1ste middelbaar
                    </div>                                                           
                </div>
            </div>
            </div>
        </div>

}
export default Card;
