import { Modal, Tabs } from 'antd';
import UserInfo from './UserInfo'
import ChangePassword from './ChangePassword';

const ManageAccount = (props) => {
    const { openModalManageUser, setOpenModalManageUser, avatarPreview, setAvatarPreview } = props;

    const items = [
        {
            key: 'info',
            label: 'Cập nhật thông tin',
            children: <UserInfo
                avatarPreview={avatarPreview}
                setAvatarPreview={setAvatarPreview}
            />,
        },
        {
            key: 'password',
            label: 'Đổi mật khẩu',
            children: <ChangePassword />,
        }
    ];

    return (
        <>
            <Modal
                title="Quản lý tài khoản"
                open={openModalManageUser}
                onCancel={() => setOpenModalManageUser(false)}
                width={'60vw'}
                footer={false}
                maskClosable={false}
            >
                <Tabs
                    defaultActiveKey="info"
                    items={items}
                />
            </Modal>
        </>
    )
}

export default ManageAccount;