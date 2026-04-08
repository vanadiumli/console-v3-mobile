import React, { useEffect, useState } from 'react';
import { Dialog } from '@arco-design/mobile-react';
import '@arco-design/mobile-react/esm/dialog/style';

const VersionSwitchGuide: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleOpen = () => setVisible(true);
    window.addEventListener('open-version-switch', handleOpen);
    
    // Auto show guide once on mount (mocking first time visit)
    const hasSeenGuide = localStorage.getItem('hasSeenVersionGuide');
    if (!hasSeenGuide) {
      // Small delay for better UX
      setTimeout(() => setVisible(true), 500);
      localStorage.setItem('hasSeenVersionGuide', 'true');
    }

    return () => {
      window.removeEventListener('open-version-switch', handleOpen);
    };
  }, []);

  return (
    <Dialog
      visible={visible}
      title="欢迎体验火山方舟 3.0"
      close={() => setVisible(false)}
      getContainer={() => document.getElementById('root') || document.body}
      footer={[
        {
          content: '我知道了',
          className: 'text-gray-500',
          onClick: () => setVisible(false),
        },
        {
          content: '去体验新版',
          className: 'text-primary font-medium',
          onClick: () => setVisible(false),
        }
      ]}
    >
      <div className="text-gray-600 text-sm leading-relaxed text-center mt-2 px-2">
        我们全新升级了方舟控制台，为您带来更极简、高效的模型体验。
        <br /><br />
        若需使用旧版功能，可随时在侧边导航栏点击「去旧版方舟」进行切换。
      </div>
    </Dialog>
  );
};

export default VersionSwitchGuide;
