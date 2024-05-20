import React, { ReactNode, useState } from 'react';
import { Layout, theme } from 'antd';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const { Content } = Layout;

interface LayoutAdminProps {
  children: ReactNode;
}

const LayoutAdmin: React.FC<LayoutAdminProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar collapsed={collapsed} onCollapse={handleToggle} />
      <Layout>
        <Navbar collapsed={collapsed} onToggle={handleToggle} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
