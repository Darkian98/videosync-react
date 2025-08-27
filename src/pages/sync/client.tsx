import LayoutSyncClient from 'src/layouts/sync/client/layout';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { button } from '../../theme/core/components/button';
import { useEffect, useRef, useState } from 'react';

interface ILayoutSection {
    children: (props: { language: string }) => React.ReactNode;
}

export default function Page() {
    const [playing, setPlaying] = useState(false)
    const [hostPause, setHostPause] = useState(false)
    const audioRef = useRef<any>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = async () => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            const res = await fetch(`http://localhost:8000/sync/resync/101`);
            const data = await res.json();

            if (audioRef.current) {
                audioRef.current.currentTime = data.currentTime;
                if (data.isPlaying) {
                    audioRef.current.play();
                    setPlaying(true);
                } else {
                    console.log('entra', data)
                    setPlaying(true);
                    setHostPause(true);
                }
            }
        } else {
            audioRef.current.pause();
            setPlaying(false);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
        };
    }, []);

    useEffect(() => {
        const es = new EventSource(`http://localhost:8000/sync/client/101`);

        es.onmessage = (event) => {
            const { action, time } = JSON.parse(event.data);
            setCurrentTime(time);

            if (action === "pause") {
                setHostPause(true)
            } else {
                setHostPause(false)
            }

            if (audioRef.current) {
                audioRef.current.currentTime = time;
                if (action === "play") {
                    audioRef.current.play();
                }
                else {
                    audioRef.current.pause();
                }
            }
        };

        return () => es.close();
    }, []);

    return (
        <LayoutSyncClient>
            {({ language }) => {
                return (

                    <div className="flex h-full items-center justify-center w-full">
                        {/* <h1>Idioma seleccionado: {language}</h1> */}
                        {/* <AudioSync language={language} /> */}
                        <audio ref={audioRef} src={`/test/${language}.mp3`} />

                        <div>
                            {!playing ?
                                <div className='flex items-center justify-center'>
                                    <button onClick={togglePlay} className='bg-white rounded-full p-1.5' type='button'>
                                        <PlayArrowIcon sx={{ color: "black" }} fontSize='large' />
                                    </button>
                                </div>
                                :
                                <div className='space-y-3'>
                                    <div className='flex items-center justify-center'>
                                        <button onClick={togglePlay} className='bg-white rounded-full p-1.5' type='button'>
                                            <StopIcon sx={{ color: "black" }} fontSize='large' />
                                        </button>
                                    </div>
                                    {hostPause && <div className='flex justify-center'>
                                        <div className='bg-black/80 text-white w-fit py-2 px-1 rounded-lg'>
                                            El host ha pausado el video
                                        </div>
                                    </div>}

                                    <ProgressBar currentTime={currentTime} duration={duration} />
                                </div>

                            }
                        </div>
                    </div>
                )
            }}
        </LayoutSyncClient>
    );
}

const ProgressBar = ({ currentTime, duration }: any) => {
    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className='sm:w-[30vw] w-[90vw]'>
            <div className="relative w-full h-1 bg-white/30 rounded-full">
                <div
                    className="absolute h-1 bg-white rounded-full"
                    style={{ width: `${progress}%` }} // porcentaje de progreso
                ></div>
                <div
                    className="absolute -top-1 w-3 h-3 bg-white rounded-full shadow-lg -translate-x-1/2"
                    style={{ left: `${progress}%` }}
                ></div>
                <div className="py-1 text-end">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>
            </div>
        </div>

    );
}



const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};