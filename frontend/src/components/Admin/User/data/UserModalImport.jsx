import { Modal, Table } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const UserModalImport = (props) => {
    const { setIsOpenModalImport, isOpenModalImport } = props

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    };

    const propsUpload = {
        name: "file",
        // only choose single file
        multiple: false,
        // limit 1 file uploaded
        maxCount: 1,
        accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        customRequest: dummyRequest,
        onChange(info) {
            const { status } = info.file;
            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    const columns = [
        {
            title: "Tên hiển thị",
            dataIndex: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
        },
    ];

    return (
        <>
            <Modal
                title="Import data user"
                open={isOpenModalImport}
                onOk={() => setIsOpenModalImport(false)}
                onCancel={() => setIsOpenModalImport(false)}
                okText={'Import'}
                width={'50vw'}
                // disable okButton
                okButtonProps={{
                    disabled: true
                }}
                // can't close modal when click outside
                maskClosable={false}
            >
                <Dragger {...propsUpload}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Only accept .csv .xls .xlsx
                    </p>
                </Dragger>

                <div style={{ paddingTop: 20 }}>
                    <Table
                        title={() => <span>Dữ liệu upload:</span>}
                        columns={columns}
                    />
                </div>
            </Modal>
        </>
    )
}

export default UserModalImport;