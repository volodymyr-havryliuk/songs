import React, {Component} from 'react';
import Song from "./Song";

export default class App extends Component {
    getSongs() {
        return [
            {_id: 1, title: 'Buddy Holly', artist: 'Weezer', votes: 10},
            {_id: 2, title: 'Miss You', artist: 'The Rolling Stones', votes: 8},
            {_id: 3, title: 'The Rising', artist: 'Bruce Springsteen', votes: 3},
        ];
    }

    renderSongs() {
        return this.getSongs().map((song) => (
            <Song key={song._id} song={song}/>
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Welcome to Songs Chart!</h1>
                </header>
                <div className="row">
                    {this.renderSongs()}
                </div>
            </div>
        );
    }
}
