import React, {
    Component
} from 'react';
import './App.css';
import ContentEditable from './contentEditable.js';
import Sidebar from './Sidebar.js';
import Mousetrap from './Mousetrap.js';
import classNames from 'classnames';
import Editor from './Editor.js';
import Utils from './Utils.js';

var canHandle;


class App extends Component {

    constructor(props) {
        super(props);
        Mousetrap.stopCallback = function(){return false;}
        Mousetrap.bind(['command+k', 'ctrl+k'], this.toggleMenu.bind(this));
        Mousetrap.bind(['command+j', 'ctrl+j'], this.toggleInverted.bind(this));
        Mousetrap.bind(['command+u', 'ctrl+u'], function(){document.execCommand('underline');});
        Mousetrap.bind(['command+l', 'ctrl+l'], this.addList.bind(this));
        Mousetrap.bind(['tab'], this.handleTab.bind(this));
        this.state = {
            titlehtml: this.props.titleText,
            html: this.props.contentText,
            inverted: false,
            menuHidden: false,
            sidebarClassName: "Sidebar",
            fullpageClassName: "Fullpage",
            contentClassName: "Content",
            titleClassName: "Title",
        }

        //Setting up bindings.
        this.toggleMenu = this.toggleMenu.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.contentChange = this.titleChange.bind(this);
        this.toggleInverted = this.toggleInverted.bind(this);
        canHandle=false;
        this.sel = null;
    }

    handleUnindent(e){
      console.log("fired unindent");
      e.preventDefault();
      document.execCommand('unindent', false, false);
    }

    addList(e){
      e.preventDefault();
      document.execCommand('insertUnorderedList');
    }

    newFile(){
      var input = document.getElementById('fileModal');
      var filename = input.value;
      
      if(input.style.display === 'block'){
        input.style.display = 'none';
      }else{
        input.style.display = 'block';
      }
    }


    handleTab(e){
      console.log("hitting tab...");
      e.preventDefault();
      document.execCommand('indent', false, false);
    }

    //Deals with saving etc
    componentWillMount(){
      this.setState({inverted: false, menuHidden: false});
      if(window.localStorage.getItem("content")!=undefined){
        this.setState({html: window.localStorage.getItem("content")});
      }
      if(window.localStorage.getItem("title")!=undefined){
        this.setState({titlehtml: window.localStorage.getItem("title")});
      }
    }

    onSave(){
      window.localStorage.setItem("content", document.getElementById('Content').innerHTML);
      window.localStorage.setItem("title", document.getElementById('Title').innerHTML);
    }

    toggleMenu(){
    if(this.state.menuHidden){
      this.setState({menuHidden: false});
    } else {
      this.setState({menuHidden: true});
    }
    }

    titleChange(evt) {
      this.onSave();
    }

    toggleInverted() {
      if(this.state.inverted){
        this.setState({inverted: false});
      } else{
        this.setState({inverted: true});
      }
    }

    contentChange(evt) {
      console.log("contentChange");
        this.onSave();
        this.setState({
            html: evt.target.value
        });
        this.getTypedText();
    }

    getTypedText(){
       var node = document.getSelection().anchorNode;
       console.log(node.textContent);
       node.textContent = "Hello there!";
    }

    handleURL(){
    }


    toggleCommand(command){
        document.execCommand(command, false, 0);
    }

    resetClassnames(){
            var sidebar = classNames("Sidebar", {'Hidden': this.state.menuHidden});
            var fullpage = classNames("Fullpage", {'Black': this.state.inverted});
            document.getElementById('page').className = fullpage;
            document.getElementById('Sidebar').className = sidebar;
    }

    handleReturn(e){
      if(document.activeElement !== document.getElementById("fileInput")) return;
      if(e.key == "Enter"){
        e.preventDefault();
        this.newFile();
      }
    }



    render() {
      if(canHandle){
        this.resetClassnames();
      }
      canHandle = true;
        return ( <
            div id="App"
            className="App" >

            <Sidebar className={this.state.inverted ? "Sidebar Hidden":"Sidebar"}
            inverted={this.state.inverted}
            handleURL={this.handleURL}
            toggleCommand={this.toggleCommand.bind(this)}
            toggleInverted={this.toggleInverted.bind(this)}
            newFile={this.newFile.bind(this)}
            />

            <div id="modalWrapper">
            <div className="FileModal" id="fileModal">
            <input id="fileInput" type="text" onKeyPress={this.handleReturn} placeholder="Enter your FileName" className="FileInput"/>
            </div>
            </div>
            <div className = "Margin-wrapper" >

            <Editor id="Title"
            inverted={this.state.inverted}
            className={this.state.inverted?"Title Inverted": "Title"}
            html={this.state.titlehtml} // innerHTML of the editable div
            disabled={false} // use true to disable edition
            onChange={this.titleChange}
            />

            <Editor id="Content"
            inverted={this.state.inverted}
            className={this.state.inverted?"Content Inverted": "Content"}
            html={this.state.html} // innerHTML of the editable div
            disabled={false} // use true to disable edition
            onChange={this.contentChange} // handle innerHTML change
            />
            </div>
            </div>
        );
    }
}

export default App;
