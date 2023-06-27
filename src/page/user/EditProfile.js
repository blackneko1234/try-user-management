import { Typography, Row, Col, Button, Form, Space, Modal } from "antd";
import CustomInput from "../../components/Input";
import { localStorageID } from "../../router/routerIndex"
import { getProfile, updateUser } from "../../services/User"
import { store } from "../../store/store";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";

const onFinish = (id, values) => {
    updateUser(id, {
        name: values.name,
        age: moment().diff(`${values.birthdate}`, 'years', false),
        birthdate: moment(`${values.birthdate}`),
        address: values.address,
        remark: values.remark
    }).then(() => {
        if (id === localStorageID) {
            window.location.href = "/user"
        } else {
            window.location.href = "/console"
        }
    })
};

function EditProfile() {
    let { id } = useParams();
    if (id === undefined || id === null) {
        id = localStorageID
    }
    const [form] = Form.useForm();
    useEffect(() => {
        const initForm = () => {
            getProfile(id).then(() => {
                form.setFieldsValue({ ...store.getState().user, 'birthdate': dayjs(moment(store.getState().user.birthdate)) })
            })
        }
        initForm()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <Row justify="center">
            <Col>
                <Typography.Title level={1} style={{
                    marginBottom: "4%",
                }}>
                    Edit Profile
                </Typography.Title>
                <Form
                    onFinish={(data) => onFinish(id, data)}
                    form={form}
                    name="myForm"
                >
                    <CustomInput label="Full Name" name="name" />
                    <CustomInput label="Birthdate" name="birthdate" type="date" />
                    <CustomInput label="Address" name="address" type="textArea" />
                    <CustomInput label="Remark" name="remark" type="textArea" required={false} />
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Space size={16}>
                            <Button type="primary" onClick={showModal}  >
                                Save
                            </Button>
                            <Link to={(id === localStorageID) ? '/user' : '/console'}>
                                <Button>
                                    Cancel
                                </Button>
                            </Link>
                        </Space>
                    </Form.Item>
                </Form>
            </Col>
            <Modal title="Profile Update Confirmation" open={isModalOpen} onCancel={handleCancel}
                footer={[
                    <Button form="myForm" key="submit" type="primary" htmlType="submit">
                        Update
                    </Button>,
                    <Button key="Cancel" type="ghost" onClick={handleCancel}>
                        Cancel
                    </Button>,
                ]}>
                <p>Do you want to update this profile?</p>
            </Modal>
        </Row >
    )
}
export default EditProfile;