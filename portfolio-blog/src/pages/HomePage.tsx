import React from 'react'
import { Link } from 'react-router-dom'
import { useProfileWithFallback } from '../hooks/useProfileWithFallback'
import { useFeaturedProjectsWithFallback } from '../hooks/useProjectsWithFallback'
import { useLatestBlogPostsWithFallback } from '../hooks/useBlogPostsWithFallback'

const HomePage: React.FC = () => {
  const { data: profile } = useProfileWithFallback()
  const { data: featuredProjects = [] } = useFeaturedProjectsWithFallback()
  const { data: latestBlogPosts = [] } = useLatestBlogPostsWithFallback()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              欢迎来到{profile?.full_name || '施贻鹏'}的
              <span className="text-primary-500"> 作品集与博客</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {profile?.bio || '展示我的技术项目、分享开发经验，记录学习成长之路'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projects" className="btn-primary text-lg px-8 py-3">
                查看作品集
              </Link>
              <Link to="/blog" className="btn-secondary text-lg px-8 py-3">
                阅读博客
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 技能标签云 */}
      {profile?.skills && profile.skills.length > 0 && (
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-12">技术栈</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-700 text-gray-200 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 特色项目预览 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">特色项目</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="card">
                {project.cover_image && (
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="bg-primary-500 text-white px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/projects" className="btn-primary">查看所有项目</Link>
          </div>
        </div>
      </section>

      {/* 最新博客预览 */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">最新博客</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {latestBlogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card hover:scale-105 transition-transform">
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{post.view_count || 0} 次阅读</span>
                  <span>{new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/blog" className="btn-primary">阅读更多文章</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage