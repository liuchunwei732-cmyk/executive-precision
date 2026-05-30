/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ScreenId } from '../types';

interface NavigationProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenContact: () => void;
}

export default function Navigation({ currentScreen, onNavigate, onOpenContact }: NavigationProps) {
  const navItems = [
    { label: '关于我', screenId: '3217263728232111699' as ScreenId },
    { label: '教育背景', screenId: '教育背景 - 品牌一致性重构版' as ScreenId },
    { label: '工作经历', screenId: 'Screen 1971893703191489018' as ScreenId },
    { label: '技能特长', screenId: '技能特长 - GSAP 动效版 (集成联系弹窗)' as ScreenId },
    { label: '学习与探索', screenId: 'Screen 11432772066376205170' as ScreenId },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-neutral-200/50 shadow-sm h-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-6 sm:px-12">
        {/* Brand logo avatar */}
        <div 
          onClick={() => onNavigate('3217263728232111699')} 
          className="flex items-center gap-3 cursor-pointer"
          id="nav_brand_logo"
        >
          <img 
            alt="Chunweiliu Avatar" 
            className="w-10 h-10 rounded-full object-cover border border-neutral-200 shadow-sm"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAMEpPeZhXiAQBTDNbQGUwpO-_LfTa9Mui31ZSE_Hn1qxIRY1XqK3U-49jm6ROoezB42sdjLZqau-ZoUgikxCuMMbuMz6CiZzzqOYf4DC9EIW2xMNmCq0ba0xBWj0U86lfRQdKeiGiR6rELr7trCOn5VThxEXupDKNzBb8LWKxNuLUpDaXdRi37ZKldaDMgcEE8R8M9ceryR8yiODV1aBCdurYRD6WCaSIz_f8-PEe6BVctTUDtU4XN7NrnMpdYeN-vZFn_3BKga0"
          />
          <span className="font-display font-bold text-lg text-black tracking-tight select-none">
            Chunweiliu &nbsp;Portfolio
          </span>
        </div>

        {/* Desk links */}
        <nav className="hidden lg:flex items-center gap-8" id="nav_links">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screenId;
            return (
              <a
                key={item.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.screenId);
                }}
                className={`font-sans text-sm transition-all relative py-1 ${
                  isActive
                    ? 'text-black font-bold border-b-2 border-black'
                    : 'text-neutral-500 hover:text-black font-medium'
                }`}
                id={`nav_link_${item.label}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Trigger Contact */}
        <button
          onClick={onOpenContact}
          className="bg-black text-white px-6 py-2.5 rounded-full font-sans text-sm font-semibold cursor-pointer transition-all hover:opacity-85 active:scale-95 shadow-sm"
          id="nav_contact_trigger"
        >
          Contact Me
        </button>
      </div>

      {/* Mobile Nav links strip */}
      <div 
        className="lg:hidden flex overflow-x-auto border-t border-neutral-200/30 py-2 px-6 gap-2 bg-white/95" 
        id="nav_items_mobile"
      >
        {navItems.map((item) => {
          const isActive = currentScreen === item.screenId;
          return (
            <a
              key={item.label}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.screenId);
              }}
              className={`flex-none px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                isActive
                  ? 'bg-black text-white shadow-sm'
                  : 'text-neutral-600 bg-neutral-100'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </header>
  );
}
