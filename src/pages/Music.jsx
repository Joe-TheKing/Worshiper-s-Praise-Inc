import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ScrollReveal from '../components/ui/ScrollReveal';
import Hero from '../components/ui/Hero';
import AlbumCard from '../components/ui/AlbumCard';

// Albums data
const albums = [
    {
        title: "Hallowed",
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

const MusicPage = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <Hero
                title="Our Music"
                description="Explore our collection of albums and songs."
                image="/Assets/Pictures/Cover (5).jpg"
            />

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
