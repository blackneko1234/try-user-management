import { Typography, Row, Col, Button, Form } from "antd";
import { Link } from "react-router-dom";
import CustomInput from "../../components/Input";
import moment from "moment";
import { registerAuth } from "../../services/Auth"

const onFinish = (values) => {
    registerAuth({
        username: values.username,
        password: values.password,
        role: "user",
        name: values.name,
        age: moment().diff(`${values.birthdate}`, 'years', false),
        birthdate: moment(`${values.birthdate}`),
        address: values.address,
        remark: ""
    })
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

function Register() {
    return (
        <Row justify="center">
            <Col span={8}>
                <Typography.Title level={1}>Register</Typography.Title>
                <Form
                    name="register"
                    labelCol={{
                        span: 7,
                    }}
                    style={{
                        marginTop: "4%",
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <CustomInput label="Username" name="username" min={6} />
                    <CustomInput label="Password" name="password" min={8} type="password" />
                    <CustomInput label="Full Name" name="name" />
                    <CustomInput label="Birthdate" name="birthdate" type="date" />
                    <CustomInput label="Address" name="address" type="textArea" />
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>

                <div>
                    You already have an account?
                    <Link to="/login"> Click here </Link>
                    to login
                </div>
            </Col>
        </Row>
    )
}
export default Register;