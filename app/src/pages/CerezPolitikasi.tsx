import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { Cookie, Settings2, ScrollText, ExternalLink } from 'lucide-react'
import { fadeUp, staggerContainer, staggerChild } from '@/lib/animations'
import { useScrollReveal } from '@/hooks/useScrollReveal'

/* ------------------------------------------------------------------ */
/*  Cookie category data                                               */
/* ------------------------------------------------------------------ */
interface CookieRow {
  name: string
  purpose: string
  duration: string
  thirdParty: 'Hayır' | 'Evet' | '—'
}

const cookieCategories: { category: string; rows: CookieRow[] }[] = [
  {
    category: 'Zorunlu',
    rows: [
      {
        name: 'Oturum Yönetimi',
        purpose: 'Web sitesinin temel işlevlerinin (oturum, güvenlik, tercih saklama) sağlanması için zorunludur.',
        duration: 'Oturum',
        thirdParty: 'Hayır',
      },
    ],
  },
  {
    category: 'Analitik',
    rows: [
      {
        name: '(kullanılmıyor)',
        purpose: 'Topluluk Edisyonu şu anda analitik çerez kullanmamaktadır.',
        duration: '—',
        thirdParty: '—',
      },
    ],
  },
  {
    category: 'Pazarlama',
    rows: [
      {
        name: '(kullanılmıyor)',
        purpose: 'Topluluk Edisyonu şu anda pazarlama çerezi kullanmamaktadır.',
        duration: '—',
        thirdParty: '—',
      },
    ],
  },
  {
    category: 'Tercih',
    rows: [
      {
        name: 'ollamatr-cookie-consent',
        purpose: 'Çerez tercihinizi (localStorage) hatırlamak için kullanılır.',
        duration: '1 yıl',
        thirdParty: 'Hayır',
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
function openCookiePreferences(): void {
  // Best-effort: dispatch an event the CookieBanner can listen to.
  window.dispatchEvent(new CustomEvent('open-cookie-preferences'))
}

export default function CerezPolitikasi() {
  const { ref: tableRef, visible: tableVisible } = useScrollReveal()
  const { ref: preferencesRef, visible: preferencesVisible } = useScrollReveal()
  const { ref: browserRef, visible: browserVisible } = useScrollReveal()
  const { ref: relatedRef, visible: relatedVisible } = useScrollReveal()

  return (
    <div>
      {/* ============================================================ */}
      {/* HERO                                                          */}
      {/* ============================================================ */}
      <section className="bg-bg-obsidian px-6 pt-40 pb-16 lg:px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-7xl"
        >
          <motion.span
            variants={staggerChild}
            className="mb-4 inline-flex items-center gap-2 font-body text-sm font-medium uppercase tracking-wider text-accent-red"
          >
            <Cookie className="h-4 w-4" />
            ÇEREZ BİLGİLENDİRMESİ
          </motion.span>
          <motion.h1
            variants={staggerChild}
            className="font-display text-4xl font-bold leading-tight text-text-primary md:text-5xl lg:text-6xl"
          >
            Çerez Politikası
          </motion.h1>
          <motion.p
            variants={staggerChild}
            className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary"
          >
            Web sitemizde kullandığımız çerezler ve tercihleriniz. KVKK Kurulu'nun 2022 tarihli Çerez Rehberi
            doğrultusunda hazırlanmıştır.
          </motion.p>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* WHAT IS A COOKIE?                                              */}
      {/* ============================================================ */}
      <section className="bg-bg-charcoal px-6 py-20 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mx-auto max-w-3xl"
        >
          <h2 className="font-display text-2xl font-bold text-text-primary md:text-3xl">Çerez Nedir?</h2>
          <p className="mt-5 text-base leading-relaxed text-text-secondary">
            Çerezler (cookies); bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza
            kaydedilen küçük metin dosyalarıdır. Sitenin temel işlevlerini yerine getirmesine, tercihlerinizi
            hatırlamasına ve site kullanımını iyileştirmesine yardımcı olurlar. Bazı çerezler oturum süresince
            geçerlidir; bazıları ise belirli bir süre cihazınızda kalır.
          </p>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* CATEGORIES TABLE                                              */}
      {/* ============================================================ */}
      <section className="bg-bg-obsidian px-6 py-24 lg:px-10">
        <div ref={tableRef} className="mx-auto max-w-5xl">
          <h2
            style={{
              opacity: tableVisible ? 1 : 0,
              transform: tableVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="mb-3 font-display text-2xl font-bold text-text-primary md:text-3xl"
          >
            Kullandığımız Çerez Kategorileri
          </h2>
          <p
            style={{
              opacity: tableVisible ? 1 : 0,
              transform: tableVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
            className="mb-10 text-sm leading-relaxed text-text-secondary"
          >
            Aşağıdaki tablo, web sitemizde kullanılan çerez kategorilerini ve amaçlarını özetlemektedir.
            Zorunlu çerezler dışındaki tüm kategoriler için açık rızanız alınmadan herhangi bir çerez
            tarafımızca yerleştirilmez.
          </p>

          <div
            style={{
              opacity: tableVisible ? 1 : 0,
              transform: tableVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
            className="overflow-x-auto rounded-lg border border-border-subtle"
          >
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="bg-bg-charcoal">
                  <th className="px-5 py-4 text-left font-display text-xs font-bold uppercase tracking-wider text-text-muted">
                    Kategori
                  </th>
                  <th className="px-5 py-4 text-left font-display text-xs font-bold uppercase tracking-wider text-text-muted">
                    Ad
                  </th>
                  <th className="px-5 py-4 text-left font-display text-xs font-bold uppercase tracking-wider text-text-muted">
                    Amaç
                  </th>
                  <th className="px-5 py-4 text-left font-display text-xs font-bold uppercase tracking-wider text-text-muted">
                    Süre
                  </th>
                  <th className="px-5 py-4 text-left font-display text-xs font-bold uppercase tracking-wider text-text-muted">
                    Üçüncü Taraf?
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {cookieCategories.map((cat, i) =>
                  cat.rows.map((row) => (
                    <tr
                      key={`${cat.category}-${row.name}`}
                      className={i % 2 === 0 ? 'bg-bg-obsidian' : 'bg-bg-charcoal/40'}
                    >
                      <td className="px-5 py-4 font-body text-sm font-semibold text-accent-red">
                        {cat.category}
                      </td>
                      <td className="px-5 py-4 font-body text-sm font-medium text-text-primary">
                        {row.name}
                      </td>
                      <td className="px-5 py-4 font-body text-sm leading-relaxed text-text-secondary">
                        {row.purpose}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-text-secondary">{row.duration}</td>
                      <td
                        className={`px-5 py-4 font-body text-sm font-medium ${
                          row.thirdParty === 'Evet' ? 'text-warn-yellow' : 'text-safe-green'
                        }`}
                      >
                        {row.thirdParty}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-text-muted">
            Not: Analitik ve pazarlama kategorilerindeki sağlayıcılar (
            <code className="rounded bg-bg-charcoal px-1.5 py-0.5 font-mono text-[0.6875rem] text-warn-yellow">
              [TODO: Analitik sağlayıcı]
            </code>{' '}
            ,{' '}
            <code className="rounded bg-bg-charcoal px-1.5 py-0.5 font-mono text-[0.6875rem] text-warn-yellow">
              [TODO: Pazarlama sağlayıcı]
            </code>
            ) etkinleştirildiğinde bu alana eklenecektir.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PREFERENCES                                                   */}
      {/* ============================================================ */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10">
        <div ref={preferencesRef} className="mx-auto max-w-3xl">
          <div
            style={{
              opacity: preferencesVisible ? 1 : 0,
              transform: preferencesVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="mb-4 inline-flex items-center gap-2 rounded border border-border-subtle bg-bg-obsidian px-3 py-1.5"
          >
            <Settings2 className="h-3.5 w-3.5 text-accent-red" />
            <span className="font-mono text-[0.625rem] uppercase tracking-wider text-text-muted">
              Tercih Yönetimi
            </span>
          </div>
          <h2
            style={{
              opacity: preferencesVisible ? 1 : 0,
              transform: preferencesVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s',
            }}
            className="font-display text-2xl font-bold text-text-primary md:text-3xl"
          >
            Tercihlerinizi Yönetin
          </h2>
          <p
            style={{
              opacity: preferencesVisible ? 1 : 0,
              transform: preferencesVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
            className="mt-5 text-base leading-relaxed text-text-secondary"
          >
            Çerez tercihlerinizi sitemizin alt kısmında görüntülenen <strong>Çerez Tercihi</strong> banner'ı
            üzerinden yönetebilirsiniz. Verdiğiniz rızayı dilediğiniz zaman geri çekebilir, kategori bazında
            seçim yapabilirsiniz.
          </p>
          <div
            style={{
              opacity: preferencesVisible ? 1 : 0,
              transform: preferencesVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
            }}
            className="mt-8"
          >
            <button
              type="button"
              onClick={openCookiePreferences}
              className="inline-flex items-center gap-2 rounded bg-accent-red px-6 py-3 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:scale-[1.02] hover:bg-accent-red-light"
            >
              <Settings2 className="h-4 w-4" />
              Çerez Tercihlerimi Aç
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BROWSER SETTINGS                                              */}
      {/* ============================================================ */}
      <section className="bg-bg-obsidian px-6 py-24 lg:px-10">
        <div ref={browserRef} className="mx-auto max-w-3xl">
          <h2
            style={{
              opacity: browserVisible ? 1 : 0,
              transform: browserVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="font-display text-2xl font-bold text-text-primary md:text-3xl"
          >
            Tarayıcı Ayarları
          </h2>
          <p
            style={{
              opacity: browserVisible ? 1 : 0,
              transform: browserVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
            className="mt-5 text-base leading-relaxed text-text-secondary"
          >
            Tüm modern tarayıcılar çerezleri silmenize, engellemenize veya yalnızca belirli sitelerden kabul
            etmenize olanak tanır. Çerezleri tamamen devre dışı bırakırsanız sitemizin bazı bölümleri
            beklendiği gibi çalışmayabilir. Ayrıntılı bilgi için kullandığınız tarayıcının yardım sayfasına
            başvurabilirsiniz:
          </p>
          <ul
            style={{
              opacity: browserVisible ? 1 : 0,
              transform: browserVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
            }}
            className="mt-5 list-disc space-y-2 pl-6 text-sm leading-relaxed text-text-secondary marker:text-text-muted"
          >
            <li>Google Chrome: Ayarlar &rarr; Gizlilik ve güvenlik &rarr; Çerezler ve diğer site verileri</li>
            <li>Mozilla Firefox: Ayarlar &rarr; Gizlilik ve Güvenlik &rarr; Çerezler ve Site Verileri</li>
            <li>Microsoft Edge: Ayarlar &rarr; Çerezler ve site izinleri</li>
            <li>Apple Safari: Tercihler &rarr; Gizlilik &rarr; Çerezleri ve Web Sitesi Verilerini Yönet</li>
          </ul>
        </div>
      </section>

      {/* ============================================================ */}
      {/* RELATED POLICIES                                              */}
      {/* ============================================================ */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10">
        <div ref={relatedRef} className="mx-auto max-w-3xl">
          <h2
            style={{
              opacity: relatedVisible ? 1 : 0,
              transform: relatedVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="font-display text-2xl font-bold text-text-primary md:text-3xl"
          >
            İlgili Politikalar
          </h2>
          <p
            style={{
              opacity: relatedVisible ? 1 : 0,
              transform: relatedVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
            className="mt-5 text-base leading-relaxed text-text-secondary"
          >
            Bu Çerez Politikası, KVKK Aydınlatma Metni ile birlikte değerlendirilmelidir. Veri sorumlusu
            kimliği, işleme amaçları ve ilgili kişi hakları için aşağıdaki sayfayı inceleyiniz.
          </p>
          <div
            style={{
              opacity: relatedVisible ? 1 : 0,
              transform: relatedVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
            }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              to="/kvkk"
              className="inline-flex items-center gap-2 rounded border border-border-subtle bg-bg-obsidian px-6 py-3 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              <ScrollText className="h-4 w-4" />
              KVKK ve Aydınlatma Metni
            </Link>
            <a
              href="mailto:privacy@ollamatr.com"
              className="inline-flex items-center gap-2 rounded border border-border-subtle px-6 py-3 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              <ExternalLink className="h-4 w-4" />
              privacy@ollamatr.com
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
