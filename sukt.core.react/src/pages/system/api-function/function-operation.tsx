import { Button, Col, Form, Input, Modal, Row, Switch, message } from "antd";
import { useEffect, useImperativeHandle, useState } from "react";

import { FunctionDto } from "@/core/domain/system/api-function/function-entity";
import { IFunctionService } from "@/core/domain/system/api-function/ifunction-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
    /**
     * Id
     */
    id?: string;
    /**
     * 操作类型
     */
    operationType: OperationTypeEnum
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
const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};


const FunctionOperation = (props: IProp) => {
    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
    const _functionservice: IFunctionService = useHookProvider(IocTypes.FunctionService);
    const [formData] = Form.useForm();
    const [initformData, setinitformData] = useState<FunctionDto>(new FunctionDto());
    /**
     * 底部栏OK事件
     */
    const onFinish = () => {
        let param = formData.getFieldsValue();
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
    }
    /**
         * 弹框取消事件
         */
    const onCancel = () => {
        editOperationState(false)
        props.onCallbackEvent && props.onCallbackEvent()
    };
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
        props.id && _functionservice.getloadRow(props.id).then(res => {
            if (res.success) {
                formData.setFieldsValue(res.data);
                editOperationState(true, "查看")
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
         * 添加
         * @param _data 
         */
    const onCreate = (_data: FunctionDto) => {
        _functionservice.create(_data).then(res => {
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
    const onEdit = (_data: FunctionDto) => {
        props.id && _functionservice.update(props.id, _data).then(res => {
            if (res.success) {
                setOperationState({ visible: false })
                message.success(res.message, 3)
                props.onCallbackEvent && props.onCallbackEvent();
            }
        })
    }
    return (
        <div>
            <Modal width={1000} getContainer={false} maskClosable={false} title={operationState.title} closable={false}
                visible={operationState.visible} footer={null}>
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
                                label="功能名称">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="linkUrl"
                                rules={[{ required: true }]}
                                label="Api地址">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form.Item
                                name="isEnabled"
                                valuePropName="checked"
                                label="是否启用">
                                <Switch />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="description"
                                // rules={[{ required: true }]}
                                label="描述">
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
            </Modal></div>
    )
}
export default FunctionOperation;