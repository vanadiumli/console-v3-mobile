import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUp, ImageIcon, MessageSquare, VideoIcon } from 'lucide-react';
// import { Tabs, Input } from '@arco-design/mobile-react';
import '@arco-design/mobile-react/esm/tabs/style';
import '@arco-design/mobile-react/esm/input/style';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';

const categories = [
  { title: '推荐' },
  { title: '语言' },
  { title: '视觉' },
  { title: '语音' },
  { title: '向量' },
];

const VolcanoRingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="10" stroke="url(#volcano_ring_exp)" strokeWidth="6" strokeLinecap="round"/>
    <defs>
      <linearGradient id="volcano_ring_exp" x1="0" y1="16" x2="32" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#165DFF"/>
        <stop offset="100%" stopColor="#00B42A"/>
      </linearGradient>
    </defs>
  </svg>
);

const DeepSeekIcon = () => (
  <div className="w-full h-full bg-blue-500 rounded-xl flex items-center justify-center text-white">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z"/><path d="M12 2v20"/><path d="M12 12h10"/></svg>
  </div>
);

const GLMIcon = () => (
  <div className="w-full h-full bg-black rounded-xl flex items-center justify-center text-white font-bold text-lg">
    Z
  </div>
);

const recommendedModels = [
  {
    id: 'Doubao-Seedream-4.5',
    name: 'Doubao-Seedream-4.5',
    desc: '豆包最强图片生成模型',
    icon: <ImageIcon className="text-blue-500" size={24} />,
    tag: 'NEW',
    tagColor: 'text-blue-600 bg-blue-50',
  },
  {
    id: 'Doubao-1.5-pro-32k',
    name: 'Doubao-1.5-pro-32k',
    desc: '经典LLM,支持角色扮演',
    icon: <VolcanoRingIcon />,
  },
  {
    id: 'Doubao-Seedance-1.5-pro',
    name: 'Doubao-Seedance-1.5-pro',
    desc: '豆包最强视频生成模型,独具多镜头叙事能力',
    icon: <VideoIcon className="text-blue-500" size={24} />,
    tag: '版本上新',
    tagColor: 'text-teal-600 bg-teal-50',
  }
];

const languageModels = [
  {
    id: 'Doubao-1.5-pro-32k',
    name: 'Doubao-1.5-pro-32k',
    desc: '最强文本模型，广泛的知识与理解能力',
    icon: <VolcanoRingIcon />,
  },
  {
    id: 'DeepSeek-V3.2',
    name: 'DeepSeek-V3.2',
    desc: '强大开源模型，擅长逻辑推理与代码生成',
    icon: <DeepSeekIcon />,
    tag: 'NEW',
    tagColor: 'text-blue-600 bg-blue-50',
  },
  {
    id: 'GLM-4.7',
    name: 'GLM-4.7',
    desc: '智谱 AI 强大开源语言模型',
    icon: <GLMIcon />,
  }
];

const Experience: React.FC = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [activeTab, setActiveTab] = useState('推荐');
  const scrollRef = useHorizontalScroll<HTMLDivElement>();

  const renderModels = () => {
    let modelsToRender = recommendedModels;
    if (activeTab === '语言') {
      modelsToRender = languageModels;
    } else if (activeTab === '视觉') {
      modelsToRender = recommendedModels.filter(m => m.id.includes('Seedream') || m.id.includes('Seedance'));
    }

    return modelsToRender.map((model) => (
      <div 
        key={model.id}
        className="flex items-center justify-between p-5 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] active:bg-gray-50 transition-colors"
        onClick={() => {
          navigate(`/console/workspace?modelId=${model.id.toLowerCase()}`);
        }}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {model.icon}
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-[17px] text-gray-900 truncate">{model.name}</span>
              {model.tag && (
                <span className={`text-[11px] px-1.5 py-0.5 rounded ${model.tagColor} flex-shrink-0 font-medium`}>
                  {model.tag}
                </span>
              )}
            </div>
            <span className="text-[14px] text-gray-500 truncate">{model.desc}</span>
          </div>
        </div>
        <ArrowRight size={20} className="text-gray-400 flex-shrink-0 ml-3" />
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="pt-10 pb-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            欢迎来到 <span className="text-primary font-bold">火山方舟</span>
          </h1>
        </div>

        <div className="px-4 mb-5">
          {/* We use a custom tab style or Arco Tabs */}
          <div ref={scrollRef} className="flex overflow-x-auto no-scrollbar gap-2.5 py-2">
            {categories.map((cat) => (
              <div 
                key={cat.title} 
                onClick={() => setActiveTab(cat.title)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-[15px] border whitespace-nowrap transition-colors cursor-pointer ${activeTab === cat.title ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200'}`}
              >
                {cat.title}
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 space-y-4">
          {renderModels()}
        </div>
      </div>

      {/* Fixed Bottom Input */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <div className="bg-gray-50 rounded-full flex items-center p-2 pr-2.5 border border-gray-200 focus-within:border-primary focus-within:bg-white transition-colors">
          <input 
            type="text" 
            className="flex-1 bg-transparent px-4 py-2.5 text-[16px] outline-none text-gray-900 placeholder-gray-400"
            placeholder="请输入问题，帮你深度解答"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button 
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${question.trim() ? 'bg-primary text-white' : 'bg-gray-200 text-white'}`}
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Experience;
