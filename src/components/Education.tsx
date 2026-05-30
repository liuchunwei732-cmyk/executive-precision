/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function Education() {
  return (
    <div className="relative min-h-screen bg-[#f8f9fa] pt-28 pb-20 overflow-hidden" id="screen_education">
      {/* Background decorations matching brand style */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial-gradient from-emerald-50/20 to-transparent pointer-events-none rounded-full" />
      <div className="absolute -left-10 top-1/2 w-[400px] h-[400px] bg-radial-gradient from-purple-50/20 to-transparent pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative">
        
        {/* Academic Journey Intro Section */}
        <section className="mb-12 relative">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-radial-gradient from-[#d1e7e1]/30 to-transparent -z-10 rounded-full blur-2xl pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4f625e] font-bold mb-4 block">
              ACADEMIC JOURNEY
            </span>
            <h1 className="font-display font-black text-4xl md:text-5xl text-black select-text">
              教育背景
            </h1>
            <p className="font-sans text-neutral-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto select-text">
              立足于智能科学与技术的前沿，我致力于将复杂的深度学习算法转化为触手可及的用户体验。严谨的计算机工程思维与敏锐的产品洞察力相结合，构成了我作为AI产品经理的核心底色。
            </p>
          </div>
        </section>

        {/* Education Timeline / Card section */}
        <section className="relative">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2rem] p-8 md:p-12 border border-neutral-200/50 transition-all duration-700 ease-out hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1">
              
              {/* Header block with school & major */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-neutral-100 pb-8 gap-4 select-text">
                <div>
                  <h3 className="font-display font-bold text-2xl text-black mb-2">江西应用科技学院</h3>
                  <p className="font-sans text-[#4f625e] text-sm md:text-base font-semibold">
                    智能科学与技术（AI方向）学士学位
                  </p>
                </div>
                <div className="mt-4 md:mt-0 text-left md:text-right space-y-2">
                  <span className="font-mono text-xs bg-neutral-100 text-[#191c1d] px-4 py-1.5 rounded-full inline-block font-semibold">
                    2022 - 2026
                  </span>
                  <div className="font-display text-sm text-black font-extrabold md:text-base">
                    主修课程绩点3.5，年级排名前10%
                  </div>
                </div>
              </div>

              <div className="space-y-10 select-text">
                {/* Core Courses Grid */}
                <div>
                  <h4 className="font-mono text-xs text-neutral-400 mb-6 uppercase tracking-wider font-extrabold">
                    核心课程结构
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Course Card 1: AI & Data */}
                    <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-neutral-200/50 shadow-sm space-y-4">
                      <h5 className="font-display text-base font-bold text-black flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] inline-block shadow-sm shadow-[#34d399]/40" />
                        AI &amp; Data
                      </h5>
                      <ul className="font-sans text-xs sm:text-sm text-neutral-600 space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" /> 深度学习
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" /> 数据结构
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" /> 数据统计
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" /> 数据库原理
                        </li>
                      </ul>
                    </div>

                    {/* Course Card 2: Computer Systems */}
                    <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-neutral-200/50 shadow-sm space-y-4">
                      <h5 className="font-display text-base font-bold text-black flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#a78bfa] inline-block shadow-sm shadow-[#a78bfa]/40" />
                        Computer Systems
                      </h5>
                      <ul className="font-sans text-xs sm:text-sm text-neutral-600 space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" /> 操作系统
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" /> 计算机网络
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" /> 编译原理
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" /> 软件工程
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Honors and Contests */}
                <div>
                  <h4 className="font-mono text-xs text-neutral-400 mb-4 uppercase tracking-wider font-extrabold">
                    荣誉奖项
                  </h4>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 bg-[#f8f9fa] text-neutral-800 px-5 py-4 rounded-xl border border-neutral-200/50 shadow-sm text-xs sm:text-sm transition-colors hover:bg-neutral-50/80">
                      <span className="text-xl">🏆</span>
                      <span className="font-sans font-semibold text-black">全国大学生数学建模竞赛 省级Top3</span>
                    </div>
                    <div className="flex items-center gap-3 bg-[#f8f9fa] text-neutral-800 px-5 py-4 rounded-xl border border-neutral-200/50 shadow-sm text-xs sm:text-sm transition-colors hover:bg-neutral-50/80">
                      <span className="text-xl">🏆</span>
                      <span className="font-sans font-semibold text-black">“互联网+”红旅赛道 全国金奖(Top3)</span>
                    </div>
                    <div className="flex items-center gap-3 bg-[#f8f9fa] text-neutral-800 px-5 py-4 rounded-xl border border-neutral-200/50 shadow-sm text-xs sm:text-sm transition-colors hover:bg-neutral-50/80">
                      <span className="text-xl">🏆</span>
                      <span className="font-sans font-semibold text-black">“挑战杯” 省级三等奖</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Continuous Learning Section */}
        <section className="mt-16 max-w-4xl mx-auto flex flex-col select-text">
          <div className="border border-neutral-800 rounded-[2rem] p-8 md:p-16 relative overflow-hidden bg-[#121212] shadow-2xl text-[#f3f4f5]">
            
            {/* Background absolute graduation cap figure element */}
            <div className="absolute -right-6 -bottom-6 opacity-[0.04] pointer-events-none select-none text-[180px] text-[#C5A059]">
              🎓
            </div>

            <div className="relative z-10 max-w-4xl space-y-1">
              <h2 className="font-display font-semibold text-2xl text-white">
                持续进修与专业认证
              </h2>
              <p className="font-mono text-[10px] tracking-[0.2em] mb-12 uppercase text-neutral-400 font-bold">
                CONTINUOUS LEARNING &amp; PROFESSIONAL CERTIFICATIONS
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                
                {/* Cert 1 */}
                <div className="border-l border-neutral-700/50 pl-6 space-y-1">
                  <p className="font-mono text-xs tracking-wider text-[#C5A059] font-bold">
                    【 专业认证 】
                  </p>
                  <h4 className="font-display font-bold text-base text-[#F5F5F5] leading-tight">
                    Google Project Management
                  </h4>
                  <p className="text-xs text-[#A68B6A] font-medium">
                    2023 | Coursera Professional Certificate
                  </p>
                  <p className="text-xs text-neutral-400">
                    ↳ 敏捷项目管理 / 跨职能团队协同 / 风险控制
                  </p>
                </div>

                {/* Cert 2 */}
                <div className="border-l border-neutral-700/50 pl-6 space-y-1">
                  <p className="font-mono text-xs tracking-wider text-[#C5A059] font-bold">
                    【 技术执照 】
                  </p>
                  <h4 className="font-display font-bold text-base text-[#F5F5F5] leading-tight">
                    Rhino &amp; Grasshopper Expert
                  </h4>
                  <p className="text-xs text-[#A68B6A] font-medium">
                    2022 | McNeel Certified Professional
                  </p>
                  <p className="text-xs text-neutral-400">
                    ↳ 参数化设计 / 算法建模 / 视觉脚本编写
                  </p>
                </div>

                {/* Cert 3 */}
                <div className="border-l border-neutral-700/50 pl-6 space-y-1">
                  <p className="font-mono text-xs tracking-wider text-[#C5A059] font-bold">
                    【 AI 进阶 】
                  </p>
                  <h4 className="font-display font-bold text-base text-[#F5F5F5] leading-tight">
                    Generative AI &amp; Multi-Agent Systems
                  </h4>
                  <p className="text-xs text-[#A68B6A] font-medium">
                    2025 | DeepLearning.AI Specialization
                  </p>
                  <p className="text-xs text-neutral-400">
                    ↳ 大模型微调 / 提示词工程 / 智能体编排
                  </p>
                </div>

                {/* Cert 4 */}
                <div className="border-l border-neutral-700/50 pl-6 space-y-1">
                  <p className="font-mono text-xs tracking-wider text-[#C5A059] font-bold">
                    【 开源与荣誉 】
                  </p>
                  <h4 className="font-display font-bold text-base text-[#F5F5F5] leading-tight">
                    GitHub Open Source Contributor
                  </h4>
                  <p className="text-xs text-[#A68B6A] font-medium">
                    Active Developer &amp; Tech Blogger
                  </p>
                  <p className="text-xs text-neutral-400">
                    ↳ 贡献于开源 LLM 推理框架优化项目
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
