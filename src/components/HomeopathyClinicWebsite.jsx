import React, { useState, useMemo, useRef, useEffect } from "react";
import about from  './Assests/images/about0us.webp'
import {
  Menu, X, Phone, MapPin, Clock, Mail, ChevronRight, ChevronLeft,
  Check, Leaf, Heart, ShieldCheck, Baby, Brain, Sparkles, Star,
  Calendar as CalendarIcon, ArrowRight, Quote, Plus, Minus, Award,
  Stethoscope, Users
} from "lucide-react";

/* ---------------------------------------------------------
   DESIGN TOKENS
   Forest  #16302A   Sage  #7C9885   Ivory  #FBF7F0
   Gold    #B8874A   Ink   #211E1A   Rose   #C98F7B
--------------------------------------------------------- */
const C = {
  forest: "#16302A",
  forestDeep: "#0E211C",
  sage: "#7C9885",
  sagePale: "#E7EDE6",
  ivory: "#FBF7F0",
  ivoryDeep: "#F3ECE0",
  gold: "#B8874A",
  goldSoft: "#D9B98A",
  ink: "#211E1A",
  inkSoft: "#5B5750",
  rose: "#C98F7B",
  line: "#DAD2C2",
};

const FONT_DISPLAY = "'Fraunces', 'Georgia', serif";
const FONT_BODY = "'Manrope', 'Inter', sans-serif";

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */
const SPECIALTIES = [
  { icon: Leaf, title: "Chronic & Lifestyle Disorders", desc: "Thyroid, diabetes, arthritis and long-standing conditions addressed at the root, not just the symptom." },
  { icon: Sparkles, title: "Skin & Allergy Care", desc: "Eczema, psoriasis, urticaria and seasonal allergies treated with constitutional remedies." },
  { icon: Heart, title: "Women's Health", desc: "PCOS, hormonal balance, menstrual health and fertility support through every stage of life." },
  { icon: Baby, title: "Child Wellness", desc: "Gentle, non-invasive care for immunity, growth concerns and recurrent infections in children." },
  { icon: Brain, title: "Mental & Emotional Wellbeing", desc: "Anxiety, stress and sleep concerns approached with the mind-body connection homeopathy is built on." },
  { icon: ShieldCheck, title: "Autoimmune Support", desc: "Long-term management plans built around the individual, not the diagnosis alone." },
];

const TESTIMONIALS = [
  { name: "Prashant Dhaked", city: "Firozabad", quote: "I am very happy with the treatment at Sia Homoeo Clinic. I noticed a positive improvement in my hair health and overall well-being. Dr. Sameena is very caring and explains everything patiently. Highly recommended! ", condition: "Hair Greying" },
  { name: "Satish Kumar Verma", city: "Delhi", quote: "I had been struggling with hair fall and thinning hair for quite some time. After taking treatment from Dr. Sameena Verma, I noticed a gradual improvement in my hair fall and overall hair quality. I’m really happy with the results and would definitely recommend her for hair-related problems.", condition: "Hair Health" },
  { name: "Twinkle Rathur", city: "Firozabad", quote: "I have been having throat problem for some time..my throat recovered after taking medicine from here.", condition: "Thyroid balance" },
  {name:"Mona Singh",city:"Aligarh",quote:"I was suffering from PCOD and irregular periods. After consulting Dr. Sameena Verma, I noticed a gradual improvement. Really happy with the treatment and guidance.Navigating a condition that outsiders often dismiss as just irregular periods, while dealing daily with internal battles like thinning scalp hair, unwanted facial hair growth, mood volatility, and chronic digestive sluggishness.Homeopathy offers a deeply personalized, gentle framework that addresses the mental, emotional, and endocrine interconnectedness of PCOS without the hormonal side effects common in conventional pharmaceutical management.THANK YOU MAM",condition:"Women's Health"}
];

const FAQS = [
  { q: "Do I need to stop my current medication before starting homeopathic treatment?", a: "No — in most cases treatment begins alongside existing medication. Any transition is planned gradually and only ever in coordination with your primary physician." },
  { q: "How long before I notice a change?", a: "Acute concerns often respond within days. Chronic, long-standing conditions are typically given 8–12 weeks before the first meaningful review, since constitutional treatment works with the body's own pace." },
  { q: "Are online consultations available?", a: "Yes. Video consultations carry the same case-taking depth as an in-person visit, and are a good fit for follow-ups or patients outside Firozabad." },
  { q: "What should I bring to the first appointment?", a: "Any prior diagnostic reports, a list of current medication, and — most usefully — a clear, honest account of your history. The first consultation runs 45–60 minutes for exactly this reason." },
];

const TIME_SLOTS = ["09:00 AM", "09:45 AM", "10:30 AM", "11:15 AM", "02:00 PM", "02:45 PM", "03:30 PM", "04:15 PM", "05:00 PM"];

/* ---------------------------------------------------------
   SMALL UTIL: build next 14 available weekdays
--------------------------------------------------------- */
function buildDays() {
  const days = [];
  const d = new Date();
  let i = 0;
  while (days.length < 10) {
    const dt = new Date(d);
    dt.setDate(d.getDate() + i);
    i++;
    if (dt.getDay() === 0) continue; // skip Sunday
    days.push(dt);
  }
  return days;
}

/* ---------------------------------------------------------
   RIPPLE / DILUTION MOTIF (SVG) — signature element
--------------------------------------------------------- */
function DilutionRings({ size = 480, stroke = C.gold, opacity = 1, animate = true }) {
  const rings = [1, 2, 3, 4, 5];
  return (
    <svg width={size} height={size} viewBox="0 0 480 480" fill="none" style={{ opacity }}>
      <circle cx="240" cy="240" r="6" fill={stroke} />
      {rings.map((r) => (
        <circle
          key={r}
          cx="240"
          cy="240"
          r={r * 40}
          stroke={r % 2 === 0 ? C.sage : stroke}
          strokeWidth="1"
          opacity={1 - r * 0.13}
          className={animate ? "ring-pulse" : ""}
          style={animate ? { animationDelay: `${r * 0.5}s` } : {}}
        />
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------
   NAV
--------------------------------------------------------- */
function Nav({ onBook }) {
  const [open, setOpen] = useState(false);
  const links = ["About", "Specialties", "Process", "Testimonials", "FAQ", "Contact"];
  return (
    <header
      style={{ background: "rgba(251,247,240,0.92)", borderBottom: `1px solid ${C.line}`, backdropFilter: "blur(8px)" }}
      className="sticky top-0 z-40"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
        <div className="flex items-center gap-2">
          <div style={{ background: C.forest }} className="w-9 h-9 rounded-full flex items-center justify-center">
            <Leaf size={18} color={C.goldSoft} />
          </div>
          <div>
            <div style={{ fontFamily: FONT_DISPLAY, color: C.forest }} className="text-lg leading-none tracking-tight">
              Sia Homoeo
            </div>
            <div style={{ color: C.inkSoft, letterSpacing: "0.14em" }} className="text-[10px] uppercase">
              
            </div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{ color: C.ink, fontFamily: FONT_BODY }}
              className="text-sm font-medium hover:opacity-60 transition-opacity"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+917500345109" style={{ color: C.forest }} className="flex items-center gap-2 text-sm font-medium">
            <Phone size={15} /> +91 7500345109
          </a>
          <button
            onClick={onBook}
            style={{ background: C.forest, color: C.ivory, fontFamily: FONT_BODY }}
            className="px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Book Appointment
          </button>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} style={{ color: C.forest }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden px-6 pb-6 flex flex-col gap-4" style={{ borderTop: `1px solid ${C.line}` }}>
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{ color: C.ink, fontFamily: FONT_BODY }} className="text-sm font-medium pt-3">
              {l}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); onBook(); }}
            style={{ background: C.forest, color: C.ivory }}
            className="px-5 py-3 rounded-full text-sm font-semibold mt-2"
          >
            Book Appointment
          </button>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------------------------------
   HERO
--------------------------------------------------------- */
function Hero({ onBook }) {
  return (
    <section style={{ background: C.ivory }} className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <div
            style={{ color: C.gold, fontFamily: FONT_BODY, letterSpacing: "0.18em" }}
            className="text-xs font-bold uppercase mb-6 flex items-center gap-2"
          >
            <span style={{ width: 28, height: 1, background: C.gold, display: "inline-block" }} />
             KGKHMC-Trained &middot; BHMS(Homeopathy)
          </div>
          <h1
            style={{ fontFamily: FONT_DISPLAY, color: C.forest, lineHeight: 1.05 }}
            className="text-5xl md:text-6xl font-medium tracking-tight mb-6"
          >
            Medicine that treats the <span style={{ fontStyle: "italic", color: C.gold }}>person</span>, not the diagnosis.
          </h1>
          <p style={{ color: C.inkSoft, fontFamily: FONT_BODY }} className="text-lg leading-relaxed mb-10 max-w-md">
            Six years of constitutional homeopathic practice, trained at  KGKHMC  —
            bringing unhurried, evidence-informed care to chronic, hormonal and long-standing conditions in Firozabad.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onBook}
              style={{ background: C.forest, color: C.ivory, fontFamily: FONT_BODY }}
              className="px-7 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              Book a Consultation <ArrowRight size={16} />
            </button>
            <a
              href="#about"
              style={{ color: C.forest, borderColor: C.forest, fontFamily: FONT_BODY }}
              className="px-7 py-3.5  rounded-full text-sm font-semibold border hover:bg-white transition-colors"
            >
              Meet the Doctor
            </a>
          </div>

          <div className="flex items-center gap-8 mt-14">
            {[["6+", "Years in Practice"], ["8,000+", "Patients Treated"], ["4.9/5", "Patient Rating"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: FONT_DISPLAY, color: C.forest }} className="text-2xl">{n}</div>
                <div style={{ color: C.inkSoft, fontFamily: FONT_BODY }} className="text-xs mt-1 max-w-[90px]">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <DilutionRings size={460} />
          </div>
          <div
            style={{ background: C.forest, border: `6px solid ${C.ivory}`, boxShadow: "0 30px 60px -20px rgba(22,48,42,0.35)" }}
            className="relative w-64 h-64 md:w-72 md:h-72 rounded-full flex flex-col items-center justify-center text-center"
          >
            <Stethoscope size={40} color={C.goldSoft} />
            <div style={{ fontFamily: FONT_DISPLAY, color: C.ivory }} className="text-xl mt-3">Dr. Sameena Verma</div>
            <div style={{ color: C.goldSoft, fontFamily: FONT_BODY, letterSpacing: "0.1em" }} className="text-[11px] uppercase mt-1">BHMS(Hom),  KGKHMC</div>
          </div>
        </div>
      </div>

      <style>{`
        .ring-pulse { transform-origin: 240px 240px; animation: ringPulse 4s ease-in-out infinite; }
        @keyframes ringPulse { 0%,100% { opacity: var(--o,0.5); } 50% { opacity: 0.9; } }
      `}</style>
    </section>
  );
}

/* ---------------------------------------------------------
   TRUST BAR
--------------------------------------------------------- */
function TrustBar() {
  const items = [
    { icon: Award, label: " KGKHMC , BHMS(Hom)" },
    { icon: ShieldCheck, label: "CCH Registered Practitioner" },
    { icon: Users, label: "8,000+ Cases Managed" },
    { icon: Star, label: "4.9 Average Patient Rating" },
  ];
  return (
    <div style={{ background: C.forest }} className="py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon size={18} color={C.goldSoft} />
            <span style={{ color: C.ivory, fontFamily: FONT_BODY }} className="text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   ABOUT
--------------------------------------------------------- */
function About() {
  return (
    <section id="about" style={{ background: C.ivory }} className="py-24">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-16 items-start">
        <div className="lg:col-span-2">
          <div
            style={{ background: C.sagePale, border: `1px solid ${C.line}` }}
            className="rounded-2xl p-8 aspect-[4/5] flex flex-col items-center justify-center text-center"
          >
            <div style={{ background: C.forest }} className="w-48 h-48 rounded-full flex items-center justify-center mb-6">
              {/* <Stethoscope size={36} color={C.goldSoft} /> */}
              <img src={about} className="w-48"  alt="Homeopathy clinic"/>
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, color: C.forest }} className="text-2xl mb-1">Dr. Sameena Verma</div>
            <div style={{ color: C.inkSoft, fontFamily: FONT_BODY }} className="text-sm">BHMS(Homeopathy),  KGKHMC </div>
            <div style={{ color: C.inkSoft, fontFamily: FONT_BODY }} className="text-sm">  </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div style={{ color: C.gold, fontFamily: FONT_BODY, letterSpacing: "0.18em" }} className="text-xs font-bold uppercase mb-4">
            About the Physician
          </div>
          <h2 style={{ fontFamily: FONT_DISPLAY, color: C.forest }} className="text-4xl mb-6 tracking-tight">
            Trained in Delhi's most rigorous medical institution. Practicing with homeopathy's oldest principle.
          </h2>
          <p style={{ color: C.inkSoft, fontFamily: FONT_BODY }} className="leading-relaxed mb-4">
            Dr. Sameena Verma, BHMS (KGKHMC), is a Homoeopathic Physician based in Firozabad, Uttar Pradesh. She has 6 years of experience in constitutional homoeopathic practice, with a patient-centred approach focused on understanding the individual as a whole.
          </p>
          <p style={{ color: C.inkSoft, fontFamily: FONT_BODY }} className="leading-relaxed mb-8">
            Her consultations involve detailed case-taking, including the patient’s symptoms, medical history, lifestyle, emotional factors, and individual constitution. The aim is to understand the overall pattern of the condition and select an appropriate homoeopathic approach rather than focusing only on the disease name.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "BHMS – KGKHMC, Moradabad",
              "Special interest: Hair & Skin joint pain and female problems",
              "Registered with the Central Council of Homoeopathy",
              "6 years of experience in constitutional homoeopathic practice",
            ].map((t) => (
              <div key={t} className="flex items-start gap-3">
                <Check size={16} color={C.gold} className="mt-1 flex-shrink-0" />
                <span style={{ color: C.ink, fontFamily: FONT_BODY }} className="text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   SPECIALTIES
--------------------------------------------------------- */
function Specialties() {
  return (
    <section id="specialties" style={{ background: C.ivoryDeep }} className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-16">
          <div style={{ color: C.gold, fontFamily: FONT_BODY, letterSpacing: "0.18em" }} className="text-xs font-bold uppercase mb-4">
            Areas of Practice
          </div>
          <h2 style={{ fontFamily: FONT_DISPLAY, color: C.forest }} className="text-4xl tracking-tight">
            Six areas. One approach — the whole patient.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIALTIES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              style={{ background: C.ivory, border: `1px solid ${C.line}` }}
              className="rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <div style={{ background: C.sagePale }} className="w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Icon size={22} color={C.forest} />
              </div>
              <h3 style={{ fontFamily: FONT_DISPLAY, color: C.forest }} className="text-xl mb-3">{title}</h3>
              <p style={{ color: C.inkSoft, fontFamily: FONT_BODY }} className="text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   PROCESS
--------------------------------------------------------- */
function Process({ onBook }) {
  const steps = [
    { n: "01", title: "Book a slot", desc: "Choose a concern, date and time that suits you — confirmed instantly." },
    { n: "02", title: "First consultation", desc: "A full 45–60 minute case-taking session, in person or by video." },
    { n: "03", title: "Individualised plan", desc: "A remedy and treatment plan built specifically around your case." },
    { n: "04", title: "Ongoing review", desc: "Structured follow-ups every 2–4 weeks to track and adjust the plan." },
  ];
  return (
    <section id="process" style={{ background: C.forest }} className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <div style={{ color: C.goldSoft, fontFamily: FONT_BODY, letterSpacing: "0.18em" }} className="text-xs font-bold uppercase mb-4">
              How It Works
            </div>
            <h2 style={{ fontFamily: FONT_DISPLAY, color: C.ivory }} className="text-4xl tracking-tight max-w-lg">
              From first booking to lasting treatment plan.
            </h2>
          </div>
          <button
            onClick={onBook}
            style={{ background: C.goldSoft, color: C.forestDeep, fontFamily: FONT_BODY }}
            className="px-7 py-3.5 rounded-full text-sm font-semibold self-start hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            Start Booking <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.n} className="relative pl-0">
              <div style={{ fontFamily: FONT_DISPLAY, color: C.sage }} className="text-4xl mb-4">{s.n}</div>
              <h3 style={{ fontFamily: FONT_DISPLAY, color: C.ivory }} className="text-lg mb-2">{s.title}</h3>
              <p style={{ color: "#B8C4BC", fontFamily: FONT_BODY }} className="text-sm leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div style={{ background: "rgba(255,255,255,0.15)" }} className="hidden md:block absolute top-5 -right-4 w-8 h-px" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   TESTIMONIALS
--------------------------------------------------------- */
function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  return (
    <section id="testimonials" style={{ background: C.ivory }} className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div style={{ color: C.gold, fontFamily: FONT_BODY, letterSpacing: "0.18em" }} className="text-xs font-bold uppercase mb-8">
          Patient Experiences
        </div>
        <Quote size={32} color={C.sage} className="mx-auto mb-6" />
        <p style={{ fontFamily: FONT_DISPLAY, color: C.forest }} className="text-2xl md:text-3xl leading-snug mb-8">
          "{t.quote}"
        </p>
        <div style={{ fontFamily: FONT_BODY, color: C.ink }} className="font-semibold">{t.name}</div>
        <div style={{ fontFamily: FONT_BODY, color: C.inkSoft }} className="text-sm mb-8">{t.city} &middot; {t.condition}</div>

        <div className="flex items-center justify-center gap-4">
          <button onClick={() => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} style={{ border: `1px solid ${C.line}` }} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <ChevronLeft size={18} color={C.forest} />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <div key={idx} style={{ background: idx === i ? C.gold : C.line, width: idx === i ? 20 : 6 }} className="h-1.5 rounded-full transition-all" />
            ))}
          </div>
          <button onClick={() => setI((i + 1) % TESTIMONIALS.length)} style={{ border: `1px solid ${C.line}` }} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <ChevronRight size={18} color={C.forest} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   FAQ
--------------------------------------------------------- */
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" style={{ background: C.ivoryDeep }} className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div style={{ color: C.gold, fontFamily: FONT_BODY, letterSpacing: "0.18em" }} className="text-xs font-bold uppercase mb-4 text-center">
          Common Questions
        </div>
        <h2 style={{ fontFamily: FONT_DISPLAY, color: C.forest }} className="text-4xl tracking-tight text-center mb-14">
          Before you book
        </h2>
        <div className="flex flex-col gap-3">
          {FAQS.map((f, idx) => (
            <div key={f.q} style={{ background: C.ivory, border: `1px solid ${C.line}` }} className="rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === idx ? -1 : idx)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span style={{ fontFamily: FONT_BODY, color: C.forest }} className="font-semibold text-sm md:text-base pr-4">{f.q}</span>
                {open === idx ? <Minus size={18} color={C.gold} className="flex-shrink-0" /> : <Plus size={18} color={C.gold} className="flex-shrink-0" />}
              </button>
              {open === idx && (
                <div className="px-6 pb-5">
                  <p style={{ color: C.inkSoft, fontFamily: FONT_BODY }} className="text-sm leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   BOOKING MODAL — multi-step
--------------------------------------------------------- */
function BookingModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [concern, setConcern] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const days = useMemo(() => buildDays(), []);
  const scrollRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
const [submitError, setSubmitError] = useState("");
  useEffect(() => {
    if (open) { setStep(1); setConcern(null); setDate(null); setTime(null); setForm({ name: "", phone: "", email: "", notes: "" }); }
  }, [open]);

  if (!open) return null;

  const canNext =
    (step === 1 && concern) ||
    (step === 2 && date && time) ||
    (step === 3 && form.name.trim() && form.phone.trim().length >= 8);

  const dayLabel = (d) => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
const handleBooking = async () => {
  setSubmitting(true);
  setSubmitError("");

   try {
    const response = await fetch(
      "http://localhost:4000/api/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          concern: concern,
          date: date ? date.toISOString() : null,
          time: time,
          notes: form.notes.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to submit booking."
      );
    }

    // Backend successfully sent the booking
    setStep(4);

  } catch (error) {
    console.error("Booking error:", error);

    setSubmitError(
      error.message || "Something went wrong. Please try again."
    );

  } finally {
    setSubmitting(false);
  }
};
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6" style={{ background: "rgba(14,33,28,0.55)" }}>
      <div
        style={{ background: C.ivory, fontFamily: FONT_BODY }}
        className="w-full md:max-w-xl max-h-[92vh] overflow-y-auto rounded-t-3xl md:rounded-3xl relative"
      >
        {/* header */}
        <div style={{ background: C.forest, borderTopLeftRadius: "inherit", borderTopRightRadius: "inherit" }} className="px-7 py-6 flex items-center justify-between sticky top-0 z-10">
          <div>
            <div style={{ fontFamily: FONT_DISPLAY, color: C.ivory }} className="text-lg">Book Your Consultation</div>
            <div style={{ color: C.goldSoft }} className="text-xs mt-0.5">Step {Math.min(step, 4)} of 4</div>
          </div>
          <button onClick={onClose} style={{ color: C.ivory }} className="hover:opacity-70">
            <X size={22} />
          </button>
        </div>

        {/* progress */}
        <div className="flex gap-1.5 px-7 pt-5">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} style={{ background: s <= step ? C.gold : C.line }} className="h-1 flex-1 rounded-full transition-colors" />
          ))}
        </div>

        <div className="px-7 py-7">
          {/* STEP 1: concern */}
          {step === 1 && (
            <div>
              <h3 style={{ fontFamily: FONT_DISPLAY, color: C.forest }} className="text-2xl mb-1">What brings you in?</h3>
              <p style={{ color: C.inkSoft }} className="text-sm mb-6">Choose the closest match — this helps the doctor prepare for your case.</p>
              <div className="grid grid-cols-2 gap-3">
                {SPECIALTIES.map(({ icon: Icon, title }) => (
                  <button
                    key={title}
                    onClick={() => setConcern(title)}
                    style={{
                      background: concern === title ? C.forest : "white",
                      border: `1px solid ${concern === title ? C.forest : C.line}`,
                      color: concern === title ? C.ivory : C.ink,
                    }}
                    className="rounded-xl p-4 text-left transition-colors"
                  >
                    <Icon size={18} color={concern === title ? C.goldSoft : C.forest} className="mb-2" />
                    <div className="text-xs font-semibold leading-snug">{title}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: date + time */}
          {step === 2 && (
            <div>
              <h3 style={{ fontFamily: FONT_DISPLAY, color: C.forest }} className="text-2xl mb-1">Pick a date &amp; time</h3>
              <p style={{ color: C.inkSoft }} className="text-sm mb-6">All times are IST. A confirmation is sent immediately after booking.</p>

              <div className="flex gap-2 overflow-x-auto pb-2 mb-6" ref={scrollRef}>
                {days.map((d, idx) => {
                  const active = date && date.toDateString() === d.toDateString();
                  return (
                    <button
                      key={idx}
                      onClick={() => setDate(d)}
                      style={{ background: active ? C.forest : "white", border: `1px solid ${active ? C.forest : C.line}`, color: active ? C.ivory : C.ink, minWidth: 76 }}
                      className="rounded-xl px-3 py-3 flex-shrink-0 text-center transition-colors"
                    >
                      <div className="text-[10px] uppercase opacity-70">{d.toLocaleDateString("en-IN", { weekday: "short" })}</div>
                      <div className="text-lg font-semibold">{d.getDate()}</div>
                      <div className="text-[10px] opacity-70">{d.toLocaleDateString("en-IN", { month: "short" })}</div>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    style={{ background: time === t ? C.gold : "white", border: `1px solid ${time === t ? C.gold : C.line}`, color: time === t ? "white" : C.ink }}
                    className="rounded-lg py-2.5 text-sm font-medium transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: details */}
          {step === 3 && (
            <div>
              <h3 style={{ fontFamily: FONT_DISPLAY, color: C.forest }} className="text-2xl mb-1">Your details</h3>
              <p style={{ color: C.inkSoft }} className="text-sm mb-6">Used only to confirm and remind you about this appointment.</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label style={{ color: C.ink }} className="text-xs font-semibold block mb-1.5">Full name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Priya Sharma" style={{ border: `1px solid ${C.line}` }} className="w-full rounded-lg px-4 py-3 text-sm outline-none focus:border-current" />
                </div>
                <div>
                  <label style={{ color: C.ink }} className="text-xs font-semibold block mb-1.5">Phone number *</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" style={{ border: `1px solid ${C.line}` }} className="w-full rounded-lg px-4 py-3 text-sm outline-none" />
                </div>
                <div>
                  <label style={{ color: C.ink }} className="text-xs font-semibold block mb-1.5">Email</label>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="priya@email.com" style={{ border: `1px solid ${C.line}` }} className="w-full rounded-lg px-4 py-3 text-sm outline-none" />
                </div>
                <div>
                  <label style={{ color: C.ink }} className="text-xs font-semibold block mb-1.5">Anything the doctor should know? (optional)</label>
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="Brief note about your concern" style={{ border: `1px solid ${C.line}` }} className="w-full rounded-lg px-4 py-3 text-sm outline-none resize-none" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: confirmation */}
          {step === 4 && (
            <div className="text-center py-4">
              <div className="flex justify-center mb-6">
                <DilutionRings size={160} animate={true} />
              </div>
              <div style={{ background: C.sagePale, width: 56, height: 56 }} className="rounded-full flex items-center justify-center mx-auto -mt-24 mb-6">
                <Check size={26} color={C.forest} />
              </div>
              <h3 style={{ fontFamily: FONT_DISPLAY, color: C.forest }} className="text-2xl mb-2">Appointment requested</h3>
              <p style={{ color: C.inkSoft }} className="text-sm mb-6 max-w-sm mx-auto">
                Thank you, {form.name.split(" ")[0] || "there"}. Your slot is held — you'll receive an SMS and email confirmation shortly.
              </p>
              <div style={{ background: "white", border: `1px solid ${C.line}` }} className="rounded-xl p-5 text-left text-sm max-w-sm mx-auto flex flex-col gap-2.5">
                <div className="flex items-center gap-2"><Sparkles size={14} color={C.gold} /> <span style={{ color: C.ink }}>{concern}</span></div>
                <div className="flex items-center gap-2"><CalendarIcon size={14} color={C.gold} /> <span style={{ color: C.ink }}>{date && dayLabel(date)} &middot; {time}</span></div>
                <div className="flex items-center gap-2"><Phone size={14} color={C.gold} /> <span style={{ color: C.ink }}>{form.phone}</span></div>
              </div>
            </div>
          )}
        </div>
{submitError && (
  <div
    className="mx-7 mb-4 rounded-lg px-4 py-3 text-sm"
    style={{
      background: "#fef2f2",
      color: "#991b1b",
      border: "1px solid #fecaca"
    }}
  >
    {submitError}
  </div>
)}
        {/* footer actions */}
        {step < 4 && (
          <div className="px-7 pb-7 flex items-center justify-between gap-3 sticky bottom-0" style={{ background: C.ivory }}>
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} style={{ color: C.forest }} className="text-sm font-semibold flex items-center gap-1.5 px-2 py-2.5">
                <ChevronLeft size={16} /> Back
              </button>
            ) : <span />}
            <button
  onClick={() => {
    if (step === 3) {
      handleBooking();
    } else {
      setStep(step + 1);
    }
  }}
  disabled={!canNext || submitting}
  style={{
    background: canNext && !submitting ? C.forest : C.line,
    color: canNext && !submitting ? C.ivory : C.inkSoft
  }}
  className="px-7 py-3 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors"
>
  {step === 3
    ? submitting
      ? "Submitting..."
      : "Confirm Booking"
    : "Continue"}

  {!submitting && <ChevronRight size={16} />}
</button>
          </div>
        )}
        {step === 4 && (
          <div className="px-7 pb-7">
            <button onClick={onClose} style={{ background: C.forest, color: C.ivory }} className="w-full py-3.5 rounded-full text-sm font-semibold">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   FOOTER
--------------------------------------------------------- */
function Footer() {
  return (
    <footer id="contact" style={{ background: C.forestDeep }} className="pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <div style={{ background: C.goldSoft }} className="w-8 h-8 rounded-full flex items-center justify-center">
              <Leaf size={16} color={C.forestDeep} />
            </div>
            <span style={{ fontFamily: FONT_DISPLAY, color: C.ivory }} className="text-lg"> Sia Homoeo</span>
          </div>
          <p style={{ color: "#9FADA5", fontFamily: FONT_BODY }} className="text-sm leading-relaxed max-w-sm">
             KGKHMC-trained homeopathic physician practicing constitutional, individualised care in Firozabad since 2008.
          </p>
        </div>
        <div>
          <div style={{ color: C.goldSoft, fontFamily: FONT_BODY }} className="text-xs uppercase tracking-widest font-bold mb-5">Clinic</div>
          <div style={{ color: "#9FADA5", fontFamily: FONT_BODY }} className="flex flex-col gap-3 text-sm">
            <div className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 flex-shrink-0" /> Om Nagar Colony,  Chandwara Gate, Ramnagar,  Firozabad, Uttar Pradesh 283203</div>
            <div className="flex items-center gap-2"><Phone size={15} /> <a href="tel:+91 7500345109">+91 7500345109</a></div>
            <div className="flex items-center gap-2"><Mail size={15} /><a href="mailto:siahomeoclinic@gmail.com">siahomeoclinic@gmail.com</a></div>
          </div>
        </div>
        <div>
          <div style={{ color: C.goldSoft, fontFamily: FONT_BODY }} className="text-xs uppercase tracking-widest font-bold mb-5">Hours</div>
          <div style={{ color: "#9FADA5", fontFamily: FONT_BODY }} className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2"><Clock size={15} /> Mon – Sun: 11:00 AM – 8:00 PM</div>
            <div className="flex items-center gap-2"><Clock size={15} /> Tuesday: Closed</div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "#7C8B83", fontFamily: FONT_BODY }} className="max-w-6xl mx-auto px-6 pt-8 text-xs flex flex-col md:flex-row justify-between gap-2">
        <span>&copy; {new Date().getFullYear()} Dr. Sameena Verma Homeopathic Clinic. All rights reserved.</span>
        <span>Content on this site is for informational purposes and does not replace professional medical advice.</span>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------
   ROOT
--------------------------------------------------------- */
export default function HomeopathyClinicWebsite() {
  const [bookingOpen, setBookingOpen] = useState(false);
  return (
    <div style={{ background: C.ivory, minHeight: "100vh" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,500&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <Nav onBook={() => setBookingOpen(true)} />
      <Hero onBook={() => setBookingOpen(true)} />
      <TrustBar />
      <About />
      <Specialties />
      <Process onBook={() => setBookingOpen(true)} />
      <Testimonials />
      <FAQ />
      <Footer />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
