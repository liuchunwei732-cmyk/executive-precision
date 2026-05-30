/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId } from './types';
import Navigation from './components/Navigation';
import AboutMe from './components/AboutMe';
import Education from './components/Education';
import Skills from './components/Skills';
import LearningExploring from './components/LearningExploring';
import WorkExperience from './components/WorkExperience';
import ContactModal from './components/ContactModal';
import BlobCursor from './components/BlobCursor';

export default function App() {
  // Set default initial screen as required by navigation flow (Screen 3217263728232111699)
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('3217263728232111699');
  
  // Direct Contact Popup State
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  // Match results modal state tracker
  const [isMatchModalOpen, setIsMatchModalOpen] = useState<boolean>(false);

  // Smooth immediate none transition screen switching
  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    // Auto scroll back to peak for flawless page content start
    window.scrollTo({ top: 0 });
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case '3217263728232111699':
        return (
          <AboutMe 
            onNavigate={handleNavigate} 
            onOpenContact={() => setIsContactOpen(true)} 
            onMatchModalToggle={setIsMatchModalOpen}
          />
        );
      case '教育背景 - 品牌一致性重构版':
        return <Education />;
      case '技能特长 - GSAP 动效版 (集成联系弹窗)':
        return <Skills onOpenContact={() => setIsContactOpen(true)} />;
      case 'Screen 1143277206637620517s':
      case 'Screen 11432772066376205170':
        return <LearningExploring />;
      case 'Screen 1971893703191489018':
        return <WorkExperience />;
      default:
        return (
          <AboutMe 
            onNavigate={handleNavigate} 
            onOpenContact={() => setIsContactOpen(true)} 
            onMatchModalToggle={setIsMatchModalOpen}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface text-brand-charcoal selection:bg-brand-mint selection:text-black flex flex-col antialiased">
      {/* Dynamic interactive trailing liquid cursor */}
      <BlobCursor 
        currentScreen={currentScreen} 
        isModalActive={isContactOpen || isMatchModalOpen} 
      />

      {/* Universal Brand Navigation Header */}
      <Navigation 
        currentScreen={currentScreen} 
        onNavigate={handleNavigate} 
        onOpenContact={() => setIsContactOpen(true)} 
      />

      {/* Main Screen Layout Workspace with simple enter opacity transition */}
      <main className="flex-grow">
        <div key={currentScreen} className="transition-opacity duration-200">
          {renderActiveScreen()}
        </div>
      </main>

      {/* Direct Contact Glass modal popup */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

      {/* Minimalistic Editorial Footer */}
      <footer className="border-t border-brand-border/40 bg-neutral-50 py-8 text-center text-xs text-neutral-400 font-mono">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Chunweiliu (刘淳伟). All Portfolio rights reserved.
          </div>
          <div className="flex gap-4">
            <span>Powered by Executive Precision system</span>
            <span>•</span>
            <a href="mailto:liuchunwei732@gmail.com" className="hover:underline hover:text-black">
              liuchunwei732@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
