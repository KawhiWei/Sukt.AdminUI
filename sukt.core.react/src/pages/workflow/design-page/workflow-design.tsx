import "./workflow-design.less"

import { Addon, Graph } from '@antv/x6';
import { Card, Row } from "antd";
import { useEffect, useState } from 'react';

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
    private graph!: Graph;
    private addonDnd: any;

    constructor(props:any){
       super(props);
        this.state={
           containerElement:<div id="container"></div>
        }
        // super();
    }

    componentDidMount() {
        const container = document.getElementById("container");
        const width: number = container !== null ? container.clientWidth : 1200;
        const height: number = container !== null ? container.clientHeight : 900;
        this.graph = new Graph({
            container: container!,
            width: width,
            height: height,
            snapline: true,
            // grid: {
            //     size: 15, // 网格大小 10px
            //     visible: true, // 绘制网格，默认绘制 dot 类型网格
            //     type: "mesh",
            //     args: {
            //         color: "#ddd", // 网格线/点颜色
            //         thickness: 2, // 网格线宽度/网格点大小
            //     },
            // },
        });
        window.addEventListener("resize", () => {
            const resizecontainerHtml = document.getElementById("container");
            // debugger
            const resizewidth: number =
                resizecontainerHtml !== null ? resizecontainerHtml.clientWidth : 1200;
            const resizeheight: number =
                resizecontainerHtml !== null ? resizecontainerHtml.clientHeight : 900;
            // console.log(resizewidth, resizeheight);
            this.graph.resize(resizewidth, resizeheight);
        });

        this.graph.fromJSON(data)
        /**
     * 重写检查方法
     * @param this
     * @param node
     */
        this.addonDnd = new Addon.Dnd({
            target: this.graph,
        });
    }
    render() {
        return (
            <div id="workflow-root">
                {/* <Row> */}
                <div id="worklflow-design">
                    <div className="workflow-design-component">
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
                {/* </Row> */}
            </div>
        )
    }
}
export default WorkFlowDesign;



// const WorkFlowDesign = () => {
//     const [addonDnd, setAddonDndState] = useState<any>()
//     useEffect(() => {
//         const container = document.getElementById("container");
//         const graph = new Graph({
//             container: container!,
//             width: 800,
//             height: 800,
//             background: {
//                 color: '#fffbe6', // 设置画布背景颜色
//             },
//             grid: {
//                 size: 10,      // 网格大小 10px
//                 visible: true, // 渲染网格背景
//             },
//         });
//         debugger
//         setAddonDndState({
//             target: graph,
//         });
//     })
//     return (
//         <div>
//             <div id="container">


//             </div>
//         </div>
//     )

// }
// export default WorkFlowDesign;