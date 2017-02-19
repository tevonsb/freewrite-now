import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

var titleText = "Welcome to <i>Freewrite</i>...";

var contentText = "Freewrite is a minimalist text editor that lets you focus on whats important, <b>what you're writing. </b>You can easily hide the menu (<i>try hitting command or control + k) </i>and use key strokes to switch between <b>bold (cmd+b), </b><i>italic (cmd+i), </i>or <u>underlined (cmd+u)</u>&nbsp;text!&nbsp;<div>By hitting return, you'll get a nice clean break, easily differentiating paragraphs. And, if you want to work with a darker screen, perhaps its night, try the <i>invert button </i>to the left.&nbsp;</div><div>This editor is a work in progress, so if you have any issues or suggestions, please let me know through github, or by emailing me at tevonsb@stanford.edu. (Soon those will both be live clickable links!)</div><div>Delete this text to get started with your own.&nbsp;</div><div><b><u>Upcoming Features:</u> &nbsp;</b></div><div>-- Saving</div><div>-- Fix button interaction with focus</div><div>-- URL linking</div>";




ReactDOM.render(
  <App
    titleText={titleText}
    contentText={contentText}
  />,
  document.getElementById('root')
);
