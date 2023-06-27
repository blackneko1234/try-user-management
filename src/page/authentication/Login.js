import { Typography, Row, Col, Button, Form } from "antd";
import { Link } from "react-router-dom";
import CustomInput from "../../components/Input";
import { loginAuth } from "../../services/Auth"

const onFinish = (values) => {
    loginAuth({
        username: values.username,
        password: values.password
    })
};

function Login() {
    return (
        <Row justify="center">
            <Col>
                <Typography.Title level={1}>Login</Typography.Title>
                <Form
                    name="login"
                    labelCol={{
                        span: 7,
                    }}
                    style={{
                        marginTop: "4%",
                    }}
                    onFinish={onFinish}
                >
                    <CustomInput label="Username" name="username" />
                    <CustomInput label="Password" name="password" type="password" />

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <div>
                    Want to join with us?
                    <Link to="/register"> Click here </Link>
                    to register
                </div>
            </Col>
        </Row>
    )
}
export default Login;