import * as MenuEnum from "../../../core/constans/enum/menu";

import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, Switch, message } from "antd";
import { useImperativeHandle, useState } from "react";

import { IOperationConfig } from "../../../shared/operation/operationConfig";
import { IUserService } from "@/core/domain/system/user/iuser-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { UserInputDto } from "@/core/domain/system/user/user-entity";
import { UserTypeEnumList } from "@/core/constans/enum/user";
import moment from "moment";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
    /**
     * 
     */
    operationRef?: any;
    /**
     * 操作成功回调事件
     */
    onCallbackEvent?: any;
}
/**
 * form表单布局设置
 */
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 19 },
};
/**
 * 日期框格式
 */
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const validateMessages = {
    required: "${label} 不可为空!",
    types: {
        email: "${label} 格式不符合要求!",
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};
const UserOperation = (props: IProp) => {
    const _userservice: IUserService = useHookProvider(IocTypes.UserService);
    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
    const [initformData, setinitformData] = useState<UserInputDto>(new UserInputDto());
    const [birthday, setBirthday] = useState<string>("");
    const [formData] = Form.useForm();
    const [currentId, setcurrentId] = useState<string>("");
    /**
     * 操作类型
     */
    const [operationType, setOperationType] = useState<OperationTypeEnum>(OperationTypeEnum.view);
    /**
     * 父组件调用子组件事件处理
     */
    useImperativeHandle(props.operationRef, () => ({
        changeVal: (_operationType: OperationTypeEnum, _id?: string) => {
            setOperationType(_operationType);
            switch (_operationType) {
                case OperationTypeEnum.add:
                    editOperationState(true, "添加")
                    formData.setFieldsValue(initformData);
                    break;
                case OperationTypeEnum.edit:
                    _id && setcurrentId(_id);
                    _id && onGetLoad(_id);
                    break;
                case OperationTypeEnum.view:
                    editOperationState(true, "查看")
                    break;
            }
        }
    }));
    /**
     * 修改弹框属性
     * @param _visible 
     * @param _title 
     */
    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    }
    /**
     * 因为antd 太辣鸡，导致没有办法直接在form表单使用string给表单加载日期，需要单独定义一个字段来转换从而产生了此方法
     */
    const editBirthday=(date:any, dateString:any)=>{
        console.log(date,dateString)
        setBirthday(dateString)
    }
    /**
     * 弹框取消事件
     */
    const onCancel = () => {
        editOperationState(false)
    };
    /**
     * 编辑获取一个表单
     * @param _id 
     */
    const onGetLoad = (_id: string) => {
        _userservice.getloadRow(_id).then(res => {
            if (res.success) {
                console.log(res);
                setBirthday(res.data.birthday)
                formData.setFieldsValue(res.data);
                editOperationState(true, "查看")
            }
        })
    }
    /**
     * Modal保存事件
     * @param formfieldsValue 
     */
    const onFinish = (formfieldsValue: any) => {
        let param = new UserInputDto();
        param.normalizedUserName = formfieldsValue.normalizedUserName;
        param.userName = formfieldsValue.userName;
        param.nickName = formfieldsValue.nickName;
        param.phoneNumber = formfieldsValue.phoneNumber;
        param.email = formfieldsValue.email;
        param.idCard = formfieldsValue.idCard;
        param.isEnable = formfieldsValue.isEnable;
        param.birthday = birthday;
        param.education = formfieldsValue.education;
        param.userType = formfieldsValue.userType;
        param.sex = formfieldsValue.sex;
        if (operationType === OperationTypeEnum.add) {
            param.passwordHash = formfieldsValue.passwordHash;
        }
        // console.log(formfieldsValue['birthday'].format('YYYY-MM-DD HH:mm:ss'));
        // console.log(formfieldsValue['birthday'].format('YYYY-MM-DD'));
        switch (operationType) {
            case OperationTypeEnum.add:
                onCreate(param);
                break;
            case OperationTypeEnum.edit:
                onEdit(param);
                break;
            case OperationTypeEnum.view:
                break;
        }
    };
    /**
     * 添加菜单
     * @param _data 
     */
    const onCreate = (_data: UserInputDto) => {
        _userservice.create(_data).then(res => {
            if (res.success) {
                setOperationState({ visible: false })
                message.success(res.message, 3)
                props.onCallbackEvent && props.onCallbackEvent();
            }
        })
    }
    /**
     * 修改保存
     * @param _data 
     */
    const onEdit = (_data: UserInputDto) => {
        _userservice.update(currentId, _data).then(res => {
            if (res.success) {
                setOperationState({ visible: false })
                message.success(res.message, 3)
                props.onCallbackEvent && props.onCallbackEvent();
            }
        })
    }
    return (
        <div>
            <Modal width={1000} getContainer={false} maskClosable={false} title={operationState.title} closable={false} visible={operationState.visible} footer={null}>
                <Form form={formData}
                    {...formItemLayout}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}>
                    <Row>
                        <Col span="12">
                            <Form.Item
                                name="normalizedUserName"
                                rules={[{ required: true }]}
                                label="登录账号">
                                <Input />
                            </Form.Item>
                        </Col>
                        { }
                        <Col span="12">
                            {operationType === OperationTypeEnum.add &&
                                (
                                    <Form.Item
                                        name="passwordHash"
                                        rules={[{ required: true }]}
                                        label="登录密码">
                                        <Input />
                                    </Form.Item>
                                )
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form.Item
                                name="userName"
                                rules={[{ required: true }]}
                                label="姓名">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="nickName"
                                rules={[{ required: true }]}
                                label="用户昵称">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form.Item
                                name="phoneNumber"
                                rules={[{ required: true, pattern: /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/, message: "手机号 格式不符合要求!" }]}
                                label="手机号码">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="email"
                                rules={[{ required: true, type: 'email' }]}
                                label="电子邮箱">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form.Item
                                rules={[{ required: true, pattern: /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|30|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/, message: "身份证 格式不符合要求!" }]}
                                name="idCard"
                                label="身份证号">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="isEnable"
                                valuePropName="checked"
                                label="是否启用">
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form.Item
                                label="生日">
                                <DatePicker  onChange={editBirthday} value={moment(birthday, 'YYYY-MM-DD')}/>
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="education"
                                label="学历">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form.Item label="用户类型" name="userType">
                                <Select>
                                    {
                                        UserTypeEnumList.map(item => {
                                            return <Select.Option value={item.value}>{item.label}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="sex"
                                label="性别">
                                <Select>
                                    <Select.Option value="男">男</Select.Option>
                                    <Select.Option value="女">女</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24" style={{ textAlign: 'right' }}>
                            <Form.Item>
                                <Button style={{ margin: '0 8px' }} onClick={() => onCancel()}>取消</Button>
                                <Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">保存</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
};
export default UserOperation;