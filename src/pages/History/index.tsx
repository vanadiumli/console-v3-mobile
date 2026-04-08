import React, { useState } from 'react';
import { Search, MoreHorizontal, LayoutGrid, List, MessageSquare, Image as ImageIcon, Calendar, Filter, Star } from 'lucide-react';

const historyData = [
  { id: 1, title: '体验中心 设计进展', time: '12月12日 21:02', type: 'language' },
  { id: 2, title: '询问我是什么模型', time: '12月12日 21:02', type: 'language' },
  { id: 3, title: '干眼症怎么治及规则', time: '12月12日 21:02', type: 'language' },
  { id: 5, title: '写一封条理清晰的商务邮件', time: '12月12日 21:02', type: 'language' },
  { id: 6, title: '唐宋八大家无李白的原因', time: '12月12日 21:02', type: 'language' },
  { id: 7, title: '蛋黄颜色与营养的关系', time: '12月12日 21:02', type: 'language' },
  { id: 8, title: '提升睡眠质量的习惯', time: '12月12日 21:02', type: 'language' },
];

const visionHistoryData = [
  {
    date: '01月2日',
    images: [
      { id: 101, url: 'https://picsum.photos/400/400?random=1' }
    ]
  },
  {
    date: '2025年 12月11日 21:02',
    images: Array.from({ length: 15 }).map((_, i) => ({
      id: 200 + i,
      url: `https://picsum.photos/400/400?random=${i + 2}`
    }))
  }
];

const History: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = historyData.filter(item => {
    if (activeTab !== 'all' && item.type !== activeTab) return false;
    if (searchQuery && !item.title.includes(searchQuery)) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="px-4 pt-6 pb-2 bg-white z-10 sticky top-0 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">全部历史对话</h1>
        
        {/* Search (Hide when vision is selected) */}
        {activeTab !== 'vision' && (
          <div className="bg-gray-50 rounded-xl flex items-center p-2.5 border border-gray-200 focus-within:border-primary focus-within:bg-white transition-colors mb-4 shadow-sm">
            <Search size={18} className="text-gray-400 mr-2 flex-shrink-0" />
            <input 
              type="text" 
              className="flex-1 bg-transparent text-[15px] outline-none text-gray-900 placeholder-gray-400"
              placeholder="搜索历史对话 (支持语义搜索)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {/* Tabs & Filters */}
        <div className="flex items-center justify-between mb-2 overflow-x-auto no-scrollbar gap-4">
          <div className="flex bg-gray-100/80 p-1 rounded-lg flex-shrink-0">
            <button 
              className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${activeTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
              onClick={() => setActiveTab('all')}
            >
              全部
            </button>
            <button 
              className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${activeTab === 'language' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
              onClick={() => setActiveTab('language')}
            >
              语言模型
            </button>
            <button 
              className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${activeTab === 'vision' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
              onClick={() => setActiveTab('vision')}
            >
              视觉模型
            </button>
          </div>
          
          {activeTab !== 'vision' ? (
            <div className="flex items-center text-gray-400 bg-gray-50 rounded-lg p-1 border border-gray-100 flex-shrink-0">
              <button 
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white text-gray-800 shadow-sm' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </button>
              <button 
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white text-gray-800 shadow-sm' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-[13px] text-gray-600 flex-shrink-0">
              <div className="flex items-center gap-1">
                <input type="checkbox" className="w-3.5 h-3.5 accent-primary border-gray-300 rounded" /> 仅看收藏
              </div>
              <div className="flex items-center gap-1">
                <Filter size={14} /> 视频模型-全部
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} /> 生成日期
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-safe bg-gray-50/50">
        {activeTab === 'vision' ? (
          <div className="py-4 space-y-6">
            {visionHistoryData.map(group => (
              <div key={group.date}>
                <div className="text-[14px] text-gray-900 mb-3">{group.date}</div>
                <div className="grid grid-cols-4 gap-1">
                  {group.images.map(img => (
                    <div key={img.id} className="aspect-square relative group">
                      <img src={img.url} alt="vision result" className="w-full h-full object-cover rounded-md" />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-active:opacity-100 transition-opacity rounded-md"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-0">
            {filteredData.map(item => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-100 active:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.type === 'language' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                    {item.type === 'language' ? <MessageSquare size={16} /> : <ImageIcon size={16} />}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0 pr-4">
                    <span className="text-[15px] font-medium text-gray-900 truncate leading-tight">{item.title}</span>
                    <span className="text-[12px] text-gray-400 mt-1">{item.time}</span>
                  </div>
                </div>
                <button className="p-2 text-gray-400 active:text-gray-600 flex-shrink-0">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pt-3 pb-6">
            {filteredData.map(item => (
              <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-3.5 shadow-sm active:bg-gray-50 transition-colors flex flex-col h-28 relative">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-2.5 ${item.type === 'language' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                  {item.type === 'language' ? <MessageSquare size={14} /> : <ImageIcon size={14} />}
                </div>
                <span className="text-[14px] font-medium text-gray-900 line-clamp-2 leading-snug">{item.title}</span>
                <span className="text-[11px] text-gray-400 absolute bottom-3.5 left-3.5">{item.time}</span>
                <button className="absolute bottom-2.5 right-2 p-1 text-gray-400 active:text-gray-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-20 text-gray-400">
            <Search size={40} className="mb-4 opacity-50" />
            <p className="text-[14px]">没有找到相关历史对话</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;