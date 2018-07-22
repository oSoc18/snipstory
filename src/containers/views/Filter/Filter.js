import React from 'react';
import { connect } from 'react-redux';
import { fetchStories, setYearRange } from '../../../redux/actions';
import Spinner from '../../../components/spinner/Spinner';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Filter.css';


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

        return <div className="filter-root">
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

            {filteredStories.map(story => {
                return <div key={story.id || story.general.id || story.general.title}>
                <h2>{story.general.title} ({story.general.dayOfBirth})</h2>
                </div>
            })}
        </div>
    }
}

const mapStateToProps = state => ({
    ...state.filtering
});

export default connect(mapStateToProps, { fetchStories, setYearRange })(Filter);
