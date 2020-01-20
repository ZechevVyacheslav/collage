import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    files: [],
    imageUploadRef: React.createRef(),
    isHovered: false,
    hoverdElementId: null
  };

  handleImageUpload = event => {
    const file = URL.createObjectURL(event.target.files[0]);
    this.setState({ files: [...this.state.files, file] });
  };

  handleButtonClick = () => {
    this.state.imageUploadRef.current.click();
  };

  handleHoverOn = id => () => {
    this.setState(prevState => ({
      isHovered: !prevState.isHovered,
      hoverdElementId: id
    }));
  };

  handleHoverOff = () => {
    this.setState(prevState => ({
      isHovered: !prevState.isHovered,
      hoverdElementId: null
    }));
  };

  render() {
    const { files, isHovered, hoverdElementId } = this.state;
    const images = !files
      ? null
      : files.map((file, index) => {
          let imageClass;
          if (!isHovered && hoverdElementId === index) {
            imageClass = 'collage__image';
          }
          if (!isHovered && hoverdElementId !== index) {
            imageClass = 'collage__image';
          }
          if (isHovered && hoverdElementId === index) {
            imageClass = 'collage__image';
          }
          if (isHovered && hoverdElementId !== index) {
            imageClass = 'collage__image blured';
          }

          return (
            <img
              key={index}
              className={imageClass}
              onMouseEnter={this.handleHoverOn(index)}
              onMouseLeave={this.handleHoverOff}
              src={file}
            />
          );
        });

    return (
      <div className="App">
        <div className="image-loading">
          <input
            type="file"
            ref={this.state.imageUploadRef}
            onChange={this.handleImageUpload}
          />
          <button onClick={this.handleButtonClick}>Выбрать картинку...</button>
        </div>
        <div className="collage">
          <h1 className="collage__title">Images</h1>
          <div className="collage__images">{images}</div>
        </div>
      </div>
    );
  }
}

export default App;
