import React, { useRef, useState } from 'react';
import type { InputRef, TableColumnsType, TableProps } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import LayoutAdmin from '@/components/Layout';
import { SearchOutlined } from '@ant-design/icons';
import { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  no: number;
  namaBerita: string;
  artikel: number;
  status: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: '1',
    no: 1,
    namaBerita: 'Berita A',
    artikel: 5,
    status: 'Dipakai',
  },
  {
    key: '2',
    no: 2,
    namaBerita: 'Berita B',
    artikel: 3,
    status: 'Tidak Dipakai',
  },
  {
    key: '3',
    no: 3,
    namaBerita: 'Berita C',
    artikel: 10,
    status: 'Dipakai',
  },
  {
    key: '4',
    no: 4,
    namaBerita: 'Berita D',
    artikel: 2,
    status: 'Tidak Dipakai',
  },
];

const App: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState<DataIndex | ''>('');
  const searchInput = useRef<InputRef>(null);

  const handleChange: OnChange = (pagination, filters, sorter) => {
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

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnsType<DataType>[number] => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => close()}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      sorter: (a, b) => a.no - b.no,
      sortOrder: sortedInfo.columnKey === 'no' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Nama Berita',
      dataIndex: 'namaBerita',
      key: 'namaBerita',
      ...getColumnSearchProps('namaBerita'),
      sorter: (a, b) => a.namaBerita.length - b.namaBerita.length,
      sortOrder: sortedInfo.columnKey === 'namaBerita' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Artikel',
      dataIndex: 'artikel',
      key: 'artikel',
      sorter: (a, b) => a.artikel - b.artikel,
      sortOrder: sortedInfo.columnKey === 'artikel' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Dipakai', value: 'Dipakai' },
        { text: 'Tidak Dipakai', value: 'Tidak Dipakai' },
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
    <LayoutAdmin>
      <div className="flex justify-between">
        <h1 className="text-dark font-bold text-3xl mb-4">Kategori Artikel</h1>
        <Button className="bg-green-400">+ Add</Button>
      </div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </LayoutAdmin>
  );
};

export default App;
