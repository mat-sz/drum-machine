import React from 'react';
import Dropzone from 'react-dropzone';
import uuidv4 from 'uuid/v4';

import { Track as TrackType } from '../Types';

const Upload = ({ addTrack } : { addTrack: (track: TrackType) => void }) => {
    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0)
            return;

        for (let file of acceptedFiles) {
            if (!file)
                continue;

            const reader = new FileReader();

            reader.addEventListener("load", () => {
                const audio = new Audio(reader.result as string);
                const track = {
                    id: uuidv4(),
                    name: file.name,
                    audio: audio,
                    beats: (new Array(16)).fill(0),
                };
                addTrack(track);
            }, false);

            reader.readAsDataURL(file);
        }
    };

    return (
        <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
            <section>
                <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} accept="audio/wav, audio/mpeg" />
                    <p>Drag and drop your audio samples here.</p>
                </div>
            </section>
            )}
        </Dropzone>
    );
}

export default Upload;
