// // import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo和描述 */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">PortfolioBlog</h3>
            <p className="text-gray-400 mb-4">
              一个集个人作品展示和技术博客分享于一体的全栈Web应用，展示开发者的技术能力和项目经验。
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/1314kfzs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="mailto:xsxs0310_2023@qq.com" className="text-gray-400 hover:text-white transition-colors">
                邮箱
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  首页
                </a>
              </li>
              <li>
                <a href="/projects" className="text-gray-400 hover:text-white transition-colors">
                  作品集
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  博客
                </a>
              </li>
            </ul>
          </div>

          {/* 联系信息 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">联系我</h4>
            <ul className="space-y-2 text-gray-400">
              <li>邮箱: xsxs0310_2023@qq.com</li>
              <li>GitHub: github.com/1314kfzs</li>
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 PortfolioBlog. 保留所有权利。
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              使用 React + TypeScript + Tailwind CSS 构建
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer