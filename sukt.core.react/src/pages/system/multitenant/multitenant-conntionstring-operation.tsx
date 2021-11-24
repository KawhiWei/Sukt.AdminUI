import { Button, Col, Form, Input, Modal, Row, Select, Switch, message } from "antd";
import { useEffect, useImperativeHandle, useState } from "react";

import { IMultitenantService } from "@/core/domain/system/multitenant/imultitenant-service";
import { IOperationConfig } from "../../../shared/operation/operationConfig";
import { IocTypes } from "../../..//shared/config/ioc-types";
import { MultiTenantConntionstringInputDto } from "@/core/domain/system/multitenant/multitenant-entity";
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
    tenantId: string;
    /**
     * 编辑Id
     */
    id?: string
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
/**
 * 添加租户数据库连接字符串
 * @param props 
 * @returns 
 */
const MultitenantConntionstringOperation = (props: IProp) => {
    const _multitenantservice: IMultitenantService = useHookProvider(IocTypes.MultitenantService);
    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
    const [initformData, setinitformData] = useState<MultiTenantConntionstringInputDto>(new MultiTenantConntionstringInputDto());
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
        props.id && _multitenantservice.getloadRowConntionstring(props.tenantId, props.id).then(res => {
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
     * 弹框取消事件
     */
    const onCancel = () => {
        editOperationState(false)
        props.onCallbackEvent && props.onCallbackEvent();
    };
    /**
     * Modal保存事件
     * @param formfieldsValue 
     */
    const onFinish = (formfieldsValue: any) => {
        let param = new MultiTenantConntionstringInputDto();
        param.name = formfieldsValue.name;
        param.value = formfieldsValue.value;
        switch (props.operationType) {
            case OperationTypeEnum.add:
                onCreate(param);
                break;
            case OperationTypeEnum.edit:
                onUpdate(param);
                break;
        }
    };
    /**
     * 添加菜单
     * @param _data 
     */
    const onCreate = (_data: MultiTenantConntionstringInputDto) => {
        _multitenantservice.createConntionstring(props.tenantId, _data).then(res => {
            if (res.success) {
                setOperationState({ visible: false })
                message.success(res.message, 3)
                props.onCallbackEvent && props.onCallbackEvent();
            }
            else {
                message.error(res.message, 3)
            }
        })
    }
    /**
     * 添加菜单
     * @param _data 
     */
    const onUpdate = (_data: MultiTenantConntionstringInputDto) => {
        props.id && _multitenantservice.updateConntionstring(props.tenantId, props.id, _data).then(res => {
            if (res.success) {
                setOperationState({ visible: false })
                message.success(res.message, 3)
                props.onCallbackEvent && props.onCallbackEvent();
            }
            else {
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
                                name="name"
                                rules={[{ required: true }]}
                                label="服务名称">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="value"
                                rules={[{ required: true }]}
                                label="数据库连接字符串">
                                <Input />
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
export default MultitenantConntionstringOperation;