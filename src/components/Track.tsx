import React from 'react';
import classNames from 'classnames';

import { Track as TrackType } from '../Types';

const Track = ({ track, updateTrack, currentBeat } : { track: TrackType, updateTrack: (track: TrackType) => void, currentBeat: number }) => {
    return (
        <div className="track">
            <div className="track__info">
                <span>{ track.name }</span>
            </div>
            <div className="track__track">
                { track.beats.map((velocity, i) => 
                    <div
                        className={classNames('track__beat', {
                            'track__beat--selected': velocity > 0,
                            'track__beat--active': currentBeat === i,
                        })}
                        onClick={() => {
                            track.beats[i] = (velocity > 0) ? 0 : 1;
                            updateTrack(track);
                        }} >
                    </div>
                ) }
            </div>
        </div>
    );
}

export default Track;
