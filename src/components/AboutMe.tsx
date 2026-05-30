/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ScreenId } from '../types';
import { Sparkles, Terminal, FileText, Send, Star, Zap, Library, ClipboardList, X, FileCode } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import TiltContainer from './TiltContainer';
import GradientBlinds from './GradientBlinds';

interface AboutMeProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenContact: () => void;
  onMatchModalToggle?: (isOpen: boolean) => void;
}

export default function AboutMe({ onNavigate, onOpenContact, onMatchModalToggle }: AboutMeProps) {
  const [jdText, setJdText] = useState<string>('');
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [showMatchModal, setShowMatchModal] = useState<boolean>(false);
  const [scores, setScores] = useState({ match: 0, edu: 0, work: 0, skill: 0, soft: 0 });
  const [highlights, setHighlights] = useState<{ jdRequirement: string; matchDescription: string }[]>([]);
  const [summary, setSummary] = useState<string>('');

  // Report modal state to parent to hide custom cursor
  useEffect(() => {
    if (onMatchModalToggle) {
      onMatchModalToggle(showMatchModal);
    }
  }, [showMatchModal, onMatchModalToggle]);

  // Custom spotlight hover effect variables
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [isHoveredAiCard, setIsHoveredAiCard] = useState<boolean>(false);

  // Absorption splash ripple state
  const [splashes, setSplashes] = useState<{ id: number; x: number; y: number; side: 'vertical' | 'horizontal' }[]>([]);

  // Refs for high-performance direct DOM spring-morphing physics
  const spotlightRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -500, y: -500 });

  // Physic-based dampening spring coordinates for smooth parallax inertia (物理阻尼视差感)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Custom spring config designed for high-end organic inertia damping
  const springConfig = { damping: 35, stiffness: 85, mass: 1.0 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transforms for watermarks, background blocks, and cards
  const watermarkX = useTransform(smoothX, (x) => x * 0.05);
  const watermarkY = useTransform(smoothY, (y) => y * 0.05);
  
  const bgBlock1X = useTransform(smoothX, (x) => x * -0.05);
  const bgBlock1Y = useTransform(smoothY, (y) => y * -0.05);
  
  const bgBlock2X = useTransform(smoothX, (x) => x * 0.06);
  const bgBlock2Y = useTransform(smoothY, (y) => y * 0.06);

  const heroX = useTransform(smoothX, (x) => x * 0.012);
  const heroY = useTransform(smoothY, (y) => y * 0.012);

  const card3dX = useTransform(smoothX, (x) => x * 0.015);
  const card3dY = useTransform(smoothY, (y) => y * 0.015);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Set instantaneous cursor position for screen/spotlight overlays
      setMousePos({ x: e.clientX, y: e.clientY });

      // Update target coordinate ref for high speed physics anim frame
      targetPos.current = { x: e.clientX, y: e.clientY };
      
      // Compute relative offset from the center of the viewport
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      
      // Feed into motion values to trigger spring solver
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Real-time animation physics solver loop (Xiaomi MiMo Liquid Spot Re-creation)
  useEffect(() => {
    let currentX = -500;
    let currentY = -500;
    let vx = 0;
    let vy = 0;
    let animationFrameId: number;

    const updateSpotlight = () => {
      const targetX = targetPos.current.x;
      const targetY = targetPos.current.y;

      if (targetX === -500 && targetY === -500) {
        animationFrameId = requestAnimationFrame(updateSpotlight);
        return;
      }

      // Snappy landing on viewport entry to preempt screen edge dragging
      if (currentX === -500 && currentY === -500) {
        currentX = targetX;
        currentY = targetY;
      }

      // 1. Spring-damped latency equation
      const springConstant = 0.045; // Luxurious, fluid sluggishness
      const friction = 0.81;        // High dragging viscosity
      
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      vx += dx * springConstant;
      vy += dy * springConstant;
      vx *= friction;
      vy *= friction;

      currentX += vx;
      currentY += vy;

      // 2. Velocity stretching math
      const speed = Math.sqrt(vx * vx + vy * vy);
      const maxStretch = 0.38; // Cap stretch to preserve structural liquid blob integrity
      const stretch = Math.min(speed * 0.012, maxStretch);

      // Conserve mass - grow on X projection, shrink proportionally on Y projection
      const scaleX = 1 + stretch;
      const scaleY = 1 - stretch * 0.45;

      // Compute leading angle to orient organic stretch
      let rotateAngle = 0;
      if (speed > 0.4) {
        rotateAngle = Math.atan2(vy, vx) * (180 / Math.PI);
      }

      // 3. Fluid Wave / Ink Breathing morphing
      const t = Date.now() * 0.003 + speed * 0.006;
      
      // 8 independent control anchors to generate water drip asymmetry
      const r1 = 50 + Math.sin(t) * 12;
      const r2 = 50 + Math.cos(t * 1.1) * 11;
      const r3 = 50 + Math.sin(t * 1.25) * 13;
      const r4 = 50 + Math.cos(t * 0.9) * 10;
      const r5 = 50 + Math.sin(t * 1.4) * 13;
      const r6 = 50 + Math.cos(t * 0.75) * 9;
      const r7 = 50 + Math.sin(t * 1.15) * 11;
      const r8 = 50 + Math.cos(t * 1.3) * 12;

      const borderRadius = `${r1}% ${100 - r1}% ${r2}% ${100 - r2}% / ${r3}% ${r4}% ${100 - r4}% ${100 - r3}%`;

      // 4. Transform DOM node instantly using GPU composition pipeline
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(-50%, -50%) translate3d(${currentX}px, ${currentY}px, 0) rotate(${rotateAngle}deg) scale(${scaleX}, ${scaleY})`;
        spotlightRef.current.style.borderRadius = borderRadius;
      }

      animationFrameId = requestAnimationFrame(updateSpotlight);
    };

    animationFrameId = requestAnimationFrame(updateSpotlight);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHoveredAiCard(true);
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Detect closest side for liquid splash dispersion
    const distToLeft = Math.abs(e.clientX - rect.left);
    const distToRight = Math.abs(e.clientX - rect.right);
    const distToTop = Math.abs(e.clientY - rect.top);
    const distToBottom = Math.abs(e.clientY - rect.bottom);
    const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);

    let side: 'vertical' | 'horizontal' = 'vertical';
    if (minDist === distToTop || minDist === distToBottom) {
      side = 'horizontal';
    }

    const newSplash = {
      id: Date.now() + Math.random(),
      x,
      y,
      side
    };

    setSplashes(prev => [...prev.slice(-3), newSplash]);

    // Cleanup splash timeout
    setTimeout(() => {
      setSplashes(prev => prev.filter(s => s.id !== newSplash.id));
    }, 950);
  };

  const handleStartMatch = async () => {
    if (!jdText.trim()) {
      return alert('请在此粘贴招聘要求 (JD) 进行匹配分析！');
    }
    
    setIsMatching(true);
    
    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jdText }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      if (data && data.scores) {
        setScores({
          match: data.scores.match ?? 75,
          edu: data.scores.edu ?? 80,
          work: data.scores.work ?? 70,
          skill: data.scores.skill ?? 85,
          soft: data.scores.soft ?? 85,
        });
        setHighlights(data.highlights || []);
        setSummary(data.summary || '');
        setShowMatchModal(true);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err) {
      console.error(err);
      alert('AI 匹配服务出现异常，请稍候再试。');
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f8f9fa] pt-28 pb-20 overflow-hidden" id="screen_aboutme">
      {/* Ambient background active WebGL shader blinds */}
      <GradientBlinds 
        angle={22} 
        noise={0.12} 
        blindCount={14} 
        spotlightRadius={0.7} 
        spotlightSoftness={0.9} 
        spotlightOpacity={0.65} 
        distortAmount={0.8}
        className="opacity-[0.14]" 
      />

      {/* Background radial watercolor wash glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] hover:scale-105 transition-transform duration-[4s] bg-radial-gradient from-emerald-100/30 to-transparent pointer-events-none rounded-full animate-pulse" />
      <div className="absolute -left-10 top-1/2 w-[400px] h-[400px] bg-radial-gradient from-purple-100/20 to-transparent pointer-events-none rounded-full" />

      {/* Xiaomi MiMo style global background inverting spotlight cursor */}
      <div 
        ref={spotlightRef}
        className="fixed pointer-events-none bg-white mix-blend-difference hidden lg:block"
        style={{
          left: 0,
          top: 0,
          width: '260px',
          height: '260px',
          opacity: isHoveredAiCard ? 0 : 1, // Fades out completely when hover enters #ai-card
          transition: 'opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 15, // Sit above the watermark and background contents but under the AI card (z-25)
          boxShadow: '0 0 45px rgba(255,255,255,0.3)',
          willChange: 'transform, borderRadius'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center pt-8">
          
          {/* Left Hero side Column with clean entrance animation and spring layout physics support */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ x: heroX, y: heroY }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 space-y-10 relative z-10 select-text"
          >
            
            {/* Massive Watermark Typography background (Visionary) with smooth physical damping */}
            <motion.div 
              style={{ x: watermarkX, y: watermarkY }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 lg:-left-20 lg:translate-x-0 pointer-events-none select-none z-[-1] whitespace-nowrap opacity-[0.035]"
            >
              <span className="text-[120px] md:text-[180px] lg:text-[220px] font-black tracking-tighter text-black uppercase">
                VISIONARY
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-black text-5xl md:text-7xl text-black leading-[1.1] tracking-tight"
              >
                Hi, 我是 <span className="text-black italic">刘淳伟</span>
              </motion.h1>
              
              <div>
                <h2 className="font-display font-semibold text-2xl md:text-3xl flex items-center gap-2 text-purple-600">
                  Product & Program Manager
                  <span className="w-1 h-8 bg-[#9333ea] animate-pulse inline-block align-middle"></span>
                </h2>
              </div>
            </div>

            <p className="font-sans text-neutral-600 text-lg md:text-xl font-normal leading-relaxed max-w-xl">
              拥有近 2 年产品及项目管理经验，热衷于发现业务痛点、搭建标准化业务系统。致力于挖掘基于 AI 的创新性解决方案，为复杂的企业挑战带来简洁、高效的路径。
            </p>

            <div className="flex flex-wrap gap-5">
              <a 
                href="https://raw.githubusercontent.com/liuchunwei732-cmyk/tokenrazor/resume-pdf/刘淳伟_AI智能科学与技术(计算机)_产品经理_2026.6.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                download="刘淳伟_AI智能科学与技术(计算机)_产品经理_2026.6.pdf"
                className="relative overflow-hidden bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-neutral-900 border-2 border-black transition-all duration-300 shadow-xl shadow-black/10 text-center active:scale-95 cursor-pointer flex items-center justify-center"
              >
                下载简历
              </a>
              <button 
                onClick={onOpenContact}
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold px-10 py-4 rounded-full border-2 border-transparent transition-all active:scale-95"
              >
                联系我
              </button>
            </div>
          </motion.div>

          {/* Right overlap depth container replicating the mockups (AI Job Matcher) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative w-full max-w-[500px] lg:w-1/2 aspect-square flex items-center justify-center p-4 z-20"
          >
            {/* 3D Dynamic Floating Parallax Background blocks with physical dampening inertia */}
            <motion.div 
              style={{ x: bgBlock1X, y: bgBlock1Y }}
              className="absolute top-4 right-4 w-[85%] h-[85%] bg-[#d1e7e1] opacity-20 rounded-[4rem] -rotate-6 pointer-events-none" 
            />
            <motion.div 
              style={{ x: bgBlock2X, y: bgBlock2Y }}
              className="absolute bottom-4 left-4 w-[75%] h-[75%] bg-[#e7dff6] opacity-35 rounded-[3rem] rotate-12 blur-xl pointer-events-none" 
            />

            {/* AI Job Matcher Card */}
            <TiltContainer maxRotation={6} className="w-full" perspective={1100}>
              <motion.div 
                style={{ x: card3dX, y: card3dY }}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={() => setIsHoveredAiCard(false)}
                className="relative w-full glass-card p-8 rounded-[2rem] border border-white/50 space-y-6 z-10 transition-transform duration-300 shadow-2xl overflow-hidden"
                id="ai-card"
              >
                {/* Concentric liquid edge-bleeding light wave animation */}
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none z-0">
                  {splashes.map((s) => (
                    <div key={s.id} className="absolute inset-0">
                      {/* Radial glowing water impact core expanding outward */}
                      <motion.div
                        initial={{ scale: 0.1, opacity: 0.75 }}
                        animate={{ scale: 2.6, opacity: 0 }}
                        transition={{ duration: 0.85, ease: "easeOut" }}
                        className="absolute w-24 h-24 bg-gradient-to-r from-purple-500/20 via-sky-400/15 to-transparent rounded-full blur-md"
                        style={{
                          left: s.x - 48,
                          top: s.y - 48,
                        }}
                      />
                      {/* Linear border lighting dispersion replicating bleeding lines under water */}
                      {s.side === 'vertical' ? (
                        <motion.div
                          initial={{ scaleY: 0.1, opacity: 0.9 }}
                          animate={{ scaleY: 2.6, opacity: 0 }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                          className="absolute w-[3px] h-48 bg-gradient-to-b from-transparent via-[#a855f7] to-transparent"
                          style={{
                            left: s.x < 150 ? 0 : 'auto',
                            right: s.x >= 150 ? 0 : 'auto',
                            top: s.y - 96,
                          }}
                        />
                      ) : (
                        <motion.div
                          initial={{ scaleX: 0.1, opacity: 0.9 }}
                          animate={{ scaleX: 2.6, opacity: 0 }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                          className="absolute h-[3px] w-48 bg-gradient-to-r from-transparent via-[#a855f7] to-transparent"
                          style={{
                            top: s.y < 150 ? 0 : 'auto',
                            bottom: s.y >= 150 ? 0 : 'auto',
                            left: s.x - 96,
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <label className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-black animate-pulse" />
                    AI 岗位匹配器
                  </label>
                  <span className="text-[10px] font-mono font-semibold text-neutral-400 px-2 py-1 bg-neutral-100 rounded uppercase">
                    Expert Analysis
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <textarea 
                      value={jdText}
                      onChange={(e) => setJdText(e.target.value)}
                      className="w-full bg-white/40 border border-neutral-200 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-black/10 focus:border-black/50 outline-none transition-all resize-none min-h-[170px] text-sm text-black placeholder:text-neutral-400 shadow-inner"
                      placeholder="在此粘贴招聘要求(JD)进行AI分析..."
                    />
                    <Terminal className="absolute right-5 bottom-5 text-neutral-300 w-5 h-5" />
                  </div>

                  <button 
                    onClick={handleStartMatch}
                    disabled={isMatching}
                    className="w-full bg-black hover:bg-neutral-800 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-black/20 transition-all active:scale-[0.98] cursor-pointer group"
                  >
                    {isMatching ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>分析中...</span>
                      </>
                    ) : (
                      <>
                        <span>开始匹配</span>
                        <Sparkles className="w-4 h-4 text-brand-mint transition-transform group-hover:scale-110" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </TiltContainer>
          </motion.div>

        </div>
      </div>

      {/* MATCH DETAILS MODAL OVERLAY (1:1 with Screen 13 Match Results Mockup) */}
      <AnimatePresence>
        {showMatchModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto" id="matchModal">
            {/* Backdrop layer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMatchModal(false)}
              className="absolute inset-0 bg-neutral-900/15 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass-modal w-full max-w-[800px] rounded-3xl p-6 md:p-10 relative flex flex-col gap-6 animate-in shadow-2xl z-10"
            >
              {/* Header Box */}
              <div className="flex items-center gap-3">
                <h2 className="font-display font-extrabold text-2xl text-black">综合等级</h2>
                <span className="bg-[#d1e7e1] text-[#0b1f1c] font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  匹配
                </span>
              </div>

              {/* Scores & Progress bar track system */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-neutral-100 pb-6">
                
                {/* Score Chart Circle */}
                <div className="md:col-span-5 flex flex-col items-center justify-center relative py-4">
                  <div className="absolute inset-0 bg-radial-gradient from-emerald-100/40 to-transparent blur-lg rounded-full" />
                  <div className="relative text-center z-10">
                    <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">综合评分</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-6xl font-display font-black text-black leading-none">
                        {scores.match}
                      </span>
                      <span className="text-xl text-neutral-300 font-bold">/100</span>
                    </div>
                  </div>

                  {/* Matching Indicator title tag */}
                  <div className="absolute -top-1 -left-1 flex items-center gap-1 px-4 py-2 rounded-full border border-neutral-200/50 bg-white/90 shadow-sm">
                    <span className="text-blue-500 font-extrabold text-xs font-mono">📊 匹配矩阵</span>
                  </div>
                </div>

                {/* Progress bars breaking down metrics */}
                <div className="md:col-span-7 space-y-4">
                  {[
                    { label: '学历', val: scores.edu },
                    { label: '工作经验', val: scores.work },
                    { label: '技能特长', val: scores.skill },
                    { label: '软技能', val: scores.soft },
                  ].map((row, idx) => (
                    <div key={row.label} className="space-y-1">
                      <div className="flex justify-between items-center text-xs font-bold text-neutral-600">
                        <span>{row.label}</span>
                        <span className="font-mono">{row.val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${row.val}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className="h-full progress-gradient rounded-full" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matching Highlights and summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left card Highlights */}
                <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-black font-bold text-sm">
                    <Star className="w-4 h-4 text-black fill-yellow-400" />
                    <span>匹配亮点</span>
                  </div>
                  <div className="space-y-3 font-sans text-xs text-neutral-500 leading-relaxed max-h-[180px] overflow-y-auto pr-1">
                    {highlights && highlights.length > 0 ? (
                      highlights.map((h, i) => (
                        <div key={i} className="space-y-0.5 border-l-2 border-emerald-400 pl-2 shadow-sm p-1 rounded">
                          <p className="font-bold text-neutral-700">JD: {h.jdRequirement}</p>
                          <p>{h.matchDescription}</p>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-0.5 border-l-2 border-emerald-400 pl-2">
                        <p className="font-bold text-neutral-700">核心匹配</p>
                        <p>候选人拥有卓越的AI/大模型产品技术沉淀，以及优秀的全栈敏捷团队操盘经验。</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right card Summary */}
                <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-black font-bold text-sm">
                    <FileText className="w-4 h-4 text-black" />
                    <span>总结</span>
                  </div>
                  <p className="text-xs text-neutral-500 leading-6 font-sans">
                    {summary || "匹配分析已成功，候选人拥有优秀的产品与工程能力，能够胜任绝大多数AI产品团队的项目及产品工作。"}
                  </p>
                </div>
              </div>

              {/* Close Row button */}
              <div className="flex justify-end pt-3">
                <button 
                  onClick={() => setShowMatchModal(false)}
                  className="bg-black hover:bg-neutral-850 text-white px-10 py-2.5 rounded-full font-bold transition-all text-sm shadow-md"
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
