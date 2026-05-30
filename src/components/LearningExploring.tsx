import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import TiltContainer from './TiltContainer';
import { 
  AppWindow, 
  Smartphone, 
  Terminal, 
  Heart, 
  Star, 
  ArrowRight, 
  ExternalLink,
  Search,
  BookOpen,
  Sparkles,
  User,
  ArrowLeft,
  Share2
} from 'lucide-react';

interface Post {
  title: string;
  excerpt: string;
  content: string;
  likes: number;
  stars: number;
  date: string;
  tags: string[];
}

export default function LearningExploring() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  // 3D Tilt Effect for iPhone mockup
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Xiaohongshu posts data
  const posts: Post[] = [
    {
      title: '终原因是vibe出了属于自己的网页',
      excerpt: '折腾了半天，终于用vibe coding做出了专属个人简历网站✨...',
      content: '折腾了半天，终于基于 Vibe Coding（敏捷、场景驱动式 AI 协同开发）做出了自己的专属网页简历！从初期的整体色调布局讨论，到深入定制原生 APP 壳体与 WebView 双工 WebSocket 通信细节，AI 给予了难以想象的高效率响应。\n\n通过对细节、圆角、阴影以及动态交互的反复微调，最终呈现出这套兼具学术科研格调与互联网商业级高可用品质的代码艺术品。接下来，我会继续在这个基础上打磨并输出更多深度好文！',
      likes: 17,
      stars: 18,
      date: '5-27',
      tags: ['VibeCoding', '个人建站', '开发沉淀']
    },
    {
      title: 'Vibe coding实战心法：从０－１的AI全栈开发方法论',
      excerpt: '如题，全干货，从代码基础也能直接抄！',
      content: '今天跟大家唠唠最近大火的 Vibe Coding。很多人觉得这只是“纯娱乐式写代码”，但实际上，如果掌握了正确的方法论，这是一种极高吞吐的全栈推进手段：\n\n1. 明确结构基调：不要一上来就让 AI 从无到有胡编，需要先画定边界和模块。\n2. 渐进式精雕：先让基础框架跑起来，接着按“界面排版 - 数据联动 - 动效优化”进行单点切片提效。\n3. 重视编译反馈：不要连写十几个文件不看报错，一次只推进一个局部，保持单元敏捷性。\n\n后面会在这条道路上继续探索更高级的定制工具流，欢迎大家一起探讨！',
      likes: 10,
      stars: 13,
      date: '5-25',
      tags: ['全栈开发', 'AI干货', '实战方法']
    },
    {
      title: '吐槽贴 | 三家AI巨头谁最拉跨？我用了两年踩遍所有的坑',
      excerpt: '谷歌gemini、gpt、claude各有优劣...',
      content: '作为一个两年的高强度 AI 重度使用者，客观评价一下目前的主流三巨头：\n\n- 谷歌 Gemini：上下文窗口极大，并且对于最新的 SDK 代码（比如 `@google/genai`）有着极佳的认知。在面对长代码或全景式系统架构重构时，它的记忆力非常惊人。\n- Claude：代码细节的审美极高，行文很有专业性，但在庞杂上下文分析中偶尔会有记忆衰退。\n- GPT-4o：逻辑扎实、反应非常均衡稳定，但在极致美学和超大颗粒度代码重构上比较偏死板。\n\n总结：各有千秋，双剑合演才是王道！大家平时最喜欢哪个？欢迎评论区分享。',
      likes: 8,
      stars: 1,
      date: '5-20',
      tags: ['AI工具测评', '避坑指南', 'Gemini']
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#f8f9fa] pt-32 sm:pt-36 pb-24 px-6 sm:px-12 overflow-hidden select-text" id="screen_learning_exploring">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-1/12 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-[#d1e7e1]/40 to-transparent pointer-events-none blur-3xl" />
      <div className="absolute top-1/3 right-1/12 -translate-y-1/3 w-[600px] h-[600px] bg-radial from-[#e7dff6]/30 to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Content Section Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Vibe Coding Works */}
          <div className="lg:col-span-7 space-y-8">
            <header className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-black rounded-full" />
              <h2 className="font-display font-black text-3xl text-neutral-900 tracking-tight">
                Vibe Coding 作品
              </h2>
            </header>

            {/* Featured Project Card */}
            <article className="bg-white/80 backdrop-blur-md rounded-[2rem] p-6 border border-neutral-200/50 shadow-sm hover:shadow-xl transition-all duration-300 group">
              {/* Fully-coded High-Fidelity Mockup Screen (Replaces low-res or external image) */}
              <TiltContainer maxRotation={7} className="w-full relative rounded-2xl mb-6" perspective={1200}>
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#f0f2f5] to-[#e4e9f0] aspect-video flex items-center justify-center p-4 border border-neutral-200/30">
                  {/* 3D hover/interactive inner smartphone casing */}
                  <div className="relative w-[190px] h-[310px] sm:w-[220px] sm:h-[350px] bg-white border-[5px] border-neutral-900 rounded-[2.2rem] shadow-[0_12px_36px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden group-hover:scale-[1.03] transition-transform duration-500">
                    {/* Dynamic Island */}
                    <div className="absolute top-1.5 left-1/2 -smart-notch -translate-x-1/2 w-16 h-4 bg-neutral-900 rounded-full z-20 flex items-center justify-between px-2.5">
                      <div className="w-1.5 h-1.5 bg-[#101010] rounded-full" />
                      <div className="w-1 h-1 bg-[#1a3a5f] rounded-full" />
                    </div>

                    {/* App Container */}
                    <div className="h-full pt-6 flex flex-col bg-white">
                      {/* Header */}
                      <div className="px-3.5 py-2 flex items-center justify-between border-b border-neutral-50">
                        <div className="flex flex-col">
                          <span className="font-sans font-black text-xs text-neutral-900 tracking-tight leading-none select-none">
                            灵感记
                          </span>
                          <div className="w-3.5 h-0.5 bg-blue-500 rounded-full mt-0.5" />
                        </div>
                        <Search className="w-3.5 h-3.5 text-neutral-600" />
                      </div>

                      {/* Developer profile block */}
                      <div className="mx-3.5 mt-2.5 mb-1.5 p-1.5 bg-neutral-50/60 border border-neutral-100/50 rounded-xl flex items-center gap-1.5">
                        <div className="w-5.5 h-5.5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <Sparkles className="w-3 h-3 text-blue-500 fill-current" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-sans font-bold text-[8px] text-neutral-800 leading-none">IdeaWalker</div>
                          <div className="text-[6.5px] text-neutral-400 mt-0.5 leading-none font-sans">记录灵感，点亮生活</div>
                        </div>
                      </div>

                      {/* Blog Scroll Items Mockup */}
                      <div className="px-3 py-1 space-y-2 flex-1 overflow-hidden">
                        {/* Post 1 */}
                        <div className="bg-white border border-neutral-100 p-2 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                          <div className="flex gap-1.5 items-start">
                            <div className="w-5 h-5 bg-[#e7dff6] rounded flex items-center justify-center shrink-0">
                              <BookOpen className="w-2.5 h-2.5 text-[#494457]" />
                            </div>
                            <div>
                              <h4 className="font-sans font-black text-[7.5px] text-neutral-900 leading-none">如何培养每天记录灵感的习惯</h4>
                              <p className="text-[6px] text-neutral-400 mt-1 scale-95 origin-left leading-none">记录创意不仅仅能带来思想的跨变...</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-neutral-50 text-[6px] font-mono text-neutral-400">
                            <div className="flex gap-1.5 items-center">
                              <span className="flex items-center gap-0.5">❤️ 123</span>
                              <span className="flex items-center gap-0.5">👁️ 2560</span>
                            </div>
                            <span className="text-blue-500 font-bold scale-[0.85] origin-right">阅读全文 &gt;</span>
                          </div>
                        </div>

                        {/* Post 2 */}
                        <div className="bg-white border border-neutral-100 p-2 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                          <div className="flex gap-1.5 items-start">
                            <div className="w-5 h-5 bg-[#d1e7e1] rounded flex items-center justify-center shrink-0">
                              <Smartphone className="w-2.5 h-2.5 text-[#374b46]" />
                            </div>
                            <div>
                              <h4 className="font-sans font-black text-[7.5px] text-neutral-900 leading-none font-bold">3个提升专注力的小技巧</h4>
                              <p className="text-[6px] text-neutral-400 mt-1 scale-95 origin-left leading-none">专注力是最重要的核心资产之一...</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-neutral-50 text-[6px] font-mono text-neutral-400">
                            <div className="flex gap-1.5 items-center">
                              <span className="flex items-center gap-0.5">❤️ 76</span>
                              <span className="flex items-center gap-0.5">👁️ 1575</span>
                            </div>
                            <span className="text-blue-500 font-bold scale-[0.85] origin-right font-semibold">阅读全文 &gt;</span>
                          </div>
                        </div>

                        {/* Post 3 */}
                        <div className="bg-white border border-neutral-100 p-2 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                          <div className="flex gap-1.5 items-start">
                            <div className="w-5 h-5 bg-amber-50 rounded flex items-center justify-center shrink-0">
                              <Terminal className="w-2.5 h-2.5 text-amber-600" />
                            </div>
                            <div>
                              <h4 className="font-sans font-black text-[7.5px] text-neutral-900 leading-none">周末自我充电清单 | 让生活更有能量</h4>
                              <p className="text-[6px] text-neutral-400 mt-1 scale-95 origin-left leading-none">整理了一份自我赋能清明指南...</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-neutral-50 text-[6px] font-mono text-neutral-400">
                            <div className="flex gap-1.5 items-center">
                              <span className="flex items-center gap-0.5">❤️ 12</span>
                              <span className="flex items-center gap-0.5">👁️ 1128</span>
                            </div>
                            <span className="text-blue-500 font-bold scale-[0.85] origin-right">阅读全文 &gt;</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltContainer>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl text-neutral-900 flex items-center justify-between">
                    <span>灵感记</span>
                    <span className="text-neutral-300 group-hover:text-black group-hover:translate-x-1 transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </h3>
                  <p className="text-neutral-500 font-sans text-sm leading-relaxed">
                    灵感记 App，以极简界面帮你捕捉灵感、记录想法，专注个人成长，让创意与生活有序生长。
                  </p>
                </div>

                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-[#d1e7e1] text-[#374b46] rounded-full text-[10px] font-mono font-bold tracking-wider uppercase">
                    FIGMA
                  </span>
                  <span className="px-3 py-1 bg-[#d1e7e1] text-[#374b46] rounded-full text-[10px] font-mono font-bold tracking-wider uppercase">
                    CURSOR
                  </span>
                  <span className="px-3 py-1 bg-[#d1e7e1] text-[#374b46] rounded-full text-[10px] font-mono font-bold tracking-wider uppercase">
                    GITHUB
                  </span>
                </div>

                {/* Other Projects Sub-list */}
                <div className="space-y-4 pt-6 mt-6 border-t border-neutral-100">
                  {/* Item 1 */}
                  <a 
                    href="https://www.figma.com/design/YmH5tuftjBd58uQoOuIksv/%E5%8F%A3%E6%B2%90%E9%80%82?node-id=0-1&p=f&t=Rgkt6kqP09mbh3vh-0"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-neutral-50 transition-all group/item block"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-neutral-200/50">
                      <Smartphone className="w-5 h-5 text-neutral-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans font-bold text-sm text-neutral-900 leading-tight group-hover/item:text-black flex items-center gap-1.5">
                        口沐适小程序
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-neutral-400 text-xs mt-0.5">
                        Figma · GitHub · 微信公众号平台
                      </p>
                    </div>
                  </a>

                  {/* Item 2 */}
                  <a 
                    href="https://github.com/liuchunwei732-cmyk/tokenrazor"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-neutral-50 transition-all group/item block"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-neutral-200/50">
                      <Terminal className="w-5 h-5 text-neutral-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans font-bold text-sm text-neutral-900 leading-tight group-hover/item:text-black flex items-center gap-1.5">
                        tokenrazor
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-neutral-400 text-xs mt-0.5">
                        Deepseek · GitHub
                      </p>
                    </div>
                  </a>

                  {/* Item 3 */}
                  <a 
                    href="https://github.com/afumu/openteam"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-neutral-50 transition-all group/item block"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-neutral-200/50">
                      <AppWindow className="w-5 h-5 text-neutral-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans font-bold text-sm text-neutral-900 leading-tight group-hover/item:text-black flex items-center gap-1.5">
                        openteam
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-neutral-400 text-xs mt-0.5 flex flex-wrap gap-x-2 items-center">
                        <span className="text-neutral-500 font-semibold">afumu/openteam</span>
                        <span className="text-neutral-300">|</span>
                        <span className="text-neutral-500">共创</span>
                        <span className="text-neutral-300">|</span>
                        <span className="text-neutral-400">Chrome扩展程序</span>
                      </p>
                    </div>
                  </a>

                  {/* Item 4 */}
                  <div className="flex items-center gap-4 p-2.5 rounded-xl">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-neutral-200/50">
                      <User className="w-5 h-5 text-neutral-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans font-bold text-sm text-neutral-900 leading-tight">
                        个人简历网站
                      </h4>
                      <p className="text-neutral-400 text-xs mt-0.5">
                        Stitch
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* RIGHT COLUMN: 学习与沉淀 (iPhone Screen Mockup) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <header className="flex items-center gap-3 self-start mb-8 w-full">
              <div className="w-1.5 h-8 bg-black rounded-full" />
              <h2 className="font-display font-black text-3xl text-neutral-900 tracking-tight">
                学习与沉淀
              </h2>
            </header>

            {/* Interactive iPhone Wrapper */}
            <div 
              className="w-full max-w-[340px] perspective-[1000px] cursor-grab active:cursor-grabbing select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div 
                ref={cardRef}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative border-[10px] border-[#1b1b1b] rounded-[3rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] bg-white aspect-[9/19] overflow-hidden transition-all"
              >
                {/* iPhone Status Island (Dynamic Island) */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-[#1b1b1b] rounded-full z-40 flex items-center justify-between px-3">
                  <div className="w-2.5 h-2.5 bg-[#101010] rounded-full border border-white/5" />
                  <div className="w-1.5 h-1.5 bg-[#1a3a5f] rounded-full" />
                </div>

                {/* Xiaohongshu simulated native app inside iPhone container */}
                <div className="h-full bg-white pt-9 relative overflow-hidden flex flex-col">
                  
                  {/* Simulated App Header */}
                  <div className="px-4 py-3 flex items-center justify-between border-b border-neutral-100 flex-shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="text-[#ba1a1a] font-black text-lg font-display-lg tracking-tight select-none">
                        小红书
                      </span>
                    </div>
                    <button className="p-1 hover:bg-neutral-100 rounded-full transition-colors">
                      <Search className="w-4 h-4 text-neutral-500" />
                    </button>
                  </div>

                  {/* Simulated App Contents Viewport Container */}
                  <div className="flex-1 overflow-y-auto relative bg-[#f8f9fa]">
                    
                    <AnimatePresence mode="wait">
                      {!selectedPost ? (
                        /* Posts List screen */
                        <motion.div 
                          key="feed_list"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-3.5 space-y-4"
                        >
                          {/* Profile Header */}
                          <div className="flex items-center gap-3 mb-4 p-1 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-neutral-100">
                            <img 
                              className="w-10 h-10 rounded-full border border-neutral-200/50 object-cover" 
                              alt="筱年 avatar"
                              referrerPolicy="no-referrer"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiJRsT6byTVd6yNtgkuWEv3HJANZg3oIs0aKw6fVNvQJAyteaW5309fdb0pMKxtzhR0D8kshuZuiB94vCFPKRW1F2872LMGKSs3YLoUoK3K7pcuvowfVkF5cCPnwPPpZcSdK4C1v-Re5Nr6VA0DpDip-y5n5PaDAJtfM98NUhq-pk3SpgWYJrzVN4zzp9UefkNC--6ebRQ2CtWKCjBMTaPTw1MH2bfncl9k6sqGXR4j_L3Y69MiR3zMb9a3MSfIUuqZMyDW2NdKeQgPA" 
                            />
                            <div className="min-w-0 flex-1">
                              <h5 className="font-bold text-xs text-neutral-900 truncate">筱年</h5>
                              <p className="text-[9px] text-neutral-400 mt-0.5">小红书号: 1536835008</p>
                            </div>
                          </div>

                          {/* Posts Feed */}
                          <div className="space-y-3">
                            {posts.map((post, idx) => (
                              <div 
                                key={post.title}
                                onClick={() => setSelectedPost(post)}
                                className="bg-white rounded-2xl p-4 border border-neutral-200/40 hover:border-neutral-300 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-all cursor-pointer group"
                              >
                                <h6 className="font-bold text-xs text-neutral-900 group-hover:text-black leading-snug line-clamp-1">
                                  {post.title}
                                </h6>
                                <p className="text-[10.5px] text-neutral-500 mt-1.5 line-clamp-2 leading-relaxed font-sans">
                                  {post.excerpt}
                                </p>
                                
                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-neutral-50 flex-wrap gap-2 text-[10px]">
                                  <div className="flex gap-2.5 text-neutral-400 font-mono">
                                    <span className="flex items-center gap-0.5">
                                      <Heart className="w-2.5 h-2.5 text-[#ba1a1a]/70 fill-[#ba1a1a]/5" /> {post.likes}
                                    </span>
                                    <span className="flex items-center gap-0.5">
                                      <Star className="w-2.5 h-2.5 text-amber-500/70" /> {post.stars}
                                    </span>
                                  </div>
                                  <span className="text-[#ba1a1a] font-bold text-[9px] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                                    查看全文 
                                    <ArrowRight className="w-2.5 h-2.5" />
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ) : (
                        /* Simulated detail view screen */
                        <motion.div 
                          key="post_detail"
                          initial={{ x: '100%' }}
                          animate={{ x: 0 }}
                          exit={{ x: '100%' }}
                          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                          className="absolute inset-0 bg-white flex flex-col z-30"
                        >
                          {/* Navigation Bar inside iOS simulation */}
                          <div className="px-3.5 py-2.5 border-b border-neutral-100 flex items-center justify-between bg-white flex-shrink-0">
                            <button 
                              onClick={() => setSelectedPost(null)}
                              className="flex items-center gap-1 text-xs text-neutral-600 font-medium hover:text-black cursor-pointer"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span>返回</span>
                            </button>
                            <span className="text-[10px] text-neutral-400 font-mono tracking-wider font-semibold uppercase">笔记详情</span>
                            <div className="w-8 h-8" /> {/* Spacer */}
                          </div>

                          {/* Content Scroller */}
                          <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {/* Author */}
                            <div className="flex items-center gap-2.5">
                              <img 
                                className="w-8 h-8 rounded-full border border-neutral-200" 
                                alt="筱年 avatar"
                                referrerPolicy="no-referrer"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiJRsT6byTVd6yNtgkuWEv3HJANZg3oIs0aKw6fVNvQJAyteaW5309fdb0pMKxtzhR0D8kshuZuiB94vCFPKRW1F2872LMGKSs3YLoUoK3K7pcuvowfVkF5cCPnwPPpZcSdK4C1v-Re5Nr6VA0DpDip-y5n5PaDAJtfM98NUhq-pk3SpgWYJrzVN4zzp9UefkNC--6ebRQ2CtWKCjBMTaPTw1MH2bfncl9k6sqGXR4j_L3Y69MiR3zMb9a3MSfIUuqZMyDW2NdKeQgPA" 
                              />
                              <div>
                                <h5 className="font-bold text-xs text-neutral-900">筱年</h5>
                                <p className="text-[9px] text-neutral-400">研学沉淀 · {selectedPost.date}</p>
                              </div>
                            </div>

                            {/* Title & Body */}
                            <div className="space-y-3">
                              <h1 className="font-sans font-black text-sm text-neutral-900 leading-snug">
                                {selectedPost.title}
                              </h1>
                              
                              <p className="text-xs text-neutral-600 leading-relaxed font-sans whitespace-pre-wrap select-text">
                                {selectedPost.content}
                              </p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {selectedPost.tags.map((tag) => (
                                <span key={tag} className="text-[9px] text-[#ba1a1a] bg-[#ffdad6]/40 font-semibold px-2 py-0.5 rounded-full">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Detail bottom bar / Engagement indicator */}
                          <div className="px-4 py-3 border-t border-neutral-100 flex items-center justify-between text-neutral-500 bg-white flex-shrink-0">
                            <span className="text-[10px] font-mono text-neutral-400">编辑于 2026-05</span>
                            <div className="flex gap-4 items-center">
                              <button className="flex items-center gap-1 hover:text-[#ba1a1a] transition-colors">
                                <Heart className="w-4 h-4" />
                                <span className="text-xs font-mono">{selectedPost.likes}</span>
                              </button>
                              <button className="flex items-center gap-1 hover:text-amber-500 transition-colors">
                                <Star className="w-4 h-4" />
                                <span className="text-xs font-mono">{selectedPost.stars}</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Quick interactive hint below iPhone card */}
            <span className="text-[10px] font-mono text-neutral-400 mt-4 tracking-wider uppercase select-none">
              💡 鼠标滑动或触摸可进行3D倾斜透视
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
