import { Graph, Shape } from "@antv/x6";
import { circleNodeBaseConfig, edgeBaseConfig, rectWorkNodeConfig, startNodeConfig } from "../antvx6-config/node-defaultconfig";

import IGraphConfig from "../antvx6-config/antvx6graphconfig";

export default class GraphFactory {
    static createGraph(_graph: IGraphConfig): Graph{
        const container = document.getElementById(_graph.container);
        const width: number = container !== null ? container.clientWidth : 1200;
        const height: number = container !== null ? container.clientHeight : 900;
        
        this.InitGraphShapeStyle();
        this.registerCustom();
        const graph= new Graph({
            container: container!,
            width: width,
            height: height,
            snapline: true,
            grid: {
                size: 15, // 网格大小 10px
                visible: true, // 绘制网格，默认绘制 dot 类型网格
                type: "mesh",
                args: {
                    color: "#ddd", // 网格线/点颜色
                    thickness: 2, // 网格线宽度/网格点大小
                },
            },
        });
        window.addEventListener("resize", () => {
            const resizecontainerHtml = document.getElementById("container");
            // debugger
            const resizewidth: number =
                resizecontainerHtml !== null ? resizecontainerHtml.clientWidth : 1200;
            const resizeheight: number =
                resizecontainerHtml !== null ? resizecontainerHtml.clientHeight : 900;
            // console.log(resizewidth, resizeheight);
            graph.resize(resizewidth, resizeheight);
        });


        
        return graph;
    }

    private static getcontainerHtml(_containerid: string): HTMLElement | null {
        return document.getElementById(_containerid);
    }
    /**
     * 初始化节点及通用属性
     */
    private static InitGraphShapeStyle() {
        /**
         * 设置Edge默认样式及通用属性
         */
        Shape.Edge.config(edgeBaseConfig);
        /**
         * 设置Rect默认样式及通用属性
         */
        Shape.Rect.config(rectWorkNodeConfig);
        /**
         * 设置Circle默认样式及通用属性
         */
        Shape.Circle.config(circleNodeBaseConfig);
        /**
         * 设置Circle默认样式及通用属性
         */
        Shape.Ellipse.config(circleNodeBaseConfig);
    }
    /**
     * 初始化节点及通用属性
     */
     private static registerCustom() {
         Graph.registerNode("custom-start",startNodeConfig,  true)
    }
}
