import React from 'react';

import { Track as TrackType } from '../Types';
import TrackBeat from './TrackBeat';

const Track = ({ track, updateTrack, currentBeat } : { track: TrackType, updateTrack: (track: TrackType) => void, currentBeat: number }) => {
    return (
        <div className="track">
            <div className="track__info">
                <span>{ track.name }</span>
            </div>
            <div className="track__track">
                { track.beats.map((velocity, i) => 
                    <TrackBeat
                        key={i}
                        index={i}
                        track={track}
                        updateTrack={updateTrack}
                        currentBeat={currentBeat}
                    />
                ) }
            </div>
        </div>
    );
}

export default Track;
