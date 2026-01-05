import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loadAllContentFilesFromSupabaseOnly } from "@/utils/fileContentUtils";
import { useAuth } from '@/contexts/AuthContext';
interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  published: boolean;
  image?: string;
}
const BlogSection = () => {
  const navigate = useNavigate();
  const {
    isAdmin
  } = useAuth();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        console.log('BlogSection - Loading blog posts from Supabase only...');
        const allPosts = await loadAllContentFilesFromSupabaseOnly('blog');
        console.log('BlogSection - All posts loaded:', allPosts);
        console.log('BlogSection - Number of posts:', allPosts.length);

        // Filter posts based on admin status
        const visiblePosts = isAdmin ? allPosts // Admins see all posts
        : allPosts.filter(post => post.published); // Non-admins only see published posts

        console.log('BlogSection - Visible posts to display:', visiblePosts);
        console.log('BlogSection - Is admin:', isAdmin);

        // Take only the first 3 posts for the homepage
        const recentPosts = visiblePosts.slice(0, 3).map(post => ({
          title: post.title,
          excerpt: post.excerpt || '',
          slug: post.slug,
          date: post.date,
          published: post.published,
          image: post.image
        }));
        console.log('BlogSection - Recent posts for display:', recentPosts);
        setBlogPosts(recentPosts);
      } catch (error) {
        console.error('BlogSection - Error loading blog posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };
    loadBlogPosts();
  }, [isAdmin]);
  const handleBlogClick = () => {
    navigate('/blog');
  };
  const handlePostClick = (slug: string, published: boolean) => {
    // Only allow navigation if published or user is admin
    if (published || isAdmin) {
      navigate(`/blog/${slug}`);
    }
  };
  if (loading) {
    return <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center">
            <p className="text-slate-600">Loading blog posts...</p>
          </div>
        </div>
      </section>;
  }
  return <section className="py-32 bg-blue-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="mb-24">
          <button onClick={handleBlogClick} className="text-orange-600 text-sm font-light tracking-widest uppercase mb-8 hover:text-orange-700 transition-colors cursor-pointer">
            Insights & Analysis
          </button>
          <div className="flex items-end justify-between">
            <h2 className="text-5xl lg:text-6xl font-light leading-tight text-slate-900 max-w-4xl">
              Strategic insights for the
              <span className="block font-semibold text-orange-500">modern enterprise</span>
            </h2>
            {isAdmin && <Button onClick={() => navigate('/blog/new')} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 font-light">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>}
          </div>
        </div>

        {blogPosts.length > 0 ? <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post, index) => <Card key={index} className={`group hover:shadow-2xl transition-all duration-500 border-0 bg-slate-50 rounded-3xl overflow-hidden ${post.published || isAdmin ? 'cursor-pointer' : 'cursor-default'} ${!post.published ? 'opacity-60 border-2 border-dashed border-orange-200 bg-orange-50/30' : ''}`} onClick={() => handlePostClick(post.slug, post.published)}>
                {post.image && <div className="h-48 bg-slate-200 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>}
                <CardHeader className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <CardTitle className={`text-xl font-medium leading-snug ${!post.published ? 'text-slate-500' : 'text-slate-900'}`}>
                      {post.title}
                    </CardTitle>
                    {!post.published && isAdmin && <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full font-medium ml-2">
                        Draft
                      </span>}
                  </div>
                  <CardDescription className={`leading-relaxed text-base font-light ${!post.published ? 'text-slate-400' : 'text-slate-600'}`}>
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-light ${!post.published ? 'text-slate-400' : 'text-slate-500'}`}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                    </span>
                    <Button variant="ghost" className="p-0 h-auto font-light group text-orange-600 hover:text-orange-700">
                      Read More 
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div> : <div className="text-center py-12">
            <p className="text-slate-600 mb-4">No blog posts available yet.</p>
            {isAdmin && <Button onClick={() => navigate('/blog/new')} className="bg-orange-600 hover:bg-orange-700 text-white">
                Create Your First Post
              </Button>}
          </div>}

        <div className="text-center">
          <Button variant="outline" onClick={handleBlogClick} className="border-orange-200 text-orange-600 hover:bg-orange-50 px-8 py-3 font-light">
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>;
};
export default BlogSection;