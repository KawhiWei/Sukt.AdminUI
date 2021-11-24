import { Button, Col, Form, Input, Modal, Row, Select, Switch, message } from "antd";
import { useEffect, useImperativeHandle, useState } from "react";

import { IMultitenantService } from "@/core/domain/system/multitenant/imultitenant-service";
import { IOperationConfig } from "../../../shared/operation/operationConfig";
import { IocTypes } from "../../..//shared/config/ioc-types";
import { MultiTenantInputDto } from "@/core/domain/system/multitenant/multitenant-entity";
import { OperationTypeEnum } from "../../..//shared/operation/operationType";
import useHookProvider from "../../..//shared/customHooks/ioc-hook-provider";

interface IProp {
    /**
     * 操作成功回调事件
     */
    onCallbackEvent?: any;
    /**
     * 租户Id
     */
    id?: string;
    /**
     * 操作类型
     */
    operationType: OperationTypeEnum
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
const MultitenantOperation = (props: IProp) => {
    const _multitenantservice: IMultitenantService = useHookProvider(IocTypes.MultitenantService);
    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
    const [initformData, setinitformData] = useState<MultiTenantInputDto>(new MultiTenantInputDto());
    const [formData] = Form.useForm();
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
        props.onCallbackEvent && props.onCallbackEvent()
    };
    /**
     * 编辑获取一个表单
     * @param _id 
     */
    const onGetLoad = () => {
        switch (props.operationType) {
            case OperationTypeEnum.add:
                editOperationState(true, "添加")
                formData.setFieldsValue(initformData);
                break;
            case OperationTypeEnum.view:
                editOperationState(true, "查看")
                break;
        }
        props.id && _multitenantservice.getloadRow(props.id).then(res => {
            if (res.success) {
                formData.setFieldsValue(res.data);
                editOperationState(true, "修改")
            }
        })
    }
    /**
     * 页面初始化事件
     */
    useEffect(() => {
        onGetLoad()
    }, [formData]);
    /**
     * Modal保存事件
     * @param formfieldsValue 
     */
    const onFinish = (formfieldsValue: any) => {
        let param = new MultiTenantInputDto();
        param.companyName = formfieldsValue.companyName;
        param.linkMan = formfieldsValue.linkMan;
        param.phoneNumber = formfieldsValue.phoneNumber;
        param.email = formfieldsValue.email;
        param.isEnable = formfieldsValue.isEnable;
        switch (props.operationType) {
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
    const onCreate = (_data: MultiTenantInputDto) => {
        _multitenantservice.create(_data).then(res => {
            if (res.success) {
                setOperationState({ visible: false })
                message.success(res.message, 3)
                props.onCallbackEvent && props.onCallbackEvent();
            }else {
                message.error(res.message, 3)
            }
        })
    }
    /**
     * 修改保存
     * @param _data 
     */
    const onEdit = (_data: MultiTenantInputDto) => {
        props.id && _multitenantservice.update(props.id, _data).then(res => {
            if (res.success) {
                setOperationState({ visible: false })
                message.success(res.message, 3)
                props.onCallbackEvent && props.onCallbackEvent();
            }else {
                message.error(res.message, 3)
            }
        })
    }
    return (
        <div>
            <Modal width={1000} getContainer={false} maskClosable={false} title={operationState.title}
                closable={false} visible={operationState.visible} footer={null}>
                <Form form={formData}
                    {...formItemLayout}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}>
                    <Row>
                        <Col span="12">
                            <Form.Item
                                name="companyName"
                                rules={[{ required: true }]}
                                label="公司名称">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="linkMan"
                                rules={[{ required: true }]}
                                label="联系人">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form.Item
                                name="phoneNumber"
                                rules={[{ required: true, pattern: /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/, message: "手机号 格式不符合要求!" }]}
                                label="联系电话">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="email"
                                rules={[{ required: true, type: 'email' }]}
                                label="邮箱地址">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
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
export default MultitenantOperation;