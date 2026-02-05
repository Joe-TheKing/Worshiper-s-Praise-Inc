import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ScrollReveal from '../components/ui/ScrollReveal';

// Event data
const events = [
    {
        title: "Annual Praise & Worship Programme",
        date: "December 25, 2025",
        time: "6:00 PM",
        location: "Tamale, Ghana",
        description: "Join us for our annual Worshipper's Praise program, an evening of powerful worship and ministrations.",
        image: "/Assets/Pictures/Events (1).jpg",
        targetDate: new Date('December 25, 2025 18:00:00').getTime()
    }
];

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
        <div className="flex gap-4 justify-start">
            {['days', 'hours', 'minutes', 'seconds'].map(unit => (
                <div key={unit} className="flex flex-col items-center bg-primary/10 rounded-lg p-3">
                    <span className="text-2xl font-bold text-primary">{timeLeft[unit]}</span>
                    <span className="text-xs uppercase tracking-wider text-gray-500">{unit}</span>
                </div>
            ))}
        </div>
    );
};

const EventsPage = () => {
    return (
        <Layout>
            {/* Hero */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/Assets/Pictures/Events (1).jpg" alt="Events" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Events</h1>
                    <p className="text-lg md:text-xl opacity-90 drop-shadow-md">Join us for an unforgettable worship experience.</p>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">Upcoming Events</h2>
                        <div className="space-y-12">
                            {events.map((event, i) => (
                                <div key={i} className="flex flex-col md:flex-row gap-8 items-start bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
                                    <div className="md:w-1/3 h-64 md:h-auto">
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
                                    </div>
                                    <div className="flex-1 p-6 md:p-8">
                                        <h3 className="text-2xl font-bold text-primary mb-4">{event.title}</h3>
                                        <div className="space-y-2 mb-6">
                                            <p className="flex items-center gap-2 text-gray-600">
                                                <Calendar className="w-4 h-4 text-primary" /> {event.date}
                                            </p>
                                            <p className="flex items-center gap-2 text-gray-600">
                                                <Clock className="w-4 h-4 text-primary" /> {event.time}
                                            </p>
                                            <p className="flex items-center gap-2 text-gray-600">
                                                <MapPin className="w-4 h-4 text-primary" /> {event.location}
                                            </p>
                                        </div>
                                        <p className="text-gray-600 mb-6">{event.description}</p>
                                        <Countdown targetDate={event.targetDate} />
                                        <Link to="/contact" className="inline-block mt-6 px-6 py-2.5 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors">Get Tickets</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Get Involved */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Get Involved</h2>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Want to be a part of our events? We're always looking for volunteers and partners.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/contact" className="px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors">Volunteer</Link>
                            <Link to="/contact" className="px-6 py-3 bg-primary/10 text-primary font-semibold rounded-full hover:bg-primary/20 transition-colors">Partner with Us</Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </Layout>
    );
};

export default EventsPage;
