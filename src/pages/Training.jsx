import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ScrollReveal from '../components/ui/ScrollReveal';
import Hero from '../components/ui/Hero';

// Training programs
const programs = [
    {
        title: "Worshipper's Praise Zera",
        description: "Train up a child in the way he should go: and when he is old, he will not depart from it (KJV). Worshipper's Praise Zera is here to train children and youth to grow up with the principles of God's word regarding the Christian walk and ministry.",
        image: "/Assets/Pictures/Training (1).JPG"
    },
    {
        title: "School of Worshippers (SOW)",
        description: "In line with the aims and objectives of the ministry, the school of worshippers is the training hub of the group. Here, members learn the 'Spirit and truth' of Christian music through a robust yet flexible training programme.",
        image: "/Assets/Pictures/Training (2).JPG"
    }
];

const TrainingPage = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <Hero
                title="Training"
                description="Equipping and empowering the next generation of worshippers."
                image="/Assets/Pictures/Training (1).JPG"
            />

            {/* Training Programs */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">Our Training Programs</h2>
                        <div className="space-y-16">
                            {programs.map((program, i) => (
                                <div key={i} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                                    <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-xl">
                                        <img src={program.image} alt={program.title} className="w-full h-64 md:h-80 object-cover" loading="lazy" />
                                    </div>
                                    <div className="md:w-1/2 space-y-4">
                                        <h3 className="text-2xl font-bold text-primary">{program.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{program.description}</p>
                                        <Link to="/contact" className="inline-block px-6 py-2.5 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors">Learn More</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Enroll CTA */}
            <section className="py-20 bg-primary text-white text-center">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Enroll Today</h2>
                        <p className="max-w-2xl mx-auto opacity-90 mb-8">Ready to take the next step in your worship journey? Enroll in one of our training programs today.</p>
                        <Link to="/contact" className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg">Enroll Now</Link>
                    </ScrollReveal>
                </div>
            </section>
        </Layout>
    );
};

export default TrainingPage;
