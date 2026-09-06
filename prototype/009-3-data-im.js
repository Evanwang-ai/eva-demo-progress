(function () {
  'use strict';
  window.__EVA_IM_DEMO = {
    channels: [
      { id: 'im-eva-octo', name: 'EVA + OCTO 融合推进群', color: '#7567d8', unread: 0, members: 6, lastAt: '2026-09-04T18:20:00+08:00', threads: [], demoOnly: true },
      { id: 'im-delivery', name: '项目交付推进', color: '#66789e', unread: 0, members: 5, lastAt: '2026-09-04T17:30:00+08:00', threads: [], demoOnly: true },
      { id: 'im-review', name: '方案评审', color: '#5f8798', unread: 0, members: 4, lastAt: '2026-09-04T16:42:00+08:00', threads: [], demoOnly: true },
      { id: 'im-meeting', name: '会议跟进', color: '#9a8062', unread: 0, members: 5, lastAt: '2026-09-04T15:40:00+08:00', threads: [], demoOnly: true },
      { id: 'im-ai-focus', name: '整理今天的工作重点', color: '#7567d8', unread: 0, members: 2, lastAt: '2026-09-04T10:28:00+08:00', threads: [], demoOnly: true },
      { id: 'im-ai-drive', name: '云盘权限方案梳理', color: '#7567d8', unread: 0, members: 2, lastAt: '2026-09-04T10:18:00+08:00', threads: [], demoOnly: true },
      { id: 'im-ai-meeting', name: '会议纪要与待办', color: '#7567d8', unread: 0, members: 2, lastAt: '2026-09-03T18:20:00+08:00', threads: [], demoOnly: true },
      { id: 'im-pilot-trip', name: '明天的出差行程', color: '#4b91b8', unread: 0, members: 2, lastAt: '2026-09-02T17:15:00+08:00', threads: [], demoOnly: true },
      { id: 'im-pilot-client', name: '客户拜访准备', color: '#4b91b8', unread: 0, members: 2, lastAt: '2026-09-02T16:25:00+08:00', threads: [], demoOnly: true },
      { id: 'im-pilot-brief', name: '本周飞行简报', color: '#4b91b8', unread: 0, members: 2, lastAt: '2026-09-02T15:30:00+08:00', threads: [], demoOnly: true }
    ],
    messages: {
      'im-eva-octo': [
        { kind: 'divider', text: '9月4日' },
        { kind: 'text', sender: { uid: 'u-haozong', name: '昊总', color: '#6f75a8', online: true }, time: '17:42', text: 'EVA+OCTO融合性怎么样了？' },
        { kind: 'text', sender: { uid: 'u-kangzhixi', name: '康执玺', color: '#4c83a5', online: true }, time: '17:45', text: '@EVA+OCTO项目助手 汇报一下最新进展和情况。', mentions: [{ name: '@EVA+OCTO项目助手', uid: 'b-eva-octo' }] },
        { kind: 'text', sender: { uid: 'b-eva-octo', name: 'EVA+OCTO项目助手', color: '#7567d8', ai: true, online: true }, time: '17:47', text: '最新进展：消息、Loop 任务与团队文件的演示链路已贯通；统一 IM 会话框架正在收口。\n当前问题：任务触发后的身份与权限仍需联调。\n主要风险：月底上线窗口较紧，数字员工进入任务后的异常恢复与验收口径需要尽快确认。' },
        { kind: 'text', sender: { uid: 'u-haozong', name: '昊总', color: '#6f75a8', online: true }, time: '17:55', text: '需要在月底前上线，并打通数字员工，让数字员工进入任务协作。' },
        { kind: 'text', sender: { uid: 'u-kangzhixi', name: '康执玺', color: '#4c83a5', online: true }, time: '18:02', text: '@EVA+OCTO项目助手 创建前面这个任务，并指定 @威少 做负责人。', mentions: [{ name: '@EVA+OCTO项目助手', uid: 'b-eva-octo' }, { name: '@威少', uid: 'u-weishao' }] },
        { kind: 'text', sender: { uid: 'b-eva-octo', name: 'EVA+OCTO项目助手', color: '#7567d8', ai: true, online: true }, time: '18:03', text: '任务已创建，负责人已指定为威少。' },
        { kind: 'refcard', sender: { uid: 'b-eva-octo', name: 'EVA+OCTO项目助手', color: '#7567d8', ai: true, online: true }, time: '18:03', ref: { target: 'issue', title: '月底前完成 EVA + OCTO 融合上线并接入数字员工', spaceName: 'EVA + OCTO 融合推进群', desc: '负责人：威少 · 截止：本月底', allowed: true, issueId: 'issue22' } }
      ],
      'im-delivery': [
        { kind: 'divider', text: '9月4日' },
        { kind: 'text', sender: { uid: 'u-chenbo', name: '陈博', color: '#8c658f', online: true }, time: '16:58', text: '客户演示环境已经更新，请把今天的交付风险和负责人一起收口。' },
        { kind: 'text', sender: { uid: 'u-wangyilin', name: '王宜林', color: '#557a94', online: true }, time: '17:02', text: '@王宜林的 Eva 助理 请根据群内结论整理交付清单。', mentions: [{ name: '@王宜林的 Eva 助理', uid: 'b-wangyilin' }] },
        { kind: 'text', sender: { uid: 'b-wangyilin', name: '王宜林的 Eva 助理', color: '#7567d8', ai: true, online: true }, time: '17:05', text: '已整理为三项：演示环境确认、关键链路回归、现场异常兜底。每项都已补齐负责人和截止时间。' },
        { kind: 'taskcard', sender: { uid: 'b-wangyilin', name: '王宜林的 Eva 助理', color: '#7567d8', ai: true, online: true }, time: '17:06', note: '由群聊结论创建，负责人和截止时间已同步。' }
      ],
      'im-review': [
        { kind: 'divider', text: '9月4日' },
        { kind: 'text', sender: { uid: 'u-wangyilin', name: '王宜林', color: '#557a94', online: true }, time: '16:35', text: '@王宜林的 Eva 助理 读取附件，给出本次评审最需要确认的三项。', mentions: [{ name: '@王宜林的 Eva 助理', uid: 'b-wangyilin' }] },
        { kind: 'file', sender: { uid: 'u-chenbo', name: '陈博', color: '#8c658f', online: true }, time: '16:36', file: { name: 'EVA-OCTO融合方案评审稿.pdf', size: 2726297, extension: 'pdf' } },
        { kind: 'text', sender: { uid: 'b-wangyilin', name: '王宜林的 Eva 助理', color: '#7567d8', ai: true, online: true }, time: '16:42', text: '需要确认：一、IM 内核与 Eva 外壳的边界；二、AI 身份与权限继承；三、上线前的回归范围。文档第 6、11、18 页分别给出了对应方案。' }
      ],
      'im-meeting': [
        { kind: 'divider', text: '9月4日' },
        { kind: 'text', sender: { uid: 'u-kangzhixi', name: '康执玺', color: '#4c83a5', online: true }, time: '15:22', text: '刚才会议里有结论、有行动项，也有一个待确认风险。' },
        { kind: 'text', sender: { uid: 'u-wangyilin', name: '王宜林', color: '#557a94', online: true }, time: '15:24', text: '@王宜林的 Eva 助理 按这三类整理，并把行动项转成任务。', mentions: [{ name: '@王宜林的 Eva 助理', uid: 'b-wangyilin' }] },
        { kind: 'text', sender: { uid: 'b-wangyilin', name: '王宜林的 Eva 助理', color: '#7567d8', ai: true, online: true }, time: '15:28', text: '已完成分类：结论 2 项、行动项 3 项、待确认风险 1 项。行动项已转成任务并关联到原会议。' }
      ],
      'im-ai-focus': [
        { kind: 'divider', text: '9月4日' },
        { kind: 'text', sender: { uid: 'u-wangyilin', name: '王宜林', color: '#557a94', online: true }, time: '10:26', text: '帮我把今天要推进的事情排一下优先级。' },
        { kind: 'text', sender: { uid: 'b-wangyilin', name: '王宜林的 Eva 助理', color: '#7567d8', ai: true, online: true }, time: '10:28', text: '建议先处理三件事：\n1. 确认项目群聊的任务归属；\n2. 补齐通讯录中的 AI 身份；\n3. 下午评审前检查 Demo 的关键跳转。' },
        { kind: 'taskcard', sender: { uid: 'b-wangyilin', name: '王宜林的 Eva 助理', color: '#7567d8', ai: true, online: true }, time: '10:28', note: '已创建待办：Demo 评审前检查 · 今天 17:30' }
      ],
      'im-ai-drive': [
        { kind: 'divider', text: '9月4日' },
        { kind: 'text', sender: { uid: 'u-wangyilin', name: '王宜林', color: '#557a94', online: true }, time: '10:12', text: '把云盘权限方案压缩成一个能评审的版本。' },
        { kind: 'text', sender: { uid: 'b-wangyilin', name: '王宜林的 Eva 助理', color: '#7567d8', ai: true, online: true }, time: '10:18', text: '核心边界可以收敛为：个人文件默认私有，团队文件继承项目权限，跨项目分享必须显式授权。评审时重点确认继承关系和失效后的回收规则。' }
      ],
      'im-ai-meeting': [
        { kind: 'divider', text: '9月3日' },
        { kind: 'text', sender: { uid: 'u-wangyilin', name: '王宜林', color: '#557a94', online: true }, time: '18:12', text: '把刚才会议里的结论和待办分开。' },
        { kind: 'text', sender: { uid: 'b-wangyilin', name: '王宜林的 Eva 助理', color: '#7567d8', ai: true, online: true }, time: '18:20', text: '结论：新版导航继续使用当前方案；团队 IM 全部进入统一内核。\n待办：补齐我的 AI 多身份入口，并同步更新通讯录展示。' }
      ],
      'im-pilot-trip': [
        { kind: 'divider', text: '9月2日' },
        { kind: 'text', sender: { uid: 'u-wangyilin', name: '王宜林', color: '#557a94', online: true }, time: '17:08', text: '明天去杭州，把行程整理得紧凑一点。' },
        { kind: 'text', sender: { uid: 'b-pilot', name: '飞行员E号（王宜林的分身）', color: '#4b91b8', ai: true, online: true }, time: '17:15', text: '建议 08:30 出发，上午留给客户沟通，午后安排现场确认，返程前预留 40 分钟整理结论。关键材料已按出发、会议、返程三个阶段归类。' }
      ],
      'im-pilot-client': [
        { kind: 'divider', text: '9月2日' },
        { kind: 'text', sender: { uid: 'u-wangyilin', name: '王宜林', color: '#557a94', online: true }, time: '16:18', text: '客户拜访前我还需要准备什么？' },
        { kind: 'text', sender: { uid: 'b-pilot', name: '飞行员E号（王宜林的分身）', color: '#4b91b8', ai: true, online: true }, time: '16:25', text: '还需要确认参会人、目标问题、可现场演示的版本，以及会后负责人。建议把演示链路提前离线走一遍，并准备一页异常兜底说明。' }
      ],
      'im-pilot-brief': [
        { kind: 'divider', text: '9月2日' },
        { kind: 'text', sender: { uid: 'u-wangyilin', name: '王宜林', color: '#557a94', online: true }, time: '15:24', text: '给我一份本周推进简报。' },
        { kind: 'text', sender: { uid: 'b-pilot', name: '飞行员E号（王宜林的分身）', color: '#4b91b8', ai: true, online: true }, time: '15:30', text: '本周已完成导航结构统一和个人会话三栏改造；正在收口团队 IM 内核。下一步是核对通讯录身份展示和关键入口切换一致性。' }
      ]
    }
  };
})();
