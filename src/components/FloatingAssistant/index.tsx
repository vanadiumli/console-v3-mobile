import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Popup } from '@arco-design/mobile-react';
import '@arco-design/mobile-react/esm/popup/style';

const FloatingAssistant: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleOpen = () => setVisible(true);
    window.addEventListener('open-assistant', handleOpen);
    return () => {
      window.removeEventListener('open-assistant', handleOpen);
    };
  }, []);

  return (
    <>
      <Popup
        visible={visible}
        direction="bottom"
        close={() => setVisible(false)}
        getContainer={() => document.getElementById('root') || document.body}
      >
        <div className="bg-white w-full rounded-t-2xl shadow-xl h-[70vh] flex flex-col">
          <div className="h-14 border-b border-gray-100 flex items-center justify-between px-4">
            <span className="font-semibold text-gray-800">灵动岛问答助手</span>
            <button onClick={() => setVisible(false)} className="p-2 -mr-2 text-gray-400 active:text-gray-600">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
            <div className="self-start max-w-[80%] bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-sm shadow-sm text-sm text-gray-700">
              您好，我是方舟大模型问答助手，有什么可以帮您？
            </div>
            {/* Messages will go here */}
          </div>
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center">
              <input 
                type="text" 
                placeholder="输入您的问题..." 
                className="bg-transparent flex-1 outline-none text-sm"
              />
              <button className="text-primary font-medium text-sm ml-2">发送</button>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default FloatingAssistant;
