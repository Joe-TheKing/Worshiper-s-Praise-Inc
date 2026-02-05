import { motion } from 'framer-motion';

const Card = ({ image, title, subtitle, children, className = '' }) => {
    return (
        <motion.div
            className={`bg-white rounded-lg overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-300 ${className}`}
            whileHover={{ y: -5 }}
        >
            {image && (
                <div className="relative h-64 overflow-hidden">
                    <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />
                </div>
            )}
            <div className="p-6">
                {title && <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>}
                {subtitle && <p className="text-onSurface mb-4 text-sm">{subtitle}</p>}
                {children}
            </div>
        </motion.div>
    );
};

export default Card;
