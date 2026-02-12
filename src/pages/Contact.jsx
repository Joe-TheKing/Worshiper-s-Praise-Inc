import { useState } from 'react';
import { MapPin, Mail, Phone, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ScrollReveal from '../components/ui/ScrollReveal';
import Hero from '../components/ui/Hero';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send to a backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <Layout>
            {/* Hero Section */}
            <Hero
                title="Contact Us"
                description="We'd love to hear from you. Let's connect."
                image="/Assets/Pictures/Contact Cover.png"
            />

            {/* Contact Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                            {/* Contact Form */}
                            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>
                                {submitted ? (
                                    <div className="bg-green-100 text-green-700 p-4 rounded-xl text-center">
                                        <p className="font-semibold">Thank you for your message!</p>
                                        <p className="text-sm mt-2">We'll get back to you as soon as possible.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Your Name"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Your Email"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Your Message"
                                                rows="5"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                            />
                                        </div>
                                        <button type="submit" className="w-full px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors">Send Message</button>
                                    </form>
                                )}
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-8">
                                <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Address</h4>
                                        <p className="text-gray-600">D20, First Road Kalpohin Estates, Diwumda Avenue, NS-369-2047, Tamale, Northern Region, Ghana</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Email</h4>
                                        <p className="text-gray-600">worshipperspraiseinc@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Phone</h4>
                                        <p className="text-gray-600">+233240889450 / +233598994614</p>
                                    </div>
                                </div>

                                {/* Social Media Icons */}
                                <div className="pt-4">
                                    <h4 className="font-semibold text-gray-800 mb-4">Follow Us</h4>
                                    <div className="flex gap-4">
                                        <a href="https://web.facebook.com/wpighana" target="_blank" rel="noreferrer" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                                            <Facebook size={20} />
                                        </a>
                                        <a href="https://www.instagram.com/wpighana" target="_blank" rel="noreferrer" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                                            <Instagram size={20} />
                                        </a>
                                        <a href="https://www.youtube.com/@wpighana" target="_blank" rel="noreferrer" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                                            <Youtube size={20} />
                                        </a>
                                        <a href="https://www.tiktok.com/@wpighana" target="_blank" rel="noreferrer" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                                            <i className="fab fa-tiktok text-lg"></i>
                                        </a>
                                        <a href="https://x.com/wpighana" target="_blank" rel="noreferrer" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                                            <Twitter size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </Layout>
    );
};

export default ContactPage;
