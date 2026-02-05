import { Link } from 'react-router-dom';
import { Calendar, User, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ScrollReveal from '../components/ui/ScrollReveal';
import Hero from '../components/ui/Hero';

// Blog posts data
const posts = [
    {
        title: "Our Latest Event Was a Huge Success!",
        date: "October 8, 2025",
        author: "Admin",
        excerpt: "We are overjoyed to share that our recent annual praise and worship program was a massive success! The event was filled with powerful ministrations, heartfelt worship, and an overwhelming sense of God's presence. We are grateful to everyone who attended and supported us. Stay tuned for more events like this in the future!",
        image: "/Assets/Pictures/Events (5).jpg"
    },
    {
        title: "A Look into Our Ministry",
        date: "September 25, 2025",
        author: "Admin",
        excerpt: "Worshipper's Praise Incorporated is more than just a music group; we are a family of believers dedicated to spreading the gospel. In this post, we share a deeper look into our ministry, our values, and the vision that drives us. We invite you to learn more about our journey and how you can be a part of it.",
        image: "/Assets/Pictures/About Us (3).JPG"
    }
];

// Categories
const categories = ["Music", "Events", "Outreach", "Testimonies"];

// Recent Posts
const recentPosts = [
    "Our Latest Event Was a Huge Success!",
    "A Look into Our Ministry"
];

const BlogPage = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <Hero
                title="Blog"
                description="Get the latest news, updates, and stories."
                image="/Assets/Pictures/Cover (6).jpg"
            />

            {/* Blog Content */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Main Content */}
                            <main className="flex-1">
                                <div className="space-y-12">
                                    {posts.map((post, i) => (
                                        <article key={i} className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                            <div className="h-64 overflow-hidden">
                                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
                                            </div>
                                            <div className="p-6 md:p-8">
                                                <h2 className="text-2xl font-bold text-primary mb-4 hover:text-primary/80 cursor-pointer transition-colors">{post.title}</h2>
                                                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" /> {post.date}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-4 h-4" /> By {post.author}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>
                                                <Link to="#" className="inline-block px-5 py-2 bg-primary/10 text-primary font-semibold rounded-full hover:bg-primary/20 transition-colors">Read More</Link>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="flex justify-center gap-2 mt-12">
                                    {[1, 2, 3].map(page => (
                                        <button key={page} className={`w-10 h-10 rounded-full font-semibold transition-colors ${page === 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                            {page}
                                        </button>
                                    ))}
                                </div>
                            </main>

                            {/* Sidebar */}
                            <aside className="lg:w-80 space-y-8">
                                {/* Search */}
                                <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-bold text-primary mb-4">Search</h3>
                                    <form className="flex">
                                        <input type="search" placeholder="Search..." className="flex-1 px-4 py-2 rounded-l-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary" />
                                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-r-full hover:bg-primary/90 transition-colors">
                                            <Search className="w-4 h-4" />
                                        </button>
                                    </form>
                                </div>

                                {/* Categories */}
                                <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-bold text-primary mb-4">Categories</h3>
                                    <ul className="space-y-2">
                                        {categories.map((cat, i) => (
                                            <li key={i}>
                                                <Link to="#" className="text-gray-600 hover:text-primary transition-colors">{cat}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Recent Posts */}
                                <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-bold text-primary mb-4">Recent Posts</h3>
                                    <ul className="space-y-2">
                                        {recentPosts.map((title, i) => (
                                            <li key={i}>
                                                <Link to="#" className="text-gray-600 hover:text-primary transition-colors">{title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </Layout>
    );
};

export default BlogPage;
