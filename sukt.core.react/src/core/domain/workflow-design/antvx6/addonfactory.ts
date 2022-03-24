import { Addon, Graph } from "@antv/x6";

import { Dnd } from "@antv/x6/lib/addon";

export default class AddonFactory {
    static createAddon(_graph: Graph): Dnd {
        return new Addon.Dnd({
            target: _graph,
            animation: true
        });
    }
}