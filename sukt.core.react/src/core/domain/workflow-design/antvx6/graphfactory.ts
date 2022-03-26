import { FunctionExt, Graph, Shape } from "@antv/x6";
import { circleNodeBaseConfig, edgeBaseConfig, rectWorkNodeConfig, startNodeConfig } from "../antvx6-config/node-defaultconfig";

import IGraphConfig from "../antvx6-config/antvx6graphconfig";

export default class GraphFactory {

    static createGraph(_graph: IGraphConfig): Graph {
        const container = document.getElementById(_graph.container);
        const width: number = container !== null ? container.clientWidth : 1200;
        const height: number = container !== null ? container.clientHeight : 900;

        this.InitGraphShapeStyle();
        this.registerCustom();
        const graph = new Graph({
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
            /**
             *
             */
            connecting: {
                dangling: false, // 边的起点或者终点只能是节点或者连接桩。
                snap: true,//当 snap 设置为 true 时连线的过程中距离节点或者连接桩 50px 时会触发自动吸附
                connectionPoint: "boundary",//指定连接点，默认值为 boundary。//anchor
                anchor: "center",// 不允许连接到节点上(只能连接到连接桩上)
                allowNode: false,//不允许连接到节点上(只能连接到连接桩上)
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

        /*
         * 鼠标移动到节点显示连接桩
         */
        graph.on(
            "node:mouseenter",
            FunctionExt.debounce(() => {
                const ports = document.querySelectorAll(".x6-port-body") as NodeListOf<
                    SVGAElement
                >;
                this.showPorts(ports, true);
            }),
            500
        );
        /**
         * 鼠标移动出节点隐藏连接桩
         */
        graph.on(
            "node:mouseleave",
            FunctionExt.debounce(() => {
                const ports = document.querySelectorAll(".x6-port-body") as NodeListOf<
                    SVGAElement
                >;
                this.showPorts(ports, false);
            }),
            500
        );
        return graph;
    }
    private static getcontainerHtml(_containerid: string): HTMLElement | null {
        return document.getElementById(_containerid);
    }
    /**
    * 重置节点或者线的Style样式
    */
    private reset(_graph: Graph) {
        const nodes = _graph.getNodes();
        const edges = _graph.getEdges();
        nodes.forEach((node: any) => {
            /***
             * 判断节点类型
             */
            switch (node.shape) {
                case "rect":
                    node.attr("body", {
                        fill: "rgba(95,149,255,0.05)",
                        stroke: "#5f95ff",
                        strokeWidth: 1,
                    });
                    break;
                case "circle":
                    node.attr("body", {
                        stroke: "#fb982c",
                        strokeWidth: 1,
                        fill: "rgba(251,152,44,0.05)",
                    });
                    break;
            }
        });
        edges.forEach((edge: any) => {
            edge.zIndex = 1;
            edge.attr("line/stroke", "#5f95ff");
            edge.prop("labels/0", {
                attrs: {
                    body: {
                        stroke: "#5f95ff",
                    },
                },
            });
        });
    }
    /**
     * 显示或者隐藏链接桩
     * @param ports 
     * @param show 
     */
    private static showPorts(ports: NodeListOf<SVGAElement>, show: boolean) {
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
            ports[i].style.visibility = show ? "visible" : "hidden";
        }
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
        Graph.registerNode("custom-start", startNodeConfig, true)
    }
}
