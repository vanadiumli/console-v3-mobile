import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Popup } from '@arco-design/mobile-react';

const tabs = [
  { title: '体验', path: '/console/experience' },
  { title: '推理', path: '/console/inference' },
  { title: '训练', path: '/console/training' },
  { title: '应用', path: '/console/application' },
];

const recentHistory = [
  '视频实时理解',
  '询问我是什么模型',
  '豆包模型颜色规范',
  '为图片写标题',
  '文档总结需求'
];

const ConsoleLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollRef = useHorizontalScroll<HTMLDivElement>();
  const [historyMenuOpen, setHistoryMenuOpen] = useState(false);

  const activeIndex = tabs.findIndex(t => location.pathname.includes(t.path)) !== -1 
    ? tabs.findIndex(t => location.pathname.includes(t.path)) 
    : 0;

  const handleTabClick = (tabPath: string, index: number) => {
    if (index === 0 && activeIndex === 0) {
      // If already on "Experience" tab and clicks it again, toggle history menu
      setHistoryMenuOpen(true);
    } else {
      navigate(tabPath);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white shadow-sm z-10 sticky top-0 border-b border-gray-100">
        <div ref={scrollRef} className="flex overflow-x-auto no-scrollbar">
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={tab.path}
                className={`flex-1 min-w-[72px] text-center py-3 text-[15px] relative transition-colors flex items-center justify-center gap-1 ${isActive ? 'text-primary font-semibold' : 'text-gray-600'}`}
                onClick={() => handleTabClick(tab.path, index)}
              >
                {index === 0 && isActive ? (
                  <>
                    {tab.title}
                    {historyMenuOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </>
                ) : (
                  tab.title
                )}
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-t-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      {/* History Left Drawer Menu Popup */}
      <Popup
        visible={historyMenuOpen}
        direction="left"
        maskClosable={true}
        close={() => setHistoryMenuOpen(false)}
        getContainer={() => document.getElementById('root') || document.body}
      >
        <div className="w-[280px] h-full bg-white shadow-xl flex flex-col pt-safe">
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center text-gray-900 font-bold text-[16px]">
            体验
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
            {recentHistory.map((item, idx) => (
              <div 
                key={idx} 
                className="text-[14px] text-gray-700 px-3 py-3 active:bg-gray-50 rounded-lg transition-colors truncate"
                onClick={() => setHistoryMenuOpen(false)}
              >
                {item}
              </div>
            ))}
          </div>
          
          {/* Bottom Button */}
          <div className="p-4 border-t border-gray-100 pb-safe">
            <button 
              className="w-full py-3 rounded-xl bg-purple-50 text-purple-700 font-medium text-[14px] active:bg-purple-100 transition-colors"
              onClick={() => {
                setHistoryMenuOpen(false);
                navigate('/history');
              }}
            >
              全部历史对话
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default ConsoleLayout;
