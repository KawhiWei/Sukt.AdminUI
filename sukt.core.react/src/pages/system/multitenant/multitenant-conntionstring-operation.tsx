import { Button, Col, Form, Input, Modal, Row, Select, Switch, message } from "antd";
import { useImperativeHandle, useState } from "react";

import { IMultitenantService } from "@/core/domain/system/multitenant/imultitenant-service";
import { IOperationConfig } from "../../../shared/operation/operationConfig";
import { IocTypes } from "../../..//shared/config/ioc-types";
import { MultiTenantConntionstringInputDto } from "@/core/domain/system/multitenant/multitenant-entity";
import { OperationTypeEnum } from "../../..//shared/operation/operationType";
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
                    _id && setcurrentId(_id);
                    formData.setFieldsValue(initformData);
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
     * Modal保存事件
     * @param formfieldsValue 
     */
    const onFinish = (formfieldsValue: any) => {
        let param = new MultiTenantConntionstringInputDto();
        param.name=formfieldsValue.name;
        param.value=formfieldsValue.value;
        switch (operationType) {
            case OperationTypeEnum.add:
                onCreate(param);
                break;
        }
    };
    /**
     * 添加菜单
     * @param _data 
     */
    const onCreate = (_data: MultiTenantConntionstringInputDto) => {
        debugger
        _multitenantservice.createConntionstring(currentId,_data).then(res => {
            if (res.success) {
                setOperationState({ visible: false })
                message.success(res.message, 3)
                props.onCallbackEvent && props.onCallbackEvent();
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