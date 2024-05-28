import CardContent from '@/components/Card';
import LayoutAdmin from '@/components/Layout';
import { Button, Input, Switch, Upload, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { UploadFile, UploadProps } from 'antd';

type FileType = Parameters<NonNullable<UploadProps['beforeUpload']>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const HalamanDepan = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <>
            <LayoutAdmin>
            <h1 className="text-dark font-bold text-3xl mb-4">Halaman Depan</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                    <CardContent>
                        <div className="flex items-center justify-between mb-4">
                            <span className='font-bold text-xl'>Tampilan Atas</span>
                            <div className='flex flex-col'>
                                {/* <span>Tampilkan</span> */}
                                <Switch defaultChecked />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Nama Video</label>
                            <Input
                                className="w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Link Video</label>
                            <Input
                                className="w-full"
                                required
                            />
                        </div>
                        <Button type="primary" className="w-full">Simpan</Button>
                    </CardContent>
                    <CardContent>
                        <div className="flex items-center justify-between mb-4">
                            <span className='font-bold text-xl'>Tentang</span>
                            <div className='flex flex-col'>
                                <Switch checked={isVisible} onChange={() => setIsVisible(!isVisible)} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Foto Tentang</label>
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Deskripsi</label>
                            <Input
                                className="w-full"
                                required
                            />
                        </div>
                        <Button type="primary" className="w-full">Simpan</Button>
                    </CardContent>
                    <CardContent>
                        <div className="flex items-center justify-between mb-4">
                            <span className='font-bold text-xl'>Galeri Kegiatan</span>
                            <div className='flex flex-col'>
                                {/* <span>Tampilkan</span> */}
                                <Switch defaultChecked />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Judul</label>
                            <Input
                                className="w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Sub Judul</label>
                            <Input
                                className="w-full"
                                required
                            />
                        </div>
                        <Button type="primary" className="w-full">Simpan</Button>
                    </CardContent>
                    <CardContent>
                        <div className="flex items-center justify-between mb-4">
                            <span className='font-bold text-xl'>Pengaturan Artikel</span>
                            <div className='flex flex-col'>
                                {/* <span>Tampilkan</span> */}
                                <Switch defaultChecked />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Judul </label>
                            <Input
                                className="w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Sub Judul</label>
                            <Input
                                className="w-full"
                                required
                            />
                        </div>
                        <Button type="primary" className="w-full">Simpan</Button>
                    </CardContent>
                </div>
            </LayoutAdmin>
        </>
    );
};

export default HalamanDepan;
