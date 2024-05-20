import React from 'react';
import { Menu, Layout } from 'antd';
import Link from 'next/link';
import { 
  DashboardOutlined, 
  PictureOutlined, 
  SettingOutlined, 
  UserOutlined, 
  HomeOutlined, 
  SlidersOutlined, 
  ApartmentOutlined, 
  FileTextOutlined, 
  FolderOpenOutlined 
} from '@ant-design/icons';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const menuItems = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      path: '/'
    },
    {
      key: '2',
      icon: <PictureOutlined />,
      label: 'Galeri',
      path: '/galeri'
    },
    {
      key: 'sub1',
      icon: <SettingOutlined />,
      label: 'Pengaturan',
      children: [
        {
          key: '3',
          icon: <UserOutlined />,
          label: 'Informasi Admin',
          path: '/pengaturan/informasiAdmin'
        },
        {
          key: '4',
          icon: <HomeOutlined />,
          label: 'Halaman Depan',
          path: '/'
        },
        {
          key: '5',
          icon: <SlidersOutlined />,
          label: 'Slider',
          path: '/'
        },
        {
          key: '6',
          icon: <ApartmentOutlined />,
          label: 'Visi Misi',
          path: '/'
        }
      ]
    },
    {
      key: 'sub2',
      icon: <FileTextOutlined />,
      label: 'Artikel',
      children: [
        {
          key: '7',
          icon: <FolderOpenOutlined />,
          label: 'Daftar Artikel',
          path: '/artikel/list'
        },
        {
          key: '8',
          icon: <FolderOpenOutlined />,
          label: 'Kategori Artikel',
          path: '/artikel/category'
        }
      ]
    }
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }}>
        <img
          src="https://cdn0.iconfinder.com/data/icons/social-network-27/31/wordpress_logo_content_management_system_web_website_cms-512.png"
          alt="Logo"
          style={{ width: '70px', height: '40px' }}
        />
      </div>
      <Menu theme="dark" mode="inline">
        {menuItems.map(item =>
          item.children ? (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map(subItem => (
                <Menu.Item key={subItem.key} icon={subItem.icon}>
                  <Link href={subItem.path}>
                    {subItem.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link href={item.path}>
                {item.label}
              </Link>
            </Menu.Item>
          )
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
