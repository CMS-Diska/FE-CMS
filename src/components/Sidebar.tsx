import React, { useEffect, useState } from 'react';
import { Menu, Layout } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import Image from 'next/image';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [openKeys, setOpenKeys] = useState<string[]>([]);

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
          path: '/pengaturan/halamandepan'
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

  useEffect(() => {
    const path = router.pathname;

    let selected: string | undefined;
    let open: string[] = [];

    menuItems.forEach(item => {
      if (item.children) {
        const foundChild = item.children.find(subItem => subItem.path === path);
        if (foundChild) {
          selected = foundChild.key;
          open = [item.key];
        }
      } else if (item.path === path) {
        selected = item.key;
      }
    });

    setSelectedKey(selected || '');
    setOpenKeys(open);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }}>
        <Image
          src="/wordpress.webp"
          alt="Logo"
          width={50}
          height={20}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={keys => setOpenKeys(keys)}
      >
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
