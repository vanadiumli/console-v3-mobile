import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Popup } from '@arco-design/mobile-react';
import '@arco-design/mobile-react/esm/popup/style';
import FloatingAssistant from '../components/FloatingAssistant';
import VersionSwitchGuide from '../components/VersionSwitchGuide';

// SVG 图标组件
const VolcanoLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.5L20.5 21H3.5L12 2.5Z" fill="#165DFF" />
    <path d="M12 12.5L16.5 21H7.5L12 12.5Z" fill="#7BC1FF" />
  </svg>
);

const GhostIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ghostGrad" x1="16" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5A0FF"/>
        <stop offset="0.5" stopColor="#B35FFF"/>
        <stop offset="1" stopColor="#4D3BFF"/>
      </linearGradient>
    </defs>
    <path d="M16 4C10.4772 4 6 8.47715 6 14V26.5C6 27.6046 6.89543 28.5 8 28.5C8.36838 28.5 8.72477 28.3999 9.03058 28.2144L11.5317 26.6971C11.821 26.5215 12.179 26.5215 12.4683 26.6971L14.9694 28.2144C15.5866 28.5888 16.4134 28.5888 17.0306 28.2144L19.5317 26.6971C19.821 26.5215 20.179 26.5215 20.4683 26.6971L22.9694 28.2144C23.2752 28.3999 23.6316 28.5 24 28.5C25.1046 28.5 26 27.6046 26 26.5V14C26 8.47715 21.5228 4 16 4Z" fill="url(#ghostGrad)"/>
    <circle cx="12.5" cy="15.5" r="1.5" fill="white"/>
    <circle cx="18.5" cy="15.5" r="1.5" fill="white"/>
    <path d="M22 6L23 8L25 9L23 10L22 12L21 10L19 9L21 8L22 6Z" fill="#F5A0FF"/>
  </svg>
);

const navItems = [
  { name: '控制台', path: '/console' },
  { name: '模型广场', path: '/model-square' },
  { name: 'Coding Plan', path: '/coding-plan' },
  { name: '文档', path: '/docs' },
  { name: 'API参考', path: '/api-ref' },
  { name: '个人中心', path: '/profile' }
];

const GlobalLayout: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-gray-50 relative">
      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0 z-50">
        <div 
          className="flex items-center space-x-2 font-bold text-base cursor-pointer"
          onClick={() => navigate('/console')}
        >
          <VolcanoLogo />
          <span className="text-gray-800">火山引擎 | 火山方舟</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            className="p-1.5 rounded-full active:bg-gray-50 transition-colors"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-assistant'));
            }}
          >
            <GhostIcon />
          </button>
          <button 
            className="p-2 -mr-2 text-gray-600 active:bg-gray-50 rounded-full transition-colors"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <Outlet />
      </main>

      {/* Floating Assistant */}
      <FloatingAssistant />

      {/* Version Switch Guide Modal */}
      <VersionSwitchGuide />

      {/* Mobile Menu Popup */}
      <Popup 
        visible={menuOpen} 
        direction="right" 
        close={() => setMenuOpen(false)}
        getContainer={() => document.getElementById('root') || document.body}
      >
        <div className="w-64 h-full bg-white flex flex-col shadow-xl">
          <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100">
            <span className="font-medium text-gray-800">导航</span>
            <button onClick={() => setMenuOpen(false)} className="text-gray-500 p-2">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {navItems.map(item => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <div 
                  key={item.path}
                  className={`px-6 py-4 cursor-pointer text-base ${isActive ? 'text-primary bg-blue-50/50 font-medium' : 'text-gray-700 active:bg-gray-50'}`}
                  onClick={() => handleNav(item.path)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          <div className="p-4 border-t border-gray-100">
            <button 
              className="w-full py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium active:bg-gray-50 transition-colors"
              onClick={() => {
                setMenuOpen(false);
                // trigger version switch modal logic
                window.dispatchEvent(new CustomEvent('open-version-switch'));
              }}
            >
              去旧版方舟
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default GlobalLayout;
