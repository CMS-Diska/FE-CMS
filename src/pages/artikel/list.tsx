import React, { useState } from 'react';
import type { TableColumnsType, TableProps } from 'antd';
import { Button, Space, Table, Image } from 'antd';
import LayoutAdmin from '@/components/Layout';

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  no: number;
  nama: string;
  foto: string;
  slug: string;
  kilasan: string;
  tanggal: string;
  status: string;
}

const data: DataType[] = [
  {
    key: '1',
    no: 1,
    nama: 'John Brown',
    foto: 'https://via.placeholder.com/40',
    slug: 'john-brown',
    kilasan: 'A brief summary of John Brown.',
    tanggal: '2024-05-17',
    status: 'Active',
  },
  {
    key: '2',
    no: 2,
    nama: 'Jim Green',
    foto: 'https://via.placeholder.com/40',
    slug: 'jim-green',
    kilasan: 'A brief summary of Jim Green.',
    tanggal: '2024-05-16',
    status: 'Inactive',
  },
  {
    key: '3',
    no: 3,
    nama: 'Joe Black',
    foto: 'https://via.placeholder.com/40',
    slug: 'joe-black',
    kilasan: 'A brief summary of Joe Black.',
    tanggal: '2024-05-15',
    status: 'Active',
  },
  {
    key: '4',
    no: 4,
    nama: 'Jim Red',
    foto: 'https://via.placeholder.com/40',
    slug: 'jim-red',
    kilasan: 'A brief summary of Jim Red.',
    tanggal: '2024-05-14',
    status: 'Inactive',
  },
];

const App: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    //   sorter: (a, b) => a.no - b.no,
    //   sortOrder: sortedInfo.columnKey === 'no' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.nama || null,
      onFilter: (value, record) => record.nama.includes(value as string),
      sorter: (a, b) => a.nama.length - b.nama.length,
      sortOrder: sortedInfo.columnKey === 'nama' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Foto',
      dataIndex: 'foto',
      key: 'foto',
      render: (text) => <Image src={text} alt="foto" width={40} height={40} />,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      ellipsis: true,
    },
    {
      title: 'Kilasan',
      dataIndex: 'kilasan',
      key: 'kilasan',
      ellipsis: true,
    },
    {
      title: 'Tanggal',
      dataIndex: 'tanggal',
      key: 'tanggal',
      sorter: (a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime(),
      sortOrder: sortedInfo.columnKey === 'tanggal' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value as string),
      sorter: (a, b) => a.status.length - b.status.length,
      sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <LayoutAdmin>
        <div className="flex justify-between">
          <h1 className="text-dark font-bold text-3xl mb-4">Daftar Artikel</h1>
          <Button className="bg-green-400">+ Add</Button>
        </div>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
        </Space>
        <Table columns={columns} dataSource={data} onChange={handleChange} />
      </LayoutAdmin>
    </>
  );
};

export default App;
