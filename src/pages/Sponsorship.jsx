import { Download } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ScrollReveal from '../components/ui/ScrollReveal';
import Hero from '../components/ui/Hero';

// Proposal data
const proposals = [
    {
        title: "Individual Sponsorship",
        image: "/Assets/Sponsorship Proposals/POWPI Proposal_pages-to-jpg-0001.jpg",
        downloadUrl: "/Assets/Sponsorship Proposals/POWPI Proposal.pdf",
        buttonStyle: "bg-primary text-white hover:bg-primary/90"
    },
    {
        title: "Organizational Sponsorship",
        image: "/Assets/Sponsorship Proposals/SPONSORSHIP proposal_pages-to-jpg-0001.jpg",
        downloadUrl: "/Assets/Sponsorship Proposals/Sponsorship proposal.pdf",
        buttonStyle: "bg-primary/10 text-primary hover:bg-primary/20"
    }
];

const SponsorshipPage = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <Hero
                title="Partner With Us"
                description="Support our mission to spread the Gospel through music."
                image="/Assets/Pictures/Cover (6).jpg"
            />

            {/* Sponsorship Proposals */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">Sponsorship Proposals</h2>
                        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Download our sponsorship proposals to learn more about how you can partner with us.</p>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {proposals.map((proposal, i) => (
                                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow text-center">
                                    <div className="h-52 overflow-hidden">
                                        <img src={proposal.image} alt={proposal.title} className="w-full h-full object-cover object-top" loading="lazy" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-primary mb-4">{proposal.title}</h3>
                                        <a
                                            href={proposal.downloadUrl}
                                            download
                                            className={`inline-flex items-center gap-2 px-5 py-2.5 font-semibold rounded-full transition-colors ${proposal.buttonStyle}`}
                                        >
                                            <Download size={18} /> Read Proposal
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </Layout>
    );
};

export default SponsorshipPage;
