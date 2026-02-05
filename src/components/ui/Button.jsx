import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'filled', href, onClick, className = '' }) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-bold transition-all duration-300 transform active:scale-95";

    const variants = {
        filled: "bg-primary text-white shadow-md hover:shadow-lg hover:bg-primary/90",
        tonal: "bg-primary-container text-primary-onContainer hover:bg-primary-container/80",
        outline: "bg-transparent border border-secondary text-primary hover:bg-secondary/5",
        text: "bg-transparent text-primary hover:bg-primary/5"
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        if (href.startsWith('http')) {
            return (
                <motion.a
                    href={href}
                    className={combinedClassName}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {children}
                </motion.a>
            );
        }
        return (
            <Link to={href}>
                <motion.button
                    className={combinedClassName}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {children}
                </motion.button>
            </Link>
        );
    }

    return (
        <motion.button
            className={combinedClassName}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    );
};

export default Button;
