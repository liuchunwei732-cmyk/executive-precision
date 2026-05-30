/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, BarChart2, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';

interface SkillsProps {
  onOpenContact: () => void;
}

export default function Skills({ onOpenContact }: SkillsProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const skillCards = [
    {
      id: 1,
      title: 'AI 核心技术与工程',
      desc: '熟悉大语言/多模态模型（LLM/VLM）原理、支持 SFT/LoRA 微调；熟练使用 Coze、Dify 搭建复杂 Agent 工作流与 RAG 策略；具备 OpenAI、Grok 的 API 全链路调用与 Prompt 极致优化能力；精通 Python 自动化脚本研发。',
      icon: Cpu,
      color: 'rgba(52, 211, 153, 0.15)',
      tags: ['LLM/VLM', 'SFT/LoRA', 'Coze/Dify', 'Python']
    },
    {
      id: 2,
      title: '数据驱动与用户增长',
      desc: '精通 SQL 复杂查询与 Hive SQL 大规模数据集检索；掌握神策数据全埋点规范、埋点标注与字段设计；熟练运用 Numpy、Pandas、Scikit-learn 进行 A/B 测试与深度数据挖掘；熟练使用 Tableau、Excel 进行数据看板可视化。',
      icon: BarChart2,
      color: 'rgba(147, 51, 234, 0.12)',
      tags: ['SQL', 'Sensors Data', 'A/B Testing', 'Tableau']
    },
    {
      id: 3,
      title: '产品全流程与设计',
      desc: '熟练掌握 Axure、Figma 等高保真交互原型设计工具；具备扎实的 PRD 业务全逻辑、需求分析与深度竞品调研文档撰写能力；熟悉从底层数据标注、模型优化到前端多设备功能上线的全链路产品交付流程。',
      icon: Compass,
      color: 'rgba(96, 165, 250, 0.12)',
      tags: ['Axure / Figma', 'PRD', 'Product Delivery']
    }
  ];

  const handleCardClick = (id: number) => {
    setExpandedCard(prev => prev === id ? null : id);
  };

  // GSAP 3D hover effects & smooth calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = x / rect.width;
    const yPct = y / rect.height;
    
    // Rotate relative to center, max 12 degrees
    const rotateXVal = (yPct - 0.5) * -12;
    const rotateYVal = (xPct - 0.5) * 12;

    gsap.to(card, {
      rotateX: rotateXVal,
      rotateY: rotateYVal,
      scale: 1.025,
      transformPerspective: 1000,
      ease: "power3.out",
      duration: 0.35,
      overwrite: "auto"
    });

    const spot = card.querySelector('.spotlight-glow');
    if (spot) {
      gsap.to(spot, {
        left: x,
        top: y,
        opacity: 1,
        scale: 1.1,
        ease: "power2.out",
        duration: 0.45,
        overwrite: "auto"
      });
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const spot = card.querySelector('.spotlight-glow');
    
    if (spot) {
      gsap.to(spot, {
        opacity: 1,
        duration: 0.35,
        overwrite: "auto"
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const spot = card.querySelector('.spotlight-glow');
    
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      ease: "power3.out",
      duration: 0.6,
      overwrite: "auto"
    });

    if (spot) {
      gsap.to(spot, {
        opacity: 0,
        left: '50%',
        top: '50%',
        scale: 1,
        ease: "power3.out",
        duration: 0.6,
        overwrite: "auto"
      });
    }
  };

  // Stagger entry animation on mount
  useEffect(() => {
    if (containerRef.current) {
      // Animate the letter spacing of the tag
      gsap.fromTo(
        containerRef.current.querySelector('.skill-header-tag'),
        {
          letterSpacing: "0.05em",
          opacity: 0,
          y: 15
        },
        {
          letterSpacing: "0.2em",
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out"
        }
      );

      // Animate the main display title with elegant vertical reveal & skew
      gsap.fromTo(
        containerRef.current.querySelector('.skill-header-title'),
        {
          y: 45,
          skewY: 2,
          opacity: 0
        },
        {
          y: 0,
          skewY: 0,
          opacity: 1,
          duration: 1.1,
          delay: 0.1,
          ease: "power4.out"
        }
      );

      // Animate paragraph description text fading in smoothly
      gsap.fromTo(
        containerRef.current.querySelector('.skill-header-desc'),
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          delay: 0.25,
          ease: "power3.out"
        }
      );

      // Card entry animations
      gsap.fromTo(
        containerRef.current.querySelectorAll('.skill-card-item'),
        {
          y: 60,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.16,
          delay: 0.35,
          ease: "power4.out",
          clearProps: "y,opacity,scale" // Ensures full compatibility with manual mouse interactions later
        }
      );
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f8f9fa] pt-28 pb-20 overflow-hidden" id="screen_skills" ref={containerRef}>
      {/* Background dot-mesh radial accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial-gradient from-emerald-50/20 to-transparent pointer-events-none rounded-full" />
      <div className="absolute -left-10 top-1/2 w-[400px] h-[400px] bg-radial-gradient from-purple-50/20 to-transparent pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative">
        
        {/* Header Block exactly as Mockup */}
        <div className="mb-16 max-w-3xl space-y-4 select-text overflow-hidden">
          <span className="skill-header-tag font-mono text-xs uppercase tracking-[0.2em] text-[#4f625e] font-bold block">
            TECHNICAL MATRIX
          </span>
          <h1 className="skill-header-title font-display font-black text-4xl md:text-6xl text-black">
            Skills &amp; Expertise
          </h1>
          <p className="skill-header-desc font-sans text-neutral-500 text-sm md:text-base leading-relaxed">
            A comprehensive overview of technical capabilities, bridging the gap between advanced AI engineering, data-driven strategy, and end-to-end product delivery.
          </p>
        </div>

        {/* 3-Column Bento/Grid exactly as designed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="cards-container">
          {skillCards.map((card) => {
            const IconComponent = card.icon;
            const isExpanded = expandedCard === card.id;

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="skill-card-item relative glass-card rounded-2xl p-8 cursor-pointer select-text border border-neutral-200/50 bg-white/75 hover:bg-white transition-shadow duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between overflow-hidden"
                style={{
                  minHeight: '340px',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Dynamic Spotlight Glow Element tracked by GSAP */}
                <div 
                  className="spotlight-glow absolute rounded-full blur-3xl pointer-events-none opacity-0"
                  style={{
                    width: '280px',
                    height: '280px',
                    background: `radial-gradient(circle, ${card.color} 0%, transparent 70%)`,
                    transform: 'translate(-50%, -50%)',
                    left: '50%',
                    top: '50%',
                    willChange: 'left, top, opacity'
                  }}
                />

                <div className="space-y-6 pointer-events-none">
                  {/* Icon Frame */}
                  <div className="h-12 w-12 rounded-xl bg-neutral-100/80 border border-neutral-200/30 flex items-center justify-center text-black">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-xl text-black">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-neutral-600 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Sub-tags list inside collapse panel */}
                <div className="mt-8 pt-6 border-t border-neutral-150 pointer-events-none">
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-[#edeeef]/60 text-[#4c4546] font-mono text-[10px] uppercase font-bold rounded-full transition-colors hover:bg-neutral-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Action Engagement row bottom */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={onOpenContact}
            className="bg-black text-white px-8 py-3.5 rounded-full font-sans text-sm font-semibold transition-all hover:opacity-85 active:scale-95 shadow-lg shadow-black/10 cursor-pointer"
          >
            与我深入探讨
          </button>
        </div>

      </div>
    </div>
  );
}
