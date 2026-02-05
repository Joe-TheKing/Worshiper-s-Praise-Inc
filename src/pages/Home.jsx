import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ScrollReveal from '../components/ui/ScrollReveal';

// Testimonials data
const testimonials = [
    {
        quote: "Having been groomed in the foundations of my Christian walk and music ministry through Joyful Way Incorporated (JWI), I have, since its beginnings been drawn to the vision and mission of WPI because of its close similarity with that of JWI. My family and I have therefore been humbled and privileged to partner with and support WPI over the years as it has sought to reach the unsaved, especially the youth, through the power of heaven-inspired and scripture-based music. I encourage you to join WPI as a partner as we help wheel the gospel through music, where our feet may not be able to go.",
        author: "Elder Sesime Ahadzi (Kings Christian Ministry, Tamale)"
    },
    {
        quote: "Supporting Worshipper's Praise Incorporated has been a rewarding partnership. Their commitment to excellence, community impact, and spiritual growth aligns perfectly with our values. We're proud to invest in a ministry that truly changes lives.",
        author: "Vincentia (Partner - PIWC, Tamale)"
    },
    {
        quote: "Since 2019 or 2020, I have been involved with WPI, my involvement with WPI has been truly enriching. I'm constantly inspired by the dedication and passion of young men and women who prioritize worshiping Jesus amidst life's challenges. Their commitment is a testament to the power of faith. I've also had the privilege of hosting a few WPI events, and it's been an honor to be part of these uplifting gatherings. Every experience with WPI leaves me inspired, rejuvenated, and filled with the spirit. I will always recommend WPI events for anyone out there",
        author: "God's Darling Boy (Radio Tamale)"
    },
    {
        quote: "Over the years, it has been marvelous seeing God's glory revealed through his servants and through the beauty of fellowship in music, Word and prayer. My faith has been strengthened and my life have seen improvements in diverse ways. I have witnessed high school students worship God and give their lives to Christ at the high school outreaches held by WPI (The Mark 16:15 project). I have been blessed with associates who inspire me and challenge me to grow in God and keep holding on to the faith. From 2016 till now, I have been so blessed and felt loved through the awesome ministry of WPI.",
        author: "Priscilla Edem Hattoh - WPI member"
    }
];

// Albums data
const albums = [
    {
        title: "Hallowed",
        description: 'Listen to our latest release "Hallowed".',
        image: "/Assets/Album Art/Hallowed.jpg",
        audioSrc: "/Assets/Preview/Preview - Hallowed - WPI.mpga",
        links: {
            spotify: "https://open.spotify.com/track/1EsLPqdudynNnaySrdHtIc",
            apple: "https://music.apple.com/us/album/hallowed/1854125689?i=1854125692"
        }
    },
    {
        title: "Mmrane",
        description: "Listen to our latest single, a powerful song of praise.",
        image: "/Assets/Album Art/Mmrane.jpg",
        audioSrc: "/Assets/Preview/Preview - Mmrane - WPI.mp3",
        links: {
            spotify: "https://open.spotify.com/track/5SjbEWhFWZW0UN4egWhMjR"
        }
    },
    {
        title: "Northern Praise Medley",
        description: "A medley of uplifting praise songs from the north.",
        image: "/Assets/Album Art/Northen Praise Medley.jpg",
        audioSrc: "/Assets/Preview/Preview - Northen Praise Medley - WPI.mp3",
        links: {
            spotify: "https://open.spotify.com/album/50RJIs6DZFT7fBAieZjvKQ"
        }
    }
];

// Album Card Component
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
            audio.addEventListener('ended', () => setIsPlaying(false));
            return () => audio.removeEventListener('ended', () => setIsPlaying(false));
        }
    }, []);

    return (
        <div className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative h-64 overflow-hidden">
                <img src={album.image} alt={album.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{album.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{album.description}</p>
                <button
                    onClick={togglePlay}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 hover:bg-primary/20 transition-colors"
                >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    <span className="text-sm font-medium">{isPlaying ? 'Pause' : 'Play Snippet'}</span>
                </button>
                <audio ref={audioRef} src={album.audioSrc} preload="none" />
                <div className="flex flex-wrap gap-2">
                    {album.links.spotify && (
                        <a href={album.links.spotify} target="_blank" rel="noreferrer" className="px-3 py-1.5 border border-primary/30 text-primary rounded-full text-xs font-medium hover:bg-primary hover:text-white transition-colors">
                            <i className="fab fa-spotify mr-1"></i> Spotify
                        </a>
                    )}
                    {album.links.apple && (
                        <a href={album.links.apple} target="_blank" rel="noreferrer" className="px-3 py-1.5 border border-primary/30 text-primary rounded-full text-xs font-medium hover:bg-primary hover:text-white transition-colors">
                            <i className="fab fa-apple mr-1"></i> Apple
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

// Countdown Component
const Countdown = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: false });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            if (distance < 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: true });
                clearInterval(interval);
                return;
            }
            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
                passed: false
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    if (timeLeft.passed) {
        return <p className="text-xl font-bold text-tertiary">Event has passed</p>;
    }

    return (
        <div className="flex gap-4 justify-center text-white">
            {['days', 'hours', 'minutes', 'seconds'].map(unit => (
                <div key={unit} className="flex flex-col items-center">
                    <span className="text-3xl md:text-4xl font-bold">{timeLeft[unit]}</span>
                    <span className="text-xs uppercase tracking-wider opacity-80">{unit}</span>
                </div>
            ))}
        </div>
    );
};

// Main HomePage Component
const HomePage = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const eventDate = new Date('December 25, 2025 18:00:00').getTime();

    const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/Assets/Pictures/Cover (2).jpg" alt="Worshipper's Praise Inc" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative z-10 container mx-auto px-4">
                    <ScrollReveal>
                        <div className="bg-black/30 backdrop-blur-sm p-8 md:p-12 rounded-2xl max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Spreading the Gospel Through Music</h1>
                            <p className="text-lg md:text-xl mb-8 drop-shadow-md opacity-90">Join us in our mission to bring souls to Christ through praise and worship.</p>
                            <Link to="/about" className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors shadow-lg">Learn More</Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Who We Are */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Who We Are</h2>
                        <p className="max-w-2xl mx-auto text-gray-600 text-lg mb-8">
                            Worshipper's Praise Incorporated is a Contemporary Christian non-denominational evangelistic group dedicated to spreading the gospel through music. Learn more about our vision, mission, and history.
                        </p>
                        <Link to="/about" className="inline-block px-6 py-2.5 bg-primary/10 text-primary font-semibold rounded-full hover:bg-primary/20 transition-colors">Learn More</Link>
                    </ScrollReveal>
                </div>
            </section>

            {/* Featured Music */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">Featured Music</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {albums.map((album, i) => <AlbumCard key={i} album={album} />)}
                        </div>
                        <div className="text-center mt-12">
                            <Link to="/music" className="inline-block px-6 py-2.5 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-colors">View All Music</Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Upcoming Event Highlight */}
            <section className="py-20 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">Upcoming Event Highlight</h2>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
                            <h3 className="text-2xl font-bold mb-4">Annual Praise & Worship Programme</h3>
                            <p className="opacity-90 mb-6">Join us for our annual Worshipper's Praise program, an evening of powerful worship and ministrations.</p>
                            <Countdown targetDate={eventDate} />
                            <Link to="/events" className="inline-block mt-8 px-6 py-2.5 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-primary transition-colors">View All Events</Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">What People Are Saying</h2>
                        <div className="relative max-w-3xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 min-h-[300px] flex flex-col justify-center">
                                <p className="text-gray-600 text-lg italic mb-6 leading-relaxed">"{testimonials[currentTestimonial].quote}"</p>
                                <cite className="text-primary font-semibold not-italic">- {testimonials[currentTestimonial].author}</cite>
                            </div>
                            <button onClick={prevTestimonial} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={nextTestimonial} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-20 bg-on-surface text-white">
                <div className="container mx-auto px-4 text-center">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to our Newsletter</h2>
                        <p className="opacity-80 mb-8">Stay updated with events, music, and resources.</p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary" />
                            <button type="submit" className="px-6 py-3 bg-tertiary text-white font-bold rounded-full hover:bg-tertiary/90 transition-colors">Subscribe</button>
                        </form>
                    </ScrollReveal>
                </div>
            </section>
        </Layout>
    );
};

export default HomePage;
