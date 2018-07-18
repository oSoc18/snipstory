import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../../redux/store';
import ButtonSmall from '../../../components/button-small/ButtonSmall';
import Navbar from '../../../components/nav/Navbar';
import Footer from '../../../components/footer/Footer';
import Card from '../../../components/card/Card';

import './FilterView.css'


class FilterView extends React.Component{

    const = {
    } = this.props
    render(){

        return(
            <div className="page">
                <Navbar />
                <div className="general-container">
                    <h1>Hey, look at my cards</h1>
                    <Card 
                        image="https://preview.ibb.co/gHNFgy/img.jpg"
                        title="The Boule the Berlin guy
                        Second text line if needed"
                        difficulty="3"
                        tags="Wetenschappen, wiskunde en fysica"
                        dates="23. March 2015 - 28. June 2018"
                        location="Antwerpen"
                    />
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => ({ ...state.snippers });
export default connect(mapStateToProps)(FilterView);
