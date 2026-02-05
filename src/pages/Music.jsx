import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ScrollReveal from '../components/ui/ScrollReveal';

// Albums data with full streaming links
const albums = [
    {
        title: "Hallowed",
        year: "2024",
        description: 'Our latest single "Hallowed".',
        image: "/Assets/Album Art/Hallowed.jpg",
        audioSrc: "/Assets/Preview/Preview - Hallowed - WPI.mpga",
        links: [
            { name: "Spotify", url: "https://open.spotify.com/track/1EsLPqdudynNnaySrdHtIc", icon: "fab fa-spotify" },
            { name: "Apple Music", url: "https://music.apple.com/us/album/hallowed/1854125689?i=1854125692", icon: "fab fa-apple" },
            { name: "Boomplay", url: "https://www.boomplay.com/songs/224085255", icon: "fa-solid fa-music" },
            { name: "YouTube Music", url: "https://music.youtube.com/watch?v=McPOuWHKiSk", icon: "fab fa-youtube" },
        ]
    },
    {
        title: "Mmrane",
        year: "2024",
        description: "A powerful song of praise.",
        image: "/Assets/Album Art/Mmrane.jpg",
        audioSrc: "/Assets/Preview/Preview - Mmrane - WPI.mp3",
        links: [
            { name: "Spotify", url: "https://open.spotify.com/track/5SjbEWhFWZW0UN4egWhMjR", icon: "fab fa-spotify" },
            { name: "Apple Music", url: "https://music.apple.com/us/album/mmrane/1739865216?i=1739865221", icon: "fab fa-apple" },
            { name: "Audiomack", url: "https://audiomack.com/worshippers-praise-inc/song/mmrane", icon: "fa-solid fa-music" },
            { name: "YouTube", url: "https://youtu.be/wbqYYiuGsaY", icon: "fab fa-youtube" },
        ]
    },
    {
        title: "Northern Praise Medley",
        year: "2024",
        description: "A medley of uplifting praise songs from the north.",
        image: "/Assets/Album Art/Northen Praise Medley.jpg",
        audioSrc: "/Assets/Preview/Preview - Northen Praise Medley - WPI.mp3",
        links: [
            { name: "Spotify", url: "https://open.spotify.com/album/50RJIs6DZFT7fBAieZjvKQ", icon: "fab fa-spotify" },
            { name: "Apple Music", url: "https://music.apple.com/gh/album/northern-praise-medley-ep/1762530664", icon: "fab fa-apple" },
            { name: "Audiomack", url: "https://audiomack.com/worshippers-praise-inc/song/northern-praise-medley", icon: "fa-solid fa-music" },
            { name: "YouTube", url: "https://youtu.be/UJryirDMZNU", icon: "fab fa-youtube" },
        ]
    },
];

// Album Card
const AlbumCard = ({ album }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
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
        <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
                <img src={album.image} alt={album.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{album.title}</h3>
                    <p className="text-white/80 text-sm">Released: {album.year}</p>
                </div>
            </div>
            <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">{album.description}</p>
                <button
                    onClick={togglePlay}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 hover:bg-primary/20 transition-colors w-full justify-center"
                >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    <span className="text-sm font-medium">{isPlaying ? 'Pause Snippet' : 'Play Snippet'}</span>
                </button>
                <audio ref={audioRef} src={album.audioSrc} preload="none" />
                <div className="flex flex-wrap gap-2">
                    {album.links.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-3 py-1.5 border border-primary/30 text-primary rounded-full text-xs font-medium hover:bg-primary hover:text-white transition-colors">
                            <i className={link.icon}></i> {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MusicPage = () => {
    return (
        <Layout>
            {/* Hero */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/Assets/Pictures/Cover (5).jpg" alt="Our Music" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Our Music</h1>
                    <p className="text-lg md:text-xl opacity-90 drop-shadow-md">Explore our collection of albums and songs.</p>
                </div>
            </section>

            {/* Discography */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">Discography</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {albums.map((album, i) => <AlbumCard key={i} album={album} />)}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* YouTube Player */}
            <section className="py-20 bg-gray-900">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <div className="aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
                            <iframe
                                src="https://www.youtube.com/embed/UJryirDMZNU?playlist=wbqYYiuGsaY,YSsd4NgdGns,wnojWtmJj6A,x5mWUQoL0G8,nROdcYvTzqs,FGi-vcZEhiE,UJryirDMZNU"
                                title="WPI YouTube Playlist"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full"
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </Layout>
    );
};

export default MusicPage;
