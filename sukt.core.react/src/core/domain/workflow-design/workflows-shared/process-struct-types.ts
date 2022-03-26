export enum ApprovalStrategyDefaultType {
    /// <summary>
    /// 无
    /// </summary>
    None,
    /// <summary>
    /// 角色组
    /// </summary>
    RoleGroup = 5,
    /// <summary>
    /// 组织架构
    /// </summary>
    Organization = 10,
    /// <summary>
    /// 职位
    /// </summary>
    Position = 15,
}

export enum BelongCondition {
    /// <summary>
    /// 属于
    /// </summary>
    BelongTo = 0,
    /// <summary>
    /// 不属于
    /// </summary>
    NotBelongTo = 5,
}

export enum BelongConditionType {
    Department = 0,
    DepartmentLeader = 5
}

export enum CirculationType {
    /// <summary>
    /// 无
    /// </summary>
    None = 0,
    /// <summary>
    /// 单一步骤
    /// </summary>
    SingleStep = 5,
    /// <summary>
    /// 根据条件判断无后续步骤提示
    /// </summary>
    OperateAccordingToConditionsNoStepTips = 10,
}

export enum NextHandlerType {
    /// <summary>
    /// 发起人
    /// </summary>
    Sponsor = 0,
    /// <summary>
    /// 发送人
    /// </summary>
    Sender = 5,
}

export enum NodeProcessorType {
    /// <summary>
    /// 所有成员
    /// </summary>
    AllUser,
    /// <summary>
    /// 部门
    /// </summary>
    Department,
    /// <summary>
    /// 职位
    /// </summary>
    Position,
    /// <summary>
    /// 角色
    /// </summary>
    Role,
    /// <summary>
    /// 发起者部门领导
    /// </summary>
    InitiatorDepartmentLeader,
    /// <summary>
    /// 发起者部门所有成员
    /// </summary>
    InitiatorDepartmentAllUser,
    /// <summary>
    /// 上一步处理者
    /// </summary>
    LastStepUser,
}
export enum ProcessingStrategyType {
    /// <summary>
    /// 一人同意即可
    /// </summary>
    OneAgreed = 0,
    /// <summary>
    /// 所有人同意
    /// </summary>
    AllAgreed = 5,

}
export enum SignatureType {
    /// <summary>
    /// 无签批意见栏
    /// </summary>
    NoApprovalComments = 0,
    /// <summary>
    /// 有签批意见 - 无须签章
    /// </summary>
    WithApprovalCommentsNoNeedToSign = 5,
    /// <summary>
    /// 有签批意见 - 须签章
    /// </summary>

    SithApprovalCommentsSignatureRequired = 10,
}
export enum WorkFlowFilterConnect {
    /// <summary>
    /// 并且
    /// </summary>
    And,
    /// <summary>
    /// 或者
    /// </summary>
    Or
}