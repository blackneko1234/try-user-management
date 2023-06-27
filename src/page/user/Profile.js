import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import { Typography, Row, Col, Button, Space, Modal } from "antd";
import { localStorageID } from "../../router/routerIndex"
import { getProfile, deleteUser } from "../../services/User"
import { logout } from "../../services/Auth"
import { store } from "../../store/store";
import moment from "moment";

function Profile() {
    let { id } = useParams();
    if (id === undefined || id === null) {
        id = localStorageID
    }
    const [user, setUser] = useState({})
    useEffect(() => {
        const fetchData = () => {
            getProfile(id).then(() => {
                setUser(store.getState().user)
            })
        }
        fetchData()
    }, [id])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        deleteUser(id).then(() => {
            logout()
        })
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Row justify="center">
                <Col>
                    <Typography.Title level={1} style={{
                        marginBottom: "4%",
                    }}>
                        Profile
                    </Typography.Title>
                    <Typography.Title level={4}>Name: <span style={{ color: "blue" }}>{user.name}</span> </Typography.Title>
                    <Typography.Title level={4}>Birthdate: <span style={{ color: "blue" }}>{moment(user.birthdate).format("DD/MM/YYYY")}</span> </Typography.Title>
                    <Typography.Title level={4}>Age: <span style={{ color: "blue" }}>{user.age}</span> </Typography.Title>
                    <Typography.Title level={4}>Address: <span style={{ color: "blue" }}>{user.address}</span> </Typography.Title>
                    <Typography.Title level={4}>Remark: <span style={{ color: "blue" }}>{user.remark}</span> </Typography.Title>
                </Col>
            </Row>
            <Row justify="center" style={{ marginTop: "2%" }}>
                <Space size={16}>
                    <Col>
                        <Link to="edit">
                            <Button type="primary">
                                Edit
                            </Button>
                        </Link>
                    </Col>
                    <Col>
                        <Button type="primary" danger onClick={showModal}>
                            Delete
                        </Button>
                    </Col>
                </Space>
            </Row>
            <Modal title="Profile Delete Confirmation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="Cancel" type="primary" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="Delete" type="ghost" danger onClick={handleOk}>
                        Delete
                    </Button>,
                ]}>
                <p>Do you want to delete this profile?</p>
            </Modal>
        </div>
    )
}
export default Profile;