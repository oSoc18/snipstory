import React from 'react';
import { Link } from 'react-router-dom';
import { SIZES } from '../../constants';
import './Card-min.css';
import Button from '../button/Button';


import { MapPin, Calendar } from 'react-feather';

const Card = ({
  image,
  title,
  difficulty,
  dateOfBirth,
  dateOfDeath,
  location,
  id,
  picture,
  story
}) => {
return <div className="cards">
          <img src={picture}/>
          <div className="info">
            <div className="container">
                <div className="row">
                    <h1 className="col-10">{title}</h1>
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
                <div className="card-buttons row">
                    <div className="col">
                        {/*<Button size="small"
                        onClick={(e) => {
                            this.props.fetchStory(id)
                            .then(() => history.push(`/dashboardstorylist/${id}/edit`));
                        }}
                    >Aanpassen</Button>*/}
                    </div>
                    <div className="col">
                        {/*<Button size="small" onClick={(e) => {
                            if (window.confirm('Are you sure you wish to delete this item?')) deleteSt(story) } }>
                        Verwijder
                        </Button>*/}
                    </div>
                </div>
                <div className="row">
                    {/*<div className="col">
                        <Button size="small" onClick={(e) => this.handleVisibility(e)}>Maak onzichtbaar</Button>
                    </div>*/}
                    <div className="col">
                        <Button size="small"
                        to={`/teacher/dashboard/${id}`}>Beheer verhaal</Button>
                    </div>
                </div>
            </div>
            </div>
        </div>

}
export default Card;
