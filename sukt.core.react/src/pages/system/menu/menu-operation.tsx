import * as MenuEnum from "../../../core/constans/enum/menu";

import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Switch, message } from "antd";
import { useEffect, useImperativeHandle, useState } from "react";

import { IMenuService } from "@/core/domain/system/menu/service/imenu-service";
import { IOperationConfig } from "../../../shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { MenuInputDto } from "@/core/domain/system/menu/menu-entity";
import { MenuTypeEnumList } from "../../../core/constans/enum/menu";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
    /**
     * 操作成功回调事件
     */
    onCallbackEvent?: any;
    /**
     * Id
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
    wrapperCol: { span: 17 },
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
const MenuOperation = (props: IProp) => {
    const _menuservice: IMenuService = useHookProvider(IocTypes.MenuService);
    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
    const [initformData, setinitformData] = useState<MenuInputDto>(new MenuInputDto());
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
        props.id && _menuservice.getloadRow(props.id).then(res => {
            if (res.success) {
                console.log(res);
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
     * 添加菜单
     * @param _data 
     */
    const onCreate = (_data: MenuInputDto) => {
        _menuservice.create(_data).then(res => {
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
    const onEdit = (_data: MenuInputDto) => {
        props.id && _menuservice.update(props.id, _data).then(res => {
            if (res.success) {
                setOperationState({ visible: false })
                message.success(res.message, 3)
                props.onCallbackEvent && props.onCallbackEvent();
            }
        })
    }
    return (
        <div>
            <Modal width={1000} getContainer={false} maskClosable={false} title={operationState.title} closable={false} visible={operationState.visible}
                footer={null}>
                <Form form={formData}
                    {...formItemLayout}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}>
                    <Row>
                        <Col span="12">
                            <Form.Item
                                name="name"
                                label="菜单名">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="path"
                                label="路径">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form.Item
                                name="component"
                                label="对应组件">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="componentName"
                                label="组件名称">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form.Item
                                name="icon"
                                label="菜单icon">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span="12">

                            <Form.Item
                                name="microName"
                                label="菜单对应的子应用">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                        <Form.Item
                            name="type"
                            label="类型">
                            <Select>
                                {
                                    MenuTypeEnumList.map(item => {
                                        return <Select.Option value={item.value}>{item.label}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                label="是否显示"
                                valuePropName="checked"
                                name="isShow">
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form.Item
                                name="sort"
                                label="排序">
                                <InputNumber />
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
export default MenuOperation;