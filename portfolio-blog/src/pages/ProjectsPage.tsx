import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProjectsWithFallback } from '../hooks/useProjectsWithFallback'

const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('全部')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6) // 每页显示6个项目
  const [searchTerm, setSearchTerm] = useState('') // 搜索关键词

  // 从Supabase获取所有项目数据，失败时使用模拟数据
  const { data: allProjects = [], isLoading, error } = useProjectsWithFallback()

  // 处理加载状态
  if (isLoading) {
    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">我的项目</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="bg-gray-700 h-48 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-700 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded mb-4 w-full"></div>
                <div className="h-4 bg-gray-700 rounded mb-4 w-2/3"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-gray-700 rounded w-16"></div>
                  <div className="h-6 bg-gray-700 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 处理错误状态 - 但仍然显示数据（因为有fallback）
  if (error) {
    console.warn('Failed to fetch projects, using fallback data:', error)
  }

  // 按分类和搜索关键词筛选
  const filteredProjects = allProjects.filter(project => {
    // 分类筛选
    const categoryMatch = activeCategory === '全部' || project.category === activeCategory

    // 搜索关键词筛选（不区分大小写）
    const searchMatch = !searchTerm ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))

    return categoryMatch && searchMatch
  })

  // 计算分页数据
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage)

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

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">我的项目</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            展示我在Web开发、移动应用和全栈项目中的技术实践
          </p>
        </div>

        {/* 筛选和搜索 */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('全部')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === '全部'
                ? 'bg-primary-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:transform hover:scale-105'
                }`}
            >
              全部
            </button>
            <button
              onClick={() => handleCategoryChange('React')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === 'React'
                ? 'bg-primary-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:transform hover:scale-105'
                }`}
            >
              React
            </button>
            <button
              onClick={() => handleCategoryChange('TypeScript')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === 'TypeScript'
                ? 'bg-primary-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:transform hover:scale-105'
                }`}
            >
              TypeScript
            </button>
            <button
              onClick={() => handleCategoryChange('Node.js')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === 'Node.js'
                ? 'bg-primary-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:transform hover:scale-105'
                }`}
            >
              Node.js
            </button>
            <button
              onClick={() => handleCategoryChange('其他')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === '其他'
                ? 'bg-primary-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:transform hover:scale-105'
                }`}
            >
              其他
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="搜索项目..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 w-64 transition-colors duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setCurrentPage(1)
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project) => (
            <div key={project.id} className="card hover:shadow-lg transition-shadow">
              <div className="bg-gray-700 h-48 rounded-lg mb-4 overflow-hidden relative cursor-pointer">
                <Link to={`/projects/${project.id}`} className="block w-full h-full">
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSI5Q0EwQTciIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPntwcm9qZWN0LnRpdGxlfTwvdGV4dD4KPC9zdmc+';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-medium">查看详情</span>
                  </div>
                </Link>
              </div>

              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <span className={`px-2 py-1 rounded text-xs ${project.status === 'completed'
                  ? 'bg-green-500 text-white'
                  : project.status === 'in-progress'
                    ? 'bg-yellow-500 text-black'
                    : 'bg-gray-500 text-white'
                  }`}>
                  {project.status === 'completed' ? '已完成' :
                    project.status === 'in-progress' ? '进行中' : '计划中'}
                </span>
              </div>

              <p className="text-gray-400 mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex space-x-3">
                <Link
                  to={`/projects/${project.id}`}
                  className="text-primary-500 hover:text-primary-400 text-sm font-medium"
                >
                  查看详情
                </Link>
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-300 text-sm"
                  >
                    GitHub
                  </a>
                )}
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-300 text-sm"
                  >
                    在线演示
                  </a>
                )}
              </div>
            </div>
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
          第 {currentPage} 页，共 {totalPages} 页，显示 {currentProjects.length} 个项目
          {activeCategory !== '全部' && ` (分类: ${activeCategory})`}
          {searchTerm && ` (搜索: "${searchTerm}")`}
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage