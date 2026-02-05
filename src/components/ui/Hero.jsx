import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

const Hero = ({ title, description, image, buttonText, buttonLink }) => {
    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img src={image} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="relative z-10 container mx-auto px-4">
                <ScrollReveal>
                    <div className="bg-black/30 backdrop-blur-sm p-8 md:p-12 rounded-2xl max-w-3xl mx-auto">
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
