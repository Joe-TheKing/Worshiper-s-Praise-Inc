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
                image="/Assets/Pictures/Home Cover.jpg"
            />

            {/* Donate Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Support Our Ministry</h2>
                        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                            Your generous donations help us continue our mission of spreading the Gospel through music and organizing impactful events.
                        </p>

                        <a
                            href="https://paystack.shop/pay/donate_worshipperspraiseinc"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block px-10 py-5 bg-primary text-white text-xl font-bold rounded-full shadow-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300"
                        >
                            Donate Securely Now
                        </a>
                    </ScrollReveal>
                </div>
            </section>

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
                                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                            <a
                                                href={proposal.downloadUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 font-semibold rounded-full transition-colors ${proposal.buttonStyle}`}
                                            >
                                                Read Online
                                            </a>
                                            <a
                                                href={proposal.downloadUrl}
                                                download
                                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 font-semibold rounded-full transition-colors border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-primary"
                                            >
                                                <Download size={18} /> Download
                                            </a>
                                        </div>
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
