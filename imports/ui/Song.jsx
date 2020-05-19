import React, {Component} from 'react';
import {Songs} from "../api/songs";

export default class Song extends Component {
    deleteThisSong() {
        Songs.remove(this.props.song._id);
    }

    upvoteThisSong() {
        Songs.update(this.props.song._id, {
            $set: {votes: this.props.song.votes + 1}
        })
    }

    downvoteThisSong() {
        Songs.update(this.props.song._id, {
            $set: {votes: this.props.song.votes - 1}
        })
    }

    render() {
        return (
            <div className="col-xs-12">
                <p className="bg-primary h-50 song">
                    <span> {`${this.props.song.title} - ${this.props.song.artist}.`}</span>
                    <button type="button" className="close" aria-hidden="true"
                            onClick={this.deleteThisSong.bind(this)}>&times;</button>
                    <button type="button" className="btn btn-danger pull-right"
                            onClick={this.downvoteThisSong.bind(this)}>Downvote
                    </button>
                    <span className="badge pull-right">{this.props.song.votes}</span>
                    <button type="button" className="btn btn-success pull-right"
                            onClick={this.upvoteThisSong.bind(this)}>Upvote
                    </button>
                </p>
            </div>
        );
    }
}


