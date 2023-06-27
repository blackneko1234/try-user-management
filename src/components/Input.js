import { DatePicker, Form, Input } from "antd";
import moment from "moment";

const CustomInput = ({ label, name, required = true, type, max, min, placeholder = "" }) => {
    let inputType = ""
    switch (type) {
        case "password":
            inputType = <Input.Password placeholder={placeholder} />
            break;
        case "date":
            inputType = <DatePicker format="DD/MM/YYYY" placeholder={placeholder} disabledDate={(current) => current.isAfter(moment())} />
            break;
        case "textArea":
            inputType = <Input.TextArea rows={4} placeholder={placeholder} />
            break
        default:
            inputType = <Input placeholder={placeholder} />
    }
    return (
        <Form.Item
            label={label}
            name={name}
            rules={
                type !== "date" ?
                    [
                        {
                            required: required,
                            message: `Please input your ${name}!`,
                        },
                        {
                            min: min, message: `${name} must be minimum ${min} characters.`,
                        },
                        {
                            max: max, message: `${name} must be maximum ${max} characters.`
                        }
                    ] : [
                        {
                            required: required,
                            message: `Please input your ${name}!`,
                        },
                    ]
            }
        >
            {inputType}
        </Form.Item >
    )
}
export default CustomInput