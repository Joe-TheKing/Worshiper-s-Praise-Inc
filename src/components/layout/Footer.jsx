import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-dark-gray text-white pt-16 pb-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h4 className="text-tertiary text-xl font-bold mb-4">Worshipper's Praise Inc.</h4>
                    <p className="text-gray-300">A worldwide ministry that turns the hearts of a myriad of people towards Jesus Christ.</p>
                </div>
                <div>
                    <h4 className="text-tertiary text-xl font-bold mb-4">Main Menu</h4>
                    <ul className="space-y-2">
                        <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                        <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/music" className="text-gray-300 hover:text-white transition-colors">Music</Link></li>
                        <li><Link to="/events" className="text-gray-300 hover:text-white transition-colors">Events</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-tertiary text-xl font-bold mb-4">Connect</h4>
                    <div className="flex gap-4">
                        <a href="https://web.facebook.com/wpighana" target="_blank" rel="noreferrer" className="text-white hover:text-tertiary hover:scale-110 transition-all"><Facebook /></a>
                        <a href="https://www.instagram.com/wpighana" target="_blank" rel="noreferrer" className="text-white hover:text-tertiary hover:scale-110 transition-all"><Instagram /></a>
                        <a href="https://www.youtube.com/@wpighana" target="_blank" rel="noreferrer" className="text-white hover:text-tertiary hover:scale-110 transition-all"><Youtube /></a>
                        <a href="https://x.com/wpighana" target="_blank" rel="noreferrer" className="text-white hover:text-tertiary hover:scale-110 transition-all"><Twitter /></a>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
                <p>&copy; 2025 Worshipper's Praise Incorporated. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
