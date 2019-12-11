import React from 'react';
import classNames from 'classnames';

import { Track as TrackType } from '../Types';

const TrackBeat = ({ track, updateTrack, currentBeat, index } : { track: TrackType, updateTrack: (track: TrackType) => void, currentBeat: number, index: number }) => {
    const velocity = track.beats[index];

    return (
        <div
            className={classNames('track__beat', {
                'track__beat--selected': velocity > 0,
                'track__beat--active': currentBeat === index,
            })}
            onClick={() => {
                track.beats[index] = (velocity > 0) ? 0 : 1;
                updateTrack(track);
            }} >
        </div>
    );
}

export default TrackBeat;
