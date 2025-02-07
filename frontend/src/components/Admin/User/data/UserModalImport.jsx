import { Modal, notification, Table } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { postCreateBulkUsers } from '../../../../services/api';
import templateFile from './data.xlsx?url' //read not image file

const { Dragger } = Upload;

const UserModalImport = (props) => {
    const { setIsOpenModalImport, isOpenModalImport } = props

    const [dataExcel, setDataExcel] = useState([]);
    const [fileUploaded, setFileUploaded] = useState([])

    // https://stackoverflow.com/questions/51514757/action-function-is-required-with-antd-upload-control-but-i-dont-need-it
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    };

    const propsUpload = {
        name: "file",
        fileList: fileUploaded,
        // only choose single file
        multiple: false,
        // limit 1 file uploaded
        maxCount: 1,
        accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        // prevent upload to server (default action)
        customRequest: dummyRequest,
        onChange(info) {
            setFileUploaded(info.fileList);
            const { status } = info.file;
            if (status !== "uploading") {
                // không xóa
                // console.log(info.file, info.fileList);
            }
            if (status === "done") {
                if (info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj;
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(file);

                    reader.onload = (e) => {
                        let data = new Uint8Array(reader.result); //reader.result = e.target.result
                        let workbook = XLSX.read(data, { type: 'array' });
                        // find the name of your sheet in the workbook first
                        let sheetName = workbook.Sheets[workbook.SheetNames[0]];

                        const json = XLSX.utils.sheet_to_json(sheetName, {
                            header: ["fullName", "email", "phone"],
                            range: 1 //skip header row
                        });
                        if (json && json.length > 0) {
                            setDataExcel(json);
                        }
                    }
                }
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
        onRemove(file) {
            setDataExcel([]);
        }
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

    const handleSubmit = async () => {
        const data = dataExcel.map(item => {
            item.password = '123456';
            return item;
        })
        const res = await postCreateBulkUsers(data);
        if (res && res.data) {
            notification.success({
                message: 'Upload thành công',
                description: `Success: ${res.data.countSuccess}, Error: ${res.data.countError}`
            })
            setIsOpenModalImport(false);
            setDataExcel([]);
            setFileUploaded([]);
            props.fetchUsersWithPaginate();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message,
            })
        }
    }

    return (
        <>
            <Modal
                title="Import data user"
                width={'50vw'}
                open={isOpenModalImport}
                onOk={() => handleSubmit()}
                onCancel={() => {
                    setIsOpenModalImport(false);
                    setDataExcel([]);
                    setFileUploaded([]);
                }}
                okText={'Import data'}
                // disable okButton when donn't have data
                okButtonProps={{
                    disabled: dataExcel.length < 1,
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
                        Support for a single. Only accept .csv .xls .xlsx
                        or <a onClick={(e) => e.stopPropagation()} href={templateFile} target="_blank" download>Download Sample File</a>
                    </p>
                </Dragger>

                <div style={{ paddingTop: 20 }}>
                    <Table
                        title={() => <span>Dữ liệu upload:</span>}
                        columns={columns}
                        dataSource={dataExcel}
                    />
                </div>
            </Modal>
        </>
    )
}

export default UserModalImport;