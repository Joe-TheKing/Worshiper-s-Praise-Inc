import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ children, autoPlay = false, interval = 5000 }) => {
    const [index, setIndex] = useState(0);
    const [width, setWidth] = useState(0);
    const carouselRef = useRef();
    const x = useMotionValue(0);

    const items = children;
    const count = items.length;

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, [children]);

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % count);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + count) % count);
    };

    // Auto play logic could go here, but keeping it simple for now as per requirement for "swipeable"

    return (
        <div className="relative group">
            <div className="overflow-hidden" ref={carouselRef}>
                <motion.div
                    className="flex cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }} // Simple constraint logic
                    // Real implementation needs more complex index-based sliding for infinite feel or strict paging
                    // For now, let's implement a strict slider using AnimatePresence or just shifting x
                    animate={{ x: `-${index * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            className="min-w-full md:min-w-[33.333%] px-2 box-border"
                        >
                            {item}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                disabled={index === 0} // Disable at start if not infinite
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                disabled={index >= count - (window.innerWidth >= 768 ? 3 : 1)} // Disable logic based on view
            >
                <ChevronRight size={24} />
            </button>

            <div className="flex justify-center gap-2 mt-4">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-primary w-4' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
