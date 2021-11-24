import { Button, Col, Drawer, PaginationProps, Row, Table, Tag, Tree, message } from "antd";
import { Key, useEffect, useImperativeHandle, useState } from "react";

import { AntDesignTreeEntity } from "@/shared/entity/antdesign-tree-entity";
import { IBusinessRoleDto } from "@/core/domain/system/role/role-entity";
import { IMenuService } from "@/core/domain/system/menu/service/imenu-service";
import { IOperationConfig } from "../../../shared/operation/operationConfig";
import { IRoleService } from "@/core/domain/system/role/irole-service";
import { IocTypes } from "@/shared/config/ioc-types";
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
  /**
   * Id
   */
  id: string;
}
/**
 * 
 */
const RoleAllocationMenu = (props: IProp) => {
  const _roleservice: IRoleService = useHookProvider(IocTypes.RoleService);
  const _menuservice: IMenuService = useHookProvider(IocTypes.MenuService);
  const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
  const [treeData, setTreeData] = useState<Array<AntDesignTreeEntity>>([]);
  const [isRefrensh, setRefrensh] = useState<boolean>(true);
  /**
   * 修改弹框属性
   * @param _visible 
   * @param _title 
   */
  const editOperationState = (_visible: boolean, _title?: string) => {
    setOperationState({ visible: _visible, title: _title });
  }
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  /**
   * 全选状态的key
   */
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const onSelect = (selectedKeysValue: any, info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };
  /**
   * 页面初始化事件
   */
  useEffect(() => {
    getallocationRoleMenu()
  }, [isRefrensh]);
  const getLoadTree = () => {
    _menuservice.getTree().then(res => {
      if (res.success) {
        setRefrensh(false);
        setTreeData(res.data)
        editOperationState(true, "配置菜单")
      }
    })
  }
  /**
   * 获取角色菜单
   * @param _id 
   */
  const getallocationRoleMenu = () => {
    _roleservice.getallocationRoleMenu(props.id).then(res => {
      if (res.success) {
        setCheckedKeys((checked) => {
          checked = res.data;
          return checked;
        })
        getLoadTree();
      }
    })
  }
  const onSave = () => {
    _roleservice.allocationRoleMenu(props.id, checkedKeys).then(res => {
      if (res.success) {
        message.success(res.message, 3)
        editOperationState(false);
        props.onCallbackEvent && props.onCallbackEvent();
      }
    })
  }
  /**
   * 抽屜取消事件
   */
  const onCancel = () => {
    editOperationState(false)
    props.onCallbackEvent && props.onCallbackEvent();
  };
  const onCheck = (data: any, info: any) => {
    setCheckedKeys((checked) => {
      return [];
    })
    //当前节点
    let checked: Array<string> = data.checked;
    let currentnode: AntDesignTreeEntity = info.node;
    let allchecked: Array<string> = []
    let checkednodes: Array<AntDesignTreeEntity> = info.checkedNodes;
    //根据当前节点选择状态如果是false则移除当前节点和当前节点下的所有子级
    if (currentnode.checked) {
      checkednodes = checkednodes.filter(node => {
        if (node.parentNumbers != null && node.parentNumbers.indexOf(currentnode.key) > -1) {
          let index = checked.findIndex((ele: string) => ele === node.key)
          checked.splice(index, 1);
        }
        return node.parentNumbers != null && node.parentNumbers.indexOf(currentnode.key) === -1;
      })
    }
    /**
     * 循环当前选中的所有节点
     */
    checkednodes.forEach(node => {
      if (node.parentNumbers !== '' && node.parentNumbers !== null) {
        let arr = node.parentNumbers.split(",");
        if (arr.length > 0) {
          allchecked.push.apply(allchecked, arr);
        }
      }
    });
    // allchecked.push.apply(allchecked, checked.filter((node: any) => {
    //   return !removearr.some(ele => ele === node);// node;
    // }))
    allchecked.push.apply(allchecked, checked)
    setCheckedKeys((checked) => {
      checked = Array.from(new Set(allchecked));
      return checked;
    })
  };
  return (
    <div>
      <Drawer title={operationState.title} closable={false} maskClosable={false} width={640}
        placement="right" onClose={onCancel} visible={operationState.visible}>
        <Row>
          <Col span="24" style={{ textAlign: 'right' }}>
            <Button style={{ margin: '0 8px' }} onClick={() => onCancel()}>取消</Button>
            <Button style={{ margin: '0 8px' }} type="primary" onClick={() => onSave()}>保存</Button>
          </Col>
        </Row>
        <Tree
          checkable
          defaultExpandAll={true}
          checkStrictly={true}
          // onExpand={onExpand}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={treeData}
        />
      </Drawer>
    </div>
  );
}
export default RoleAllocationMenu;