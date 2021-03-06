import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {withTracker} from 'meteor/react-meteor-data';
import {ReactiveVar} from "meteor/reactive-var";
import {Songs} from "../api/songs";
import Song from "./Song";

const sort = new ReactiveVar({votes: -1});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {sortLabel: "Desc"};
    }

    renderSongs() {
        return this.props.songs.map((song) => (
            <Song key={song._id} song={song}/>
        ));
    }

    addSong(event) {
        event.preventDefault();

        console.log("Here");

        // Find the text field via the React ref
        const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
        const artist = ReactDOM.findDOMNode(this.refs.artist).value.trim();

        Songs.insert({
            title,
            artist,
            votes: 0,
        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.title).value = '';
        ReactDOM.findDOMNode(this.refs.artist).value = '';
    }

    toggleSortOrder() {
        console.log(sort.get());
        sort.get().votes == -1 ? sort.set({votes: 1}) : sort.set({votes: -1});
        this.state.sortLabel === "Desc" ?
            this.setState({
                sortLabel: "Asc"
            }) : this.setState({
                sortLabel: "Desc"
            });
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Welcome to Songs Chart!</h1>
                    <div className="row add-song">
                        <div className="col-md-9 col-md-offset-3">
                            Add new song
                            <form className="form-inline" onSubmit={this.addSong.bind(this)}>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="title" placeholder="Song title"
                                           ref="title"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Artist">Artist</label>
                                    <input type="text" className="form-control" id="artist"
                                           placeholder="Artist" ref="artist"/>
                                </div>
                                <button type="submit" className="btn btn-default">Add
                                    song
                                </button>
                                <span className="badge pull-right"
                                      onClick={this.toggleSortOrder.bind(this)}>Sort {this.state.sortLabel}</span>
                            </form>
                        </div>
                    </div>


                </header>
                <div className="row">
                    {this.renderSongs()}
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        songs: Songs.find({}, {sort: sort.get()}).fetch(),
    };
})(App);