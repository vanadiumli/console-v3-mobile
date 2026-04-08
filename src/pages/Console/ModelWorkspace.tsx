import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  ChevronDown, Settings2, Plus, Grip, ArrowUp, ChevronUp, 
  Image as ImageIcon, Type, FileText, Video, RotateCcw, X, Zap, Maximize2, Search,
  Play, Library, Sliders, Volume2, ArrowRight, Check
} from 'lucide-react';
import { Popup } from '@arco-design/mobile-react';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';

const modelGroups = [
  {
    groupName: '视觉模型',
    models: [
      {
        id: 'doubao-seedance-1.5-pro',
        name: 'Doubao-Seedance 1.5 Pro',
        version: '250615',
        priceIn: '3.2',
        priceOut: '16',
        iconType: 'purple-play',
        type: 'vision'
      },
      {
        id: 'doubao-seed-2.0-pro',
        name: 'Doubao-Seed-2.0-pro',
        tag: '模型上新',
        version: '260215(最新)',
        priceIn: '3.2',
        priceOut: '16',
        iconType: 'gradient',
        type: 'vision'
      },
      {
        id: 'doubao-seed-2.0-code',
        name: 'Doubao-Seed-2.0-Code',
        tag: '模型上新',
        iconType: 'gradient',
        type: 'vision'
      }
    ]
  },
  {
    groupName: '文本生成',
    models: [
      {
        id: 'doubao-1.5-pro-32k',
        name: 'Doubao-1.5-pro-32k',
        iconType: 'gradient',
        type: 'language'
      },
      {
        id: 'deepseek-v3.2',
        name: 'DeepSeek-V3.2',
        iconType: 'blue',
        type: 'language'
      },
      {
        id: 'glm-4.7',
        name: 'GLM-4.7',
        iconType: 'black',
        type: 'language'
      }
    ]
  }
];

const renderIcon = (type: string) => {
  if (type === 'gradient') {
    return (
      <div className="w-[26px] h-[26px] rounded-[6px] overflow-hidden flex items-center justify-center flex-shrink-0 bg-white border border-gray-100">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="10" stroke="url(#volcano_ring)" strokeWidth="6" strokeLinecap="round"/>
          <defs>
            <linearGradient id="volcano_ring" x1="0" y1="16" x2="32" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#165DFF"/>
              <stop offset="100%" stopColor="#00B42A"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }
  if (type === 'blue') {
    return (
      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z"/><path d="M12 2v20"/><path d="M12 12h10"/></svg>
      </div>
    );
  }
  if (type === 'black') {
    return (
      <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
        Z
      </div>
    );
  }
  if (type === 'purple-play') {
    return (
      <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center text-white flex-shrink-0">
        <Play size={12} fill="currentColor" className="ml-0.5" />
      </div>
    );
  }
  return null;
};

const ModelWorkspace: React.FC = () => {
  const [searchParams] = useSearchParams();
  const defaultModelId = searchParams.get('modelId') || 'doubao-seedance-1.5-pro';
  
  const [isParamOpen, setParamOpen] = useState(false);
  const [isModelSelectorOpen, setModelSelectorOpen] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState(defaultModelId);
  const [prompt, setPrompt] = useState('');
  
  const scrollRef = useHorizontalScroll<HTMLDivElement>();
  const modelScrollRef = useHorizontalScroll<HTMLDivElement>();
  const visionSettingsScrollRef = useHorizontalScroll<HTMLDivElement>();
  const visionExampleScrollRef = useHorizontalScroll<HTMLDivElement>();

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleModelSelect = (id: string) => {
    setSelectedModelId(id);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setModelSelectorOpen(false);
    }, 2000);
  };

  // Find currently selected model object
  let currentModel: any = null;
  modelGroups.forEach(group => {
    group.models.forEach(m => {
      if (m.id === selectedModelId) currentModel = m;
    });
  });

  // Fallback to first model if id is not found
  if (!currentModel && modelGroups[0]?.models[0]) {
    currentModel = modelGroups[0].models[0];
  }

  const isVision = currentModel?.type === 'vision';

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0 bg-white z-10">
        <div 
          className="flex items-center gap-2.5 cursor-pointer active:opacity-70 transition-opacity"
          onClick={() => setModelSelectorOpen(true)}
        >
          {currentModel?.iconType === 'gradient' ? (
            <div className="w-[22px] h-[22px] bg-[#EAF2FF] rounded-[6px] flex items-center justify-center">
              <span className="text-[#165DFF] text-[11px] font-[800] leading-none">db</span>
            </div>
          ) : (
            <div className="transform scale-[0.9]">
              {renderIcon(currentModel?.iconType || '')}
            </div>
          )}
          <span className="text-[17px] font-[800] text-gray-900 tracking-tight">{currentModel?.name || '选择模型'}</span>
          <ChevronDown size={18} className="text-gray-400 ml-0.5" strokeWidth={2.5} />
        </div>
        <div className="flex items-center gap-4 text-gray-600">
          {isVision && <Library size={20} className="active:text-gray-900 transition-colors" />}
          <Settings2 size={20} className="active:text-gray-900 transition-colors" onClick={() => setParamOpen(true)} />
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 pb-10 bg-white">
        {isVision ? (
          <>
            <div className="text-center mt-8 mb-6">
              <h2 className="text-[22px] font-bold text-gray-900 flex items-center justify-center tracking-tight">
                体验视频生成，让创意摇动
              </h2>
            </div>

            {/* Vision Input Area */}
            <div className="border border-gray-200 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] bg-white focus-within:border-primary focus-within:shadow-[0_4px_16px_rgba(22,93,255,0.1)] transition-all flex flex-col gap-3">
              {/* Frames */}
              <div className="flex items-center gap-3">
                <div className="w-[72px] h-[72px] rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer">
                  <Plus size={18} />
                  <span className="text-[12px] mt-1 font-medium">首帧</span>
                </div>
                <div className="flex items-center justify-center text-gray-300">
                  <ArrowRight size={16} />
                </div>
                <div className="w-[72px] h-[72px] rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 bg-gray-50 active:bg-gray-100 transition-colors relative cursor-pointer">
                  <Plus size={18} />
                  <span className="text-[12px] mt-0.5 font-medium text-center leading-tight">尾帧</span>
                  <span className="text-[9px] text-gray-300 mt-0.5">选填</span>
                </div>
              </div>

              <textarea 
                className="w-full h-14 resize-none outline-none text-[15px] placeholder-gray-400 mt-1"
                placeholder="[结合图片，可输入你的创意描述(视频配音需支付额外费用)]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-100">
                <div ref={visionSettingsScrollRef} className="flex overflow-x-auto no-scrollbar gap-2 flex-1 mr-2">
                  <div className="flex items-center whitespace-nowrap bg-gray-50 px-2 py-1.5 rounded-md text-[12px] text-gray-700 gap-1 border border-gray-200 font-medium">
                    <Sliders size={12} className="text-gray-500"/> 16:9 | 480p | 5s | 4条
                  </div>
                  <div className="flex items-center whitespace-nowrap bg-blue-50 px-2 py-1.5 rounded-md text-[12px] text-blue-600 gap-1 border border-blue-100 font-medium">
                    <Volume2 size={12}/> 声音
                  </div>
                  <div className="flex items-center whitespace-nowrap bg-gray-50 px-2 py-1.5 rounded-md text-[12px] text-gray-600 border border-gray-100">
                    样片速览
                  </div>
                  <div className="flex items-center whitespace-nowrap bg-gray-50 px-2 py-1.5 rounded-md text-[12px] text-gray-600 border border-gray-100">
                    离线生成
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-[12px] text-gray-400 font-medium">0 Tokens</span>
                  <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${prompt.trim() ? 'bg-primary text-white' : 'bg-gray-200 text-white'}`}>
                    <ArrowUp size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Vision Tasks Area */}
            <div className="mt-8">
              <div className="text-[13px] text-gray-500 mb-3 flex items-center w-fit">
                试试以下示例：
              </div>
              <div ref={visionExampleScrollRef} className="flex overflow-x-auto no-scrollbar gap-3 pb-2">
                {[
                  { id: 1, tag: '音效', img: 'https://picsum.photos/300/300?random=21' },
                  { id: 2, tag: '音效+人声', img: 'https://picsum.photos/300/300?random=22' },
                  { id: 3, tag: '音效+人声', img: 'https://picsum.photos/300/300?random=23' },
                  { id: 4, tag: '音效', img: 'https://picsum.photos/300/300?random=24' },
                ].map(item => (
                  <div key={item.id} className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100 relative shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer active:opacity-80 transition-opacity">
                    <img src={item.img} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                      {item.tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mt-12 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                欢迎来到 <span className="text-primary">火山方舟</span>
              </h2>
            </div>

            {/* Language Input Area */}
            <div className="border border-gray-200 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] bg-white focus-within:border-primary focus-within:shadow-[0_4px_16px_rgba(22,93,255,0.1)] transition-all flex flex-col gap-3">
              <textarea 
                className="w-full h-20 resize-none outline-none text-[16px] placeholder-gray-400"
                placeholder="请输入问题，或选择模板快速体验 Responses API"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 active:bg-gray-50">
                    <Plus size={18} />
                  </button>
                  <button className="h-8 px-3 rounded-full border border-gray-200 flex items-center justify-center gap-1.5 text-gray-700 text-[13px] font-medium active:bg-gray-50">
                    <Grip size={14} className="text-gray-400" /> 工具 <ChevronDown size={14} className="text-gray-400"/>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 text-[13px] text-gray-500 active:text-gray-700">
                    深度思考 <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${prompt.trim() ? 'bg-primary text-white' : 'bg-gray-200 text-white'}`}>
                    <ArrowUp size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Language Tasks Area */}
            <div className="mt-8">
              <div className="text-[13px] text-gray-500 mb-3 flex items-center w-fit">
                试试以下图像理解任务 <ChevronUp size={14} className="ml-1 text-gray-400"/>
              </div>
              <div ref={scrollRef} className="flex overflow-x-auto no-scrollbar gap-3 pb-2">
                {[
                  { id: 1, title: '进行图像分类', img: 'https://picsum.photos/300/200?random=11' },
                  { id: 2, title: '生成图片标题', img: 'https://picsum.photos/300/200?random=12' },
                  { id: 3, title: '批改英文作文', img: 'https://picsum.photos/300/200?random=13' },
                  { id: 4, title: '识别视频内容', img: 'https://picsum.photos/300/200?random=14' },
                ].map(task => (
                  <div key={task.id} className="w-32 flex-shrink-0 border border-gray-100 rounded-xl overflow-hidden bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:opacity-80 cursor-pointer transition-opacity">
                    <div className="h-20 bg-gray-100 flex items-center justify-center">
                      <img src={task.img} alt={task.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 text-[13px] text-gray-700 text-center truncate font-medium bg-white">
                      {task.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Parameters Drawer */}
      <Popup
        visible={isParamOpen}
        direction="right"
        close={() => setParamOpen(false)}
        getContainer={() => document.getElementById('root') || document.body}
      >
        <div className="w-[320px] h-full bg-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100 flex-shrink-0">
            <span className="font-semibold text-[16px] text-gray-800">模型参数</span>
            <div className="flex items-center gap-4 text-gray-500">
              <RotateCcw size={18} className="active:text-gray-800 cursor-pointer transition-colors" />
              <X size={22} className="active:text-gray-800 cursor-pointer transition-colors" onClick={() => setParamOpen(false)} />
            </div>
          </div>
          
          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-7">
            {/* API Mode */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between text-[14px] font-medium text-gray-800 mb-2">
                API模式 Responses <ChevronDown size={16} className="text-gray-400"/>
              </div>
              <div className="text-[13px] text-gray-500 leading-relaxed">
                适用构建Agent，内建上下文与多工具写作开箱即用了更多
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-6">
              {[
                { label: 'Temperature', val: '1' },
                { label: 'Top_p', val: '0.2' },
                { label: 'Max_tokens', val: '0.2' },
              ].map(item => (
                <div key={item.label} className="space-y-3">
                  <div className="flex justify-between items-center text-[14px]">
                    <span className="text-gray-700 border-b border-dashed border-gray-300 pb-0.5">{item.label}</span>
                    <div className="w-14 px-2 py-1.5 bg-white border border-gray-200 rounded-md text-center text-[13px] text-gray-800 shadow-sm font-medium">
                      {item.val}
                    </div>
                  </div>
                  <input type="range" min="0" max="1" step="0.1" defaultValue={item.val} className="w-full accent-primary h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
              ))}
            </div>

            {/* Stop */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="text-[14px] text-gray-700 font-medium">Stop</div>
              <input type="text" placeholder="输入后按回车添加" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-primary transition-colors bg-gray-50 focus:bg-white" />
            </div>

            {/* System prompt */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-700 font-medium">System prompt</span>
                <div className="flex items-center gap-3 text-gray-400">
                  <Zap size={16} className="active:text-gray-600" />
                  <Maximize2 size={16} className="active:text-gray-600" />
                </div>
              </div>
              <textarea placeholder="请输入system描述文本" className="w-full h-24 border border-gray-200 rounded-lg p-3 text-[14px] outline-none focus:border-primary transition-colors resize-none bg-gray-50 focus:bg-white"></textarea>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-100 pt-5 space-y-5 pb-8">
              <div className="flex justify-between items-center text-[14px] text-gray-700 font-medium active:opacity-70 cursor-pointer">
                输出控制 <ChevronDown size={16} className="text-gray-400"/>
              </div>
              <div className="flex justify-between items-center text-[14px] text-gray-700 font-medium active:opacity-70 cursor-pointer">
                高级参数 <ChevronDown size={16} className="text-gray-400"/>
              </div>
            </div>
          </div>
        </div>
      </Popup>

      {/* Model Selector Popup */}
      <Popup
        visible={isModelSelectorOpen}
        direction="bottom"
        close={() => setModelSelectorOpen(false)}
        getContainer={() => document.getElementById('root') || document.body}
      >
        <div className="bg-white w-full rounded-t-2xl shadow-xl h-[85vh] flex flex-col relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <span className="font-bold text-[18px] text-gray-900">选择模型</span>
            <div className="flex items-center gap-4 text-gray-600">
              <Search size={20} className="cursor-pointer" />
              <X size={22} className="cursor-pointer" onClick={() => setModelSelectorOpen(false)} />
            </div>
          </div>

          {/* Tabs */}
          <div className="px-5 border-b border-gray-100">
            <div ref={modelScrollRef} className="flex overflow-x-auto no-scrollbar gap-6 pb-2.5">
              {['语言', '视觉', '语音', '向量', '智能路由'].map((tab, idx) => (
                <div key={tab} className={`flex-shrink-0 text-[15px] font-medium transition-colors ${idx === 1 ? 'text-gray-900 border-b-2 border-gray-900 pb-2.5 -mb-[11px]' : 'text-gray-500'}`}>
                  {tab}
                </div>
              ))}
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-5 pb-safe space-y-8 bg-white">
            
            {modelGroups.map((group) => (
              <div key={group.groupName} className="space-y-3">
                <div className="text-[13px] text-gray-500 font-medium ml-1">{group.groupName}</div>
                
                {group.models.map((model) => {
                  const isSelected = selectedModelId === model.id;
                  
                  if (isSelected) {
                    return (
                      <div 
                        key={model.id} 
                        className="flex items-center justify-between p-4 rounded-[14px] bg-[#F4F5FB] transition-colors cursor-pointer border border-transparent"
                        onClick={() => handleModelSelect(model.id)}
                      >
                        <div className="flex items-center gap-3">
                          {renderIcon(model.iconType)}
                          <span className="font-semibold text-[17px] text-[#2C3345] tracking-tight">{model.name}</span>
                          {model.tag && (
                            <span className="text-[10px] px-1.5 py-[1px] rounded text-[#FF6347] bg-[#FFF0ED] flex-shrink-0 font-medium">{model.tag}</span>
                          )}
                        </div>
                        <Check size={20} strokeWidth={3} className="text-[#1F2329]" />
                      </div>
                    );
                  }

                  return (
                    <div 
                      key={model.id} 
                      className="flex items-center justify-between p-4 rounded-[14px] active:bg-gray-50 transition-colors cursor-pointer border border-transparent"
                      onClick={() => handleModelSelect(model.id)}
                    >
                      <div className="flex items-center gap-3">
                        {renderIcon(model.iconType)}
                        <span className="font-semibold text-[17px] text-[#4B5563] tracking-tight">{model.name}</span>
                        {model.tag && (
                          <span className="text-[10px] px-1.5 py-[1px] rounded text-[#FF6347] bg-[#FFF0ED] flex-shrink-0 font-medium">{model.tag}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            
            <div className="flex items-center gap-1 p-4 rounded-xl active:bg-gray-50 transition-colors mt-2 text-[14px] text-gray-700 font-medium cursor-pointer">
              更多模型 <ChevronDown size={16} className="text-gray-400" />
            </div>

          </div>
        </div>
      </Popup>

    </div>
  );
};

export default ModelWorkspace;