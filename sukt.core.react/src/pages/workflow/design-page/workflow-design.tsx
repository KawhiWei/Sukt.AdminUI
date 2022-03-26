import "./workflow-design.less"

import { Addon, Graph, Node } from '@antv/x6';
import { Button, Card, Row, message } from "antd";
import { INodeToolDto, NodeToolList } from "@/core/domain/workflow-design/antvx6-config/nodetoollistconfig";
import { useEffect, useState } from 'react';

import AddonFactory from "@/core/domain/workflow-design/antvx6/addonfactory";
import GraphFactory from "@/core/domain/workflow-design/antvx6/graphfactory";
import IGraphConfig from "@/core/domain/workflow-design/antvx6-config/antvx6graphconfig";
import IGraphService from "@/core/domain/workflow-design/antvx6/igraph-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { NodeType } from "@/core/domain/workflow-design/workflows-shared/nodetype";
import Provider from "@/shared/customHooks/provider";
import React from 'react';

class WorkFlowDesign extends React.Component {
    /**
     * 画布操作业务层
     */
    @Provider(IocTypes.GraphService)
    private _graphService!: IGraphService
    private _graph!: Graph;
    private addonDnd: any;
    componentDidMount() {
        const config: IGraphConfig = {
            container: "container",
            // miniMapContainer: "destiny-minimap",
        };
        this._graph = GraphFactory.createGraph(config);
        // this._graph.fromJSON(data)
        /**
             * 重写检查方法
             * @param node 
             */
        const validateNode = (node: Node) => {
            const result = this._graphService.validateNode(this._graph, node);
            if (!result && node.data.nodeType !== NodeType.workNode) {
                message.warning(
                    typeof node.data.nodeType !== "undefined" &&
                        node.data.nodeType === NodeType.startNode
                        ? "流程只允许有一个开始节点!"
                        : "流程只允许有一个结束节点!",
                    3
                );
                return false;
            }
            return true;
        };

        /**
         * 重写检查方法
         * @param this
         * @param node
         */
        this.addonDnd = AddonFactory.createAddon(this._graph, validateNode);
    }
    /**
     * 开始拖拽
     * @param e
     */
    startDrag(e: any, item: INodeToolDto) {
        const node = this._graphService.addNode(item, this._graph);
        this.addonDnd.start(node, e as any);
    }
    render() {
        return (
            <div id="workflow-root">
                <div id="worklflow-design">
                    <div className="workflow-design-component">
                        {
                            NodeToolList.map(_item => {
                                return <Button key={_item.type} draggable="true" type="primary" onMouseDown={($event) => this.startDrag($event, _item)} >{_item.label}</Button>
                            })
                        }
                    </div>
                    <div id="design">
                        <div id="container"></div>
                    </div>
                    <div className="workflow-design-attributes">
                        <Card title="属性设置">
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
export default WorkFlowDesign;
