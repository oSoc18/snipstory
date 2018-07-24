import React from 'react';
import Button from '../../../components/button/Button';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';
import Spinner from '../../../components/spinner/Spinner';


import { connect } from 'react-redux';
import { history } from '../../../redux/store';
import {
    fetchStoriesDashboardList,
    fetchStory,
    logout
 } from '../../../redux/actions';


import { Link } from 'react-router-dom';
import {firebaseAuth, googleAuthProvider, firebaseDatabase} from '../../../helpers/firebase';
import './FilterView.css';

class FilterView extends React.Component {

    componentWillMount() {
        this.props.fetchStoriesDashboardList();
    }

    constructor() {
        super();
        this.state = {
            activeFilter: ""
        }
    }

    handleTag(e) {
        e.preventDefault;
        // console.log(e.target.value);

        let newState = Object.assign({}, this.state);

        newState.activeFilter = e.target.value;

        this.setState(newState)
        console.log(newState);
        }

    switchStatement(param) {
        switch(param) {
            case "musea":
                return (
                    <div className="row">
                        <div className="col-md-4">
                        <p>Dit zijn de musea</p>
                        </div>
                    </div>
                )
            case "leeftijd":
                return (
                    <div className="row">
                        <div className="col-md-4">
                        <p>Dit zijn de leeftijden</p>
                        </div>
                    </div>
                )

            case "categorie":
                return (
                    <div className="row">
                        <div className="col-md-4">
                        <p>Dit zijn de categoriën</p>
                        </div>
                    </div>
                )
        }}

    render() {
        const {
            stories,
            isLoading,
            pristine,
            submitting,
            user,
            logout,
            deleteStory
        } = this.props


        if (isLoading || !stories || stories.length === 0) {
            return <Spinner page size="large" />;
        }

        return (
            <div className="page container">
                <Navbar />
                <h1>Kies een verhaal!</h1>
                <div className="row">
                    <div className="col-md-2">
                        <Button size="small" type="button" className={this.state.activeFilter === "musea" ? 'activeButton': ''} onClick={(e) => this.handleTag(e)} value="musea">Musea</Button>
                    </div>
                    <div className="col-md-2">
                        <Button size="small" type="button" className={this.state.activeFilter === "leeftijd" ? 'activeButton': ''} onClick={(e) => this.handleTag(e)} value="leeftijd">Leeftijd</Button>
                    </div>
                    <div className="col-md-2">
                        <Button size="small" type="button" className={this.state.activeFilter === "categorie" ? 'activeButton': ''} onClick={(e) => this.handleTag(e)} value="categorie">Categorie</Button>
                    </div>
                </div>

                {this.switchStatement(this.state.activeFilter)}

            </div>


        )

    }

}


const mapStateToProps = state => ({...state.stories});
export default connect(mapStateToProps,
    {fetchStoriesDashboardList,
        fetchStory,
        logout
    })(FilterView);
