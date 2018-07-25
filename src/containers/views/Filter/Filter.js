import React from 'react';
import { connect } from 'react-redux';
import { fetchStories, setYearRange } from '../../../redux/actions';
import Spinner from '../../../components/spinner/Spinner';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Filter.css';
import Button from '../../../components/button/Button';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';
import Card from '../../../components/card/Card';

class Filter extends React.Component {
    componentWillMount() {
        this.props.fetchStories();
        this.state = { yearRange: [0, 2018] };
    }

    render() {
        let {
            setYearRange,
            isLoading,
            minYear,
            maxYear,
            filteredStories,
            user,
            logout
        } = this.props;

        if (isLoading) {
            return <Spinner page />
        }

        return <div className="page">
            <Navbar logout={logout} user={user}/>
        <div className="filter-root container">
            <div className="row filters-div justify-content-between">
                <div className="col-md-5">
                    <div className="row">
                        <div className="col">
                           <p> Filters: </p>
                        </div> 
                        <div className="col">
                            <Button size="small" inverted="true">Partners</Button>
                        </div> 
                        <div className="col">
                            <Button size="small" inverted="true">Jaar</Button>
                        </div> 
                        <div className="col">
                            <Button size="small" inverted="true">Skills</Button>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="row self-align-right">
                        <div className="col">
                            <p>Period:</p>
                        </div>
                        <div className="col-md-8">
                            <div className="range-container">
                                {this.state.yearRange.join("-")}
                                <Range
                                    max={maxYear}
                                    min={minYear}
                                    allowCross={false}
                                    value={this.state.yearRange}
                                    onChange={yearRange => this.setState({yearRange})}
                                    onAfterChange={setYearRange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row cards-div">
                <div className="col">
                    <div classNem="row">
                        <h3>Results: </h3>
                    </div>
                    <div className="row cards-grid justify-content-start">
                            {filteredStories.map(story => {
                                return  <div className="cards-container">
                                            <Card 
                                            title={story.general.title}
                                            image={story.general.profilePicture}
                                            difficulty={story.general.difficulty}
                                            schoolyear={story.general.level}
                                            dateOfBirth={story.general.dayOfBirth}
                                            dateOfDeath={story.general.dayOfDeath}
                                            />
                                        </div>
                                
                            })}
                    </div>
                </div>
                            
            </div>
            </div>
            
        <Footer />
        </div>
    }
}

const mapStateToProps = state => ({
    ...state.filtering
});

export default connect(mapStateToProps, { fetchStories, setYearRange })(Filter);
