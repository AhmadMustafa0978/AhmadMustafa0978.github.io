"use client";

import { useMemo, useState } from "react";

const products = [
  { grade: "10W-30 / 75W-80", type: "Gear Oil", api: "GL-4", fuel: "زيت تروس", image: "/gear-oil-10l.webp", text: "زيت تروس LUTON للحماية الدقيقة والتشغيل السلس في ظروف الاستخدام اليومية." },
  { grade: "20W-50", type: "Diesel Engine Oil", api: "API CH-4", fuel: "ديزل", image: "/diesel-cartons.webp", text: "تركيبة ديزل موثوقة للورش والطلبات التجارية، متوفرة ضمن عبوات أصلية." },
  { grade: "HD-50", type: "Heavy Duty", api: "API CI-4", fuel: "20 لتر", image: "/hd50-blue-20l.webp", text: "عبوة كبيرة مصممة للمحركات التي تعمل تحت ضغط وأحمال عالية." },
  { grade: "HD-50", type: "Diesel Engine Oil", api: "API CI-4", fuel: "10 لتر", image: "/hd50-product-set.webp", text: "خيار عملي للشاحنات والمركبات التجارية مع حماية ثابتة للمحرك." },
  { grade: "20W-50 / HD-50", type: "Diesel Range", api: "API CH-4 / CI-4", fuel: "ديزل", image: "/diesel-oil-duo.webp", text: "درجتا لزوجة من مجموعة LUTON لتغطية احتياجات الديزل المختلفة." },
];

const finderSteps = [
  { key: "vehicle", title: "ما نوع مركبتك؟", options: [["sedan", "🚗", "سيدان / هاتشباك"], ["suv", "🚙", "SUV / كروس أوفر"], ["truck", "🚚", "شاحنة / بيك أب"], ["van", "🚐", "باص / فان"]] },
  { key: "fuel", title: "ما نوع الوقود؟", options: [["gasoline", "⛽", "بنزين"], ["diesel", "⛽", "ديزل"]] },
  { key: "year", title: "ما سنة صنع المركبة؟", options: [["new", "✦", "2020 وأحدث"], ["mid", "◈", "2010 — 2019"], ["old", "◉", "2009 وأقدم"]] },
  { key: "usage", title: "كيف يتم استخدامها غالباً؟", options: [["city", "⌂", "داخل المدينة"], ["highway", "↠", "طرق سريعة"], ["mixed", "⟳", "استخدام مختلط"], ["heavy", "⚙", "أحمال ثقيلة"]] },
];

type Answers = Record<string, string>;

function getRecommendation(answers: Answers) {
  if (answers.fuel === "diesel" && (answers.vehicle === "truck" || answers.usage === "heavy")) {
    return { grade: "HD-50", detail: "زيت ديزل قوي بمواصفة API CI-4، مخصص للأحمال الثقيلة والشاحنات." };
  }
  if (answers.fuel === "diesel") {
    return { grade: "20W-50", detail: "حماية ثابتة لمحركات الديزل والاستخدام المتواصل بمواصفة API CH-4." };
  }
  if (answers.year === "new") {
    return { grade: "0W-20 أو 5W-30", detail: "خيار خفيف للمحركات الحديثة يمنح سلاسة عند التشغيل واقتصاداً أفضل." };
  }
  if (answers.year === "mid") {
    return { grade: "5W-30 أو 5W-40", detail: "توازن عملي بين الأداء والحماية للمركبات متوسطة العمر." };
  }
  return { grade: "10W-40", detail: "لزوجة عملية للمركبات الأقدم مع حماية موثوقة للاستخدام اليومي." };
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [finderStep, setFinderStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const recommendation = useMemo(() => getRecommendation(answers), [answers]);
  const completed = finderStep === finderSteps.length;

  function choose(key: string, value: string) {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    setFinderStep((current) => Math.min(current + 1, finderSteps.length));
  }

  function resetFinder() {
    setAnswers({});
    setFinderStep(0);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="شركة عبيد التجارية الصفحة الرئيسية">
          <span className="brand-mark"><i></i><i></i><i></i></span>
          <span className="brand-copy"><strong>شركة عبيد التجارية</strong><small>زيوت وفلاتر • وكيل LUTON</small></span>
        </a>
        <button className={menuOpen ? "menu-button open" : "menu-button"} type="button" aria-label="فتح قائمة التنقل" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
        {menuOpen && <button className="nav-backdrop" type="button" aria-label="إغلاق قائمة التنقل" onClick={() => setMenuOpen(false)} />}
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="التنقل الرئيسي">
          {[['عن لوتون', '#about'], ['المنتجات', '#products'], ['لماذا لوتون؟', '#why'], ['اختيار الزيت', '#finder'], ['الوكالة', '#agency']].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>تواصل معنا</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-glow glow-one"></div><div className="hero-glow glow-two"></div>
        <div className="hero-copy">
          <p className="eyebrow"><span></span> شركة عبيد التجارية — وكيل LUTON في سوريا</p>
          <h1>زيوت تحمي<br /><em>كل كيلومتر</em></h1>
          <p className="hero-description">تقنية بريطانية متطورة وحماية يمكن الاعتماد عليها. اختر الزيت الذي يمنح محركك أداءً ثابتاً في كل رحلة.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#products">استكشف المنتجات <b>←</b></a>
            <a className="button button-ghost" href="#finder">اعرف الزيت المناسب</a>
          </div>
          <div className="hero-stats" aria-label="مزايا لوتون">
            <div><strong>+7</strong><span>درجات لزوجة</span></div>
            <div><strong>100%</strong><span>منتجات أصلية</span></div>
            <div><strong>24/7</strong><span>جاهزون لخدمتكم</span></div>
          </div>
        </div>
        <div className="hero-visual" role="img" aria-label="عبوات زيوت LUTON للمحركات">
          <div className="visual-orbit orbit-a"></div><div className="visual-orbit orbit-b"></div>
          <img src="/hd50-product-set.webp" alt="منتجات LUTON الأصلية لزيوت الديزل" decoding="async" />
          <div className="visual-chip">ENGINE<br /><b>PROTECTION</b></div>
        </div>
        <a className="scroll-cue" href="#about">اكتشف المزيد <span>↓</span></a>
      </section>

      <section className="section about" id="about">
        <div className="section-kicker">من نحن</div>
        <div className="section-intro split-intro">
          <h2>خبرة عالمية<br />تصل إلى <em>محركك</em></h2>
          <div><p>تقدم شركة عبيد التجارية، قسم الزيوت المعدنية والفلاتر، حلول تزييت LUTON المصممة لظروف القيادة اليومية والعمل الشاق. نختار تركيبات متوازنة تساعد على حماية المحرك والمحافظة على أدائه.</p><a className="text-link" href="#agency">تعرف على وكالتنا <b>←</b></a></div>
        </div>
        <div className="about-grid">
          <div className="about-panel about-panel-image"><div className="panel-label">LUTON<br /><b>ORIGINAL PRODUCTS</b></div><img className="about-product-image" src="/diesel-cartons.webp" alt="كرتون منتجات LUTON الأصلية" loading="lazy" /></div>
          <div className="about-panel about-panel-copy"><p className="eyebrow"><span></span> معيارنا هو الثقة</p><h3>زيت صحيح.<br />محرك أقوى.</h3><p>من زيوت البنزين والديزل إلى زيوت التروس، نوفّر مجموعة متكاملة للمركبات الخاصة والتجارية.</p><div className="feature-list"><div><b>01</b><span>تركيبات عالية الجودة<br /><small>للظروف المتنوعة</small></span></div><div><b>02</b><span>خيارات دقيقة للزوجة<br /><small>لمختلف أنواع المحركات</small></span></div><div><b>03</b><span>توزيع داخل سوريا<br /><small>للجملة والمفرق</small></span></div></div></div>
        </div>
      </section>

      <section className="section products" id="products">
        <div className="section-heading"><div><div className="section-kicker">مجموعة المنتجات</div><h2>لكل محرك<br /><em>خيار أدق</em></h2></div><p>درجات لزوجة مختارة بعناية لتلائم طبيعة مركبتك وأسلوب قيادتك.</p></div>
        <div className="product-grid">
          {products.map((product, index) => <article className="product-card" key={`${product.grade}-${product.type}`}>
            <div className="product-art"><span className="product-number">0{index + 1}</span><img src={product.image} alt={`${product.type} ${product.grade}`} loading="lazy" /></div>
            <div className="product-info"><div><span className="product-kind">{product.type}</span><h3>{product.grade}</h3></div><span className="product-api">{product.api}</span><p>{product.text}</p></div>
          </article>)}
        </div>
      </section>

      <section className="section why" id="why">
        <div className="why-head"><div className="section-kicker">لماذا LUTON؟</div><h2>حماية نراها<br />في كل <em>تفصيل</em></h2></div>
        <div className="why-grid">
          {[['01', 'حماية عند التشغيل', 'تدفق سريع يساعد على حماية الأجزاء الحيوية من أول لحظة.'], ['02', 'نظافة المحرك', 'تركيبات تساعد على تقليل الرواسب والحفاظ على أداء أنظف.'], ['03', 'ثبات حراري', 'أداء متزن في الحرارة والضغط أثناء الاستخدام اليومي.'], ['04', 'اختيار واضح', 'درجات متعددة تسهّل إيجاد اللزوجة المناسبة لمركبتك.']].map(([number, title, description]) => <article className="why-card" key={number}><span>{number}</span><div className="why-icon">✦</div><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <section className="finder-section" id="finder">
        <div className="finder-copy"><div className="section-kicker">مساعد اختيار الزيت</div><h2>أجب عن أربع<br />خطوات <em>بسيطة</em></h2><p>سنعطيك اقتراحاً أولياً لدرجة اللزوجة المناسبة. وللتأكيد النهائي، راجع دليل المركبة أو تواصل مع فريقنا.</p><div className="finder-count"><b>0{Math.min(finderStep + 1, 4)}</b><span>من 04 خطوات</span></div></div>
        <div className="finder-card">
          {!completed ? <><div className="step-dots" aria-label={`الخطوة ${finderStep + 1} من 4`}>{finderSteps.map((step, index) => <button type="button" onClick={() => index <= finderStep && setFinderStep(index)} className={index === finderStep ? "active" : index < finderStep ? "done" : ""} key={step.key} aria-label={`الخطوة ${index + 1}`}>{index + 1}</button>)}</div><h3>{finderSteps[finderStep].title}</h3><div className="option-grid">{finderSteps[finderStep].options.map(([value, icon, label]) => <button type="button" onClick={() => choose(finderSteps[finderStep].key, value)} key={value}><span>{icon}</span>{label}</button>)}</div></> : <div className="recommendation"><span className="result-star">✦</span><p>توصيتنا الأولية لك</p><h3>{recommendation.grade}</h3><p className="recommendation-copy">{recommendation.detail}</p><div className="result-actions"><a className="button button-primary" href="#contact">اطلب الآن <b>←</b></a><button className="reset-button" type="button" onClick={resetFinder}>إعادة الاختيار</button></div></div>}
        </div>
      </section>

      <section className="section agency" id="agency">
        <div className="agency-map"><div className="map-grid"></div><div className="map-route"></div><div className="map-pin"><span>●</span><b>كرناز</b><small>حماة — سوريا</small></div><div className="map-note"><span>موقعنا</span><b>نخدم جميع المحافظات</b></div></div>
        <div className="agency-copy"><div className="section-kicker">الوكالة والتوزيع</div><h2>أقرب إلى<br /><em>عملك</em></h2><p>تقدّم شركة عبيد التجارية منتجات LUTON الأصلية للورش والمحلات والطلبات التجارية، مع الزيوت المعدنية والفلاتر وإمكانية التوصيل إلى مختلف المحافظات السورية.</p><div className="agency-points"><div><span>⌖</span><b>الموقع<small>كرناز — حماة — سوريا</small></b></div><div><span>↗</span><b>التوزيع<small>جميع المحافظات السورية</small></b></div><div><span>◷</span><b>الطلبات التجارية<small>خدمة سريعة ومرنة</small></b></div></div><a className="button button-primary" href="https://maps.google.com/?q=Karnaz,Hama,Syria" target="_blank" rel="noreferrer">افتح الخريطة <b>←</b></a></div>
      </section>

      <section className="contact" id="contact"><div><p className="eyebrow"><span></span> تواصل معنا</p><h2>نساعدك في<br />اختيار <em>الأفضل</em></h2><p>فريق المبيعات جاهز للرد على استفساراتكم وطلبات الجملة والمفرق.</p></div><div className="contact-people"><article><span className="avatar">ع</span><div><small>مدير المبيعات</small><h3>الحاج عمر</h3><a href="tel:+963944780500" dir="ltr">0944 780 500</a></div><a className="round-link" href="https://wa.me/963944780500" target="_blank" rel="noreferrer" aria-label="واتساب الحاج عمر">↗</a></article><article><span className="avatar blue">إ</span><div><small>مندوب المبيعات</small><h3>إبراهيم</h3><a href="tel:+963998665609" dir="ltr">0998 665 609</a></div><a className="round-link" href="https://wa.me/963998665609" target="_blank" rel="noreferrer" aria-label="واتساب إبراهيم">↗</a></article></div></section>

      <footer><div className="footer-main"><a className="brand" href="#home"><span className="brand-mark"><i></i><i></i><i></i></span><span className="brand-copy"><strong>شركة عبيد التجارية</strong><small>الزيوت المعدنية والفلاتر</small></span></a><p>شركة عبيد التجارية — قسم الزيوت المعدنية والفلاتر. وكيل LUTON Lubricants في حماة - كرناز.</p><div className="footer-links"><a href="#products">المنتجات</a><a href="#finder">اختيار الزيت</a><a href="#agency">الوكالة</a><a href="#contact">تواصل معنا</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} شركة عبيد التجارية</span><span>جميع الحقوق محفوظة</span></div></footer>
      <a className="whatsapp-float" href="https://wa.me/963944780500" target="_blank" rel="noreferrer" aria-label="تواصل عبر واتساب">⌕<small>واتساب</small></a>
    </main>
  );
}
