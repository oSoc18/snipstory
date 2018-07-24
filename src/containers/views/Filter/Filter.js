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
            filteredStories
        } = this.props;

        if (isLoading) {
            return <Spinner page />
        }

        return <div className="page">
        <Navbar />
        <div className="filter-root container">
            <div className="row filters-div">
                <div className="col">
                    <p>Filters :</p>
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
                <div className="col">
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
            <div className="row cards-div">
                {filteredStories.map(story => {
                                return <div key={story.id || story.general.id || story.general.title}>
                                <h2>{story.general.title} ({story.general.dayOfBirth})</h2>
                                </div>
                            })}
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
