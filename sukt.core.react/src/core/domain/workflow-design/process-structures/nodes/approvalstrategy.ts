import { NodeProcessorType } from "../../workflows-shared/process-struct-types";

export interface ApprovalStrategy {
    nodeProcessorType: NodeProcessorType;
    positionIds: string[];
    departmentIds: string[];
    userIds: string[];
    roleIds: string[];
}