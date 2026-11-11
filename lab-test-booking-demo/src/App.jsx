import React, { useMemo, useState } from "react";
import {
  Search, MapPin, Phone, UserRound, ShoppingCart, ChevronDown, ChevronRight,
  Trash2, Plus, Minus, ShieldCheck, Zap, FlaskConical, Headphones,
  CalendarDays, Clock3, CheckCircle2, ArrowLeft, HeartPulse, Menu
} from "lucide-react";
import OrganScene from "./OrganScene.jsx";

const organs = [
  { name: "Diabetes", emoji: "🩸", subtitle: "Blood sugar health" },
  { name: "Liver", emoji: "🫀", subtitle: "Liver function" },
  { name: "Thyroid", emoji: "🦋", subtitle: "Hormone health" },
  { name: "Kidney", emoji: "🫘", subtitle: "Kidney function" },
  { name: "Heart", emoji: "❤️", subtitle: "Cardiac health" },
  { name: "Lungs", emoji: "🫁", subtitle: "Lung function" },
  { name: "Bone", emoji: "🦴", subtitle: "Bone health" },
  { name: "Pregnancy", emoji: "🤰", subtitle: "Maternal health" },
  { name: "Cancer", emoji: "🔬", subtitle: "Screening tests" }
];

const testCatalog = {
  Diabetes: [
    ["Fasting Blood Sugar (FBS)", "Measures blood glucose after fasting", 199],
    ["Postprandial Blood Sugar (PPBS)", "Blood glucose after a meal", 199],
    ["HbA1c Test", "Average blood glucose over 2–3 months", 499],
    ["Glucose Tolerance Test", "Evaluates how your body processes glucose", 699]
  ],
  Liver: [
    ["Liver Function Test (LFT)", "Complete liver function profile", 999],
    ["SGOT / SGPT", "Liver enzyme test", 499],
    ["Bilirubin Test", "Checks bilirubin levels", 399],
    ["Alkaline Phosphatase", "Measures an important liver enzyme", 499]
  ],
  Thyroid: [
    ["Thyroid Profile (T3, T4, TSH)", "Complete thyroid hormone profile", 599],
    ["TSH Test", "Checks thyroid-stimulating hormone", 299],
    ["Free T3 Test", "Measures free triiodothyronine", 399],
    ["Free T4 Test", "Measures free thyroxine", 399]
  ],
  Kidney: [
    ["Kidney Function Test (KFT)", "Complete kidney function profile", 899],
    ["Serum Creatinine", "Measures creatinine in blood", 299],
    ["Blood Urea Test", "Checks urea levels", 249],
    ["Uric Acid Test", "Measures uric acid levels", 299]
  ],
  Heart: [
    ["Lipid Profile", "Cholesterol and triglyceride profile", 599],
    [" hs-CRP Test", "Measures high-sensitivity CRP", 799],
    ["CPK-MB Test", "Cardiac enzyme assessment", 699],
    ["Homocysteine Test", "Measures homocysteine levels", 999]
  ],
  Lungs: [
    ["Complete Blood Count", "General blood health assessment", 399],
    ["D-Dimer Test", "Measures D-dimer in blood", 899],
    ["IgE Test", "Assesses allergic response", 599],
    ["Eosinophil Count", "Measures eosinophil cells", 199]
  ],
  Bone: [
    ["Vitamin D Test", "Checks vitamin D levels", 699],
    ["Calcium Test", "Measures calcium in blood", 199],
    ["Phosphorus Test", "Checks phosphorus levels", 249],
    ["Vitamin B12 Test", "Measures vitamin B12 levels", 599]
  ],
  Pregnancy: [
    ["Beta hCG Test", "Blood test for pregnancy hormone", 499],
    ["CBC Test", "Complete blood count", 399],
    ["Blood Group & Rh", "Determines blood group and Rh factor", 299],
    ["TSH Test", "Thyroid screening", 299]
  ],
  Cancer: [
    ["PSA Test", "Prostate-specific antigen screening", 699],
    ["CA-125 Test", "Tumor marker blood test", 999],
    ["CEA Test", "Carcinoembryonic antigen test", 899],
    ["AFP Test", "Alpha-fetoprotein test", 799]
  ]
};

const money = (n) => `₹${n.toLocaleString("en-IN")}`;

function Header({ cartCount, page, setPage }) {
  const [query, setQuery] = useState("");
  return (
    <>
      <header className="topbar">
        <div className="brand-mark"><span className="brand-cross">✚</span><span>LAB TEST<br />BOOKING</span></div>
        <div className="searchbox"><Search size={19} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search for test and health checkup..." /></div>
        <div className="top-info"><MapPin size={18} /> <span>Bengaluru</span><ChevronDown size={15} /></div>
        <div className="top-info phone"><Phone size={18} /> <span>9240 222 222</span></div>
        <button className="login-btn"><UserRound size={17} /> Login / Signup</button>
      </header>
      <nav className="nav-bar">
        <button className={page === "home" ? "nav-active" : ""} onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("home")}>Book a Test <ChevronDown size={14} /></button>
        <button onClick={() => setPage("home")}>Health Packages</button>
        <button onClick={() => setPage("home")}>Buy Health Checkup</button>
        <button onClick={() => setPage("home")}>Upload Prescription</button>
        <button onClick={() => setPage("home")}>Corporate Wellness</button>
        <button onClick={() => setPage("home")}>About Us</button>
        <button className="nav-cart" onClick={() => document.getElementById("cart-panel")?.scrollIntoView({ behavior: "smooth" })}>
          <ShoppingCart size={20} /><span>{cartCount}</span>
        </button>
      </nav>
    </>
  );
}

function TestCard({ test, organ, addToCart, inCart }) {
  const [name, description, price] = test;
  return (
    <article className="test-card">
      <div className="test-art">{organ === "Diabetes" ? "🩸" : organ === "Liver" ? "🧬" : organ === "Thyroid" ? "🦋" : organ === "Kidney" ? "🫘" : "🔬"}</div>
      <h3>{name}</h3>
      <p>{description}</p>
      <strong>{money(price)}</strong>
      <button className={inCart ? "add-btn added" : "add-btn"} onClick={() => addToCart({ id: `${organ}-${name}`, name, organ, price })}>
        {inCart ? <CheckCircle2 size={16} /> : <Plus size={16} />} {inCart ? "Added to Cart" : "Add to Cart"}
      </button>
    </article>
  );
}

function CartPanel({ cart, removeFromCart, goToPatient }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <aside className="cart-panel" id="cart-panel">
      <div className="cart-title"><ShoppingCart size={22} /><h2>Your Cart</h2><span className="cart-count">{cart.length}</span></div>
      {cart.length === 0 ? (
        <div className="empty-cart"><div>🛒</div><strong>Your cart is empty</strong><p>Select tests to start your booking.</p></div>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-icon">{organs.find(o => o.name === item.organ)?.emoji || "🧪"}</div>
              <div className="cart-item-info"><strong>{item.name}</strong><small>{item.organ}</small><b>{money(item.price)}</b></div>
              <button className="remove-btn" aria-label={`Remove ${item.name}`} onClick={() => removeFromCart(item.id)}><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total"><span>Total Amount</span><strong>{money(total)}</strong></div>
      <button className="checkout-btn" disabled={!cart.length} onClick={goToPatient}>Proceed to Patient Details <ChevronRight size={18} /></button>
      <div className="secure-note"><ShieldCheck size={17} /> Secure & Trusted Booking</div>
    </aside>
  );
}

function PatientPage({ patient, setPatient, next }) {
  const update = (e) => setPatient({ ...patient, [e.target.name]: e.target.value });
  return (
    <section className="checkout-card">
      <button className="back-link" onClick={() => window.dispatchEvent(new Event("back-home"))}><ArrowLeft size={16} /> Back to tests</button>
      <div className="step-label">STEP 1 OF 3</div><h1>Patient Details</h1><p className="section-subtitle">Enter the details of the person taking the tests.</p>
      <form onSubmit={e => { e.preventDefault(); next(); }} className="patient-form">
        <label>Full name<input name="name" value={patient.name} onChange={update} placeholder="Enter patient full name" required /></label>
        <div className="form-two">
          <label>Age<input name="age" type="number" min="1" max="120" value={patient.age} onChange={update} placeholder="Age" required /></label>
          <label>Gender<select name="gender" value={patient.gender} onChange={update} required><option value="">Select gender</option><option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option></select></label>
        </div>
        {/* <label>Mobile number<input name="mobile" type="tel" pattern="[6-9][0-9]{9}" value={patient.mobile} onChange={update} placeholder="10-digit mobile number" required /></label> */}
        <label>
  Mobile number
  <input
    name="mobile"
    type="tel"
    inputMode="numeric"
    maxLength={10}
    pattern="[6-9][0-9]{9}"
    value={patient.mobile}
    onChange={(e) =>
      setPatient({
        ...patient,
        mobile: e.target.value.replace(/\D/g, "").slice(0, 10)
      })
    }
    placeholder="Enter 10-digit mobile number"
    title="Enter a valid 10-digit Indian mobile number"
    required
  />
</label>
        <label>Email address (optional)<input name="email" type="email" value={patient.email} onChange={update} placeholder="name@example.com" /></label>
        <button className="checkout-btn form-submit" type="submit">Continue to Schedule <ChevronRight size={18} /></button>
      </form>
    </section>
  );
}

function SchedulePage({ schedule, setSchedule, confirm }) {
  const today = new Date().toISOString().slice(0, 10);
  const slots = ["07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "04:00 PM", "05:00 PM"];
  return (
    <section className="checkout-card">
      <div className="step-label">STEP 2 OF 3</div><h1>Choose Date & Time</h1><p className="section-subtitle">Select a convenient date and available time slot.</p>
      <form onSubmit={e => { e.preventDefault(); confirm(); }} className="patient-form">
        <label>Appointment date<input type="date" min={today} value={schedule.date} onChange={e => setSchedule({ ...schedule, date: e.target.value })} required /></label>
        <label>Collection preference<select value={schedule.collection} onChange={e => setSchedule({ ...schedule, collection: e.target.value })}><option>Visit collection centre</option><option>Home sample collection</option></select></label>
        <div className="slot-heading"><Clock3 size={18} /> Available time slots</div>
        <div className="slot-grid">{slots.map(slot => <button type="button" key={slot} className={schedule.slot === slot ? "slot selected" : "slot"} onClick={() => setSchedule({ ...schedule, slot })}>{slot}</button>)}</div>
        <button className="checkout-btn form-submit" type="submit" disabled={!schedule.date || !schedule.slot}>Confirm Booking <ChevronRight size={18} /></button>
      </form>
    </section>
  );
}

export default function App() {
  const [selectedOrgan, setSelectedOrgan] = useState("Liver");
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home");
  const [patient, setPatient] = useState({ name: "", age: "", gender: "", mobile: "", email: "" });
  const [schedule, setSchedule] = useState({ date: "", slot: "", collection: "Visit collection centre" });
  const [bookingId, setBookingId] = useState("");
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);
  const tests = testCatalog[selectedOrgan];
  const addToCart = (item) => setCart(current => current.some(x => x.id === item.id) ? current : [...current, item]);
  const removeFromCart = (id) => setCart(current => current.filter(x => x.id !== id));

  React.useEffect(() => {
    const goBack = () => setPage("home");
    window.addEventListener("back-home", goBack);
    return () => window.removeEventListener("back-home", goBack);
  }, []);

  const finishBooking = () => {
    setBookingId(`LAB${Date.now().toString().slice(-7)}`);
    setPage("success");
  };

  return (
    <div className="app-shell">
      <Header cartCount={cart.length} page={page} setPage={setPage} />
      {page === "home" && (
        <main>
          <section className="intro-strip">
            <div><span className="eyebrow">SMART DIAGNOSTICS · SIMPLE BOOKING</span><h1>Your Health, <span>Our Priority.</span></h1><p>Explore health tests with interactive 3D anatomy and book with confidence.</p></div>
            <div className="intro-badge"><HeartPulse size={22} /><span>Explore your health</span></div>
          </section>
          <section className="organ-section">
            <div className="section-heading"><div><span className="eyebrow">EXPLORE BY HEALTH CATEGORY</span><h2>Choose an organ or health test</h2></div><span className="swipe-hint">Select a category to view tests <ChevronRight size={15} /></span></div>
            <div className="organ-grid">
              {organs.map(organ => (
                <button key={organ.name} className={selectedOrgan === organ.name ? "organ-tile active" : "organ-tile"} onClick={() => setSelectedOrgan(organ.name)}>
                  <span className="organ-emoji">{organ.emoji}</span><strong>{organ.name}</strong><small>{organ.subtitle}</small>
                </button>
              ))}
            </div>
          </section>
          <div className="booking-layout">
            <section className="tests-area">
              <div className="organ-feature">
                <div className="feature-copy"><span className="eyebrow">INTERACTIVE 3D ANATOMY</span><h2>{selectedOrgan} Health</h2><p>Explore the 3D model and find relevant diagnostic tests.</p><span className="model-hint">Drag to explore · Animated 3D model</span></div>
                <div className="feature-visual"><OrganScene organ={selectedOrgan} /></div>
              </div>
              <div className="tests-heading"><div><span className="eyebrow">AVAILABLE DIAGNOSTICS</span><h2>{selectedOrgan} Tests</h2></div><span>{tests.length} tests available</span></div>
              <div className="test-grid">
                {tests.map(test => <TestCard key={test[0]} test={test} organ={selectedOrgan} addToCart={addToCart} inCart={cart.some(item => item.id === `${selectedOrgan}-${test[0]}`)} />)}
              </div>
              <div className="trust-row">
                <div><Zap /><span>Easy Booking</span></div><div><ShieldCheck /><span>Secure & Private</span></div><div><FlaskConical /><span>Reliable Testing</span></div><div><Headphones /><span>Customer Support</span></div>
              </div>
            </section>
            <CartPanel cart={cart} removeFromCart={removeFromCart} goToPatient={() => setPage("patient")} />
          </div>
        </main>
      )}
      {page === "patient" && <main className="flow-page"><PatientPage patient={patient} setPatient={setPatient} next={() => setPage("schedule")} /><div className="flow-summary"><h3>Booking Summary</h3><p>{cart.length} selected tests</p><strong>{money(total)}</strong>{cart.map(item => <div key={item.id} className="summary-line"><span>{item.name}</span><b>{money(item.price)}</b></div>)}</div></main>}
      {page === "schedule" && <main className="flow-page"><SchedulePage schedule={schedule} setSchedule={setSchedule} confirm={finishBooking} /><div className="flow-summary"><h3>Patient & Test Summary</h3><p>{patient.name} · {patient.mobile}</p><strong>{money(total)}</strong>{cart.map(item => <div key={item.id} className="summary-line"><span>{item.name}</span><b>{money(item.price)}</b></div>)}</div></main>}
      {page === "success" && <main className="success-page"><div className="success-card"><div className="success-check"><CheckCircle2 size={58} /></div><span className="eyebrow">BOOKING REQUEST CONFIRMED</span><h1>Thank you, {patient.name}!</h1><p>Your demo booking has been created successfully.</p><div className="booking-id">Booking ID <strong>{bookingId}</strong></div><div className="success-details"><p><CalendarDays size={17} /> {schedule.date}</p><p><Clock3 size={17} /> {schedule.slot}</p><p><FlaskConical size={17} /> {cart.length} tests · {money(total)}</p></div><button className="checkout-btn" onClick={() => { setPage("home"); setCart([]); }}>Back to Home</button><small>This is a frontend demo. No real appointment or payment has been submitted.</small></div></main>}
      <footer className="footer"><span>Lab Test Booking System</span><span>Interactive demo · Frontend only</span></footer>
    </div>
  );
}
