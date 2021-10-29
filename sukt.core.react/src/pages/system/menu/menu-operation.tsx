import * as MenuEnum from "../../../core/constans/enum/menu";

import { Button, Form, Input, InputNumber, Modal, Select, Switch, message } from "antd";
import { useImperativeHandle, useState } from "react";

import { IMenuService } from "@/core/domain/system/menu/service/imenu-service";
import { IOperationConfig } from "../../../shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { MenuInputDto } from "@/core/domain/system/menu/menu-entity";
import { MenuTypeEnumList } from "../../../core/constans/enum/menu";
import { OperationTypeEnum } from "@/shared/operation/operationType";
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
                    console.log(_menuservice);
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
        _menuservice.getloadRow(_id).then(res => {
            if (res.success) {
                console.log(res);
                formData.setFieldsValue(res.data);
                editOperationState(true, "查看")
            }
        })
    }
    /**
     * 底部栏OK事件
     */
    const onOk = () => {
        let param = formData.getFieldsValue();
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
    }
    const onFinish = (values: any) => {
        console.log(values);
    };
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
        _menuservice.update(currentId, _data).then(res => {
            if (res.success) {
                setOperationState({ visible: false })
                message.success(res.message, 3)
                props.onCallbackEvent && props.onCallbackEvent();
            }
        })
    }
    return (
        <div>
            <Modal width={1000} getContainer={false} maskClosable={false} title={operationState.title} closable={false} visible={operationState.visible} onCancel={onCancel} onOk={onOk}
                footer={[
                    <Button key="back" onClick={onCancel}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" onClick={onOk}>
                        保存
                    </Button>
                ]}>
                <Form form={formData}
                    {...formItemLayout}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}>
                    <Form.Item
                        name="name"
                        label="菜单名">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="path"
                        label="路径">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="component"
                        label="对应组件">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="componentName"
                        label="组件名称">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="icon"
                        label="菜单icon">
                        <Input />
                    </Form.Item>
                    <Form.Item label="类型">
                        <Select>
                            {
                                MenuTypeEnumList.map(item => {
                                    return <Select.Option value={item.value}>{item.label}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="是否显示"
                        valuePropName="checked"
                        name="isShow">
                        <Switch />
                    </Form.Item>
                    <Form.Item
                        name="microName"
                        label="菜单对应的子应用">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="sort"
                        label="排序">
                        <InputNumber />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
};
export default MenuOperation;