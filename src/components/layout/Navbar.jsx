import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Music', path: '/music' },
        { name: 'Events', path: '/events' },
        { name: 'Blog', path: '/blog' },
        { name: 'Training', path: '/training' },
        { name: 'Sponsorship', path: '/sponsorship' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-gray shadow-lg py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <img src="/Assets/Logo/wpi white.png" alt="WPI Logo" className="h-10 md:h-12 w-auto transition-transform group-hover:scale-110" />
                    <span className="text-white font-bold text-base md:text-xl hidden sm:inline">Worshipper's Praise Inc</span>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-tertiary ${location.pathname === link.path ? 'text-tertiary' : 'text-white'}`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-white hover:text-tertiary transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={`fixed inset-0 bg-primary/95 flex flex-col items-center justify-center transition-transform duration-500 lg:hidden z-50 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button
                    className="absolute top-6 right-6 text-white hover:text-tertiary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <X size={32} />
                </button>
                <ul className="flex flex-col items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                to={link.path}
                                className={`text-2xl font-bold transition-colors hover:text-tertiary ${location.pathname === link.path ? 'text-tertiary' : 'text-white'}`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
