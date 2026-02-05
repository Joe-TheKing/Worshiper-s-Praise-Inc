import Layout from '../components/layout/Layout';
import ScrollReveal from '../components/ui/ScrollReveal';

const GenericPage = ({ title }) => {
    return (
        <Layout>
            <section className="py-20 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <ScrollReveal>
                        <h1 className="text-4xl font-bold text-primary mb-8">{title}</h1>
                        <p className="text-lg">This page has been migrated to the new React architecture. Content coming soon.</p>
                    </ScrollReveal>
                </div>
            </section>
        </Layout>
    );
};

export default GenericPage;
