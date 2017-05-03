import React, {
    Component
} from 'react';

class Paragraph extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <p contenteditable="true">
      {this.props.content}
      </p>
    );
  }
}

export default Paragraph;
