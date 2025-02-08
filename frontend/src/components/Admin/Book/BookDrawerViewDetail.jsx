import { Badge, Descriptions, Divider, Drawer } from 'antd';
import moment from 'moment';
import { FOR_DATE_DISPLAY } from '../../../utils/constant';

const BookDrawerViewDetail = (props) => {
    const { isOpenDrawerViewDetail, setIsOpenDrawerViewDetail, dataViewDetail, setDataViewDetail } = props;

    const handleClose = () => {
        setIsOpenDrawerViewDetail(false);
        setDataViewDetail(null);
    }

    return (
        <>
            <Drawer
                title="Chức năng xem chi tiết"
                width={'50vw'}
                onClose={() => handleClose()}
                open={isOpenDrawerViewDetail}
            >
                <Descriptions
                    title="Thông tin Sách"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataViewDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên sách">{dataViewDetail?.mainText}</Descriptions.Item>
                    <Descriptions.Item label="Tác giả">{dataViewDetail?.author}</Descriptions.Item>
                    <Descriptions.Item label="Giá tiền">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataViewDetail?.price ?? 0)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thể loại" span={2}>
                        <Badge status="processing" text={dataViewDetail?.category} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">{moment(dataViewDetail?.createdAt).format(FOR_DATE_DISPLAY)}</Descriptions.Item>
                    <Descriptions.Item label="Updated At">{moment(dataViewDetail?.updatedAt).format(FOR_DATE_DISPLAY)}</Descriptions.Item>
                </Descriptions>
                <Divider orientation='left'>Ảnh Sách</Divider>
            </Drawer>
        </>
    )
}

export default BookDrawerViewDetail;