import { useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  agentReports,
  cdaiPro2Data,
  comprehensiveReport,
  currentVisit,
  endoscopyRecords,
  endoscopyStructuredReport,
  imagingRecords,
  internalMedicineReport,
  labRows,
  primaryTabs,
  radiologyStructuredReport,
  rawTabs,
  recordCards,
  structuredTabs,
} from './centerPanelData.js';

const highlightToneClass = {
  blue: 'border-blue-200 bg-blue-50/80',
  amber: 'border-amber-200 bg-amber-50/80',
  red: 'border-red-200 bg-red-50/70',
  slate: 'border-slate-200 bg-slate-50',
};

function TabButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'h-9 shrink-0 rounded-md px-3 text-sm font-medium transition-colors',
        active
          ? 'bg-clinical-blue text-white shadow-sm'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

function SubTabButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'h-8 shrink-0 border-b-2 px-2 text-xs font-medium transition-colors',
        active
          ? 'border-clinical-blue text-clinical-blue'
          : 'border-transparent text-slate-500 hover:text-slate-800',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

function Card({ children, className = '' }) {
  return (
    <section
      className={`rounded-lg border border-slate-200 bg-white p-4 shadow-card ${className}`}
    >
      {children}
    </section>
  );
}

function SectionTitle({ children, aside, marker }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        {marker ? (
          <span className="inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded bg-clinical-blue px-1.5 text-xs font-semibold text-white">
            {marker}
          </span>
        ) : null}
        <h3 className="min-w-0 text-sm font-semibold text-slate-900">{children}</h3>
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}

function StatusBadge({ children, tone = 'blue' }) {
  const toneClass = {
    blue: 'bg-blue-50 text-blue-700 ring-blue-200',
    red: 'bg-red-50 text-red-700 ring-red-200',
    amber: 'bg-amber-50 text-amber-700 ring-amber-200',
    green: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    slate: 'bg-slate-100 text-slate-700 ring-slate-200',
  }[tone];

  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${toneClass}`}
    >
      {children}
    </span>
  );
}

function FieldTile({ label, value }) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-5 text-slate-900">{value}</p>
    </div>
  );
}

function ReportItem({ label, value }) {
  return (
    <div className="border-l-4 border-blue-100 pl-3">
      <dt className="text-xs font-medium text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm leading-6 text-slate-700">{value}</dd>
    </div>
  );
}

function MetricTile({ metric }) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-slate-500">{metric.label}</p>
        <StatusBadge tone={metric.tone}>{metric.status}</StatusBadge>
      </div>
      <p className="mt-2 text-base font-semibold text-slate-950">
        {metric.value}
        <span className="ml-1 text-xs font-medium text-slate-500">{metric.unit}</span>
      </p>
    </div>
  );
}

function Timeline({ items }) {
  return (
    <ol className="space-y-3">
      {items.map((item) => (
        <li key={`${item.date}-${item.medicine}`} className="relative pl-5">
          <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-clinical-blue shadow-sm ring-2 ring-blue-100" />
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-xs font-medium text-slate-500">{item.date}</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{item.medicine}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function DiagnosticHighlightCard({ item, index }) {
  const hasDetails = Boolean(item.details?.length);

  return (
    <article
      className={[
        'relative rounded-lg border p-3',
        hasDetails ? 'group cursor-default' : '',
        highlightToneClass[item.tone] ?? highlightToneClass.slate,
      ].join(' ')}
    >
      <div className="flex items-start gap-2">
        <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded bg-white text-xs font-semibold text-clinical-blue shadow-sm ring-1 ring-blue-100">
          {index}
        </span>
        <p className="text-xs font-medium text-slate-500">{item.title}</p>
      </div>
      <p className="mt-1 text-base font-semibold text-slate-950">{item.value}</p>
      <p className="mt-2 text-xs leading-5 text-slate-600">{item.description}</p>

      {hasDetails ? (
        <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden w-64 rounded-lg border border-blue-100 bg-white p-3 text-xs shadow-lg group-hover:block">
          <p className="mb-2 font-semibold text-slate-900">蒙特利尔分型详情</p>
          <dl className="space-y-2">
            {item.details.map((detail) => (
              <div key={detail.label}>
                <dt className="font-medium text-slate-500">{detail.label}</dt>
                <dd className="mt-0.5 text-slate-800">{detail.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </article>
  );
}

function ComprehensiveReport() {
  return (
    <div className="space-y-3">
      <Card>
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-blue-600">
          {comprehensiveReport.title}
        </p>
        <SectionTitle marker="A">{comprehensiveReport.caseSummary.title}</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {comprehensiveReport.caseSummary.fields.map((field) => (
            <FieldTile key={field.label} {...field} />
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {comprehensiveReport.caseSummary.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-6 text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle marker="B">{comprehensiveReport.diagnosticSummary.title}</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {comprehensiveReport.diagnosticSummary.highlights.map((item, index) => (
            <DiagnosticHighlightCard key={item.title} item={item} index={index + 1} />
          ))}
        </div>
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="mb-3 text-xs font-semibold text-slate-700">
            5）治疗历史
          </p>
          <Timeline items={comprehensiveReport.diagnosticSummary.treatmentHistory} />
        </div>
        <dl className="mt-4 space-y-3 border-t border-slate-100 pt-4">
          {comprehensiveReport.diagnosticSummary.supporting.map((item, index) => (
            <ReportItem key={item.label} label={`${index + 6}）${item.label}`} value={item.value} />
          ))}
        </dl>
      </Card>

      <Card>
        <SectionTitle marker="C">{comprehensiveReport.recommendations.title}</SectionTitle>
        <dl className="space-y-3">
          {comprehensiveReport.recommendations.items.map((item) => (
            <ReportItem key={item.label} {...item} />
          ))}
        </dl>
      </Card>

      <Card>
        <SectionTitle marker="D">{comprehensiveReport.conflictRecord.title}</SectionTitle>
        <dl className="space-y-3">
          {comprehensiveReport.conflictRecord.items.map((item) => (
            <ReportItem key={item.label} {...item} />
          ))}
        </dl>
      </Card>
    </div>
  );
}

function SummaryReport() {
  const participatedAgents = agentReports.filter((agent) => agent.participated);

  return (
    <div className="space-y-3">
      <Card className="bg-blue-50/70">
        <SectionTitle aside={<StatusBadge tone="blue">{participatedAgents.length} 个智能体</StatusBadge>}>
          Chair 第一轮整合多智能体评估报告
        </SectionTitle>
        <p className="text-sm leading-6 text-slate-700">
          本页按实际参与的 Agent 维度展示核心评估项目。数据以可配置数组维护，后续可直接替换为接口返回结果。
        </p>
      </Card>

      {participatedAgents.map((agent, index) => (
        <Card key={agent.name}>
          <SectionTitle
            marker={index + 1}
            aside={<StatusBadge tone="slate">已参与</StatusBadge>}
          >
            {agent.name}
          </SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            {agent.summaryItems.map((item) => (
              <FieldTile key={item.label} {...item} />
            ))}
          </div>
          <div className="mt-4 border-t border-slate-100 pt-3">
            <p className="mb-2 text-xs font-medium text-slate-500">核心发现</p>
            <ul className="space-y-2">
              {agent.keyFindings.map((finding) => (
                <li key={finding} className="flex gap-2 text-sm leading-6 text-slate-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clinical-blue" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </div>
  );
}

function CdaiTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0].payload;
  const items = point.cdaiItems;

  return (
    <div className="max-w-[340px] rounded-lg border border-slate-200 bg-white p-3 text-xs shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <p className="font-semibold text-slate-950">{label}</p>
        <StatusBadge tone={point.cdai >= 220 ? 'amber' : 'green'}>
          {point.activity}
        </StatusBadge>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 rounded-md bg-slate-50 p-2">
        <div>
          <p className="text-[11px] font-medium text-slate-500">CDAI 总分</p>
          <p className="mt-1 text-sm font-semibold text-slate-950">{point.cdai}</p>
        </div>
        <div>
          <p className="text-[11px] font-medium text-slate-500">PRO2 评分</p>
          <p className="mt-1 text-sm font-semibold text-slate-950">{point.pro2}</p>
        </div>
      </div>
      <dl className="mt-3 space-y-2 border-t border-slate-100 pt-3">
        <ReportItem
          label="过去一周稀便/水样便总次数"
          value={`${items.looseStools} 次`}
        />
        <ReportItem label="腹痛严重程度" value={items.abdominalPain} />
        <ReportItem label="一般健康状况" value={items.wellbeing} />
        <ReportItem
          label="肠外表现"
          value={items.extraintestinalManifestations}
        />
        <ReportItem label="是否使用阿片类药物" value={items.opioidUse ? '是' : '否'} />
        <ReportItem label="是否存在腹部包块" value={items.abdominalMass} />
        <ReportItem label="红细胞压积" value={items.hematocrit} />
        <ReportItem
          label="低于标准体重百分比"
          value={`${items.weightLossPercent}%`}
        />
        <ReportItem label="CDAI 总分" value={items.total} />
      </dl>
    </div>
  );
}

function BiomarkerTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  const units = { CRP: 'mg/L', ESR: 'mm/h', FC: 'ug/g' };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs shadow-lg">
      <p className="mb-2 font-semibold text-slate-950">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-500">{entry.name}</span>
          </div>
          <span className="font-medium text-slate-900">
            {entry.value} {units[entry.name] ?? ''}
          </span>
        </div>
      ))}
    </div>
  );
}

function InternalMedicineStructuredReport() {
  return (
    <div className="space-y-3">
      <Card>
        <SectionTitle marker="A">{internalMedicineReport.biologicalSigns.title}</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {internalMedicineReport.biologicalSigns.metrics.map((metric) => (
            <MetricTile key={metric.label} metric={metric} />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-5 rounded-full bg-[#1d73d4]" />
            CRP (mg/L)
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-5 rounded-full bg-[#f59e0b]" />
            ESR (mm/h)
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-5 rounded-full bg-[#10b981]" />
            FC (ug/g)
          </span>
        </div>
        <div className="mt-2 h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={internalMedicineReport.biologicalSigns.timeSeries}
              margin={{ top: 8, right: 12, bottom: 0, left: -20 }}
            >
              <CartesianGrid stroke="#e5edf5" strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                interval={1}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickMargin={8}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11, fill: '#64748b' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: '#64748b' }}
              />
              <Tooltip content={<BiomarkerTooltip />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="crp"
                name="CRP"
                stroke="#1d73d4"
                strokeWidth={2.5}
                dot={{ r: 3, strokeWidth: 2, fill: '#1d73d4' }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="esr"
                name="ESR"
                stroke="#f59e0b"
                strokeWidth={2.5}
                dot={{ r: 3, strokeWidth: 2, fill: '#f59e0b' }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="fc"
                name="FC"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ r: 3, strokeWidth: 2, fill: '#10b981' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <SectionTitle
          marker="B"
          aside={<StatusBadge tone="amber">{internalMedicineReport.clinicalActivity.activity}</StatusBadge>}
        >
          {internalMedicineReport.clinicalActivity.title}
        </SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          <FieldTile
            label="CDAI score"
            value={internalMedicineReport.clinicalActivity.cdaiScore}
          />
          <FieldTile
            label="PRO2 score"
            value={internalMedicineReport.clinicalActivity.pro2Score}
          />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {internalMedicineReport.clinicalActivity.timeline.map((item) => (
            <div key={item.date} className="rounded-md border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium text-slate-500">{item.date}</p>
                <StatusBadge tone={item.cdai >= 220 ? 'amber' : 'green'}>
                  {item.activity}
                </StatusBadge>
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                CDAI {item.cdai}
                <span className="ml-2 text-xs font-medium text-slate-500">
                  PRO2 {item.pro2}
                </span>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-5 rounded-full bg-clinical-blue" />
            CDAI
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-5 rounded-full bg-emerald-500" />
            PRO2
          </span>
        </div>
        <div className="mt-3 h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={cdaiPro2Data}
              margin={{ top: 8, right: 12, bottom: 0, left: -20 }}
            >
              <CartesianGrid stroke="#e5edf5" strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                interval={1}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickMargin={8}
              />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} domain={[0, 280]} />
              <Tooltip content={<CdaiTooltip />} />
              <Line
                type="monotone"
                dataKey="cdai"
                name="CDAI"
                stroke="#1d73d4"
                strokeWidth={2.5}
                dot={{ r: 3, strokeWidth: 2 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="pro2"
                name="PRO2"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 2 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <SectionTitle marker="C">{internalMedicineReport.treatmentHistory.title}</SectionTitle>
        <div className="overflow-hidden rounded-md border border-slate-200">
          <table className="w-full border-collapse text-left text-xs">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-2 font-medium">日期</th>
                <th className="px-3 py-2 font-medium">药物治疗</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {internalMedicineReport.treatmentHistory.rows.map((row) => (
                <tr key={row.date}>
                  <td className="whitespace-nowrap px-3 py-2 font-medium text-slate-900">
                    {row.date}
                  </td>
                  <td className="px-3 py-2">{row.medicine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionTitle
          marker="D"
          aside={<StatusBadge tone="green">{internalMedicineReport.medicationResponse.status}</StatusBadge>}
        >
          {internalMedicineReport.medicationResponse.title}
        </SectionTitle>
        <dl className="space-y-3">
          <ReportItem
            label="药物名称"
            value={internalMedicineReport.medicationResponse.medicationName}
          />
          <ReportItem
            label="临床缓解状态"
            value={internalMedicineReport.medicationResponse.status}
          />
          <ReportItem label="原因" value={internalMedicineReport.medicationResponse.detail} />
        </dl>
      </Card>
    </div>
  );
}

function EndoscopyStructuredReport() {
  return (
    <div className="space-y-3">
      <Card>
        <SectionTitle
          marker="E"
          aside={<StatusBadge tone="blue">{endoscopyStructuredReport.date}</StatusBadge>}
        >
          内镜结构化摘要
        </SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {endoscopyStructuredReport.summary.map((item) => (
            <FieldTile key={item.label} {...item} />
          ))}
        </div>
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-slate-500">病变范围</p>
          <div className="flex flex-wrap gap-2">
            {endoscopyStructuredReport.lesionScope.map((scope) => (
              <StatusBadge key={scope} tone="slate">
                {scope}
              </StatusBadge>
            ))}
          </div>
        </div>
      </Card>

      {endoscopyStructuredReport.segments.map((segment, index) => (
        <Card key={segment.name}>
          <SectionTitle
            marker={index + 1}
            aside={<StatusBadge tone={segment.score >= 4 ? 'amber' : 'slate'}>SES-CD {segment.score}</StatusBadge>}
          >
            {segment.name}
          </SectionTitle>
          <div className="grid grid-cols-1 gap-2">
            {segment.items.map((item) => (
              <div
                key={item.label}
                className="flex items-start justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2"
              >
                <div>
                  <p className="text-xs font-medium text-slate-500">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-800">{item.value}</p>
                </div>
                <StatusBadge tone={item.score > 0 ? 'blue' : 'slate'}>{item.score}</StatusBadge>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function RadiologyStructuredReport() {
  return (
    <div className="space-y-3">
      <Card>
        <SectionTitle marker="R">断面影像结构化报告</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {radiologyStructuredReport.summary.map((item) => (
            <FieldTile key={item.label} {...item} />
          ))}
        </div>
      </Card>

      {radiologyStructuredReport.modules.map((module, index) => (
        <Card key={module.title}>
          <SectionTitle marker={index + 1}>{module.title}</SectionTitle>
          <dl className="space-y-3">
            {module.items.map((item) => (
              <ReportItem key={item.label} {...item} />
            ))}
          </dl>
        </Card>
      ))}
    </div>
  );
}

function StructuredReport() {
  const [activeStructuredTab, setActiveStructuredTab] = useState('internal');

  return (
    <div className="space-y-3">
      <div className="sticky top-0 z-10 -mx-1 flex gap-3 overflow-x-auto bg-slate-50/95 px-1 py-1 backdrop-blur">
        {structuredTabs.map((tab) => (
          <SubTabButton
            key={tab.key}
            active={activeStructuredTab === tab.key}
            onClick={() => setActiveStructuredTab(tab.key)}
          >
            {tab.label}
          </SubTabButton>
        ))}
      </div>

      {activeStructuredTab === 'internal' && <InternalMedicineStructuredReport />}
      {activeStructuredTab === 'endoscopy' && <EndoscopyStructuredReport />}
      {activeStructuredTab === 'radiology' && <RadiologyStructuredReport />}
    </div>
  );
}

function RawRecord() {
  return (
    <div className="space-y-3">
      {recordCards.map((card) => (
        <Card key={card.title}>
          <SectionTitle>{card.title}</SectionTitle>
          <div className="space-y-2">
            {card.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-6 text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function RawLabs() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">检验数据</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[620px] w-full border-collapse text-left text-xs">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-3 py-2 font-medium">日期</th>
              <th className="px-3 py-2 font-medium">CRP</th>
              <th className="px-3 py-2 font-medium">ESR</th>
              <th className="px-3 py-2 font-medium">Hb</th>
              <th className="px-3 py-2 font-medium">Albumin</th>
              <th className="px-3 py-2 font-medium">备注</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {labRows.map((row) => (
              <tr key={row.date} className="hover:bg-blue-50/40">
                <td className="whitespace-nowrap px-3 py-2 font-medium text-slate-900">
                  {row.date}
                </td>
                <td className="px-3 py-2">{row.crp}</td>
                <td className="px-3 py-2">{row.esr}</td>
                <td className="px-3 py-2">{row.hb}</td>
                <td className="px-3 py-2">{row.albumin}</td>
                <td className="whitespace-nowrap px-3 py-2">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function RawEndoscopy() {
  return (
    <div className="space-y-3">
      {endoscopyRecords.map((item) => (
        <Card key={item.date}>
          <SectionTitle aside={<StatusBadge tone="amber">{item.severity}</StatusBadge>}>
            内镜检查记录
          </SectionTitle>
          <dl className="space-y-3 text-sm">
            <InfoRow label="检查日期" value={item.date} />
            <InfoRow label="检查所见" value={item.finding} />
            <InfoRow label="结论" value={item.conclusion} />
          </dl>
        </Card>
      ))}
    </div>
  );
}

function RawImaging() {
  return (
    <div className="space-y-3">
      {imagingRecords.map((item) => (
        <Card key={`${item.type}-${item.date}`}>
          <SectionTitle aside={<StatusBadge tone="blue">{item.type}</StatusBadge>}>
            影像学检查
          </SectionTitle>
          <dl className="space-y-3 text-sm">
            <InfoRow label="检查日期" value={item.date} />
            <InfoRow label="影像所见" value={item.finding} />
            <InfoRow label="结论" value={item.conclusion} />
          </dl>
        </Card>
      ))}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <dt className="mb-1 text-xs font-medium text-slate-500">{label}</dt>
      <dd className="leading-6 text-slate-700">{value}</dd>
    </div>
  );
}

function RawData() {
  const [activeRawTab, setActiveRawTab] = useState('record');

  return (
    <div className="space-y-3">
      <div className="sticky top-0 z-10 -mx-1 flex gap-3 overflow-x-auto bg-slate-50/95 px-1 py-1 backdrop-blur">
        {rawTabs.map((tab) => (
          <SubTabButton
            key={tab.key}
            active={activeRawTab === tab.key}
            onClick={() => setActiveRawTab(tab.key)}
          >
            {tab.label}
          </SubTabButton>
        ))}
      </div>

      {activeRawTab === 'record' && <RawRecord />}
      {activeRawTab === 'labs' && <RawLabs />}
      {activeRawTab === 'endoscopy' && <RawEndoscopy />}
      {activeRawTab === 'imaging' && <RawImaging />}
    </div>
  );
}

export default function CenterPanel() {
  const [activeTab, setActiveTab] = useState('comprehensive');

  return (
    <section className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
      <header className="border-b border-slate-200 bg-white px-4 pt-3">
        <div className="mb-3 flex justify-end">
          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
            {currentVisit.date} · {currentVisit.index}/{currentVisit.total}
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto pb-3" aria-label="报告类型">
          {primaryTabs.map((tab) => (
            <TabButton
              key={tab.key}
              active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </TabButton>
          ))}
        </nav>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {activeTab === 'comprehensive' && <ComprehensiveReport />}
        {activeTab === 'summary' && <SummaryReport />}
        {activeTab === 'structured' && <StructuredReport />}
        {activeTab === 'raw' && <RawData />}
      </div>
    </section>
  );
}
