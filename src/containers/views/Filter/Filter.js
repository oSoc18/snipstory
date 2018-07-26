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
            activeTags: "",
            tags: {
                partners: {
                    overheid: false,
                    erfgoedcel: false,
                    museum: false,
                    andere: false,
                },
                categories: {
                    landbouw: false,
                    voeding: false,
                    dieren: false,
                    architectuur: false,
                    ambacht: false,
                    banken: false,
                    bouw: false,
                    biologie: false,
                    verkoop: false,
                    communicatie: false,
                    cultuur: false,
                    veiligheid: false,
                    recht: false,
                    boeken: false,
                    elektronica: false,
                    informatica: false,
                    onderwijs: false,
                    natuur: false,
                    personeelszaken: false,
                    toerisme: false,
                    industrie: false,
                    filosofie: false,
                    machines: false,
                    multimedia : false,
                    gezondheidszorg: false,
                    wetenschappen: false,
                    secretariaat: false,
                    sociaal: false,
                    esthetiek: false,
                    sport: false,
                    transport: false
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



        newState.tags.categories[e.target.value] = !newState.tags.categories[e.target.value]
        newState.tags.partners[e.target.value] = !newState.tags.partners[e.target.value]
        newState.activeTags = e.target.value;
        // newState.tags.skills[e.target.value] = !newState.tags.skills[e.target.value]

        this.setState(newState)
        console.log(newState);
        }


    switchStatement(param) {
        switch(param) {
            case "partners":
                return (

                    <div className="row">
                        <div className="col-md-3"/>
                        {Object.keys(this.state.tags.partners).map( tag => {
                            return(
                                <div className="col"><Button key={tag} size="small" inverted="true" value={tag} className={this.state.activeTags === {tag} ? 'activeButton': ''} onClick={(e) => this.handleTag(e)}>{tag}</Button></div>
                            )
                        })}
                    </div>
                )
                break;
            case "categories":
                return (
                    <div className="row">
                        <div className="col-md-3"/>
                        {Object.keys(this.state.tags.categories).map( tag => {
                            return(
                                <div className="col"><Button key={tag} size="small" inverted="true" value={tag} className={this.state.activeTags === {tag} ? 'activeButton': ''} onClick={(e) => this.handleTag(e)}>{tag}</Button></div>
                            )
                        })}
                    </div>
                )
        }}

    testTags(story) {
        let filter = true;
        (Object.entries(story.general.tags.categories).map(([key,value])=>{
            if(!value){
                let stateValue = this.state.tags.categories[key]
                    if(stateValue !== undefined){
                        if(value !== stateValue) {
                            filter = false
                        }
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
                            <Button size="small" inverted="true" value="categories"className={this.state.activeFilter === "categories" ? 'activeButton': ''} onClick={(e) => this.handleClick(e)}>Skills</Button>
                        </div>
                    </div>
                    {this.switchStatement(this.state.activeFilter)}
                </div>
                <div className="col-md-3">
                    <div className="row self-align-right">
                        <div className="col">
                            <p>Periode:</p>
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
                        <h3>Resultaten: </h3>
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
