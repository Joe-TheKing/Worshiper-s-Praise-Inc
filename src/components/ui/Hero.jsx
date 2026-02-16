import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

// All cover images for the slideshow
const ALL_COVERS = [
    "/Assets/Pictures/Home Cover.jpg",
    "/Assets/Pictures/About Us Cover.jpg",
    "/Assets/Pictures/Contact Cover.png",
    "/Assets/Pictures/Events Cover.jpg",
    "/Assets/Pictures/Gallery Cover.png",
    "/Assets/Pictures/Music Cover.jpg",
    "/Assets/Pictures/Training Cover.JPG"
];

const Hero = ({ title, description, image, buttonText, buttonLink }) => {
    // If a specific image is passed, make it the first one, then filter it out from the rest to avoid duplicates
    const heroImages = image
        ? [image, ...ALL_COVERS.filter(img => img !== image)]
        : ALL_COVERS;

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [heroImages.length]);

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
            {/* Background Carousel */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode='popLayout'>
                    <motion.img
                        key={currentIndex}
                        src={heroImages[currentIndex]}
                        alt="Hero Background"
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </AnimatePresence>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4">
                <ScrollReveal>
                    <div className="bg-black/30 backdrop-blur-sm p-8 md:p-12 rounded-2xl max-w-3xl mx-auto border border-white/10">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{title}</h1>
                        <p className="text-lg md:text-xl mb-8 drop-shadow-md opacity-90">{description}</p>
                        {buttonText && buttonLink && (
                            <Link to={buttonLink} className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors shadow-lg">
                                {buttonText}
                            </Link>
                        )}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Hero;
