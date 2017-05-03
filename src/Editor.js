import React, {
    Component
} from 'react';
import './App.css';
import ContentEditable from './contentEditable.js';
import Paragraph from './paragraph.js'

var canHandle;

class Editor extends Component {
  constructor(props){
    super(props);
    canHandle = false;
  }

  setClassName(){
      document.getElementById(this.props.id).className = this.props.className;
  }

  render(){
    if(canHandle){
      this.setClassName();
    }
    canHandle = true;
    return(
    <div>
    <Paragraph content={"Hello there"}></Paragraph>
    <ContentEditable id={this.props.id}
    className={this.props.className}
    disabled={false} // use true to disable edition
    onChange={this.props.onChange} // handle innerHTML change
    html={this.props.html}
    spellCheck={false}
    />
    </div>
  );
}
}

export default Editor;
