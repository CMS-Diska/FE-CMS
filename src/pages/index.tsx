import React from 'react';
import LayoutAdmin from '@/components/Layout';
import { UserOutlined, FileTextOutlined, PictureOutlined, MailOutlined, KeyOutlined } from '@ant-design/icons';

const HomePage: React.FC = () => {
  return (
    <LayoutAdmin>
      <h1 className="text-dark font-bold text-3xl mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-purple-500 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold">2</h2>
            <p className="text-white">Jumlah Pengguna</p>
          </div>
          <UserOutlined className="text-white text-4xl" />
        </div>
        <div className="bg-blue-500 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold">12</h2>
            <p className="text-white">Jumlah Artikel</p>
          </div>
          <FileTextOutlined className="text-white text-4xl" />
        </div>
        <div className="bg-purple-500 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold">13</h2>
            <p className="text-white">Jumlah Galeri</p>
          </div>
          <PictureOutlined className="text-white text-4xl" />
        </div>
        <div className="bg-yellow-500 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold">5</h2>
            <p className="text-white">Jumlah Pengurus</p>
          </div>
          <UserOutlined className="text-white text-4xl" />
        </div>
        <div className="bg-teal-500 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold">Ganti Password</h2>
          </div>
          <KeyOutlined className="text-white text-4xl" />
        </div>
        <div className="bg-blue-500 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold">3</h2>
            <p className="text-white">Jumlah Pesan Diterima</p>
          </div>
          <MailOutlined className="text-white text-4xl" />
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default HomePage;
