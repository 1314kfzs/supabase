import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProjectWithFallback } from '../hooks/useProjectWithFallback'

const ProjectDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()

    // 从Supabase获取项目详情，失败时使用模拟数据
    const { data: project, isLoading, error } = useProjectWithFallback(id || '')

    // 加载状态
    if (isLoading) {
        return (
            <div className="min-h-screen py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
                        <div className="h-4 bg-gray-700 rounded w-1/2 mb-8"></div>
                        <div className="h-80 bg-gray-700 rounded mb-8"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-4 bg-gray-700 rounded"></div>
                                ))}
                            </div>
                            <div className="lg:col-span-1 space-y-4">
                                <div className="h-20 bg-gray-700 rounded"></div>
                                <div className="h-20 bg-gray-700 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // 错误状态
    if (error || !project) {
        return (
            <div className="min-h-screen py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">项目未找到</h1>
                    <p className="text-gray-400 mb-8">
                        {error ? `加载项目时出错: ${error.message}` : '抱歉，您查找的项目不存在或已被删除。'}
                    </p>
                    <Link to="/projects" className="btn-primary">返回项目列表</Link>
                </div>
            </div>
        )
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed': return '已完成'
            case 'in-progress': return '进行中'
            case 'planning': return '计划中'
            default: return status
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-500'
            case 'in-progress': return 'bg-yellow-500'
            case 'planning': return 'bg-gray-500'
            default: return 'bg-gray-500'
        }
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 返回按钮 */}
                <div className="mb-8">
                    <Link
                        to="/projects"
                        className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        返回项目列表
                    </Link>
                </div>

                {/* 项目头部 */}
                <header className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
                            <div className="flex items-center space-x-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                                    {getStatusText(project.status)}
                                </span>
                                <span className="text-gray-400 text-sm">
                                    {project.start_date} - {project.end_date || '至今'}
                                </span>
                            </div>
                        </div>

                        <div className="flex space-x-4 mt-4 md:mt-0">
                            {project.github_url && (
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </a>
                            )}

                            {project.demo_url && (
                                <a
                                    href={project.demo_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    在线演示
                                </a>
                            )}
                        </div>
                    </div>

                    <p className="text-xl text-gray-300 mb-6">{project.description}</p>
                </header>

                {/* 项目封面图 */}
                <div className="bg-gray-700 h-80 rounded-lg mb-8 overflow-hidden relative">
                    <img
                        src={project.cover_image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSI5Q0EwQTciIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiPntwcm9qZWN0LnRpdGxlfTwvdGV4dD4KPC9zdmc+';
                        }}
                    />
                </div>

                {/* 项目图片轮播 */}
                {project.images && project.images.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-white mb-4">项目截图</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {project.images.map((image, index) => (
                                <div key={index} className="bg-gray-700 rounded-lg overflow-hidden aspect-video">
                                    <img
                                        src={image}
                                        alt={`${project.title} 截图 ${index + 1}`}
                                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                                        onClick={() => {
                                            // 这里可以添加图片放大查看功能
                                            window.open(image, '_blank');
                                        }}
                                        onError={(e) => {
                                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSI5Q0EwQTciIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPnByb2plY3QgaW1hZ2Uge2luZGV4ICsgMX08L3RleHQ+Cjwvc3ZnPg==';
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 项目详情内容 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 主要内容 */}
                    <div className="lg:col-span-2">
                        <article className="prose prose-lg prose-invert max-w-none">
                            <div
                                className="text-gray-300 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: project.detailed_description || '' }}
                            />
                        </article>
                    </div>

                    {/* 侧边栏 */}
                    <div className="lg:col-span-1">
                        <div className="card sticky top-8">
                            <h3 className="text-xl font-semibold text-white mb-4">项目信息</h3>

                            {/* 技术栈 */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-400 mb-3">技术栈</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 项目状态 */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-400 mb-2">项目状态</h4>
                                <div className="flex items-center">
                                    <span className={`w-3 h-3 rounded-full ${getStatusColor(project.status)} mr-2`}></span>
                                    <span className="text-white">{getStatusText(project.status)}</span>
                                </div>
                            </div>

                            {/* 项目周期 */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-400 mb-2">项目周期</h4>
                                <p className="text-white">{project.start_date} - {project.end_date || '至今'}</p>
                            </div>

                            {/* 相关链接 */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-400 mb-3">相关链接</h4>
                                <div className="space-y-2">
                                    {project.github_url && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-primary-500 hover:text-primary-400 text-sm"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            查看源代码
                                        </a>
                                    )}

                                    {project.demo_url && (
                                        <a
                                            href={project.demo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-primary-500 hover:text-primary-400 text-sm"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            在线演示
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetailPage