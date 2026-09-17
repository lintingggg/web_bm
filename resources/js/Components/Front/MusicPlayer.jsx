import React, { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, Cast, Repeat, Music } from 'lucide-react';

export default function MusicPlayer({ marsBm }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const total = audioRef.current.duration;
            setCurrentTime(current);
            if (total) {
                setProgress((current / total) * 100);
            }
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleProgressChange = (e) => {
        const value = e.target.value;
        if (audioRef.current) {
            const time = (value / 100) * audioRef.current.duration;
            audioRef.current.currentTime = time;
            setProgress(value);
        }
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full max-w-sm mx-auto p-6 rounded-[2.5rem] bg-white/70 dark:bg-slate-800/60 backdrop-blur-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-white/60 dark:border-slate-700/50 transition-all duration-300">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-1.5">
                    <div className={`w-1 h-3 bg-primary rounded-full transition-all duration-500 ${isPlaying ? 'animate-pulse' : ''}`}></div>
                    <div className={`w-1 h-4 bg-primary rounded-full transition-all duration-500 delay-75 ${isPlaying ? 'animate-pulse' : ''}`}></div>
                    <div className={`w-1 h-2 bg-primary rounded-full transition-all duration-500 delay-150 ${isPlaying ? 'animate-pulse' : ''}`}></div>
                    <span className="text-[10px] font-bold text-primary tracking-widest uppercase ml-1">Now Playing</span>
                </div>
            </div>

            {/* Cover Art */}
            <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden mb-8 shadow-2xl">
                {marsBm?.cover_path ? (
                    <img 
                        src={`/storage/${marsBm.cover_path}`} 
                        alt={marsBm?.title || 'Mars BM Cover'} 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-200 to-primary flex items-center justify-center">
                        <Music className="w-20 h-20 text-white/60 drop-shadow-md" />
                    </div>
                )}
            </div>

            {/* Track Info */}
            <div className="text-center mb-8">
                <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-1">
                    {marsBm?.title || 'Mars Blue Murder'}
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">UKM Fakultas Teknik</p>
            </div>

            {/* Progress Bar (Fake Waveform Style) */}
            <div className="mb-8 group">
                <div className="relative h-6 w-full flex items-center">
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={progress}
                        onChange={handleProgressChange}
                        className="absolute w-full h-1.5 rounded-full appearance-none bg-slate-200 dark:bg-slate-700 outline-none z-10 cursor-pointer accent-primary opacity-0 hover:opacity-100 transition-opacity"
                    />
                    {/* The visual progress bar */}
                    <div className="absolute w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden pointer-events-none">
                        <div 
                            className="h-full bg-primary rounded-full transition-all duration-100" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400 mt-2">
                    <span className="tabular-nums">{formatTime(currentTime)}</span>
                    <span className="tabular-nums">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between px-2">
                <button className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                    <Repeat size={20} />
                </button>
                <button className="text-slate-800 dark:text-white hover:text-primary dark:hover:text-primary transition-colors">
                    <SkipBack size={24} fill="currentColor" />
                </button>
                
                <button 
                    onClick={togglePlay}
                    className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-primary to-orange-400 text-white shadow-[0_8px_25px_-5px_rgba(239,68,68,0.5)] hover:scale-105 hover:shadow-[0_12px_30px_-5px_rgba(239,68,68,0.6)] active:scale-95 transition-all duration-200"
                >
                    {isPlaying ? (
                        <Pause size={28} fill="currentColor" />
                    ) : (
                        <Play size={28} fill="currentColor" className="ml-1" />
                    )}
                </button>

                <button className="text-slate-800 dark:text-white hover:text-primary dark:hover:text-primary transition-colors">
                    <SkipForward size={24} fill="currentColor" />
                </button>
                <button className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                    <Cast size={20} />
                </button>
            </div>

            {marsBm?.audio_path ? (
                <audio 
                    ref={audioRef}
                    src={`/storage/${marsBm.audio_path}`}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                />
            ) : (
                <audio 
                    ref={audioRef}
                    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                />
            )}
        </div>
    );
}
