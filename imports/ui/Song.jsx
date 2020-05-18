import React, {Component} from 'react';

export default class Song extends Component {
    render() {
        return (
            <div className="col-xs-12">
                <p className="bg-primary h-50 song">
                    <span> {`${this.props.song.title} - ${this.props.song.artist}.`}</span>
                    <span className="badge pull-right">{this.props.song.votes}</span>
                    <button type="button" className="btn btn-danger pull-right">Downvote</button>
                    <button type="button" className="btn btn-success pull-right">Upvote</button>
                </p>
            </div>
        );
    }
}


