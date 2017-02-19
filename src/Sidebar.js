import React, {
    Component
} from 'react';
import './Sidebar.css';
import classNames from 'classnames';

var canHandle;

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.toggleCommand = this.toggleCommand.bind(this);
        this.resetClassnames = this.resetClassnames.bind(this);
        this.toggleInverted = this.toggleInverted.bind(this);
        canHandle=false;
    }


    toggleInverted(){
      this.props.toggleInverted();
      this.resetClassnames();
    }

    toggleCommand(command) {
        this.props.toggleCommand(command);
        this.resetClassnames();
    }

    resetClassnames(){
      var buttons = document.getElementsByClassName('button-clear')
      var i;
      for(i = 0; i < buttons.length; i++){
        buttons[i].className = classNames("button-clear", {'Inverted':this.props.inverted});
      }
    }

    handleFocus(button){
      document.getElementById(button).blur();
    }

    render() {

        if(canHandle){
          this.resetClassnames();
        }
        canHandle = true;
        return ( <
            div id="Sidebar"
            className="Sidebar" >
            < button id="boldButton"
            className="button-clear"
            onClick={
                ()=>this.props.toggleCommand('bold')
            }
            onFocus={()=>this.handleFocus('boldButton')}
             > B < /button>

            <button id="italicButton"
            className="button-clear"
            onClick={
                () => this.props.toggleCommand('italic')
            }
            onFocus={()=>this.handleFocus('italicButton')}
            > i < /button> <
            button id="underlineButton"
            className="button-clear"
            onClick={
                () => this.props.toggleCommand('underline')
            }
            onFocus={()=>this.handleFocus('underlineButton')}
             > U < /button>

            <button id="invertButton"
            className="button-clear"
            onClick={this.toggleInverted}
            onFocus={()=>this.handleFocus('invertButton')}
             > INV </button>
            < /div >

        );
    }


}
export default Sidebar;
