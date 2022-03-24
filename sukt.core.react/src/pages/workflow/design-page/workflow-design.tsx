import "./workflow-design.less"

import { Addon, Graph } from '@antv/x6';
import { Button, Card, Row } from "antd";
import { INodeToolDto, NodeToolList } from "@/core/domain/workflow-design/antvx6-config/nodetoollistconfig";
import { useEffect, useState } from 'react';

import AddonFactory from "@/core/domain/workflow-design/antvx6/addonfactory";
import GraphFactory from "@/core/domain/workflow-design/antvx6/graphfactory";
import IGraphConfig from "@/core/domain/workflow-design/antvx6-config/antvx6graphconfig";
import IGraphService from "@/core/domain/workflow-design/antvx6/igraph-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Provider from "@/shared/customHooks/provider";
import React from 'react';

const data = {
    // 节点
    nodes: [
        {
            id: 'node1', // String，可选，节点的唯一标识
            x: 40,       // Number，必选，节点位置的 x 值
            y: 40,       // Number，必选，节点位置的 y 值
            width: 80,   // Number，可选，节点大小的 width 值
            height: 40,  // Number，可选，节点大小的 height 值
            label: 'hello', // String，节点标签
        },
        {
            id: 'node2', // String，节点的唯一标识
            x: 160,      // Number，必选，节点位置的 x 值
            y: 180,      // Number，必选，节点位置的 y 值
            width: 80,   // Number，可选，节点大小的 width 值
            height: 40,  // Number，可选，节点大小的 height 值
            label: 'world', // String，节点标签
        },
    ],
    // 边
    edges: [
        {
            source: 'node1', // String，必须，起始节点 id
            target: 'node2', // String，必须，目标节点 id
        },
    ],
};
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
        this._graph.fromJSON(data)
        /**
         * 重写检查方法
         * @param this
         * @param node
         */
        this.addonDnd = AddonFactory.createAddon(this._graph);
    }
    /**
     * 开始拖拽
     * @param e
     */
    startDrag(e: any, item: INodeToolDto) {
        const node = this._graphService.addNode(item,this._graph);
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
