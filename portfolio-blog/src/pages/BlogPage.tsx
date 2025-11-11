import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useBlogPostsWithFallback } from '../hooks/useBlogPostsWithFallback'

const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('全部')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(4) // 每页显示4篇文章
  const [searchTerm, setSearchTerm] = useState('') // 搜索关键词

  const categories = ['全部', 'React', 'TypeScript', 'Node.js', '数据库', 'DevOps', '前端']

  // 从Supabase获取所有博客文章数据，失败时使用模拟数据
  const { data: blogPosts = [], isLoading, error } = useBlogPostsWithFallback()

  // 处理加载状态
  if (isLoading) {
    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">技术博客</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="bg-gray-700 h-48 rounded-lg mb-6"></div>
                  <div className="h-6 bg-gray-700 rounded mb-3 w-1/4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-4 w-full"></div>
                  <div className="h-4 bg-gray-700 rounded mb-4 w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 处理错误状态 - 但仍然显示数据（因为有fallback）
  if (error) {
    console.warn('Failed to fetch blog posts, using fallback data:', error)
  }

  // 按分类和搜索关键词筛选
  const filteredPosts = blogPosts.filter(post => {
    // 分类筛选
    const categoryMatch = activeCategory === '全部' || post.tags.includes(activeCategory)

    // 搜索关键词筛选（不区分大小写）
    const searchMatch = !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    return categoryMatch && searchMatch
  })

  // 计算分页数据
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  // 分页切换函数
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      // 滚动到页面顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // 生成页码数组
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  // 分类切换时重置页码
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentPage(1) // 切换到第一页
  }

  // 搜索处理函数
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1) // 搜索时重置到第一页
  }

  // 根据标题生成对应的slug
  const getPostSlug = (title: string) => {
    const slugMap: Record<string, string> = {
      'React Hooks 最佳实践': 'react-hooks-最佳实践',
      'TypeScript 类型系统详解': 'typescript-类型系统详解',
      'Node.js 性能优化指南': 'nodejs-性能优化指南',
      'PostgreSQL 数据库设计模式': 'postgresql-数据库设计模式',
      'Docker容器化部署实战': 'docker容器化部署实战',
      '前端工程化建设指南': '前端工程化建设指南'
    }
    return slugMap[title] || title.toLowerCase().replace(/\s+/g, '-')
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">技术博客</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            分享前端开发、后端架构、DevOps和系统设计等方面的技术见解和实践经验
          </p>
        </div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                  ? 'bg-primary-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:transform hover:scale-105'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 搜索框 */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索博客文章..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors duration-300"
            />
            <div className="absolute right-3 top-3 text-gray-400">
              🔍
            </div>
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setCurrentPage(1)
                }}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 博客文章网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {currentPosts.map((post) => (
            <article key={post.id} className="card hover:shadow-lg transition-shadow">
              <div className="bg-gray-700 h-48 rounded-lg mb-6 overflow-hidden relative cursor-pointer">
                <Link to={`/blog/${getPostSlug(post.title)}`} className="block w-full h-full">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSI5Q0EwQTciIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPntwb3N0LnRpdGxlfTwvdGV4dD4KPC9zdmc+';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-medium">阅读全文</span>
                  </div>
                </Link>
              </div>

              <div className="flex justify-between items-center mb-3">
                <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {post.tags[0] || '技术文章'}
                </span>
                <div className="text-sm text-gray-500">
                  {new Date(post.published_at || post.created_at).toLocaleDateString()} • 5分钟阅读
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 hover:text-primary-500 transition-colors cursor-pointer">
                {post.title}
              </h2>

              <p className="text-gray-400 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                to={`/blog/${getPostSlug(post.title)}`}
                className="text-primary-500 hover:text-primary-400 font-medium"
              >
                阅读全文 →
              </Link>
            </article>
          ))}
        </div>

        {/* 分页 */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`btn-secondary text-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              上一页
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`btn ${currentPage === page ? 'btn-primary' : 'btn-secondary'} text-sm`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`btn-secondary text-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              下一页
            </button>
          </div>
        </div>

        {/* 分页信息 */}
        <div className="text-center mt-4 text-gray-400 text-sm">
          第 {currentPage} 页，共 {totalPages} 页，显示 {currentPosts.length} 篇文章
          {activeCategory !== '全部' && ` (分类: ${activeCategory})`}
          {searchTerm && ` (搜索: "${searchTerm}")`}
        </div>
      </div>
    </div>
  )
}

export default BlogPage