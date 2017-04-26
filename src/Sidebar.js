import React, {
    Component
} from 'react';
import './Sidebar.css';
import classNames from 'classnames';
import Utils from './Utils.js';
import Mousetrap from './Mousetrap.js';

let util = new Utils();

var canHandle;
var sel;

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.toggleCommand = this.toggleCommand.bind(this);
        this.resetClassnames = this.resetClassnames.bind(this);
        this.toggleInverted = this.toggleInverted.bind(this);
        this.handleURL = this.handleURL.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
        Mousetrap.bind(['return'], this.handleReturn.bind(this));
        canHandle=false;
        sel = null;
    }

    handleReturn(e){
      if(document.activeElement !== document.getElementById("URLInput")) return;
      if(e.key == "Enter"){
        e.preventDefault();
        this.handleURL();
      }
    }


    componentDidMount(){
      document.getElementById("URLInput").addEventListener('onKeyUp',this.handleURL);
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

    handleList(){
      document.execCommand('insertUnorderedList', false, false);
    }


    handleURL(){
                if(sel !== null){
                  util.restoreSelection(sel);
                  sel = null;
                }else{
                  if(window.getSelection){
                    console.log("asked to save selection");
                    sel = util.saveSelection();
                }
              }
      let input = document.getElementById('URLInput');
      if(input.value!==""){
        document.execCommand("CreateLink", false, "http://"+input.value);
        input.value = "";
      }else{
        document.execCommand("unlink", false, false);
      }

      if(input.className === ""){
        input.className = "Hidden";
      } else {
        input.className="";
      }
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
             <div id="URLDiv">
             <button id="urlButton"
             className="button-clear"
             onClick={this.handleURL}
             onFocus={()=>this.handleFocus('urlButton')}
              > URL </button>
              <input id="URLInput" onKeyPress={this.handleReturn} type="text" placeholder="Enter your URL" className="Hidden"/>

              <button id="listButton"
              className="button-clear"
              onClick={this.handleList}
              onFocus={()=>this.handleFocus('listButton')}
              > LIST </button>
              <button id="fileButton"
                className="button-clear"
                onClick={this.props.newFile}
                onFocus={()=>this.handleFocus('fileButton')}
                > FILE </button>

              </div>



            < /div >

        );
    }


}
export default Sidebar;
