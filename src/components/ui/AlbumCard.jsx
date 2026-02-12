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
            // Pause all other audio elements
            document.querySelectorAll('audio').forEach(audio => {
                if (audio !== audioRef.current) {
                    audio.pause();
                }
            });
            audioRef.current.play();
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handleEnded = () => setIsPlaying(false);
            const handlePause = () => setIsPlaying(false);
            const handlePlay = () => setIsPlaying(true);

            audio.addEventListener('ended', handleEnded);
            audio.addEventListener('pause', handlePause);
            audio.addEventListener('play', handlePlay);

            return () => {
                audio.removeEventListener('ended', handleEnded);
                audio.removeEventListener('pause', handlePause);
                audio.removeEventListener('play', handlePlay);
            };
        }
    }, []);

    return (
        <div className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
            <div className="relative w-full aspect-square overflow-hidden flex-shrink-0">
                <img src={album.image} alt={album.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

            </div>

            {/* Interactive Content - Visible on Hover */}
            {/* Interactive Content - Always Visible with Gradual Blur */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent backdrop-blur-sm [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none" />

            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
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
