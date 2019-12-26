import React from 'react';
import Dropzone from 'react-dropzone';

import { Track as TrackType } from '../Types';
import TrackBeat from './TrackBeat';

const Track = ({ track, updateTrack, currentBeat } : { track: TrackType, updateTrack: (track: TrackType) => void, currentBeat: number }) => {
    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0)
            return;

        for (let file of acceptedFiles) {
            if (!file)
                continue;

            const reader = new FileReader();

            reader.addEventListener("load", () => {
                const audio = new Audio(reader.result as string);
                track.name = file.name;
                track.audio = audio;
                updateTrack(track);
            }, false);

            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="track">
            <div className="track__info">
                <Dropzone onDrop={onDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <span {...getRootProps()}>
                            <input {...getInputProps()} accept="audio/wav, audio/mpeg" />
                            <span>{ track.name }</span>
                        </span>
                    )}
                </Dropzone>
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
