import React, {
    Component
} from 'react';
import './App.css';
import ContentEditable from './contentEditable.js';
import Sidebar from './Sidebar.js';
import Mousetrap from './Mousetrap.js';
import classNames from 'classnames';
import Editor from './Editor.js';

var canHandle;

class App extends Component {

    constructor(props) {
        super(props);
        Mousetrap.bind(['command+k', 'ctrl+k'], this.toggleMenu.bind(this));
        Mousetrap.bind(['command+h', 'ctrl+h'], this.toggleInverted.bind(this));
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
        this.onSave();
        this.setState({
            html: evt.target.value
        });
        this.setState({first: false});
    }

    toggleCommand(command){
        document.execCommand(command, false, 0);
    }

    resetClassnames(){
            var sidebar = classNames("Sidebar", {'Hidden': this.state.menuHidden});
            //var content = classNames("Content", {'Inverted': this.state.inverted});
            //var title = classNames("Title", {'Inverted': this.state.inverted});
            var fullpage = classNames("Fullpage", {'Black': this.state.inverted});

            document.getElementById('page').className = fullpage;
            document.getElementById('Sidebar').className = sidebar;
            //document.getElementById('Content').className = content;
            //document.getElementById('Title').className = title;
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
            toggleCommand={this.toggleCommand.bind(this)}
            toggleInverted={this.toggleInverted.bind(this)}
            />
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
