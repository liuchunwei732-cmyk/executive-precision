/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Network, 
  Route, 
  Code, 
  Brain, 
  TrendingUp, 
  BarChart2, 
  Box, 
  Search, 
  User, 
  Database, 
  Lightbulb,
  X,
  Layers,
  Cpu,
  Users,
  Infinity,
  FileText,
  Clock,
  CheckCircle,
  Zap,
  BookOpen
} from 'lucide-react';

interface WorkExperienceItem {
  id: number;
  companyName: string;
  companyEn: string;
  role: string;
  duration: string;
  summary: string;
  tags: { text: string; icon: React.ComponentType<any>; colorClass: string; iconColor: string }[];
  projects: { title: string; desc: string; image: string }[];
  modalDetails: {
    responsibilities: { title: string; desc: string; icon: React.ComponentType<any>; colorTheme: string }[];
    results: { value: string; label: string }[];
  };
}

export default function WorkExperience() {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const experiences: WorkExperienceItem[] = [
    {
      id: 1,
      companyName: '上海口沐适科技有限公司',
      companyEn: 'Shanghai Koumushi Technology',
      role: 'AI 产品经理 / 技术负责人',
      duration: '2026.02 - 2026.06',
      summary: '作为初创团队核心业务与技术负责人，从 0 到 1 统筹“口沐适”智能小程序的架构设计与全栈落地。在极客环境下，深度运用 AI 辅助编程与大模型调度策略，主导软硬件生态闭环，产品上线首月即突破 1.5 万活跃用户。',
      tags: [
        { text: '0到1全栈操盘', icon: Rocket, colorClass: 'bg-[#d1e7e1]/40 border-[#d1e7e1] text-[#4f625e]', iconColor: 'text-[#4f625e]' },
        { text: '大模型系统架构', icon: Network, colorClass: 'bg-[#e7dff6]/40 border-[#e7dff6] text-[#6b21a8]', iconColor: 'text-[#6b21a8]' },
        { text: '多模态AI路由', icon: Route, colorClass: 'bg-[#d1e7e1]/40 border-[#d1e7e1] text-[#4f625e]', iconColor: 'text-[#4f625e]' },
        { text: 'AI辅助研发', icon: Code, colorClass: 'bg-[#e7dff6]/40 border-[#e7dff6] text-[#6b21a8]', iconColor: 'text-[#6b21a8]' }
      ],
      projects: [
        {
          title: '混合架构设计与高并发调度',
          desc: '规划原生壳+Webview与WebSocket双工通信架构，支撑高并发场景下的数据实时交互。',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXu4Fl_QV8hlJV06OI_fiyf_P0EgWmCscO1IdAcmj1yU8sCgfE2I_TRryaCW7xyQh97S3Keka4YLKmdhwoW_UDAHuhxUAhYz3UCbQm8Z2-4-aJzupqOIbPUGgtgyY8VnqP8pJgYk4cG-1qI1tnd9weXgDiKJaf4r_4QmYFiM3pflAsmMiquIVO-VhFqDbs7R6ykEImsDHI4OdnB8ECNZOk_22vXzJcoqQRmzI5iC5QIrSPEKtwQI9UJLBnEp11nF5iqfWX-0skIP140KNw'
        },
        {
          title: '多模态路由与自动化研报引擎',
          desc: '构建三层智能识别路由，实现从图像识别到自然语言处理的多模态数据高效流转。',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB48FAeLSQhjH-qAzrfEbTM2rGZkQhUSKcj1lManYU0n8hy6W71zn2MrgI2bC2X0sOobCSwy-ZbAg63zNbqfc-O9gX0LCeIS30PZEPojeSNY9d2NNBw_lHUMjb2L-nxOAF0MikZr_uVcRPA2rD6sfqwfdGYy4csXSRL9T_LtHT5L89BytsLgGDcahLUGMdldKYIbjhvSdBDqVFPEINNt9ZPQqiTcnifI-e-r-pnUBSobJgOjrHR-NxniHyM3qBwl4d-kcXelChplof9qw'
        },
        {
          title: 'AI原生工作流与敏捷交付',
          desc: '熟练运用 Claude/Codex 生成核心逻辑代码，大幅缩短研发周期，实现敏捷迭代。',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDpW6PA7cVicIOdvPmGOsJittIMf6L5asffVCVSO3UO3ws_yuX3dDwXzO8Rxfuw_NtIYfJ_xjMMxff9K5EQe9Qh2nQPy6CNBfOcOoxdTbM3rZRH6O6P87GMeUtjraDYEPDUL7y2J7fMzQYj_LCX-fJfGAWsyV3RdtYaITKP6flqT2zfsXSoABBtRrL5wXdSvl4XMm3NGazR4zyK7wvqlGPYwSsV6Hmo9tp7lrqmV_NbeAMS96a6Cdrt198zksZUcy4nGhM55HGUx5sXA'
        }
      ],
      modalDetails: {
        responsibilities: [
          { title: '架构设计', desc: '统筹小程序与 ECS 后端 Python 服务的交互设计。', icon: Layers, colorTheme: 'bg-blue-50 border-blue-150 text-blue-900 icon-blue' },
          { title: '模型策略', desc: '对接并调优豆包 Seed 2.0 Pro。', icon: Brain, colorTheme: 'bg-emerald-50 border-emerald-150 text-emerald-900 icon-emerald' },
          { title: '研发统筹', desc: '串联 UI 设计、外包前端。', icon: Users, colorTheme: 'bg-amber-50 border-amber-150 text-amber-900 icon-amber' },
          { title: '业务闭环', desc: '将智能软硬件与 AI 诊断报告深度结合。', icon: Infinity, colorTheme: 'bg-[#e7dff6]/40 border-purple-150 text-purple-900 icon-purple' }
        ],
        results: [
          { value: '1.5万', label: '首月活跃突破' },
          { value: '3层', label: '智能路由架构' },
          { value: '15个', label: '节点轮询策略' }
        ]
      }
    },
    {
      id: 2,
      companyName: '小影科技',
      companyEn: 'Xiaoying Technology',
      role: 'AI 产品经理',
      duration: '2025.05 - 2026.02',
      summary: '深度参与出海健康应用 WiseMeal 从 0.1 到 1.5 核心版本的全周期迭代。聚焦 AI 推荐算法优化与数据基建，成功驱动产品商业化爆发，登顶台湾地区健康与健身免费榜 #1。',
      tags: [
        { text: 'AI算法优化', icon: Brain, colorClass: 'bg-[#d1e7e1]/40 border-[#d1e7e1] text-[#4f625e]', iconColor: 'text-[#4f625e]' },
        { text: '商业化增长', icon: TrendingUp, colorClass: 'bg-[#e7dff6]/40 border-[#e7dff6] text-[#6b21a8]', iconColor: 'text-[#6b21a8]' },
        { text: '数据驱动', icon: BarChart2, colorClass: 'bg-[#d1e7e1]/40 border-[#d1e7e1] text-[#4f625e]', iconColor: 'text-[#4f625e]' },
        { text: '0到1体系搭建', icon: Box, colorClass: 'bg-[#e7dff6]/40 border-[#e7dff6] text-[#6b21a8]', iconColor: 'text-[#6b21a8]' }
      ],
      projects: [
        {
          title: '底层搜索与饮食数据库建设',
          desc: '构建全面的健康饮食数据库，优化底层搜索架构，提升信息检索准确率。',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd-zvjhW5uD1ZagRhID2Z2HaahWbyAl2XxPcU6nYbeQ4q9PcLBDPrjXDfYzqugNSeRzE77k9Oq0qkVgI0-Suz9xBa0toilrEqdZ8hncDokZYcHJz-rSaC64dUakNNGdAHS9NVZHg4MByL407CqoOLO9UisH-RNflU1wvV7BekJJf_AS8QrSL57uE-ZPzps4lRShtNhmgVKyGiZ5v-0HAYyO0aPbQ6252dW4_fnn19PbaAy8egbV4zWdsf6Au6mBhSZn555dazDhzo'
        },
        {
          title: 'AI 推荐算法与健康引擎优化',
          desc: '重构特征权重算法，实现个性化健康建议的精准推荐。',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMkRScDgcjgZ2Yd4pkR-Cv1J3zY9rcGMCRZjYdM1puAZUTTSt81igd80DFphc04_NUH4EPkiQEdgOeXv54wXbneznckpLWcxB3M2PpXgb2wRFBbIX0gNZm_j6c22XE3oNmApWO-_snzaJRM3BADO_ZZtaGR9Asn-GOX99x5S_A8zpuPMmZK2W1jPBCEd26p8sbnmj_NfbqTeM4L95xTsEfMEcyjylFBFmgVDt09NyVCD2xS8vrtcY4T54YEMxp4Xy8iJGESWzwHYc'
        },
        {
          title: '数据归因与商业化爆发',
          desc: '搭建漏斗分析看板，精准定位转化节点，驱动产品商业价值最大化。',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl9yi_KO_YkuAheMtI-2Gc0MXK6RwOjAdhXXgPTTlQF0pzCMBKQc8_6QA6A1bU20Dri7sgw5UuvQkOQa1_ro1pyEsHeo0FZo44pt0ulTUfqZKu2Bc-InFTj8a733EQ0UyY7IRqOFNnqvnIfM0zdLa9df1VXmz9vRfGWkMSSSTN5y5cPh6gG1UdhqesdXWlVrN3eObYTD8W-sRmTteauia1syd_k8pnt-HCV71qt88q3iCj46FxHv6ZquuwwWtM1d9jVVNZN3oz4I0'
        }
      ],
      modalDetails: {
        responsibilities: [
          { title: '数据运营', desc: '搭建漏斗分析看板。', icon: BarChart2, colorTheme: 'bg-blue-50 border-blue-150 text-blue-900' },
          { title: '模型落地', desc: '重构特征权重算法。', icon: Cpu, colorTheme: 'bg-emerald-50 border-emerald-150 text-emerald-900' },
          { title: '项目统筹', desc: '输出 PRD 明确功能边界。', icon: FileText, colorTheme: 'bg-amber-50 border-amber-150 text-amber-900' },
          { title: '商业分析', desc: '完成 47 个竞品深度调研。', icon: TrendingUp, colorTheme: 'bg-[#e7dff6]/40 border-purple-150 text-purple-900' }
        ],
        results: [
          { value: '$200K', label: '峰值月度营收' },
          { value: '15%', label: '退流率降低' },
          { value: '96%', label: '标签匹配准确率' }
        ]
      }
    },
    {
      id: 3,
      companyName: '网易有道',
      companyEn: 'NetEase Youdao',
      role: 'AI 产品经理 (RAG 架构方向)',
      duration: '2025.02 - 2025.05',
      summary: '针对传统客服流转效率低、易触发超时违约的痛点，以独立 Owner 身份从 0 到 1 主导系统构建。深度融合自研大模型与 RAG 技术，重构人机协同服务工作流。',
      tags: [
        { text: 'RAG检索应用', icon: Search, colorClass: 'bg-[#d1e7e1]/40 border-[#d1e7e1] text-[#4f625e]', iconColor: 'text-[#4f625e]' },
        { text: '0到1独立操盘', icon: User, colorClass: 'bg-[#e7dff6]/40 border-[#e7dff6] text-[#6b21a8]', iconColor: 'text-[#6b21a8]' },
        { text: '语料工程搭建', icon: Database, colorClass: 'bg-[#d1e7e1]/40 border-[#d1e7e1] text-[#4f625e]', iconColor: 'text-[#4f625e]' },
        { text: '痛点破局', icon: Lightbulb, colorClass: 'bg-[#e7dff6]/40 border-[#e7dff6] text-[#6b21a8]', iconColor: 'text-[#6b21a8]' }
      ],
      projects: [
        {
          title: '痛点洞察与 RAG 架构设计',
          desc: '深入分析客服业务瓶颈，设计基于 RAG 技术的高效检索与应答架构。',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMGsTDEclYdBrh8W1QUAzslFwg8oyEBdjGVsatMUFQF5ELhvet6yuFhKYEc1_wStPnyyz3KAwXympFBm2MxcOXhxD7Kp3HaRW9sdbCTmQmlR3M7345NWEOUT_wnKRLPcT1AnZ1Wq3tqtn3UoLzkKw0jNMRA3dSNeBPdmsipD7N07o8WK5Act0HA8JY4RutW60Gcx94p3nN4Hq_2hwRQZtSu8S9GaSqCQHxCFX_9g_JnY9HA7KoVpwpBdNcVbIaPLVkli4iHpfR_vo'
        },
        {
          title: '万级语料工程与检索层构建',
          desc: '建立高质量的客服语料库，优化向量检索策略，提升问答准确性。',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQHUOsG-QZIx16jd3W1p15X6jZhDCnjKq2NfKyH9kxFtgKbIcm5JlYgpVSZigKuDp6xaW4cz8c3mDlQsrHWbUnyUDLICwVWXFq351u9AJ8XGZjtd4s-dHRdSguNFmUfas3ly7cCbDF0yO2o9RVjiN0ZkVmoYzgIr2gi0ux56lYS5gqmuCYhftvNDsyoFleA2Khnbm_oHHXzMhKf0xAam7LQmLrWpegZgfzRWTY74ipfP7FgB2UBeWdvCymbXXzgo9YS_T2DLgUpzI'
        },
        {
          title: 'SLA 履约优化与效能爆发',
          desc: '监控并重构自动化工作流，显著降低客服响应时间，提升用户满意度。',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa8cEywNiikFZmAetQhNFHTGpQt6WfbajyK_TkcHp8uHvy9OpZf2_zaZA0gY59RyvuYmYtSGIun8VHWHYBGM9QBa-25Ikh7ifIDtbXs3FO3yB2lU6g17ZDOIvnoA4EU6ao5DAGn4oCdYG_g8K9BFjtJ96XvC5Br2wZKXl92_3BkOiNhvIWeKSiPVcZJx0rSjCiMdHE4ID7rWON3ZJHXpqD4m1ZJ-3bHvlrLyZFDLk0aq6Q3lnf6kUQHHATL9oOcAm0DTAM-EXkHgg'
        }
      ],
      modalDetails: {
        responsibilities: [
          { title: '架构规划', desc: '独立撰写高质量 PRD。', icon: Layers, colorTheme: 'bg-blue-50 border-blue-150 text-blue-900' },
          { title: '语料工程', desc: '挖掘提取核心用户意图。', icon: Database, colorTheme: 'bg-emerald-50 border-emerald-150 text-emerald-900' },
          { title: '质量把控', desc: '参与 100+ 项测试用例。', icon: CheckCircle, colorTheme: 'bg-amber-50 border-amber-150 text-amber-900' },
          { title: '效能提升', desc: '监控并重构 85% 的自动化工作流。', icon: Zap, colorTheme: 'bg-[#e7dff6]/40 border-purple-150 text-purple-900' }
        ],
        results: [
          { value: '1分钟内', label: '极限响应时效' },
          { value: '1万+', label: '高优语料沉淀' },
          { value: '85%', label: '自动化覆盖率' }
        ]
      }
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#f8f9fa] pt-32 pb-24 overflow-hidden" id="screen_work_experience">
      {/* Background decorations matching brand style */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial-gradient from-emerald-50/20 to-transparent pointer-events-none rounded-full" />
      <div className="absolute -left-10 top-1/2 w-[400px] h-[400px] bg-radial-gradient from-purple-50/20 to-transparent pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Page Title from reference HTML */}
        <section className="mb-20 text-center relative select-text">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-radial-gradient from-[#d1e7e1]/30 to-transparent -z-10 rounded-full blur-2xl pointer-events-none" />
          <h1 className="font-display font-black text-4xl md:text-5xl text-black mb-4">
            工作经历
          </h1>
          <p className="font-sans text-neutral-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            深耕于产品架构与战略规划，致力于通过技术创新驱动商业价值。
          </p>
        </section>

        {/* Main Experience List (Timeline bullet style) */}
        <section className="space-y-24">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-8 border-l-2 border-neutral-200/60 experience-section select-text">
              {/* Point Indicator bullet */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-black ring-4 ring-white shadow-sm" />
              
              {/* Heading company info and time period */}
              <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                <div>
                  <h2 className="font-display font-bold text-2xl text-black">
                    {exp.role}
                  </h2>
                  <p className="text-neutral-500 text-xs sm:text-sm font-semibold mt-1">
                    {exp.companyName} <span className="text-neutral-300 mx-2">|</span> {exp.companyEn}
                  </p>
                </div>
                <span className="font-mono text-xs bg-neutral-100 text-[#4c4546] font-bold px-4 py-1.5 rounded-full shadow-sm border border-neutral-200/30">
                  {exp.duration}
                </span>
              </div>

              {/* General Work Summary */}
              <p className="text-neutral-600 font-sans text-sm md:text-base leading-relaxed mb-8 max-w-4xl">
                {exp.summary}
              </p>

              {/* Tag Chips Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {exp.tags.map((tag, tIdx) => {
                  const TagIcon = tag.icon;
                  return (
                    <div 
                      key={tIdx} 
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-colors hover:bg-white ${tag.colorClass}`}
                    >
                      <TagIcon className={`w-4 h-4 ${tag.iconColor}`} />
                      <span className="font-sans font-bold text-xs sm:text-sm">{tag.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Bento Grid Header with Responsibilities detail action */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-px flex-1 bg-neutral-200/60" />
                  <h3 className="font-mono text-xs text-neutral-400 font-extrabold tracking-widest uppercase">
                    核心项目
                  </h3>
                  <div className="h-px flex-1 bg-neutral-200/60" />
                </div>
                <button 
                  onClick={() => setActiveModal(exp.id)}
                  className="ml-4 bg-black text-white px-6 py-2 rounded-full font-sans text-xs sm:text-sm font-bold transition-all hover:opacity-85 active:scale-95 cursor-pointer shadow-sm shrink-0"
                >
                  核心职责详情
                </button>
              </div>

              {/* Projects Bento Columns with exact URLs and sizes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {exp.projects.map((proj, pIdx) => (
                  <div 
                    key={pIdx} 
                    className="group relative bg-white border border-neutral-200/50 rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="aspect-video mb-5 rounded-xl overflow-hidden bg-neutral-100 relative">
                      {exp.id === 1 && pIdx === 0 ? (
                        <div className="w-full h-full bg-[#0a0f1d] flex flex-col justify-between p-4 relative overflow-hidden select-none">
                          {/* Animated background glow */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                          
                          {/* Top diagram header line */}
                          <div className="text-center relative z-10">
                            <span className="font-sans font-bold text-[10px] sm:text-[11px] text-blue-100/90 tracking-wider">
                              原生壳+Webview+WebScket双工通信
                            </span>
                          </div>

                          {/* Columns container */}
                          <div className="flex items-center justify-between w-full px-2 relative z-10 flex-1 mt-2">
                            {/* Left: Native Shell Mockup */}
                            <div className="flex flex-col items-center justify-center border border-white/20 bg-white/5 rounded-lg w-16 h-24 relative shadow-inner">
                              {/* Smartphone hardware notch element */}
                              <div className="absolute top-1 w-6 h-1.5 bg-white/25 rounded-full" />
                              {/* Side volume buttons */}
                              <div className="absolute -left-1 top-6 w-0.5 h-3 bg-white/20 rounded-r-sm" />
                              <div className="absolute -left-1 top-10 w-0.5 h-3 bg-white/20 rounded-r-sm" />
                              <span className="font-sans font-bold text-[9px] text-white">原生壳</span>
                            </div>

                            {/* Middle Connector: Bidirectional WebSocket Channel */}
                            <div className="flex-1 flex flex-col items-center justify-center px-1 relative h-full">
                              {/* Top Curved Arrow (Left to Right) */}
                              <svg className="w-full h-8 absolute inset-x-0 top-3 text-blue-400 opacity-80" viewBox="0 0 100 30" fill="none">
                                <path d="M10 20 Q50 5 90 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
                                <polygon points="90,20 83,14 83,21" fill="currentColor" />
                              </svg>

                              {/* Glowing Central Lightning Bolt */}
                              <div className="relative z-20 my-1 animate-pulse">
                                <svg className="w-4 h-4 text-blue-300 fill-current" viewBox="0 0 24 24">
                                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                              </div>

                              <span className="font-mono font-bold text-[8px] sm:text-[9px] text-blue-200 z-10 bg-[#0a0f1d] px-1.5 py-0.5 rounded-md border border-blue-500/20 shadow-md">
                                WebScket
                              </span>

                              {/* Bottom Curved Arrow (Right to Left) */}
                              <svg className="w-full h-8 absolute inset-x-0 bottom-3 text-blue-400 opacity-80" viewBox="0 0 100 30" fill="none">
                                <path d="M90 10 Q50 25 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <polygon points="10,10 17,16 17,9" fill="currentColor" />
                              </svg>
                            </div>

                            {/* Right: Webview Mockup */}
                            <div className="flex flex-col items-center justify-center border border-white/20 bg-white/5 rounded-lg w-16 h-24 relative shadow-inner overflow-hidden">
                              {/* Web browser header toolbar */}
                              <div className="absolute top-0 inset-x-0 h-3 bg-white/10 border-b border-white/10 flex items-center justify-between px-1.5">
                                <div className="flex gap-0.5">
                                  <div className="w-1 h-1 bg-white/30 rounded-full" />
                                  <div className="w-1 h-1 bg-white/30 rounded-full" />
                                  <div className="w-1 h-1 bg-white/30 rounded-full" />
                                </div>
                                <div className="w-6 h-1 bg-white/20 rounded-full" />
                              </div>
                              <span className="font-sans font-bold text-[9px] text-white mt-1">Webview</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={proj.image} 
                          alt={proj.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      {exp.id === 1 && pIdx === 0 ? null : (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                      )}
                    </div>
                    <h4 className="font-display font-bold text-base text-black mb-2 select-text">
                      {proj.title}
                    </h4>
                    <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed select-text">
                      {proj.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </section>

      </div>

      {/* Details Modals matching exactly the 1:1 original reference schema */}
      <AnimatePresence>
        {activeModal !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Dialog Content Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative bg-white/95 backdrop-blur-xl border border-neutral-200 rounded-[2.5rem] shadow-2xl p-8 md:p-12 w-full max-w-5xl max-h-[90vh] overflow-y-auto z-10 select-text"
            >
              {/* Close Icon Button */}
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-8 right-8 p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Responsibilities Subsection */}
              <div className="text-center mb-10">
                <h2 className="font-display font-black text-2xl text-black">
                  核心职责
                </h2>
                <p className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase font-bold mt-1.5">
                  CORE RESPONSIBILITIES
                </p>
              </div>

              {/* Detailed Grid items list matching the columns block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {experiences.find(e => e.id === activeModal)?.modalDetails.responsibilities.map((col, cIdx) => {
                  const ResponsibilityIcon = col.icon;
                  return (
                    <div 
                      key={cIdx} 
                      className={`p-6 bg-neutral-50/70 border border-neutral-200/50 rounded-2xl flex flex-col items-start text-left space-y-4`}
                    >
                      <div className="p-3 bg-neutral-100 text-black rounded-xl border border-neutral-200/40 shadow-sm shrink-0">
                        <ResponsibilityIcon className="w-5 h-5 text-neutral-800" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-display font-bold text-sm text-black uppercase tracking-wide">
                          {col.title}
                        </h3>
                        <p className="font-sans text-xs text-neutral-500 leading-relaxed">
                          {col.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Results Subsection */}
              <div className="text-center mb-8">
                <h2 className="font-display font-black text-2xl text-black">
                  核心成果
                </h2>
                <p className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase font-bold mt-1.5">
                  CORE RESULTS
                </p>
              </div>

              {/* Stats metric blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {experiences.find(e => e.id === activeModal)?.modalDetails.results.map((stat, sIdx) => (
                  <div 
                    key={sIdx} 
                    className="bg-[#f8f9fa] border border-neutral-200/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-1"
                  >
                    <span className="font-display font-black text-3xl sm:text-4xl text-black select-all">
                      {stat.value}
                    </span>
                    <span className="font-sans text-xs font-semibold text-neutral-500">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Close Action Bottom Row */}
              <div className="flex justify-center mt-12 mb-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="bg-black text-white px-10 py-3 rounded-full font-sans text-sm font-bold hover:opacity-85 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  关闭
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
