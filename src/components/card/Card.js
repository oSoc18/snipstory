import React from 'react';
import { Link } from 'react-router-dom';
import { SIZES } from '../../constants';
import './Card.css';

import { MapPin, Calendar } from 'react-feather';


const schoolYearSwitch = (schoolYear) => {
        switch(schoolYear) {
        case "thirdYear":
            return (
                <span>Derde leerjaar</span>
            )
            break;
        case "fourthYear":
        return (
            <span>Vierde leerjaar</span>
        )
            break;
        case "fifthYear":
        return (
            <span>Vijfde leerjaar</span>
        )
            break;
        case "sixthYear":
        return (
            <span>Zesde leerjaar</span>
        )
            break;
        case "firstYearSecondary":
        return (
            <span>Eerste middelbaar</span>
        )
            break;
        case "secondYearSecondary":
        return (
            <span>Tweede middelbaar</span>
        )
            break;
    }
}


const Card = ({
  image,
  title,
  difficulty,
  tags,
  dateOfBirth,
  dateOfDeath,
  location,
  schoolyear
}) => {
return <div className="cards">
          <img src={image}/>
          <div className="info">
            <div className="container">
                <div className="row">
                    <div className="col-10">
                        <h1>{title}</h1>
                    </div>
                    <div className="difficulty col-2">
                        💪&nbsp;{difficulty}
                    </div>
                </div>
                <div className="card-line row">
                    <div className="col-12">
                        <span><Calendar size={16} /></span>{dateOfBirth}{' - '}{dateOfDeath}
                    </div>
                </div>
                <div className="card-line last-line row">
                    <div className="col-12">
                        <span><MapPin size={16} /></span>{location}
                    </div>
                </div>
                <div className="card-tags row">
                {
                    (Object.entries(Object.values({tags})[0]).map(([tagParent,tag])=>{
                    return(
                        Object.entries(tag).map(([key,value])=>{
                            if(value) {
                                    return (
                                            <div className="card-tag">
                                              {key}
                                            </div>

                                    )
                            }
                        })
                    )}))
                }
                </div>
                    <div className="row year-tag-row">
                        {Object.entries({schoolyear}.schoolyear).map(([key,value])=>{
                            if(value) {
                                    return (
                                            <div key={key} className="card-tag year-tag">
                                              {schoolYearSwitch(key)}
                                            </div>
                                    )
                            }
                        })}
                </div>
            </div>
            </div>
        </div>

}
export default Card;
