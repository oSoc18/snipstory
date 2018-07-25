import React from 'react';
import { connect } from 'react-redux';
import { fetchStories, setYearRange, setLocation } from '../../../redux/actions';
import Spinner from '../../../components/spinner/Spinner';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Filter.css';
import Button from '../../../components/button/Button';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';
import Card from '../../../components/card/Card';
import { Link } from 'react-router-dom';


class Filter extends React.Component {
    componentWillMount() {
        this.props.fetchStories();
    }

    constructor(props) {
        super(props);
        this.state = { yearRange: [0, 2018],
            activeFilter: "",
            tags: {
                locations: {
                    poperinge: false,
                    brugge: false,
                    ieper: false
                },
                skills: {
                    food: false,
                    sport: false,
                    transportation: false
                }
            }
        };
    }
    renderTags(tags) {
        let newArray = [];
        if (tags !== undefined)
        {Object.entries(tags).map(([child,tagsOfChild]) => {
                Object.entries(tagsOfChild).map(([tag,value]) => {
                        if(value) {
                            newArray.push(tag);
                        }
                })
        })
        return newArray

        console.log(newArray)}
        return
    }

    handleClick(e) {
        e.preventDefault;
        console.log(e.target.value);

        let newState = Object.assign({}, this.state);

        newState.activeFilter = e.target.value;

        this.setState(newState)
        console.log(newState);
        }

    handleTag(e) {
        e.preventDefault;
        console.log(e.target.value);

        let newState = Object.assign({}, this.state);


        newState.tags.locations[e.target.value] = !newState.tags.locations[e.target.value]

        // newState.tags.skills[e.target.value] = !newState.tags.skills[e.target.value]

        this.setState(newState)
        console.log(newState);
        }


    switchStatement(param) {
        switch(param) {
            case "partners":
                return (

                    <div className="row">
                        <div className="col-md-4">
                        <p>Dit zijn de musea</p>
                        </div>
                    </div>
                )
                break;
            case "locaties":
                return (
                    <div className="row"><div className="col-md-3"/>
                    {Object.keys(this.state.tags.locations).map( tag => {
                        return(
                            <div className="col"><Button key={tag} size="small" inverted="true" value={tag} onClick={(e) =>{
                                this.handleTag(e);
                                let { tags } = this.props.filters;
                                console.log(tags)
                                let newTags = {
                                    ...tags,
                                    locations: {
                                        ...tags.locations,
                                        [tag]: !tags.locations[tag]
                                    }
                                }
                                this.props.setLocation(newTags);
                            } }>{tag}</Button></div>
                        )
                    })}
                    </div>
                )
                break;
            case "skills":
                return (
                    <div className="row"><div className="col-md-3"/>
                        {Object.keys(this.state.tags.skills).map( tag => {
                            return(
                                <div className="col"><Button key={tag} size="small" inverted="true" value={tag} onClick={(e) => this.handleTag(e)}>{tag}</Button></div>
                            )
                        })}
                    </div>
                )
                break;
        }}

    testTags(story) {
        let filter = true;
        (Object.entries(story.general.tags.locations).map(([key,value])=>{
            if(!value){
                if(value !== this.state.tags.locations[key]) {
                    filter = false
                }
            }

        })
    )

      return filter
    }




    render() {
        const {
            setYearRange,
            setLocation,
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

        const testFilteredStories = filteredStories.filter(story =>
            this.testTags(story)
        )

        return <div className="page">
            <Navbar logout={logout} user={user}/>
            <div className="story-dashboard-header container">
                <h1 className="row">Choose a story</h1>
            </div>
        <div className="filter-root container">
            <div className="row filters-div justify-content-between">
                <div className="col-md-5">
                    <div className="row">
                        <div className="col">
                           <p> Filters: </p>
                        </div>
                        <div className="col">
                            <Button size="small" inverted="true" value="partners" className={this.state.activeFilter === "partners" ? 'activeButton': ''} onClick={(e) => this.handleClick(e)}>Partners</Button>
                        </div>
                        <div className="col">
                            <Button size="small" inverted="true" value="locaties"className={this.state.activeFilter === "locaties" ? 'activeButton': ''} onClick={(e) => this.handleClick(e)}>Locaties</Button>
                        </div>
                        <div className="col">
                            <Button size="small" inverted="true" value="skills"className={this.state.activeFilter === "skills" ? 'activeButton': ''} onClick={(e) => this.handleClick(e)}>Skills</Button>
                        </div>
                    </div>
                    {this.switchStatement(this.state.activeFilter)}
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
                    <div className="row">
                        <h3>Results: </h3>
                    </div>
                    <div className="row cards-grid">
                            {testFilteredStories.map(story => {
                                return  <div className="cards-container" key={story.id} id={story.general.id}>
                                            <Link to={`/teacher/dashboard/${story.id}/preview`}>
                                            <Card
                                            image={story.general.profilePicture}
                                            title={story.general.title}
                                            image={story.general.profilePicture}
                                            difficulty={story.general.difficulty}
                                            schoolyear={story.general.schoolYear}
                                            dateOfBirth={story.general.dayOfBirth}
                                            dateOfDeath={story.general.dayOfDeath}
                                            tags={story.general.tags}
                                            />
                                            </Link>
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

export default connect(mapStateToProps, { fetchStories, setYearRange, setLocation })(Filter);
