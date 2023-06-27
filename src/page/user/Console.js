import { Typography, Row, Col, Button, Space, Table, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../services/User";
import { useEffect, useState } from "react";
import { store } from "../../store/store";
import moment from "moment";

function Console() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchData = () => {
            getAllUsers().then(() => {
                setUsers(store.getState().users)
            })
        }
        fetchData()
    }, [])
    const dataSource = [];
    for (let index = 0; index < users.length; index++) {
        dataSource.push({
            key: users[index]._id,
            name: users[index].name,
            birthdate: moment(users[index].birthdate).format("DD/MM/YYYY"),
            age: users[index].age,
            address: users[index].address,
            remark: users[index].remark,
        })
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Birthdate',
            dataIndex: 'birthdate',
            key: 'birthdate',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Remark',
            dataIndex: 'remark',
            key: 'remark',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Space size="middle">
                        <Link to={"/user/" + record.key + "/edit"}>
                            <Button type="primary">
                                Edit
                            </Button>
                        </Link>
                        <Button danger type="primary" onClick={showModal}>Delete</Button>
                    </Space>
                    <Modal title="Profile Delete Confirmation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                        footer={[
                            <Button key="Cancel" type="primary" onClick={handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="Delete" type="ghost" danger onClick={() => handleOk(record.key)}>
                                Delete
                            </Button>,
                        ]}>
                        <p>Do you want to delete this profile?</p>
                    </Modal>
                </div >
            ),
        },
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = (id) => {
        deleteUser(id).then(() => {
            navigate(0)
        })
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <Row justify="center" style={{ marginLeft: "3%", marginRight: "3%" }}>
            <Col>
                <Typography.Title level={1} style={{
                    marginBottom: "4%",
                }}>
                    Admin Console
                </Typography.Title>
                <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
            </Col>
        </Row >
    )
}
export default Console;