/** @format */

import React from "react";
import PropTypes from "prop-types";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class Meme extends React.Component {
  render() {
    const { randomImg, topText, bottomText, closeModal } = this.props;
    return (
      <div className='modal'>
        <div className='meme'>
          <img
            src={randomImg}
            alt='Meme'
          />
          <h2 className='top'>{topText}</h2>
          <h2 className='bottom'>{bottomText}</h2>
        </div>
        <button onClick={closeModal}>Close</button>
      </div>
    );
  }
}

Meme.propTypes = {
  randomImg: PropTypes.string.isRequired,
  topText: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

class MemeForm extends React.Component {
  render() {
    const {
      topText,
      bottomText,
      fontStyle,
      fontSize,
      fontColor,
      handleChange,
      handleGenerate,
    } = this.props;
    return (
      <div>
        <h1>Random Meme Generator</h1>
        <form
          className='meme-form'
          onSubmit={handleGenerate}>
          <input
            placeholder='Enter Text'
            type='text'
            value={topText}
            name='topText'
            onChange={handleChange}
          />
          <input
            placeholder='Enter Text'
            type='text'
            value={bottomText}
            name='bottomText'
            onChange={handleChange}
          />
          <select
            name='fontStyle'
            value={fontStyle}
            onChange={handleChange}>
            <option value='Arial'>Arial</option>
            <option value='Verdana'>Verdana</option>
            <option value='Georgia'>Georgia</option>
            <option value='Times New Roman'>Times New Roman</option>
            <option value='Courier New'>Courier New</option>
          </select>
          <input
            type='text'
            name='fontSize'
            placeholder='Font Size'
            value={fontSize}
            onChange={handleChange}
          />
          <input
            type='text'
            name='fontColor'
            placeholder='Font Color'
            value={fontColor}
            onChange={handleChange}
          />
          <button onClick={handleGenerate}>Generate</button>
        </form>
      </div>
    );
  }
}

MemeForm.propTypes = {
  topText: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired,
  fontStyle: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleGenerate: PropTypes.func.isRequired,
};

class App extends React.Component {
  state = {
    topText: "",
    bottomText: "",
    allMemeImgs: [],
    randomImg: "",
    fontStyle: "Arial",
    fontSize: "22px",
    fontColor: "#ffffff",
    isModalOpen: false,
  };

  async componentDidMount() {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const content = await response.json();
    this.setState({ allMemeImgs: content.data.memes });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { allMemeImgs } = this.state;
    const randNum = Math.floor(Math.random() * allMemeImgs.length);
    const randMemeImg = allMemeImgs[randNum].url;
    this.setState({ randomImg: randMemeImg });
  };

  handleGenerate = event => {
    event.preventDefault();
    this.handleSubmit(event);
    this.setState({ isModalOpen: true });
  };

  closeModal = event => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const {
      isModalOpen,
      topText,
      bottomText,
      fontStyle,
      fontSize,
      fontColor,
      randomImg,
    } = this.state;

    return (
      <div>
        {!isModalOpen && (
          <MemeForm
            topText={topText}
            bottomText={bottomText}
            fontStyle={fontStyle}
            fontSize={fontSize}
            fontColor={fontColor}
            handleChange={this.handleChange}
            handleGenerate={this.handleGenerate}
          />
        )}
        {isModalOpen && (
          <Meme
            randomImg={randomImg}
            topText={topText}
            bottomText={bottomText}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default App;
