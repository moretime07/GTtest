import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  CirclePause,
  CirclePlay,
  Crosshair,
  Gem,
  Orbit,
  Radar,
  Shield,
  Sparkles,
  Swords,
  Zap,
} from 'lucide-react'

type Character = {
  id: string
  name: string
  realm: string
  title: string
  className: string
  image: string
  rarity: string
  quote: string
  accent: string
  rgb: string
  tags: string[]
  stats: Record<string, number>
  dossier: string
}

const characters: Character[] = [
  {
    id: 'juliet',
    name: '朱丽叶',
    realm: '英国',
    title: '蔷薇誓约',
    className: '月誓司令',
    image: '/characters/juliet.jpg',
    rarity: 'SSR',
    quote: '以爱为刃，令王座停战。',
    accent: '#e85f8f',
    rgb: '232, 95, 143',
    tags: ['誓约', '策反', '后排'],
    stats: { 统御: 86, 谋略: 91, 武勇: 72, 机动: 84 },
    dossier: '擅长在混战中锁定关键目标，利用誓约印记削弱敌方统御链路。',
  },
  {
    id: 'chen-yuanyuan',
    name: '陈圆圆',
    realm: '中国',
    title: '镜花谋士',
    className: '幻阵术师',
    image: '/characters/chen-yuanyuan.jpg',
    rarity: 'UR',
    quote: '繁华只是一瞬，阵眼才是永恒。',
    accent: '#f3bd5c',
    rgb: '243, 189, 92',
    tags: ['幻术', '控场', '增益'],
    stats: { 统御: 83, 谋略: 96, 武勇: 68, 机动: 78 },
    dossier: '以镜像阵列切割战场，适合搭配高爆发角色完成战线重排。',
  },
  {
    id: 'yagyu-yukihime',
    name: '柳生雪姬',
    realm: '日本',
    title: '霜刃御前',
    className: '高速剑豪',
    image: '/characters/yagyu-yukihime.jpg',
    rarity: 'SSR',
    quote: '雪落之前，斩击已经抵达。',
    accent: '#8ce9ff',
    rgb: '140, 233, 255',
    tags: ['突进', '破甲', '单点'],
    stats: { 统御: 74, 谋略: 79, 武勇: 97, 机动: 94 },
    dossier: '高机动切入核心，依靠霜刃标记连续压低敌方护甲。',
  },
  {
    id: 'peacock-princess',
    name: '孔雀公主',
    realm: '印度',
    title: '绮羽圣裔',
    className: '辉光祭司',
    image: '/characters/peacock-princess.jpg',
    rarity: 'SSR',
    quote: '万羽展开时，败局也会回光。',
    accent: '#2fe6a6',
    rgb: '47, 230, 166',
    tags: ['治疗', '护盾', '续航'],
    stats: { 统御: 80, 谋略: 88, 武勇: 64, 机动: 82 },
    dossier: '为前排提供持续护盾和净化，适合长线消耗与守点战术。',
  },
  {
    id: 'eloise',
    name: '艾洛伊斯',
    realm: '日耳曼',
    title: '铁蔷圣裁',
    className: '重装审判官',
    image: '/characters/eloise.jpg',
    rarity: 'SR',
    quote: '秩序不需要宽恕，只需要落槌。',
    accent: '#f06d46',
    rgb: '240, 109, 70',
    tags: ['重装', '反击', '压制'],
    stats: { 统御: 92, 谋略: 74, 武勇: 89, 机动: 61 },
    dossier: '承受火力后触发圣裁反击，是稳住前线的高压锚点。',
  },
  {
    id: 'hosokawa-garasha',
    name: '细川玉子',
    realm: '日本',
    title: '烬火祷师',
    className: '秘火吟诵者',
    image: '/characters/hosokawa-garasha.jpg',
    rarity: 'SR',
    quote: '火不是毁灭，是另一种祈祷。',
    accent: '#ff9d3d',
    rgb: '255, 157, 61',
    tags: ['灼烧', '范围', '祈愿'],
    stats: { 统御: 76, 谋略: 90, 武勇: 73, 机动: 70 },
    dossier: '通过祈愿叠加灼烧层数，对密集阵型拥有稳定范围压迫。',
  },
  {
    id: 'hua-mulan',
    name: '花木兰',
    realm: '中国',
    title: '北境骁骑',
    className: '先锋统帅',
    image: '/characters/hua-mulan.jpg',
    rarity: 'UR',
    quote: '长风过境，铁骑先行。',
    accent: '#ff515f',
    rgb: '255, 81, 95',
    tags: ['冲锋', '统帅', '爆发'],
    stats: { 统御: 97, 谋略: 82, 武勇: 96, 机动: 88 },
    dossier: '开局冲锋可打穿前排站位，同时提升友军首轮爆发窗口。',
  },
  {
    id: 'ono-no-komachi',
    name: '小野小町',
    realm: '日本',
    title: '墨月歌姬',
    className: '咒歌使',
    image: '/characters/ono-no-komachi.jpg',
    rarity: 'SSR',
    quote: '一首短歌，足以让月色改道。',
    accent: '#bd8cff',
    rgb: '189, 140, 255',
    tags: ['魅惑', '咒歌', '扰乱'],
    stats: { 统御: 75, 谋略: 94, 武勇: 60, 机动: 86 },
    dossier: '通过咒歌干扰敌方行动条，擅长打断关键技能释放节奏。',
  },
  {
    id: 'roxana',
    name: '罗克珊娜',
    realm: '希腊',
    title: '星砂王妃',
    className: '星辉射手',
    image: '/characters/roxana.jpg',
    rarity: 'SR',
    quote: '星轨已定，箭矢只是结果。',
    accent: '#59b8ff',
    rgb: '89, 184, 255',
    tags: ['远程', '标记', '追击'],
    stats: { 统御: 78, 谋略: 84, 武勇: 88, 机动: 91 },
    dossier: '标记目标后触发连续追击，适合快速清理侧翼威胁。',
  },
  {
    id: 'murasaki-shikibu',
    name: '紫式部',
    realm: '日本',
    title: '幻卷秘史',
    className: '编年术士',
    image: '/characters/murasaki-shikibu.jpg',
    rarity: 'UR',
    quote: '被写下的命运，也可以被改写。',
    accent: '#a98bff',
    rgb: '169, 139, 255',
    tags: ['回溯', '秘术', '核心'],
    stats: { 统御: 84, 谋略: 98, 武勇: 66, 机动: 80 },
    dossier: '通过秘史回溯重置关键冷却，为队伍创造第二轮爆发机会。',
  },
]

const statIcons = [Shield, Radar, Swords, Zap]

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isCruising, setIsCruising] = useState(true)

  const active = characters[activeIndex]
  const cssVars = {
    '--accent': active.accent,
    '--accent-rgb': active.rgb,
  } as CSSProperties

  const formationScore = useMemo(() => {
    const allStats = characters.flatMap((character) => Object.values(character.stats))
    return Math.round(allStats.reduce((sum, value) => sum + value, 0) / allStats.length)
  }, [])

  useEffect(() => {
    if (!isCruising) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % characters.length)
    }, 4600)

    return () => window.clearInterval(timer)
  }, [isCruising])

  const shiftCharacter = (direction: number) => {
    setActiveIndex((current) => (current + direction + characters.length) % characters.length)
  }

  return (
    <main className="archive" style={cssVars}>
      <div className="site-frame">
        <header className="topbar">
          <div className="brand-lockup" aria-label="Imperial Archive">
            <span className="brand-mark">IA</span>
            <div>
              <span className="brand-kicker">Imperial Archive</span>
              <strong>帝王角色多视图</strong>
            </div>
          </div>

          <div className="system-readout" aria-label="阵容状态">
            <span>Roster 10</span>
            <span>Core {formationScore}</span>
            <span>Viewport 1700</span>
          </div>
        </header>

        <section className="hero-grid" aria-label="角色焦点展示">
          <article className="focus-stage">
            <div className="stage-image-wrap">
              <img src={active.image} alt={`${active.realm}${active.name}角色卡`} className="stage-image" />
              <div className="stage-vignette" />
              <div className="scanline" />
            </div>

            <div className="stage-copy">
              <div className="eyebrow">
                <Crosshair size={18} />
                <span>{active.realm} / {active.rarity}</span>
              </div>
              <h1>{active.name}</h1>
              <p className="hero-title">{active.title}</p>
              <p className="hero-quote">{active.quote}</p>

              <div className="tag-row">
                {active.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="stage-controls" aria-label="角色切换">
              <button type="button" className="icon-button" onClick={() => shiftCharacter(-1)} title="上一个角色">
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                className="cruise-button"
                onClick={() => setIsCruising((value) => !value)}
                title={isCruising ? '暂停巡航' : '开启巡航'}
              >
                {isCruising ? <CirclePause size={20} /> : <CirclePlay size={20} />}
                <span>{isCruising ? '巡航中' : '手动'}</span>
              </button>
              <button type="button" className="icon-button" onClick={() => shiftCharacter(1)} title="下一个角色">
                <ChevronRight size={22} />
              </button>
            </div>
          </article>

          <aside className="intel-panel" aria-label="当前角色信息">
            <div className="panel-heading">
              <span>Combat Index</span>
              <strong>{active.className}</strong>
            </div>

            <div className="stat-stack">
              {Object.entries(active.stats).map(([label, value], index) => {
                const StatIcon = statIcons[index]
                return (
                  <div className="stat-row" key={label}>
                    <div className="stat-label">
                      <StatIcon size={18} />
                      <span>{label}</span>
                    </div>
                    <div className="stat-track" aria-hidden="true">
                      <span style={{ width: `${value}%` }} />
                    </div>
                    <strong>{value}</strong>
                  </div>
                )
              })}
            </div>

            <div className="dossier">
              <Gem size={19} />
              <p>{active.dossier}</p>
            </div>

            <div className="radar-plate" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <Sparkles size={28} />
            </div>
          </aside>
        </section>

        <section className="roster-strip" aria-label="十名角色快速选择">
          {characters.map((character, index) => (
            <button
              type="button"
              className={`roster-card ${index === activeIndex ? 'is-active' : ''}`}
              key={character.id}
              onClick={() => {
                setActiveIndex(index)
                setIsCruising(false)
              }}
              style={{ '--card-rgb': character.rgb } as CSSProperties}
            >
              <img src={character.image} alt={`${character.realm}${character.name}`} />
              <span className="roster-glow" />
              <span className="roster-meta">
                <small>{character.realm}</small>
                <strong>{character.name}</strong>
              </span>
            </button>
          ))}
        </section>

        <section className="lower-grid" aria-label="阵容概览">
          <div className="signal-panel">
            <div className="section-title">
              <Orbit size={20} />
              <span>Dynasty Mesh</span>
            </div>
            <div className="mesh-list">
              {characters.slice(0, 5).map((character) => (
                <button
                  type="button"
                  key={character.id}
                  onClick={() => setActiveIndex(characters.findIndex((item) => item.id === character.id))}
                  className={character.id === active.id ? 'is-live' : ''}
                >
                  <span>{character.realm}</span>
                  <strong>{character.name}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="tactical-panel">
            <div className="section-title">
              <Zap size={20} />
              <span>Role Matrix</span>
            </div>
            <div className="matrix-grid">
              {characters.map((character) => (
                <span
                  key={character.id}
                  className={character.id === active.id ? 'is-locked' : ''}
                  style={{ '--dot-rgb': character.rgb } as CSSProperties}
                >
                  {character.rarity}
                </span>
              ))}
            </div>
          </div>

          <div className="brief-panel">
            <div className="section-title">
              <Shield size={20} />
              <span>Active Brief</span>
            </div>
            <h2>{active.title}</h2>
            <p>{active.dossier}</p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
