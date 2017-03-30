import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

var titleText = "Welcome to <i>Freewrite</i>...";

var contentText = "<div>Freewrite is a minimalist text editor that lets you focus on whats important, <b>what you're writing. </b>You can easily hide the menu (<i>try hitting command or control + k) </i>and use key strokes to switch between <b>bold (cmd+b), </b><i>italic (cmd+i), </i>or <u>underlined (cmd+u)</u>&nbsp;text! Command + j will invert the colors of the editor, making it easier to focus at night.<div>By hitting return, you'll get a nice clean break, easily differentiating paragraphs. And, if you want to work with a darker screen, perhaps its night, try the <i>invert button </i>to the left.&nbsp;</div><div>This editor is a work in progress, so if you have any issues or suggestions, please let me know through github, or by emailing me at tevonsb@stanford.edu. (Soon those will both be live clickable links!)</div><div>The purpose of this editor is to provide a platform from which to experiment with Typography 3.0. Over the next few months I will be adding features that allow you to quickly contexualize what you are writing, predictive text that will allow you to write like a give author (think shakespeare or hemmingway), and I'm currently working on the ability to go beyond just links, making reading a less linear activity. Let me know at the email above if you have any other questions!</div><div>Delete this text to get started with your own.&nbsp;</div><div><b><u>Upcoming Features:</u> &nbsp;</b></div><div>-- Predictive text, uses all the works of a given author to predict what they would say next (uses weighted sums or an unrolled, regressive neural net).</div><div>-- None linear paragraphs (ability to show or hide given paragraphs based on the readers wishes).</div></div>";




ReactDOM.render(
  <App
    titleText={titleText}
    contentText={contentText}
  />,
  document.getElementById('root')
);
