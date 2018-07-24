import React from 'react';
import ImageThumbnail from '../../components/imagethumbnail/ImageThumbnail';


class ImageQuizModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCorrect: undefined,
            clickedOn: ""
        }
    }

    handleChange(index) {
        ((index+1) == this.props.module.correctPlace) ? this.setState({isCorrect: true, clickedOn: index}) : ""
        this.props.module.resources[this.state.clickedOn]

    }
        render() {
            return (
              <article className="container module">
                <div className="module-text">
                  <p>
                    {this.props.module.text}
                  </p>
                </div>

                <div>
                  <span className="quiz-module-text">
                    Welke foto past het best bij het verhaal volgens jullie?
                  </span>
                  {this.state.isCorrect !== undefined &&
                    this.state.isCorrect &&
                    <img
                      className="img-fluid img-mask correct"
                      src={this.props.module.resources[this.state.clickedOn]}
                      alt="selected"
                    />}
                  {this.state.isCorrect !== undefined &&
                    !this.state.isCorrect &&
                    <img
                      className="img-fluid img-mask false"
                      src={this.props.module.resources[this.state.clickedOn]}
                      alt="selected"
                    />}
                  {this.state.isCorrect === undefined &&
                    <img
                      width="640px"
                      height="320px"
                      src="https://firebasestorage.googleapis.com/v0/b/ishare-c35bb.appspot.com/o/placeholder.jpg?alt=media&token=dea06660-c97d-4fbd-bf70-7991cfbc8281"
                      className="img-fluid img-mask undefined"
                      alt="placeholder"
                    />}
                </div>


                <div className="images">

                  <div>
                    {this.props.module.resources.map((resource, i) =>
                      <ImageThumbnail
                        id={i}
                        key={i}
                        imageSource={resource}
                        onClick={e => {
                          this.handleChange(i);
                          console.log(this.props.module.correctPlace)
                          console.log(i+1)
                          console.log(this.state.isCorrect)
                        }}
                      />
                    )}
                  </div>
                </div>

                <svg width="0" height="0">
                  <defs>
                    <clipPath id="myClip">
                      <path
                        className="path-border"
                        d="M228.8,4.5c33.7-9.8,69.6,1,103,11.7c41.9,13.4,98,29.5,127.2,63.2c18.2,19.7,36.7,40.2,48.7,64.2
                          c12,24,17,52.8,7.2,77.7c-7.3,18.5-21.9,33.3-30.2,51.4c-8.8,19.2-9.8,53-13.5,73.8c-3.7,20.8-11.3,42.7-28.7,54.7
                          c-21.4,14.8-50.5,10.1-75.1,1.7c-24.6-8.4-49.5-20-75.4-17.2c-26.1,2.8-49.6,20.1-75.9,20.2c-19.7,0.1-38-9.5-55.1-19.1
                          c-19.3-10.8-39.8-23.6-47.5-44.3c-10.5-28.3,6.9-70.8,25.6-94.5s40.5-48.8,40.2-78.9c-0.2-19.7-10.1-37.9-14-57.1
                          C156.2,67,185,17.2,228.8,4.5z"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </article>
            );
          };

}
export default ImageQuizModule;
