/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DirectContact } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X, Send, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<DirectContact>({
    name: '',
    email: '',
    subject: '【求职邀约】产品经理/负责人岗位匹配沟通 (Job Opportunity)',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Copy email to clipboard utility helper
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('liuchunwei732@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Copy phone/WeChat to clipboard
  const handleCopyPhone = () => {
    navigator.clipboard.writeText('18146776589');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Simple validation rules
    if (!formData.name.trim()) return setError('请填写您的称呼 / Name');
    if (!formData.email.trim() || !formData.email.includes('@')) {
      return setError('请填写有效的电子邮箱 / Valid email');
    }
    if (!formData.message.trim()) return setError('请留下您的宝贵留言建议 / Message');

    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || '提交失败，请稍后重试。');
      }

      setSuccessMsg(data.message || '岗位邀约已成功登记！');
      setSuccess(true);
      // Clear form data
      setFormData({
        name: '',
        email: '',
        subject: '【求职邀约】产品经理/负责人岗位匹配沟通 (Job Opportunity)',
        message: '',
      });
    } catch (err: any) {
      setError(err?.message || '网络连接失败，请稍后重试。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="contact_modal_overlay">
          
          {/* Backdrop layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-white rounded-[2rem] border border-brand-border/80 shadow-2xl p-6 sm:p-8 overflow-hidden"
            id="contact_modal_container"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black transition-colors"
                id="contact_modal_close_btn"
            >
              <X className="w-5 h-5" />
            </button>

            {!success ? (
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[9px] text-[#4f625e] bg-[#d1e7e1] py-1 px-2.5 rounded-sm font-extrabold tracking-widest uppercase">
                    TALENT ACQUISITION
                  </span>
                  <h3 className="font-display font-black text-2xl text-brand-primary mt-2.5 leading-snug">
                    招聘联络与岗位邀约
                  </h3>
                  <p className="text-xs text-neutral-500 font-sans mt-1 leading-relaxed">
                    如果您正有 <strong>AI 产品经理 / 项目负责人 / 架构研发</strong> 等核心岗位招聘需求，欢迎直接极速建立渠道。以下信息都将直接前推通知我的私人工作终端。
                  </p>
                </div>

                {/* Multi-Channel Copy Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="contact_modal_quick_links">
                  {/* Email Channel */}
                  <div className="bg-neutral-50 border border-brand-border/80 p-3 rounded-xl flex items-center justify-between text-xs">
                    <div className="space-y-0.5 min-w-0">
                      <span className="font-mono text-[8px] text-neutral-400 uppercase tracking-widest block font-bold">
                        Direct Email
                      </span>
                      <span className="font-mono font-bold text-brand-primary block truncate">
                        liuchunwei732@gmail.com
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="flex items-center gap-1 px-2 py-1 border border-brand-border bg-white rounded-lg hover:border-black text-[10px] font-medium cursor-pointer transition-all shrink-0"
                    >
                      {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3 text-neutral-500" />}
                      <span>{copied ? '已复制' : '复制'}</span>
                    </button>
                  </div>

                  {/* Phone/WeChat Channel */}
                  <div className="bg-neutral-50 border border-brand-border/80 p-3 rounded-xl flex items-center justify-between text-xs">
                    <div className="space-y-0.5 min-w-0">
                      <span className="font-mono text-[8px] text-neutral-400 uppercase tracking-widest block font-bold">
                        Phone / WeChat
                      </span>
                      <span className="font-mono font-bold text-brand-primary block truncate">
                        181 4677 6589
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      className="flex items-center gap-1 px-2 py-1 border border-brand-border bg-white rounded-lg hover:border-black text-[10px] font-medium cursor-pointer transition-all shrink-0"
                    >
                      {copiedPhone ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3 text-neutral-500" />}
                      <span>{copiedPhone ? '已复制' : '复制'}</span>
                    </button>
                  </div>
                </div>

                {/* Main Submit Form */}
                <form onSubmit={handleSubmit} className="space-y-4" id="contact_form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div className="space-y-1">
                      <label htmlFor="form_name" className="block text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">
                        您的称呼与企业 / Name &amp; Co. *
                      </label>
                      <input
                        id="form_name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="例如: 某大厂 HR / 猎头顾问 / 业务组主管"
                        className="w-full px-4 py-3 text-xs bg-white border border-brand-border rounded-lg focus:outline-none focus:border-brand-lavender-dark/80 focus:ring-4 focus:ring-brand-lavender/50 transition-all font-sans"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1">
                      <label htmlFor="form_email" className="block text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">
                        您的电子邮箱 / Recruiter Email *
                      </label>
                      <input
                        id="form_email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="hr-team@domain.com"
                        className="w-full px-4 py-3 text-xs bg-white border border-brand-border rounded-lg focus:outline-none focus:border-brand-lavender-dark/80 focus:ring-4 focus:ring-brand-lavender/50 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-1">
                    <label htmlFor="form_subject" className="block text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">
                      邀约沟通主题 / Subject
                    </label>
                    <input
                      id="form_subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-xs bg-white border border-brand-border rounded-lg focus:outline-none focus:border-brand-lavender-dark/80 focus:ring-4 focus:ring-brand-lavender/50 transition-all font-sans"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1">
                    <label htmlFor="form_message" className="block text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">
                      留言详情或岗位 JD 描述 / Message *
                    </label>
                    <textarea
                      id="form_message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="请简要描述您的业务部门、岗位薪资范畴、核心工作方向或者直接粘贴招聘 JD，我会第一时间回复您并投递最新的 PDF 格式简历..."
                      className="w-full px-4 py-3 text-xs bg-white border border-brand-border rounded-lg focus:outline-none focus:border-brand-lavender-dark/80 focus:ring-4 focus:ring-brand-lavender/50 transition-all font-sans resize-none"
                    />
                  </div>

                  {/* Validation Error Banner */}
                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs font-sans">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Submit Trigger Action */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white font-mono text-xs font-bold tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        正在将您的邀约飞速投递...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-[#d1e7e1]" />
                        快速递交邀约 (SEND OFFER INVITE)
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Success Anim screen */
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 glow-mint mb-2">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                
                <h3 className="font-display font-black text-2xl text-brand-primary">
                  提交成功！
                </h3>
                
                <p className="text-xs text-neutral-500 font-sans max-w-sm leading-relaxed">
                  {successMsg || "岗位邀约已成功登记通知！我会尽快评估您的团队职责与岗位要求，并在第一时间给您回复。非常期待与您的进一步沟通！"}
                </p>

                <button
                  onClick={() => {
                    setSuccess(false);
                    onClose();
                  }}
                  className="w-40 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-black font-semibold text-xs rounded-xl cursor-pointer transition-colors"
                >
                  返回主页
                </button>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
