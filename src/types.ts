/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenId =
  | '3217263728232111699'                      // 关于我
  | '教育背景 - 品牌一致性重构版'               // 教育背景
  | '技能特长 - GSAP 动效版 (集成联系弹窗)'    // 技能特长
  | 'Screen 11432772066376205170'              // 学习与探索
  | 'Screen 1971893703191489018';              // 工作经历

export interface EducationItem {
  school: string;
  degree: string;
  major: string;
  duration: string;
  gpa?: string;
  honors: string[];
  thesis?: string;
  courses: string[];
}

export interface WorkExperienceItem {
  id: string;
  company: string;
  logoColor: string;
  role: string;
  duration: string;
  domain: 'Tech' | 'Finance' | 'Retail' | 'Enterprise';
  budget: string;
  teamSize: string;
  summary: string;
  keyResults: string[]; // OKR metrics
  achievements: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; info: string }[];
}

export interface DirectContact {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ExploreTopic {
  title: string;
  type: string;
  status: 'In Progress' | 'Mastered' | 'Curious';
  description: string;
  tags: string[];
  category: 'Tech' | 'Books' | 'Side Projects' | 'Insights';
}
