import { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const AlbumCard = ({ album }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handleEnded = () => setIsPlaying(false);
            audio.addEventListener('ended', handleEnded);
            return () => audio.removeEventListener('ended', handleEnded);
        }
    }, []);

    return (
        <div className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col">
            <div className="relative w-full aspect-square overflow-hidden flex-shrink-0">
                <img src={album.image} alt={album.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white transition-transform duration-500 group-hover:-translate-y-2">{album.title}</h3>
                </div>
            </div>

            {/* Interactive Content - Visible on Hover */}
            <div className="absolute inset-0 bg-gray-900/80 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6 drop-shadow-md">{album.title}</h3>

                <button
                    onClick={togglePlay}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-full mb-6 hover:bg-gray-100 transition-all w-full justify-center group/btn shadow-lg"
                >
                    {isPlaying ? <Pause size={20} className="fill-primary" /> : <Play size={20} className="fill-primary" />}
                    <span className="text-sm font-bold uppercase tracking-wider">{isPlaying ? 'Playing Snippet' : 'Play Snippet'}</span>
                </button>

                <audio ref={audioRef} src={album.audioSrc} preload="none" />

                <div className="space-y-3">
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-2">Available On</p>
                    <div className="flex flex-wrap gap-2">
                        {album.links.map ? (
                            album.links.map((link, i) => (
                                <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 border border-white/30 text-white rounded-full text-xs font-semibold hover:bg-white hover:text-primary hover:border-white transition-all duration-300">
                                    <i className={link.icon}></i> {link.name}
                                </a>
                            ))
                        ) : (
                            // Fallback for homepage data format
                            <>
                                {album.links.spotify && (
                                    <a href={album.links.spotify} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 border border-white/30 text-white rounded-full text-xs font-semibold hover:bg-white hover:text-primary hover:border-white transition-all">
                                        <i className="fab fa-spotify"></i> Spotify
                                    </a>
                                )}
                                {album.links.apple && (
                                    <a href={album.links.apple} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 border border-white/30 text-white rounded-full text-xs font-semibold hover:bg-white hover:text-primary hover:border-white transition-all">
                                        <i className="fab fa-apple"></i> Apple
                                    </a>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlbumCard;
