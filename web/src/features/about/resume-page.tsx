/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import {
  ArrowDown,
  Award,
  Bot,
  Briefcase,
  Calendar,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Mountain,
  Ruler,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Wrench,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { ThemeSwitch } from '@/components/theme-switch'
import { cn } from '@/lib/utils'

const ABOUT_URL = 'https://pony-token.kai.com/about'
const DOCS_URL = 'https://pony-token.kai.com/docs'
const EMAIL = 'Pony4215@foxmail.com'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

type IconType = typeof GraduationCap

interface ExperienceItem {
  period: string
  role: string
  org: string
  group?: string
  accent: string
  icon?: IconType
  logo?: 'hellobike'
  bullets: string[]
}

const experiences: ExperienceItem[] = [
  {
    period: '2026.05 — 2026.06',
    role: '商家运营实习生',
    org: '哈啰出行',
    group: '哈啰集团',
    accent: '#00BFA6',
    logo: 'hellobike',
    bullets: [
      '负责小哈换电合作商户日常维护，整理网点经营与订单台账',
      '运用 SQL 初步查询业务数据，分析网点运营指标',
      '跟进盘活低效、僵尸商户，推动站点运营提效',
      '收集商户与用户反馈，协助优化服务流程',
    ],
  },
  {
    period: '2025.06 — 2025.07',
    role: '实习测量师',
    org: '上海第一测量师事务所',
    accent: '#B5824A',
    icon: Ruler,
    bullets: [
      '参与华为东莞极目科技园 #16 厂房地下室给排水线路工程算量',
      '负责东航虹桥数据中心项目光电设备的市场询价对比整理',
      '系统掌握工程造价与询价实践经验',
    ],
  },
  {
    period: '2024.07 — 2024.08',
    role: '带队教官',
    org: '上海夏山教育科技',
    accent: '#3F8F5B',
    icon: Mountain,
    bullets: [
      '主导夏令营活动策划与全流程落地，搭建活动执行流程体系',
      '统筹人员调配、进度管控与现场风险应对',
      '收集用户体验反馈，迭代优化活动机制，提升服务满意度',
    ],
  },
  {
    period: '2024 — 2025',
    role: 'C2C 电商独立运营',
    org: '独立项目',
    accent: '#6E5BAE',
    icon: ShoppingBag,
    bullets: [
      '独立负责店铺全链路运营：选品、上架、日常运营、客服与订单管控',
      '通过 GitHub 开源系统接入通义千问（Qwen）大模型 API，搭建 AI 智能客服体系',
      '实现自动化应答与高效接待，项目运营稳定，月 GMV 50k+',
    ],
  },
]

interface EducationItem {
  period: string
  school: string
  degree: string
  tag?: string
  desc?: string
  project?: string
}

const education: EducationItem[] = [
  {
    period: '2026.09 — 2029.07',
    school: '中国矿业大学（北京）',
    degree: '管理科学与工程 · 硕士',
    tag: '211 / 双一流',
    desc: '聚焦管理科学与工程方向，延续数据驱动的产品与运营研究。',
  },
  {
    period: '2022.09 — 2026.07',
    school: '上海师范大学',
    degree: '工程管理 · 本科',
    desc: '核心课程：运筹学、会计学、财务管理、工程经济学、管理学、经济学、建筑结构、结构力学。',
    project:
      '主导「浦东新区 PDP0-0405 单元地块住宅项目可行性研究」，系统分析政策、市场与财务指标，测算项目财务内部收益率 16.8%，获导师高度评价。',
  },
]

const stats: { value: string; label: string; icon: IconType }[] = [
  { value: '50k+', label: '月 GMV · C2C 电商', icon: TrendingUp },
  { value: '211', label: '硕士院校 · 双一流', icon: GraduationCap },
  { value: '4', label: '段实习 / 项目经历', icon: Briefcase },
  { value: 'AI', label: '智能客服体系搭建', icon: Bot },
]

const skillGroups: { title: string; icon: IconType; items: string[] }[] = [
  {
    title: '专业技能',
    icon: Wrench,
    items: ['WPS 办公', 'Photoshop 设计', 'CET-4 英语'],
  },
  {
    title: 'AI 工具',
    icon: Bot,
    items: ['ChatGPT', 'Gemini', 'Nano Banana', '通义千问 Qwen API'],
  },
  {
    title: '能力方向',
    icon: Target,
    items: ['产品运营', '产品经理', '数据分析', 'AI 辅助提效'],
  },
]

const awards: { title: string; desc: string }[] = [
  { title: '专业奖学金', desc: '在校期间学业表现优异，多次获评专业奖学金。' },
  { title: '商业计划大赛 · 一等奖', desc: '校级专创融合商业计划大赛一等奖。' },
  { title: '大创项目 · 优秀立项', desc: '大学生创新创业训练计划，获评校级优秀立项。' },
]

const leadership: { period: string; role: string; org: string }[] = [
  {
    period: '2023.06 — 2024.06',
    role: '综合管理部 · 负责人',
    org: '建筑工程学院团委学生会',
  },
  {
    period: '2022.10 — 2023.06',
    role: '综合管理部 · 工作人员',
    org: '建筑工程学院团委学生会',
  },
  { period: '2022.10 — 2026.07', role: '生活委员', org: '22 级工程管理一班' },
]

function HellobikeMark(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={props.className}
      role="img"
      aria-label="哈啰"
    >
      <rect width="48" height="48" rx="13" fill="#00BFA6" />
      <circle cx="24" cy="22.5" r="13" fill="none" stroke="#fff" strokeWidth="3.1" />
      <path
        d="M17 22 Q24 31 31 22"
        fill="none"
        stroke="#fff"
        strokeWidth="3.1"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Reveal(props: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const delay = props.delay ?? 0
  const y = props.y ?? 28
  return (
    <motion.div
      className={props.className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.65, ease: EASE, delay }}
    >
      {props.children}
    </motion.div>
  )
}

function Section(props: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={props.id}
      className={cn('mx-auto max-w-6xl px-6 py-20 md:py-28', props.className)}
    >
      {props.children}
    </section>
  )
}

function SectionHeading(props: {
  icon: IconType
  kicker: string
  title: string
  desc?: string
}) {
  const Icon = props.icon
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="flex flex-col gap-3">
        <span className="text-primary inline-flex items-center gap-2">
          <Icon className="size-4" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">
            {props.kicker}
          </span>
        </span>
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          {props.title}
        </h2>
        {props.desc && (
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
            {props.desc}
          </p>
        )}
      </div>
    </Reveal>
  )
}

function ExperienceCard(props: { exp: ExperienceItem; index: number }) {
  const Icon = props.exp.icon
  return (
    <Reveal delay={props.index * 0.08} y={36}>
      <article className="group bg-card border-border/60 hover:border-primary/40 relative flex flex-col gap-5 rounded-3xl border p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:flex-row md:gap-8 md:p-8">
        <div className="flex items-center gap-4 md:w-60 md:flex-col md:items-start md:gap-3">
          {props.exp.logo === 'hellobike' ? (
            <HellobikeMark className="size-14 shrink-0" />
          ) : (
            <div
              className="flex size-14 shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: props.exp.accent }}
            >
              {Icon && <Icon className="size-7 text-white" />}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <Calendar className="size-3.5" />
              {props.exp.period}
            </p>
            <p className="mt-1 truncate font-semibold tracking-tight">
              {props.exp.org}
            </p>
            {props.exp.group && (
              <span className="bg-accent text-accent-foreground mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium">
                {props.exp.group}
              </span>
            )}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{props.exp.role}</h3>
          <ul className="mt-3 space-y-2.5">
            {props.exp.bullets.map((b) => (
              <li
                key={b}
                className="text-muted-foreground flex gap-2.5 text-sm leading-relaxed"
              >
                <span className="bg-primary/40 mt-[7px] size-1.5 shrink-0 rounded-full" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  )
}

export function ResumePage() {
  const { t } = useTranslation()
  const heroRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const orbY = useTransform(heroProgress, [0, 1], [0, 160])
  const orbY2 = useTransform(heroProgress, [0, 1], [0, -130])
  const heroTextY = useTransform(heroProgress, [0, 1], [0, 90])
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      data-theme-preset="anthropic"
      className="font-serif bg-background text-foreground relative min-h-svh overflow-x-clip"
    >
      <motion.div
        style={{ scaleX }}
        className="bg-primary fixed inset-x-0 top-0 z-50 h-[3px] origin-left"
      />

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-500',
          scrolled
            ? 'bg-background/80 border-border/50 border-b backdrop-blur-xl'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href={ABOUT_URL} className="flex items-center gap-2">
            <span className="bg-primary size-2 rounded-full" />
            <span className="text-base font-semibold tracking-tight">Pony</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            <a
              href={ABOUT_URL}
              className="bg-accent text-accent-foreground rounded-full px-4 py-1.5 text-sm font-medium"
            >
              {t('About')}
            </a>
            <a
              href={DOCS_URL}
              className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
            >
              {t('Docs')}
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="text-muted-foreground hover:text-foreground hidden text-sm transition-colors sm:inline"
            >
              {EMAIL}
            </a>
            <ThemeSwitch />
          </div>
        </div>
      </header>

      <section
        ref={heroRef}
        className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 pt-20"
      >
        <motion.div
          style={{ y: orbY }}
          className="bg-primary/20 pointer-events-none absolute -left-24 top-24 size-[26rem] rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="bg-accent pointer-events-none absolute -right-24 bottom-10 size-[22rem] rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="bg-accent text-accent-foreground mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
          >
            <Sparkles className="size-3.5" />
            个人简历 · RESUME
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            className="text-6xl font-medium tracking-tight md:text-8xl"
          >
            Pony
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
            className="text-primary mt-4 text-lg font-medium tracking-wide md:text-xl"
          >
            产品运营 · 产品经理 · 数据分析
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
            className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed"
          >
            善于用数据拆解业务、用 AI 提效增长的产品人。有电商独立操盘、商户运营与工程造价实战经验。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.38 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={DOCS_URL}
              className="bg-primary text-primary-foreground hover:opacity-90 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity"
            >
              {t('Docs')}
              <ExternalLink className="size-4" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="bg-card border-border hover:border-primary/40 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
            >
              <Mail className="size-4" />
              联系我
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-muted-foreground mt-8 flex items-center gap-4 text-sm"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              上海
            </span>
            <span className="bg-border h-3 w-px" />
            <span>2003 · 共青团员</span>
          </motion.div>
        </motion.div>
        <motion.div
          style={{ opacity: heroOpacity }}
          className="text-muted-foreground absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="size-5" />
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-border/60 border-border/40 border-y">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px md:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.label} delay={i * 0.06} y={20}>
                <div className="bg-background flex flex-col items-center gap-2 px-4 py-10 text-center md:py-12">
                  <Icon className="text-primary size-5" />
                  <span className="text-3xl font-semibold tracking-tight">
                    {s.value}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {s.label}
                  </span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <Section>
        <SectionHeading
          icon={Sparkles}
          kicker="ABOUT"
          title="关于我"
          desc="用数据洞察业务、用 AI 放大效率——这是我做产品的底色。"
        />
        <div className="grid gap-6 md:grid-cols-3">
          <Reveal className="md:col-span-2" y={28}>
            <div className="bg-card border-border/60 h-full rounded-3xl border p-8 leading-relaxed">
              <p className="text-foreground/90 text-lg">
                我是 Pony，一名关注「数据 × 运营 × AI」的产品人。
              </p>
              <p className="text-muted-foreground mt-4 text-sm">
                本科就读于上海师范大学工程管理专业，即将进入中国矿业大学（北京）攻读管理科学与工程硕士。在校期间主导地产可行性研究项目，测算财务内部收益率 16.8%；曾独立操盘 C2C 电商店铺，通过接入通义千问大模型 API 搭建 AI 智能客服，实现月 GMV 50k+。
              </p>
              <p className="text-muted-foreground mt-4 text-sm">
                多段实习横跨商户运营、工程造价与教育带队，让我习惯从一线反馈倒推流程优化。熟练运用 ChatGPT、Gemini 等主流大模型做内容与效率提效，期待在产品运营与数据分析方向持续深耕。
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} y={28}>
            <div className="bg-primary text-primary-foreground flex h-full flex-col justify-between rounded-3xl p-8">
              <Star className="size-6" />
              <div className="mt-6">
                <p className="text-2xl font-semibold leading-tight">
                  数据驱动 · AI 提效
                </p>
                <p className="text-primary-foreground/80 mt-2 text-sm">
                  从一线运营到 AI 客服，把每一次反馈变成可复用的增长机制。
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="education" className="bg-muted/30">
        <SectionHeading icon={GraduationCap} kicker="EDUCATION" title="教育经历" />
        <div className="relative">
          <div className="bg-border/60 absolute left-[6px] top-3 bottom-3 w-px" />
          <div className="space-y-6">
            {education.map((e, i) => (
              <Reveal key={e.school} delay={i * 0.08} y={28}>
                <div className="relative pl-8">
                  <span className="bg-primary ring-background absolute left-0 top-4 size-3 rounded-full ring-4" />
                  <div className="bg-card border-border/60 rounded-2xl border p-6">
                    <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        {e.period}
                      </span>
                      {e.tag && (
                        <span className="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-[11px] font-medium">
                          {e.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold">{e.school}</h3>
                    <p className="text-primary text-sm font-medium">{e.degree}</p>
                    {e.desc && (
                      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                        {e.desc}
                      </p>
                    )}
                    {e.project && (
                      <div className="bg-background border-border mt-4 rounded-xl border border-dashed p-4 text-sm">
                        <p className="text-muted-foreground leading-relaxed">
                          <span className="text-foreground font-medium">
                            项目：
                          </span>
                          {e.project}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          icon={Briefcase}
          kicker="EXPERIENCE"
          title="工作与项目经历"
          desc="从商户运营到 AI 客服，把方法沉淀为可复用的流程。"
        />
        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.org} exp={exp} index={i} />
          ))}
        </div>
      </Section>

      <Section id="skills" className="bg-muted/30">
        <SectionHeading icon={Wrench} kicker="SKILLS" title="技能与工具" />
        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = g.icon
            return (
              <Reveal key={g.title} delay={i * 0.08} y={28}>
                <div className="bg-card border-border/60 h-full rounded-3xl border p-7">
                  <div className="text-primary inline-flex items-center gap-2">
                    <Icon className="size-5" />
                    <span className="text-sm font-semibold">{g.title}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className="bg-accent text-accent-foreground rounded-full px-3 py-1.5 text-sm"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Section>

      <Section>
        <SectionHeading icon={Award} kicker="AWARDS" title="荣誉与奖项" />
        <div className="grid gap-5 md:grid-cols-3">
          {awards.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08} y={28}>
              <div className="bg-card border-border/60 h-full rounded-3xl border p-7">
                <Star className="text-primary size-5" />
                <h3 className="mt-4 text-base font-semibold">{a.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {a.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="leadership" className="bg-muted/30">
        <SectionHeading
          icon={Users}
          kicker="LEADERSHIP"
          title="学生工作"
          desc="在学生会综合管理部从工作人员做到负责人，统筹活动与预算。"
        />
        <div className="relative">
          <div className="bg-border/60 absolute left-[6px] top-3 bottom-3 w-px" />
          <div className="space-y-6">
            {leadership.map((l, i) => (
              <Reveal key={l.role + l.period} delay={i * 0.06} y={24}>
                <div className="relative pl-8">
                  <span className="bg-primary ring-background absolute left-0 top-3 size-3 rounded-full ring-4" />
                  <div className="bg-card border-border/60 flex flex-col gap-1 rounded-2xl border p-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold">{l.role}</p>
                      <p className="text-muted-foreground text-sm">{l.org}</p>
                    </div>
                    <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                      <Calendar className="size-3.5" />
                      {l.period}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pb-12 pt-20 md:pt-28">
        <Reveal y={28}>
          <div className="bg-card border-border/60 overflow-hidden rounded-[2rem] border">
            <div className="bg-primary text-primary-foreground relative px-8 py-16 text-center md:py-20">
              <div className="bg-primary-foreground/10 absolute -right-10 -top-10 size-40 rounded-full blur-2xl" />
              <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                一起聊聊？
              </h2>
              <p className="text-primary-foreground/80 mt-3">
                产品运营 · 数据分析 · AI 提效
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="bg-background text-foreground hover:opacity-90 mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-opacity"
              >
                <Mail className="size-4" />
                {EMAIL}
              </a>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 px-8 py-6 md:flex-row">
              <div className="text-muted-foreground flex items-center gap-3 text-sm">
                <a
                  href={ABOUT_URL}
                  className="hover:text-foreground transition-colors"
                >
                  {t('About')}
                </a>
                <span className="bg-border h-3 w-px" />
                <a
                  href={DOCS_URL}
                  className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
                >
                  {t('Docs')}
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
              <p className="text-muted-foreground/60 text-xs">
                <a
                  href="https://github.com/QuantumNous/new-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  New API
                </a>{' '}
                © {new Date().getFullYear()} QuantumNous · AGPL v3.0
              </p>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  )
}