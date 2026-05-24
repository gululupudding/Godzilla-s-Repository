export const currentVisit = {
  date: '2022-07-18',
  index: 1,
  total: 11,
};

export const primaryTabs = [
  { key: 'comprehensive', label: '综合报告' },
  { key: 'summary', label: '总结报告' },
  { key: 'structured', label: '结构化报告' },
  { key: 'raw', label: '原始数据' },
];

export const structuredTabs = [
  { key: 'internal', label: '内科结构化报告' },
  { key: 'endoscopy', label: '内镜结构化报告' },
  { key: 'radiology', label: '影像结构化报告' },
];

export const rawTabs = [
  { key: 'record', label: '病历' },
  { key: 'labs', label: '检验数据' },
  { key: 'endoscopy', label: '内镜' },
  { key: 'imaging', label: '影像学检查' },
];

export const comprehensiveReport = {
  title: '克罗恩病综合诊疗报告',
  caseSummary: {
    title: 'A. 病例摘要',
    fields: [
      { label: '性别', value: '男性' },
      { label: '年龄', value: '44 岁' },
      { label: '确诊年龄', value: '31 岁' },
      { label: '身高', value: '168 cm' },
      { label: '体重', value: '47 kg' },
      { label: '当前就诊', value: '2022-07-18 · 1/11' },
    ],
    paragraphs: [
      '患者男性，44岁，31岁时确诊克罗恩病。近期因反复腹痛、腹泻和体重下降就诊，当前体重47kg，提示存在营养风险。',
      '多源资料显示病变主要累及回肠末端及回盲部，内镜可见活动性溃疡，影像提示肠壁增厚及梳征。综合判断为中重度活动期克罗恩病，并伴狭窄和肛周病变风险。',
    ],
  },
  diagnosticSummary: {
    title: 'B. 最终诊断总结',
    highlights: [
      {
        key: 'montreal',
        title: '蒙特利尔分型',
        value: 'A2L3B2',
        description: '确诊年龄A2，病变部位L3，行为分型B2。',
        tone: 'blue',
        details: [
          { label: '确诊年龄', value: 'A2：17-40岁 / 31岁确诊' },
          { label: '病变部位', value: 'L3：回结肠型 / 回肠末端+结肠受累' },
          { label: '疾病行为', value: 'B2：狭窄型疾病行为' },
        ],
      },
      {
        title: '疾病活动度',
        value: '中重度活动期',
        description: '持续腹痛、CRP升高、反复腹泻，并见回肠活动性溃疡。',
        tone: 'amber',
      },
      {
        title: '并发症',
        value: '回肠末端狭窄',
        description: '合并肛周瘘，需持续评估梗阻症状和穿透性并发症。',
        tone: 'red',
      },
      {
        title: '不良预后高危因素',
        value: '4项高危因素',
        description: '早期激素暴露、深溃疡、肛周病变、狭窄型疾病行为。',
        tone: 'slate',
      },
    ],
    treatmentHistory: [
      { date: '2022-07-18', medicine: '美沙拉嗪（Mesalazine）' },
      { date: '2022-09-01', medicine: '泼尼松（Prednisone）' },
      { date: '2023-01-12', medicine: '英夫利西单抗（Infliximab）' },
      { date: '2023-06-20', medicine: '硫唑嘌呤（Azathioprine）联合治疗' },
    ],
    supporting: [
      {
        label: '药物治疗反应',
        value: '中度反应。CDAI较前下降，但CRP、FC等炎症指标仍然偏高，提示仍需维持并动态评估治疗强度。',
      },
      {
        label: '术后复发风险预测',
        value: '高风险。狭窄型疾病行为、肛周病变和深溃疡均提示术后复发风险较高。',
      },
      {
        label: '结直肠癌风险预测',
        value: '低风险。当前以小肠及回盲部病变为主，仍建议按炎症性肠病随访规范进行肠镜监测。',
      },
    ],
  },
  recommendations: {
    title: 'C. 多学科诊疗建议',
    items: [
      {
        label: '推荐完善的检查',
        value:
          '6个月后复查肠镜；定期MRE随访；持续监测CRP与粪便钙卫蛋白，必要时补充肠道超声评估狭窄进展。',
      },
      {
        label: '药物治疗建议',
        value:
          '继续英夫利西单抗维持治疗。若腹痛、腹泻或炎症指标持续异常，建议评估血药浓度和抗药抗体，并考虑剂量升级。',
      },
      {
        label: '手术干预指征',
        value:
          '若回肠狭窄进行性加重，并出现餐后腹胀、呕吐、排气排便减少等梗阻症状，应启动外科评估。',
      },
      {
        label: '营养支持治疗',
        value:
          '给予高蛋白肠内营养支持，结合低渣饮食；同步补充铁剂，评估维生素D、叶酸和B12等微量营养素。',
      },
      {
        label: '随访监测计划',
        value:
          '每8周评估一次CDAI；每4周复查一次CRP；每6个月进行一次影像学检查，并根据症状变化提前复查。',
      },
    ],
  },
  conflictRecord: {
    title: 'D. 冲突与分歧处理记录',
    items: [
      {
        label: '信息冲突',
        value:
          '影像学与内镜活动度存在轻度不一致：内镜提示多发深溃疡，影像提示透壁炎症较前部分缓解。',
      },
      {
        label: '替代解释',
        value:
          '部分乏力、腹胀和体重下降可能与营养不良及低白蛋白状态相关，并非完全由肠道炎症驱动。',
      },
      {
        label: '证据薄弱项',
        value:
          '缺乏长期连续影像随访数据，狭窄进展速度及透壁炎症变化趋势仍需进一步确认。',
      },
      {
        label: '缺失数据',
        value:
          '粪便钙卫蛋白历史数据不完整，英夫利西单抗谷浓度、抗药抗体及肛周MRI细节尚待补全。',
      },
    ],
  },
};

export const agentReports = [
  {
    name: '内科主诊智能体',
    participated: true,
    summaryItems: [
      { label: 'CDAI 评分', value: '227' },
      { label: '临床活动度', value: '活动期' },
      { label: '药物反应', value: '部分缓解' },
      { label: '主导问题', value: '腹泻、腹痛持续' },
    ],
    keyFindings: [
      '生物制剂诱导治疗后，患者仍存在持续腹泻与腹痛。',
      'CDAI仍处于活动范围，提示仅获得部分临床缓解。',
      '建议结合CRP、FC和血药浓度评估是否需要优化英夫利西单抗方案。',
    ],
  },
  {
    name: '内镜智能体',
    participated: true,
    summaryItems: [
      { label: 'SES-CD 总分', value: '11' },
      { label: '内镜活动度', value: '中度活动' },
      { label: '病变分布', value: '回肠末端 + 右半结肠' },
      { label: '内镜反应', value: '部分缓解' },
    ],
    keyFindings: [
      '存在多发深溃疡及节段性狭窄。',
      '回肠末端病变最重，右半结肠可见浅溃疡及局部黏膜炎症。',
      '建议6个月后复查肠镜，评估黏膜愈合和狭窄进展。',
    ],
  },
  {
    name: '影像智能体',
    participated: true,
    summaryItems: [
      { label: '检查方式', value: 'MRE' },
      { label: '病变部位', value: '回肠末端' },
      { label: '透壁炎症活动', value: '活跃' },
      { label: '影像反应', value: '部分缓解' },
    ],
    keyFindings: [
      '肠壁增厚并可见梳征。',
      '轻度近端肠管扩张提示狭窄相关风险。',
      '未见明确腹腔脓肿或游离穿孔，但需关注肛周瘘。',
    ],
  },
  {
    name: '营养智能体',
    participated: true,
    summaryItems: [
      { label: '营养不良风险', value: '中度风险' },
      { label: '营养问题', value: '低白蛋白血症' },
      { label: '体重变化', value: '近期下降' },
      { label: '微量营养素', value: '缺铁' },
    ],
    keyFindings: [
      '47kg体重结合低白蛋白提示营养消耗明显。',
      '建议高蛋白肠内营养，并补充铁剂。',
      '营养干预应与炎症控制同步进行，避免单纯热量补充不足以改善状态。',
    ],
  },
  {
    name: '外科智能体',
    participated: true,
    summaryItems: [
      { label: '手术指征', value: '回肠狭窄进行性加重' },
      { label: '手术方案', value: '择期腹腔镜回盲部切除术' },
      { label: '时机', value: '出现梗阻症状后优先评估' },
      { label: '术前准备', value: '营养和炎症控制' },
    ],
    keyFindings: [
      '目前无急诊手术指征，但回肠狭窄需要纳入外科预案。',
      '若狭窄继续加重并伴梗阻症状，可考虑择期腹腔镜回盲部切除术。',
      '术前应优化营养状态，降低感染和吻合口相关风险。',
    ],
  },
];

export const internalMedicineReport = {
  biologicalSigns: {
    title: 'A. 生物学指标',
    metrics: [
      { label: 'CRP', value: '9', unit: 'mg/L', status: '改善', tone: 'green' },
      { label: 'FC', value: '210', unit: 'ug/g', status: '仍偏高', tone: 'amber' },
      { label: 'ESR', value: '18', unit: 'mm/h', status: '改善', tone: 'green' },
      { label: '趋势', value: '下降', unit: '炎症指标', status: '有反应', tone: 'blue' },
    ],
    timeSeries: [
      { date: '2022-07-18', crp: 38, esr: 41, fc: 688 },
      { date: '2022-09-08', crp: 24, esr: 33, fc: 530 },
      { date: '2023-06-15', crp: 9, esr: 18, fc: 210 },
    ],
  },
  clinicalActivity: {
    title: 'B. 临床活动度',
    cdaiScore: 227,
    pro2Score: 70,
    activity: '中度活动',
    timeline: [
      { date: '2022-07-18', cdai: 227, pro2: 70, activity: '中度活动' },
      { date: '2022-08-11', cdai: 241, pro2: 72, activity: '中重度活动' },
      { date: '2022-11-03', cdai: 89, pro2: 18, activity: '缓解期' },
      { date: '2023-06-15', cdai: 81, pro2: 12, activity: '缓解期' },
    ],
  },
  treatmentHistory: {
    title: 'C. 治疗历史',
    rows: [
      { date: '2022-07-18', medicine: '美沙拉嗪（Mesalazine）' },
      { date: '2022-09-01', medicine: '泼尼松（Prednisone）' },
      { date: '2023-01-12', medicine: '英夫利西单抗（Infliximab）' },
      { date: '2023-06-20', medicine: '硫唑嘌呤（Azathioprine）联合治疗' },
    ],
  },
  medicationResponse: {
    title: 'D. 药物治疗反应',
    medicationName: '英夫利西单抗（Infliximab）',
    status: '有反应',
    detail:
      'CDAI与炎症指标均明显下降，提示对生物制剂治疗有反应；FC仍未完全正常，需继续维持并随访。',
  },
};

export const cdaiPro2Data = [
  {
    date: '2022-07-18',
    cdai: 227,
    pro2: 70,
    activity: '中度活动',
    cdaiItems: {
      looseStools: 28,
      abdominalPain: '中度',
      wellbeing: '较差',
      extraintestinalManifestations: '关节痛',
      opioidUse: false,
      abdominalMass: '可疑',
      hematocrit: '降低',
      weightLossPercent: 12,
      total: 227,
    },
  },
  {
    date: '2022-08-11',
    cdai: 241,
    pro2: 72,
    activity: '中重度活动',
    cdaiItems: {
      looseStools: 31,
      abdominalPain: '中重度',
      wellbeing: '差',
      extraintestinalManifestations: '肛周疼痛、关节痛',
      opioidUse: false,
      abdominalMass: '可疑',
      hematocrit: '降低',
      weightLossPercent: 13,
      total: 241,
    },
  },
  {
    date: '2022-11-03',
    cdai: 89,
    pro2: 18,
    activity: '缓解期',
    cdaiItems: {
      looseStools: 8,
      abdominalPain: '轻度',
      wellbeing: '良好',
      extraintestinalManifestations: '无',
      opioidUse: false,
      abdominalMass: '无',
      hematocrit: '正常',
      weightLossPercent: 7,
      total: 89,
    },
  },
  {
    date: '2023-06-15',
    cdai: 81,
    pro2: 12,
    activity: '缓解期',
    cdaiItems: {
      looseStools: 6,
      abdominalPain: '无或轻度',
      wellbeing: '良好',
      extraintestinalManifestations: '无',
      opioidUse: false,
      abdominalMass: '无',
      hematocrit: '正常',
      weightLossPercent: 5,
      total: 81,
    },
  },
];

export const endoscopyStructuredReport = {
  date: '2022-07-17',
  summary: [
    { label: '检查类型', value: '结肠镜' },
    { label: 'SES-CD 总分', value: '11' },
    { label: '内镜活动度', value: '中度活动' },
    { label: '内镜下治疗反应', value: '部分缓解' },
  ],
  lesionScope: ['回肠', '右半结肠'],
  segments: [
    {
      name: '回肠',
      score: 7,
      items: [
        { label: '溃疡大小', value: '0.5-2 cm', score: 2 },
        { label: '溃疡表面', value: '10-30%', score: 2 },
        { label: '病变范围', value: '50-75%', score: 2 },
        { label: '狭窄', value: '单发，可通过', score: 1 },
      ],
    },
    {
      name: '右半结肠',
      score: 3,
      items: [
        { label: '溃疡大小', value: '0.1-0.5 cm', score: 1 },
        { label: '溃疡表面', value: '<10%', score: 1 },
        { label: '病变范围', value: '<50%', score: 1 },
        { label: '狭窄', value: '无', score: 0 },
      ],
    },
    {
      name: '横结肠',
      score: 1,
      items: [
        { label: '溃疡大小', value: '无', score: 0 },
        { label: '溃疡表面', value: '无', score: 0 },
        { label: '病变范围', value: '<50%轻度充血', score: 1 },
        { label: '狭窄', value: '无', score: 0 },
      ],
    },
    {
      name: '左半结肠',
      score: 0,
      items: [
        { label: '溃疡大小', value: '无', score: 0 },
        { label: '溃疡表面', value: '无', score: 0 },
        { label: '病变范围', value: '无明显受累', score: 0 },
        { label: '狭窄', value: '无', score: 0 },
      ],
    },
    {
      name: '直肠',
      score: 0,
      items: [
        { label: '溃疡大小', value: '无', score: 0 },
        { label: '溃疡表面', value: '无', score: 0 },
        { label: '病变范围', value: '无明显受累', score: 0 },
        { label: '狭窄', value: '无', score: 0 },
      ],
    },
  ],
};

export const radiologyStructuredReport = {
  summary: [
    { label: '检查方式', value: 'MRE' },
    { label: '病变部位', value: '回肠末端、回盲部' },
    { label: '最严重病变部位', value: '回肠末端' },
    { label: '透壁炎症活动', value: '活跃' },
    { label: '透壁缓解状态', value: '部分缓解（Response）' },
  ],
  modules: [
    {
      title: 'MRE 影像结构化内容',
      items: [
        {
          label: '病变部位',
          value: '回肠末端及回盲部受累，最严重部位为回肠末端。',
        },
        {
          label: 'MRE 影像表现',
          value:
            '对称性肠壁增厚、强化增强、梳征阳性、轻度近端肠管扩张、爬行脂肪阳性。',
        },
        {
          label: '炎症评估',
          value:
            '透壁炎症活动活跃，但较初始检查呈部分缓解，仍需结合CRP和FC动态判断。',
        },
        {
          label: '狭窄并发症',
          value:
            '回肠末端狭窄伴轻度近端肠管扩张，当前未形成完全梗阻。',
        },
        {
          label: '穿透性并发症',
          value: '肛周瘘；未见明确腹腔脓肿或游离穿孔。',
        },
        {
          label: '肠外表现',
          value: '骶髂关节炎。',
        },
      ],
    },
  ],
};

export const recordCards = [
  {
    title: '入院情况',
    paragraphs: [
      '患者因反复腹痛、腹泻20余天入院。腹痛以脐周及右下腹为主，呈阵发性隐痛，排便后可稍缓解。每日排便约2至5次，偶见黏液，近期体重下降约3kg。',
      '查体：腹软，右下腹轻压痛，无反跳痛。生命体征平稳。结合既往诊断及当前症状，考虑克罗恩病活动可能性大。',
    ],
  },
  {
    title: '出院小结',
    paragraphs: [
      '入院后完善血常规、炎症指标、肝肾功能、感染筛查及腹部影像检查。给予补液、营养支持及对症治疗后，腹痛腹泻较前缓解。',
      '出院诊断：克罗恩病活动期；轻度贫血；低白蛋白血症倾向。嘱门诊规律随访，依据复查结果调整维持治疗方案。',
    ],
  },
];

export const labRows = [
  {
    date: '2022-07-18',
    crp: '32.6',
    esr: '46',
    hb: '112',
    albumin: '34.8',
    note: '入院初查，炎症活动',
  },
  {
    date: '2022-08-11',
    crp: '38.2',
    esr: '51',
    hb: '110',
    albumin: '33.9',
    note: '症状仍活动',
  },
  {
    date: '2022-09-08',
    crp: '21.7',
    esr: '35',
    hb: '116',
    albumin: '36.2',
    note: '较前下降',
  },
  {
    date: '2022-11-03',
    crp: '4.8',
    esr: '14',
    hb: '128',
    albumin: '41.6',
    note: '临床缓解',
  },
  {
    date: '2023-06-15',
    crp: '3.2',
    esr: '11',
    hb: '132',
    albumin: '42.1',
    note: '维持稳定',
  },
];

export const endoscopyRecords = [
  {
    date: '2022-07-17',
    finding:
      '回盲瓣充血水肿，末端回肠可见散在糜烂及纵行浅溃疡，部分区域黏膜呈鹅卵石样改变，肠腔通行尚可。',
    conclusion: '符合克罗恩病活动期内镜表现。',
    severity: '中度',
  },
  {
    date: '2022-11-04',
    finding:
      '末端回肠黏膜水肿较前减轻，未见新发深溃疡，局部瘢痕样改变，回盲部通行可。',
    conclusion: '治疗后较前改善，建议维持治疗并随访。',
    severity: '轻度',
  },
];

export const imagingRecords = [
  {
    type: 'CTE',
    date: '2022-07-18',
    finding:
      '末端回肠及回盲部肠壁节段性增厚，增强后强化明显，周围脂肪间隙稍模糊，未见明确腹腔脓肿。',
    conclusion: '考虑克罗恩病活动期改变，当前未见穿孔或脓肿。',
  },
  {
    type: 'MRE',
    date: '2023-05-24',
    finding:
      '末端回肠轻度壁厚，强化较前减弱，肠周渗出减少，未见明确瘘管形成。',
    conclusion: '病变活动性较前降低，建议结合临床及内镜复评。',
  },
];
