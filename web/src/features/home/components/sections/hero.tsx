/*
Copyright (C) 2023-2026 QuantumNous
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/
import { motion, MotionConfig } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  Baichuan, Claude, Cohere, DeepSeek, Doubao, Gemini, Grok,
  Hunyuan, Kimi, Minimax, Mistral, OpenAI, Perplexity, Qwen, Wenxin, Zhipu,
} from '@lobehub/icons'
import { useStatus } from '@/hooks/use-status'
import { resolveDocsLink } from '@/lib/docs-link'
import './hero.css'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const LOGOS = [OpenAI, Claude, Gemini, DeepSeek, Qwen, Doubao, Kimi, Zhipu, Hunyuan, Wenxin, Minimax, Mistral, Grok, Cohere, Perplexity, Baichuan]

const sectionAnim = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: EASE },
}
const cardAnim = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease: EASE },
})

const STATS = [
  { num: '74', suffix: '+', label: '大模型' },
  { num: '9', suffix: '', label: '供应商' },
  { num: '7×24', suffix: '', label: '稳定运行' },
  { num: '99.9', suffix: '%', label: '可用率' },
]
const FEATURES = [
  { icon: '🔗', title: '统一 API 网关', desc: '一个接口调用所有大模型，完全兼容 OpenAI 格式，无缝接入现有应用' },
  { icon: '💰', title: '按量计费', desc: '用多少付多少，价格透明，支持支付宝/微信扫码充值，余额即用' },
  { icon: '🌐', title: '多供应商聚合', desc: 'OpenAI、Claude、Gemini、DeepSeek、Qwen 等国内外模型一站接入' },
  { icon: '🛡️', title: '安全可靠', desc: '自托管部署，数据自主可控，支持分组权限管理与多密钥轮询' },
]
const PRICING = [
  { model: 'Claude Opus 5', inp: '¥35', out: '¥175' },
  { model: 'GPT-5.2', inp: '¥12', out: '¥98' },
  { model: 'Gemini 2.5 Pro', inp: '¥9', out: '¥70' },
  { model: 'DeepSeek V4 Pro', inp: '¥21', out: '¥42' },
]

interface HeroProps { className?: string; isAuthenticated?: boolean }

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { status } = useStatus()
  const docsLink = resolveDocsLink(status?.docs_link as string | undefined)

  return (
    <MotionConfig reducedMotion='user'>
      {/* ── 3D Logo Ring Hero ── */}
      <section className='nh-hero'>
        <motion.div className='nh-orbit' initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.8, ease: EASE }} aria-hidden>
          <div className='nh-orbit-glow' />
          <div className='nh-ring'>
            {LOGOS.map((Logo, i) => (
              <div key={i} className='nh-logo' style={{ transform: `rotateY(${(360 / LOGOS.length) * i}deg) translateZ(var(--nh-radius))` }}>
                <Logo.Avatar size={56} />
              </div>
            ))}
          </div>
        </motion.div>
        <div className='nh-fade' aria-hidden />
        <div className='nh-footer-content'>
          <motion.div className='nh-left' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: EASE }}>
            <motion.div className='nh-subtitle' initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: EASE }}>
              <span className='nh-dot' /><span>{t('Unified AI Gateway')}</span>
            </motion.div>
            <motion.h2 className='nh-heading' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8, ease: EASE }}>
              {t('One API.')}<br />{t('Every Model.')}
            </motion.h2>
            <motion.div className='nh-buttons' initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0, ease: EASE }}>
              {props.isAuthenticated ? (
                <Link className='nh-btn nh-btn-primary' to='/dashboard'>{t('Go to Dashboard')}<ArrowRight size={14} strokeWidth={2.5} /></Link>
              ) : (
                <Link className='nh-btn nh-btn-primary' to='/sign-up'>{t('Get Started')}<ArrowRight size={14} strokeWidth={2.5} /></Link>
              )}
              <Link className='nh-btn nh-btn-outline' to='/pricing'>{t('View Pricing')}</Link>
              <a
                className='nh-btn nh-btn-outline'
                href={docsLink.href}
                target={docsLink.external ? '_blank' : undefined}
                rel={docsLink.external ? 'noopener noreferrer' : undefined}
              >
                {t('Docs')}
              </a>
            </motion.div>
          </motion.div>
          <motion.div className='nh-right' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7, ease: EASE }}>
            {['OpenAI', 'Claude', 'Gemini'].map((tag) => (<span key={tag} className='nh-tag'>{tag}</span>))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <motion.section className='nh-stats' {...sectionAnim}>
        <div className='nh-stats-grid'>
          {STATS.map((s, i) => (
            <motion.div key={i} className='nh-stat-card' {...cardAnim(i * 0.1)}>
              <div className='nh-stat-num'>{s.num}<span className='nh-stat-suffix'>{s.suffix}</span></div>
              <div className='nh-stat-label'>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Features ── */}
      <motion.section className='nh-features' {...sectionAnim}>
        <h2 className='nh-section-title'>为什么选择 <span className='nh-gradient-text'>Pony Computility</span></h2>
        <div className='nh-features-grid'>
          {FEATURES.map((f, i) => (
            <motion.div key={i} className='nh-feature-card' {...cardAnim(i * 0.12)}>
              <div className='nh-feature-icon'>{f.icon}</div>
              <h3 className='nh-feature-title'>{f.title}</h3>
              <p className='nh-feature-desc'>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Pricing Preview ── */}
      <motion.section className='nh-pricing-preview' {...sectionAnim}>
        <h2 className='nh-section-title'>热门模型 <span className='nh-gradient-text'>定价</span></h2>
        <div className='nh-pricing-grid'>
          {PRICING.map((p, i) => (
            <motion.div key={i} className='nh-pricing-card' {...cardAnim(i * 0.1)}>
              <div className='nh-pricing-model'>{p.model}</div>
              <div className='nh-pricing-prices'>
                <div><span className='nh-pricing-label'>输入</span> <span className='nh-pricing-val'>{p.inp}</span><span className='nh-pricing-unit'>/1M</span></div>
                <div><span className='nh-pricing-label'>输出</span> <span className='nh-pricing-val'>{p.out}</span><span className='nh-pricing-unit'>/1M</span></div>
              </div>
            </motion.div>
          ))}
        </div>
        <Link className='nh-pricing-link' to='/pricing'>查看全部 74+ 模型定价 <ArrowRight size={16} /></Link>
      </motion.section>

      {/* ── CTA ── */}
      <motion.section className='nh-cta' {...sectionAnim}>
        <div className='nh-cta-glow' />
        <h2 className='nh-cta-title'>立即开始</h2>
        <p className='nh-cta-sub'>注册即用，按量计费，低门槛接入 70+ 大模型</p>
        <div className='nh-cta-buttons'>
          {props.isAuthenticated ? (
            <Link className='nh-btn nh-btn-primary nh-btn-lg' to='/dashboard'>进入控制台 <ArrowRight size={16} /></Link>
          ) : (
            <Link className='nh-btn nh-btn-primary nh-btn-lg' to='/sign-up'>免费注册 <ArrowRight size={16} /></Link>
          )}
          <Link className='nh-btn nh-btn-outline nh-btn-lg' to='/pricing'>查看定价</Link>
        </div>
      </motion.section>
    </MotionConfig>
  )
}
