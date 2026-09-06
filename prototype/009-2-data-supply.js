(function () {
  'use strict';
  var T0 = window.__EVA_DEMO_TIME.T0;
  var T1 = window.__EVA_DEMO_TIME.T1;
  var supplySkills = [
    {
      id: 'sk-supply-procurement', workspace_id: 'prod', name: '间接采购需求分析',
      description: '归集跨部门采购需求，识别重复项、预算缺口与交期冲突',
      created_by: '王宜林', created_at: T0, updated_at: T1,
      content: '# 间接采购需求分析\n\n按品类、数量、预算、交期和使用部门整理需求，输出缺口清单与询价建议。', files: []
    },
    {
      id: 'sk-supply-sqe', workspace_id: 'prod', name: 'SQE质量问题研判',
      description: '分析供应商质量异常、8D 报告、临时措施和长期整改证据',
      created_by: '王宜林', created_at: T0, updated_at: T1,
      content: '# SQE质量问题研判\n\n核对异常范围、根因、临时处置、长期措施与验证记录，形成供应商整改建议。', files: []
    },
    {
      id: 'sk-supply-compliance', workspace_id: 'prod', name: '供应链合规风险检查',
      description: '检查供应商准入材料、关联关系、合同条款与履约风险',
      created_by: '王宜林', created_at: T0, updated_at: T1,
      content: '# 供应链合规风险检查\n\n按资质、关联关系、关键条款和履约记录识别风险，输出待补材料和处理建议。', files: []
    },
    {
      id: 'sk-supply-tender', workspace_id: 'prod', name: '招投标文件评审',
      description: '核对招标范围、评分规则、商务条款与评审记录的一致性',
      created_by: '王宜林', created_at: T0, updated_at: T1,
      content: '# 招投标文件评审\n\n按采购范围、资格条件、评分标准和商务条款逐项复核，输出风险项与修订建议。', files: []
    },
    {
      id: 'sk-supply-cost', workspace_id: 'prod', name: '供应链成本偏差分析',
      description: '拆解采购价格、物流费用、汇率与用量变化造成的成本偏差',
      created_by: '王宜林', created_at: T0, updated_at: T1,
      content: '# 供应链成本偏差分析\n\n统一预算、合同与实际发生口径，定位价差和量差并形成降本建议。', files: []
    },
    {
      id: 'sk-supply-kd', workspace_id: 'prod', name: 'KD排产风险分析',
      description: '结合需求、产能、物料齐套和运输周期识别排产风险',
      created_by: '王宜林', created_at: T0, updated_at: T1,
      content: '# KD排产风险分析\n\n核对需求计划、产能约束、齐套率和运输节点，输出风险等级与调整方案。', files: []
    },
    {
      id: 'sk-supply-contract', workspace_id: 'prod', name: '供应链合同全周期检查',
      description: '检查合同签订、履约、变更、续签与终止节点',
      created_by: '王宜林', created_at: T0, updated_at: T1,
      content: '# 供应链合同全周期检查\n\n识别即将到期、履约偏差和关键条款风险，形成续签或处置清单。', files: []
    }
  ];

  function supplyExpert(id, name, description, skillIds) {
    return {
      id: id, workspace_id: 'prod', runtime_id: 'rt-org', name: name,
      description: description,
      instructions: description + '。按“供应链运营协同”项目口径执行，结论、证据和待处理项挂回对应任务。',
      status: 'idle', model: 'qwen3.8-max', visibility: 'shared', max_concurrent_tasks: 2,
      created_at: T0, updated_at: T1, runtime_name: '组织共享 Runtime', owner_name: '王宜林',
      skill_ids: skillIds,
      skills: supplySkills.filter(function (skill) { return skillIds.indexOf(skill.id) >= 0; })
    };
  }

  var supplyAgents = [
    supplyExpert('ag-supply-procurement', '间接采购专家', '负责需求归集、品类分析、询价比价与采购建议', ['sk-supply-procurement', 'sk-supply-compliance']),
    supplyExpert('ag-supply-tender', '招投标管理专家', '负责招标方案、资格条件、评分规则与评审过程管理', ['sk-supply-tender', 'sk-supply-compliance']),
    supplyExpert('ag-supply-sqe', 'SQE运营专家', '负责供应商质量异常研判、整改跟踪与验证闭环', ['sk-supply-sqe']),
    supplyExpert('ag-supply-cost', '供应链成本运营专家', '负责采购成本偏差分析、价格趋势研判与降本机会识别', ['sk-supply-cost', 'sk-supply-procurement']),
    supplyExpert('ag-supply-kd', '供应链KD排产专家', '负责需求、产能、齐套与运输节点的排产风险分析', ['sk-supply-kd']),
    supplyExpert('ag-supply-compliance', '供应链合规风控专家', '负责供应商准入、关联关系和履约环节的合规风险检查', ['sk-supply-compliance']),
    supplyExpert('ag-supply-contract', '供应链合同管理专家', '负责合同签订、履约、变更、续签与终止节点管理', ['sk-supply-contract', 'sk-supply-compliance'])
  ];

  var supplySquads = [{
    id: 'sq-supply-procurement', workspace_id: 'prod', name: '采购与招投标专家团',
    description: '联合完成需求归集、询价比价、招标文件与成本评审',
    instructions: '由间接采购专家担任团长。先汇总采购需求，再由招投标管理专家和供应链成本运营专家并行核对评审规则与成本口径，形成采购决策建议。',
    leader_id: 'ag-supply-procurement', creator_id: 'u-wangyilin', member_count: 3,
    members: [
      { member_type: 'agent', member_id: 'ag-supply-procurement', role: 'leader', member_name: '间接采购专家' },
      { member_type: 'agent', member_id: 'ag-supply-tender', role: '招投标管理', member_name: '招投标管理专家' },
      { member_type: 'agent', member_id: 'ag-supply-cost', role: '成本运营', member_name: '供应链成本运营专家' }
    ],
    created_at: T0, updated_at: T1, leader_name: '间接采购专家', creator_name: '王宜林'
  }, {
    id: 'sq-supply-risk', workspace_id: 'prod', name: '履约与风险专家团',
    description: '联合处理质量、排产、合规与合同履约风险',
    instructions: '由供应链合规风控专家担任团长。SQE运营专家、供应链KD排产专家和供应链合同管理专家分别核查质量、交付与合同风险，汇总为分级处置方案。',
    leader_id: 'ag-supply-compliance', creator_id: 'u-wangyilin', member_count: 4,
    members: [
      { member_type: 'agent', member_id: 'ag-supply-compliance', role: 'leader', member_name: '供应链合规风控专家' },
      { member_type: 'agent', member_id: 'ag-supply-sqe', role: '质量运营', member_name: 'SQE运营专家' },
      { member_type: 'agent', member_id: 'ag-supply-kd', role: 'KD排产', member_name: '供应链KD排产专家' },
      { member_type: 'agent', member_id: 'ag-supply-contract', role: '合同管理', member_name: '供应链合同管理专家' }
    ],
    created_at: T0, updated_at: T1, leader_name: '供应链合规风控专家', creator_name: '王宜林'
  }];

  var supplyProjects = [{
    id: 'p-supply', workspace_id: 'prod', title: '供应链运营协同',
    description: '协同推进间接采购、供应商质量与合规风控工作', icon: '📦',
    status: 'in_progress', priority: 'high', lead_type: 'member', lead_id: 'u-wangyilin',
    issue_count: 7, done_count: 1, created_at: T0, updated_at: T1, lead_name: '王宜林'
  }];

  function supplyTask(number, title, status, priority, assigneeType, assigneeId, assigneeName, description) {
    return {
      id: 'supply-' + number, workspace_id: 'prod', number: number,
      identifier: 'SC-' + (100 + number), title: title, description: description, status: status,
      priority: priority, assignee_type: assigneeType, assignee_id: assigneeId,
      assignee_name: assigneeName, creator_id: 'u-wangyilin', creator_name: '王宜林',
      creator_avatar: window.__EVA_CURRENT_USER_PORTRAIT,
      project_id: 'p-supply', project_name: '供应链运营协同', position: number,
      created_at: T0, updated_at: T1
    };
  }

  var supplyIssues = [
    supplyTask(1, '完成本季度间接采购需求归集', 'in_progress', 'high', 'squad', 'sq-supply-procurement', '采购与招投标专家团', '合并行政、IT 和设备维保需求，确认数量、预算、交期与待补信息。'),
    supplyTask(2, '完成供应商招投标文件评审', 'in_review', 'high', 'agent', 'ag-supply-tender', '招投标管理专家', '复核资格条件、评分规则、技术标与商务标，标记影响公平性和履约的风险项。'),
    supplyTask(3, '处理关键供应商来料质量异常', 'in_progress', 'high', 'agent', 'ag-supply-sqe', 'SQE运营专家', '复核批次 A-2409 的隔离措施、8D 根因分析和长期整改证据。'),
    supplyTask(4, '分析核心品类采购成本偏差', 'todo', 'medium', 'agent', 'ag-supply-cost', '供应链成本运营专家', '拆解预算、合同与实际采购金额的价差、量差和物流费用影响。'),
    supplyTask(5, '评估下月KD排产与齐套风险', 'todo', 'high', 'agent', 'ag-supply-kd', '供应链KD排产专家', '结合需求计划、产能、物料齐套率和运输周期识别高风险节点。'),
    supplyTask(6, '复核新供应商准入合规材料', 'todo', 'high', 'squad', 'sq-supply-risk', '履约与风险专家团', '检查供应商资质、关联关系声明、制裁名单与关键履约条款。'),
    supplyTask(7, '完成到期采购合同续签检查', 'done', 'medium', 'agent', 'ag-supply-contract', '供应链合同管理专家', '核对三份到期合同的履约情况、价格调整、续签期限和终止条件。')
  ];

  var supplyAgentTasks = {};
  supplyAgents.forEach(function (agent) {
    supplyAgentTasks[agent.id] = supplyIssues.filter(function (issue) { return issue.assignee_id === agent.id; }).map(function (issue, index) {
      return {
        id: 'at-' + agent.id + '-' + index, agent_id: agent.id, issue_id: issue.id,
        status: issue.status === 'done' ? 'completed' : issue.status === 'in_progress' ? 'running' : 'queued',
        created_at: issue.created_at, started_at: issue.created_at,
        completed_at: issue.status === 'done' ? issue.updated_at : null,
        kind: 'manual', trigger_summary: issue.title
      };
    });
  });

  window.__EVA_SUPPLY_CHAIN_DEMO = {
    agents: supplyAgents, squads: supplySquads, skills: supplySkills, autopilots: [],
    projects: supplyProjects, issues: supplyIssues, agentTasks: supplyAgentTasks
  };
})();
