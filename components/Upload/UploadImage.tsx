import { message, Upload } from 'antd';
import type { GetProp, UploadProps, UploadFile } from 'antd';
import { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const baseUrl = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEV_BASEURL : process.env.NEXT_PUBLIC_PRO_BASEURL

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export default function UploadImage({value, onChange}: {
  value?: UploadFile,
  onChange?: (imgUrl: string) => void;
}) {
  // 是否正在上传
  const [loading, setLoading] = useState(false);
  // 图片地址
  const [imageUrl, setImageUrl] = useState<string>();

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );


  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      if (info.file.response.code === 200) {
        // setFileList(...[info.file.response.data])
        onChange && onChange(`${info.file.response.data.url}`);
        // setImageUrl(`${baseUrl}/${info.file.url}`);
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as FileType, (url) => {
          setImageUrl(url);
        });
      } else {
        setImageUrl('');
      }
      setLoading(false);

    }
  };
  return (
    <>
      <Upload
        accept='image/*'
        name="image_file"
        className="avatar-uploader"
        action={`${baseUrl}/api/uploadImg`}
        headers={{
          Authorization: (localStorage.getItem("WHITELIST_TOKEN") ?  localStorage.getItem("WHITELIST_TOKEN") : '') as string
        }}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        listType="picture-card"
        showUploadList={false}
        maxCount={1}
        multiple={false}
        
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </>
  )
}