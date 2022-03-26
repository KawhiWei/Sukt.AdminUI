import { CirculationType, ProcessingStrategyType, SignatureType } from "../../workflows-shared/process-struct-types";

import { ApprovalStrategy } from "./approvalstrategy";
import { NodeType } from "../../workflows-shared/nodetype";

export interface NodeData {
    circulationType: CirculationType;
    nodeType: NodeType;
    processingStrategy: ProcessingStrategyType;
    signatureType: SignatureType;
    approvalStrategy?: ApprovalStrategy;
    nodeDefaultApprovalStrategy?: ApprovalStrategy;
}