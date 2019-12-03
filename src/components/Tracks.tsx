import React from 'react';

import { Track as TrackType } from '../Types';
import Track from './Track';

const Tracks = ({ tracks, updateTrack, currentBeat } : { tracks: TrackType[], updateTrack: (track: TrackType) => void, currentBeat: number }) => {
    return (
        <div className="tracks">
            { tracks.map((track) => 
                <Track
                    track={track}
                    updateTrack={updateTrack}
                    currentBeat={currentBeat}
                />
            ) }
        </div>
    );
}

export default Tracks;
