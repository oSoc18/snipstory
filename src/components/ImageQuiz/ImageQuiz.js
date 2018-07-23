import React from 'react';
import './ImageQuiz.css';
import { shuffle } from '../../helpers/RandomHelpers';

export default class ImageQuiz extends React.Component {
  constructor(props) {
    super(props);
    let correct = props.module.resources[0];
    let images = shuffle(props.module.resources);
    this.state = {
      selected: -1,
      images,
      correctIndex: images.indexOf(correct)
    };
  }

  clickImage(selected) {
    if (this.state.selected == -1) {
      this.setState({ selected });
    }
  }

  render() {
    return <div className="imagequiz-root">
      <div>image quiz</div>
      <div className="imagequiz-title"><h2>
        { this.props.module.text }
      </h2></div>
      {this.state.images
        .map((url, i) => {
          let classNames = ['img-choice'];
          if (this.state.selected != -1) {
            if (this.state.correctIndex == i) {
              classNames.push('img-correct');
            }
            else if (this.state.selected == i) {
              classNames.push('img-wrong');
            }
          }
          return <img
            className={classNames.join(' ')}
            onClick={() => this.clickImage(i)}
            key={i}
            src={url} />
        })}
    </div>
  }
}
