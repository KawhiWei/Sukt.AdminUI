import * as MenuEnum from "../../../core/constans/enum/menu";

import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, Switch, message } from "antd";
import { useImperativeHandle, useState } from "react";

import { IOperationConfig } from "../../../shared/operation/operationConfig";
import { IRoleService } from "../../..//core/domain/system/role/irole-service";
import { IocTypes } from "../../..//shared/config/ioc-types";
import { OperationTypeEnum } from "../../..//shared/operation/operationType";
import { RoleInputDto } from "../../..//core/domain/system/role/role-entity";
import moment from "moment";
import useHookProvider from "../../..//shared/customHooks/ioc-hook-provider";

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
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
};
/**
 * 日期框格式
 */
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
const RoleOperation = (props: IProp) => {
    const _roleservice: IRoleService = useHookProvider(IocTypes.RoleService);
    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
    const [initformData, setinitformData] = useState<RoleInputDto>(new RoleInputDto());
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
        _roleservice.getloadRow(_id).then(res => {
            if (res.success) {
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
        let param = new RoleInputDto();
        param.name=formfieldsValue.name;
        param.normalizedName=formfieldsValue.normalizedName;
        param.isAdmin=formfieldsValue.isAdmin;
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
    const onCreate = (_data: RoleInputDto) => {
        _roleservice.create(_data).then(res => {
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
    const onEdit = (_data: RoleInputDto) => {
        _roleservice.update(currentId, _data).then(res => {
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
                                name="name"
                                rules={[{ required: true }]}
                                label="角色名称">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="normalizedName"
                                rules={[{ required: true }]}
                                label="标准角色名称">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form.Item
                                name="isAdmin"
                                valuePropName="checked"
                                label="是否超级管理员">
                                <Switch />
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
export default RoleOperation;