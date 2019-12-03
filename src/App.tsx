import React, { useState, useCallback } from 'react';
import { MdPlayArrow, MdPause, MdStop } from 'react-icons/md';
import useInterval from '@use-it/interval';

import './App.scss';
import { Track } from './Types';
import Tracks from './components/Tracks';
import Upload from './components/Upload';

const App = () => {
    const [ tracks, setTracks ] = useState<Track[]>([]);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ currentBeat, setCurrentBeat ] = useState(0);
    const [ bpm, setBpm ] = useState(128);

    const addTrack = useCallback((track) => {
        setTracks(newTracks => newTracks.concat(track));
    }, [ setTracks ]);

    useInterval(() => {
        if (!isPlaying) return;

        for (let track of tracks) {
            if (track.beats[currentBeat] > 0) {
                const node = track.audio.cloneNode(true) as HTMLAudioElement;
                node.play();
            }
        }

        if (currentBeat >= 15) {
            setCurrentBeat(0);
        } else {
            setCurrentBeat(currentBeat + 1);
        }
    }, (isPlaying ? 60000 / (bpm * 4) : null));

    return (
        <div className="app">
            <div className="controls">
            { !isPlaying ? 
                <button onClick={() => setIsPlaying(true)}>
                    <MdPlayArrow />
                </button>
                : <button onClick={() => {
                    setIsPlaying(false);
                    setCurrentBeat(0);
                }}>
                    <MdStop />
                </button>
            }
                <button onClick={() => setIsPlaying(false)}>
                    <MdPause />
                </button>
                <label>
                    BPM:
                    <input type="number" min="90" max="300" value={bpm}
                    onChange={(event) => setBpm(+event.target.value)} />
                </label>
            </div>

            <Tracks
                tracks={tracks}
                currentBeat={currentBeat}
                updateTrack={(updatedTrack) => {
                    setTracks(tracks.map((track) => {
                        if (track.id === updatedTrack.id) {
                            return updatedTrack;
                        } else {
                            return track;
                        }
                    }))
                }}
            />
            <Upload addTrack={addTrack} />
        </div>
    );
}

export default App;
