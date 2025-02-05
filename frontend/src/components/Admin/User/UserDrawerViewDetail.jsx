import { Badge, Descriptions, Drawer } from 'antd';
import moment from 'moment';
import { FOR_DATE_DISPLAY } from '../../../utils/constant';

const UserDrawerViewDetail = (props) => {
    const { isOpenDrawerViewDetail, setIsOpenDrawerViewDetail, dataUserViewDetail, setDataUserViewDetail } = props;

    const onClose = () => {
        setIsOpenDrawerViewDetail(false)
        setDataUserViewDetail(null)
    }

    return (
        <>
            <Drawer
                title="Chức năng xem chi tiết"
                onClose={onClose}
                open={isOpenDrawerViewDetail}
                width={'50vw'}
            >
                <div>
                    <Descriptions
                        title="Thông tin User"
                        bordered
                        column={2} //default=3
                    >
                        <Descriptions.Item label="Id">{dataUserViewDetail?._id}</Descriptions.Item>
                        <Descriptions.Item label="Tên hiển thị">{dataUserViewDetail?.fullName}</Descriptions.Item>
                        <Descriptions.Item label="Email">{dataUserViewDetail?.email}</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{dataUserViewDetail?.phone}</Descriptions.Item>

                        <Descriptions.Item label="Role" span={2}>
                            <Badge status="processing" text={dataUserViewDetail?.role} />
                        </Descriptions.Item>

                        <Descriptions.Item label="Created At">
                            {moment(dataUserViewDetail?.createdAt).format(FOR_DATE_DISPLAY)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Updated At">
                            {moment(dataUserViewDetail?.updatedAt).format(FOR_DATE_DISPLAY)}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </Drawer>
        </>
    )
}

export default UserDrawerViewDetail;