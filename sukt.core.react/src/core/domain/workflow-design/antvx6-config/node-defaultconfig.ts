var intformat = require('biguint-format')
var FlakeId = require('flake-idgen');
var flakeIdGen = new FlakeId();
const nodePortsConfig = {
    ports: {
        groups: {
            left: {
                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: "#5f95ff",
                        strokeWidth: 1,
                        fill: "#fff",
                        visibility: "hidden"
                    },
                },
                position: "left",
            },
            top: {
                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: "#5f95ff",
                        strokeWidth: 1,
                        fill: "#fff",
                        visibility: "hidden"
                    },
                },
                position: "top",
            },
            right: {
                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: "#5f95ff",
                        strokeWidth: 1,
                        fill: "#fff",
                        visibility: "hidden"
                    },
                },
                position: "right",
            },
            bottom: {
                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: "#5f95ff",
                        strokeWidth: 1,
                        fill: "#fff",
                        visibility: "hidden"
                    },
                },
                position: "bottom",
            },
        },
        items: [
            { id: intformat(flakeIdGen.next(),'dec'), group: "left" },
            { id: intformat(flakeIdGen.next(),'dec'), group: "top" },
            { id: intformat(flakeIdGen.next(),'dec'), group: "right" },
            { id: intformat(flakeIdGen.next(),'dec'), group: "bottom" },
        ],
    },
}

/**
 * 长方形节点Body配置
 */
const rectBody = {
    body: {
        fill: "rgba(95,149,255,0.05)",
        stroke: "#5f95ff",
        strokeWidth: 1,
        rx: 30, // 圆角
        ry: 30,
    },
}

/**
 * 开始节点节点Body配置
 */
const rectangleRectBody = {
    body: {
        fill: "#EFF4FF",
        stroke: "#5F95FF",
        strokeWidth: 1,
        rx: 0, // 圆角
        ry: 0,
    },
}

/**
 * 审批节点默认配置
 * rectWorkNodeConfig
 */
export const rectWorkNodeConfig = {
    attrs: {
        ...rectangleRectBody,
        label: {
            x: 0,//设置文字的偏移位置
            // fill: "#5F95FF", //设置字体颜色
            // fontWeight: "bold" //设置字体粗细
        },
        // image: {
        //     width: 30,
        //     height: 30,
        //     rx: 5, // 圆角
        //     ry: 5,
        // }
    },
    ...nodePortsConfig,
    visible: true,
    zIndex: 1,
    x: 40, // Number，必选，节点位置的 x 值
    y: 40, // Number，必选，节点位置的 y 值
    width: 120, // Number，可选，节点大小的 width 值
    height: 40, // Number，可选，节点大小的 height 值
    // markup: [
    //     {
    //         tagName: "rect",
    //         selector: "body"
    //     },
    //     {
    //         tagName: "image",
    //         selector: "image"
    //     },
    //     {
    //         tagName: "text",
    //         selector: "label"
    //     }
    // ],
}

/**
 * 开始节点默认配置
 * rectWorkNodeConfig
 */
 export const startNodeConfig = {
    // shape:"custom-start",
    attrs: {
        ...rectangleRectBody,
        label: {
            x: 0,//设置文字的偏移位置
            // fill: "#5F95FF", //设置字体颜色
            // fontWeight: "bold" //设置字体粗细
        },
        image: {
            width: 30,
            height: 30,
            rx: 5, // 圆角
            ry: 5,
        }
    },
    ...nodePortsConfig,
    visible: true,
    zIndex: 1,
    x: 40, // Number，必选，节点位置的 x 值
    y: 40, // Number，必选，节点位置的 y 值
    width: 120, // Number，可选，节点大小的 width 值
    height: 40, // Number，可选，节点大小的 height 值
}

/**
 * 圆节点Body配置
 */
const circleBody = {
    body: {
        stroke: '#fb982c',
        strokeWidth: 1,
        // fill: "rgba(251,152,44,0.05)"
    },
}

/**
 * 圆节点默认配置
 */
export const circleNodeBaseConfig = {
    attrs: {
        label: {
            fontSize: 12,
            fill: 'black',
            fontWeight: "bold"
        },
        ...circleBody,
        image: {
            width: 40,
            height: 40,
            x: 5,
            y: 5
        },
    },

    visible: true,
    zIndex: 1,
    x: 40, // Number，必选，节点位置的 x 值
    y: 40, // Number，必选，节点位置的 y 值
    width: 50, // Number，可选，节点大小的 width 值
    height: 50, // Number，可选，节点大小的 height 值
    parent: "",//
    markup: [
        {
            tagName: "circle",
            selector: "body"
        },
        {
            tagName: "image",
            selector: "image"
        },
        {
            tagName: "text",
            selector: "label"
        }
    ],
    ...nodePortsConfig,
}


/**
 * Edge 默认配置
 */
export const edgeBaseConfig = {
    router: "manhattan",
    attrs: {
        line: {
            stroke: "#A2B1C3",
        }
    },
    args: {
        padding: 1,
    },
    connector: {
        name: 'rounded',
        args: {
            radius: 8,
        },
    },
}