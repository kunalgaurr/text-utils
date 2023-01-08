import React, { useState } from 'react';

export default function TextForm(props) {
  const [text, setText] = useState('');

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert('Converted To UpperCase', 'primary');
    if (text.length === 0) {
      props.showAlert('Please enter a text first', 'danger');
    }
  };

  const handleDownClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert('Converted To LowerCase', 'primary');
  };

  const handleClearText = () => {
    let newText = '';
    setText(newText);
    props.showAlert('Text Cleared', 'primary');
  };

  const handleSpeechClick = () => {
    const synth = window.speechSynthesis;
    let ourText = text;
    const utterThis = new SpeechSynthesisUtterance(ourText);

    synth.speak(utterThis);
    props.showAlert('Speaking Now', 'primary');
  };

  const handleCopyClick = () => {
    var copyText = document.getElementById('myBox');
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    props.showAlert('Copied to clipboard', 'primary');
  };
  const handleRemoveSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(' '));
    props.showAlert('Removed extra spaces', 'primary');
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="container my-4">
        <div className="mb-3">
          <h1>{props.heading}</h1>
          <textarea
            className="form-control"
            id="myBox"
            rows="8"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === 'light' ? 'white' : '#212529',
              color: props.mode === 'light' ? '#212519' : 'white',
            }}
          ></textarea>
        </div>
        <button className="btn btn-primary" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary" onClick={handleDownClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary" onClick={handleClearText}>
          Clear Text
        </button>
        <button className="btn btn-primary" onClick={handleSpeechClick}>
          Text to speech
        </button>
        <button className="btn btn-primary" onClick={handleCopyClick}>
          Copy the Text
        </button>
        <button className="btn btn-primary" onClick={handleRemoveSpaces}>
          Remove extra spaces
        </button>
      </div>
      <div className="container my-3">
        <h2>Your Text Summary</h2>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }{' '}
          words, {text.length} characters
        </p>
        <p>
          {0.008 *
            text.split(' ').filter((element) => {
              return element.length !== 0;
            }).length}{' '}
          Minutes to read
        </p>
        <h2>Preview</h2>
        <p>
          {text.length > 0 ? text : 'Please enter someting to preview it here.'}
        </p>
      </div>
    </>
  );
}
