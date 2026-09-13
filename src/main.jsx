import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const IMG = {
  orange: "https://framerusercontent.com/images/gvDePnG7SFuMYRcLz8gds6FuqA.jpg?height=1067&width=1600",
  light: "https://framerusercontent.com/images/Kyen7mFblouHakJsJjmgR7i3Hc.jpg?height=1067&width=1600",
  dark: "https://framerusercontent.com/images/71pE2LDGiiOhjNUgW8mZXEjQk.jpg?height=1067&width=1600",
};

const BUSINESS_EMAIL = "business@oblasia.com";
const PHONE = "+917340159100";
const WHATSAPP = `https://wa.me/${PHONE.replace("+", "")}`;

const projects = [
  ["01", "Bloomberg / Film & Motion", "Film · Motion", "2026", IMG.orange, "A kinetic brand film built around speed, texture and controlled light.", "Brand film, motion design, edit, finishing"],
  ["02", "Kinetic Studies", "Animation · Art Direction", "2026", IMG.light, "Experimental motion studies for campaigns that need a stronger visual pulse.", "2D/3D animation, art direction, title design"],
  ["03", "Campaign / Visual Direction", "Campaign · Photography", "2026", IMG.dark, "A visual system spanning stills, moving image and social cutdowns.", "Campaign photography, visual direction, social"],
  ["04", "After Dark", "Editorial · Film", "2026", IMG.orange, "An atmospheric editorial language made for culture-first brands.", "Editorial film, photography, color, sound"],
  ["05", "Object / Product Stories", "Commercial · Product", "2026", IMG.light, "Product worlds built with precision, texture and cinematic restraint.", "Product film, tabletop, retouching"],
  ["06", "Human / Portrait Series", "Photography · Editorial", "2026", IMG.dark, "Portrait-led storytelling for people, brands and cultural platforms.", "Portraits, casting, lighting, editorial production"],
];

const services = [
  ["01", "Animation", "3D, 2D, motion systems, title design and frame-by-frame craft."],
  ["02", "Film", "Commercials, branded films, documentaries, social campaigns and post."],
  ["03", "Photography", "Campaign stills, portraits, product, editorial and production."],
  ["04", "Creative Direction", "Concepts, visual identities, storyboards and end-to-end direction."],
  ["05", "Post Production", "Edit, color, compositing, sound, finishing and delivery systems."],
  ["06", "Production", "Crew, casting, locations, equipment and production management."],
];

const roles = [
  ["01", "Photographer", "Campaign, editorial, portrait and product photographers."],
  ["02", "Voice Artist", "Voice artists for films, commercials, explainers and branded content."],
  ["03", "Videographer", "Hybrid shooters and cinematographers comfortable on fast productions."],
  ["04", "Assistant", "Production, camera, lighting and creative assistants."],
  ["05", "Director of Photography", "DOPs with a strong visual language and production experience."],
  ["06", "Drone Operator", "Licensed / experienced drone operators for cinematic aerial work."],
  ["07", "Editor", "Editors who can shape story, pace, sound and social cutdowns."],
  ["08", "Animator / 3D Artist", "Motion designers, 3D artists and compositors."],
  ["09", "Producer", "Creative producers and production managers who make things happen."],
  ["10", "Other Creative Talent", "If your craft is exceptional and not listed, introduce yourself."],
];

const links = [
  ["/", "Home"],
  ["/work", "Work"],
  ["/portfolio", "Portfolio"],
  ["/services", "Services"],
  ["/about", "About"],
  ["/roster", "Roster"],
  ["/careers", "Careers"],
  ["/contact", "Contact"],
];

const go = (path) => {
  location.hash = path;
  window.scrollTo({ top: 0, behavior: "instant" });
};

function useRoute() {
  const [path, setPath] = useState(() => location.hash.slice(1) || "/");
  useEffect(() => {
    const onHash = () => setPath(location.hash.slice(1) || "/");
    addEventListener("hashchange", onHash);
    return () => removeEventListener("hashchange", onHash);
  }, []);
  return path;
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

function Layout({ children }) {
  const [menu, setMenu] = useState(false);
  const route = useRoute();
  useReveal();

  useEffect(() => {
    const pointer = (e) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    addEventListener("pointermove", pointer);
    return () => removeEventListener("pointermove", pointer);
  }, []);

  return (
    <div className="site">
      <div className="glow" />
      <div className="grain" />
      <div className="progress" />
      <header className="nav">
        <button className="logo" onClick={() => go("/")}>OBLASIA<span>®</span></button>
        <nav className={menu ? "links open" : "links"}>
          {links.map(([path, name]) => (
            <button
              key={path}
              className={route === path ? "active" : ""}
              onClick={() => { go(path); setMenu(false); }}
            >
              {name}
            </button>
          ))}
        </nav>
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Open navigation">
          <i /><i />
        </button>
        <button className="navcta" onClick={() => go("/contact")}>Start a project ↗</button>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footTop">
        <div>
          <small>OBLASIA® / GLOBAL STUDIO</small>
          <h2>Make something<br /><em>impossible to ignore.</em></h2>
        </div>
        <button className="round" onClick={() => go("/contact")}>↗</button>
      </div>

      <div className="footGrid">
        <div><small>Studio</small><b>OBLASIA STUDIO</b></div>
        <div><small>Business</small><a href={`mailto:${BUSINESS_EMAIL}`}><b>{BUSINESS_EMAIL}</b></a></div>
        <div><small>Phone</small><a href={`tel:${PHONE}`}><b>{PHONE}</b></a></div>
        <div><small>Network</small><b>USA · INDIA · GLOBAL</b></div>
      </div>

      <div className="footerBottom">
        <span>© 2026 OBLASIA® · ALL RIGHTS RESERVED</span>
        <a className="designer" href={WHATSAPP} target="_blank" rel="noreferrer">
          Designed by <strong>Himanshu Khandelwal</strong> ↗
        </a>
      </div>
    </footer>
  );
}

function Card({ project, index = 0 }) {
  const p = project;
  return (
    <article className={`card reveal d${index}`} onClick={() => go(`/work/${p[0]}`)}>
      <div className="cardImg">
        <img src={p[4]} alt={p[1]} />
        <span>{p[0]}</span>
        <div>View case ↗</div>
      </div>
      <section>
        <div><small>{p[2]}</small><h3>{p[1]}</h3></div>
        <small>{p[3]}</small>
      </section>
    </article>
  );
}

function Hero({ label, title, text, img }) {
  return (
    <section className="pageHero">
      <div className="pageHeroImg" style={{ backgroundImage: `url(${img})` }} />
      <div>
        <small className="reveal">{label}</small>
        <h1 className="reveal d1">{title}</h1>
        <p className="reveal d2">{text}</p>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <img src={IMG.orange} alt="OBLASIA creative studio" />
        <div className="heroShade" />
        <div className="heroCopy">
          <small className="reveal">GLOBAL STUDIO · USA FOCUS</small>
          <h1 className="reveal d1">Stories that move<br /><em>at the speed</em><br />of culture.</h1>
          <div className="heroBottom reveal d2">
            <p>Animation · Film · Photography<br />Creative direction · Production</p>
            <button onClick={() => document.querySelector("#intro")?.scrollIntoView({ behavior: "smooth" })}>Scroll to enter ↓</button>
          </div>
        </div>
      </section>

      <section id="intro" className="paper section">
        <small>01 / WHAT WE DO</small>
        <div className="split">
          <h2>Made<br /><em>to move.</em></h2>
          <div>
            <p className="lead">OBLASIA is an independent creative studio for brands that don't stand still.</p>
            <p>We build films, animation and visual worlds with a sharp point of view — from first sketch to final frame.</p>
            <button className="link" onClick={() => go("/services")}>Explore capabilities ↗</button>
          </div>
        </div>
        <div className="ribbon">
          {services.slice(0, 4).map((s) => <div key={s[0]}><small>{s[0]}</small><b>{s[1]}</b></div>)}
        </div>
      </section>

      <section className="section">
        <div className="head">
          <div><small>02 / SELECTED MOTION</small><h2>Frame by <em>frame.</em></h2></div>
          <button className="link" onClick={() => go("/portfolio")}>View portfolio ↗</button>
        </div>
        <div className="grid">{projects.slice(0, 3).map((p, i) => <Card key={p[0]} project={p} index={i} />)}</div>
      </section>

      <div className="marquee"><div>ANIMATION · FILM · PHOTOGRAPHY · CREATIVE DIRECTION · PRODUCTION · OBLASIA STUDIO · </div></div>

      <section className="paper manifesto section">
        <small>03 / OUR APPROACH</small>
        <h2>We don't chase<br /><em>attention.</em><br />We earn it.</h2>
        <div className="manifestoRow">
          <span>01</span><p>Concept over decoration.</p>
          <span>02</span><p>Emotion over noise.</p>
          <span>03</span><p>Craft all the way down.</p>
        </div>
      </section>

      <section className="dark homeCta">
        <small>04 / WORK WITH OBLASIA</small>
        <h2>Have a story?<br /><em>Let's make it move.</em></h2>
        <button onClick={() => go("/contact")}>Start a project ↗</button>
      </section>
    </>
  );
}

function Work({ detail }) {
  if (detail) {
    const p = projects.find((x) => x[0] === detail) || projects[0];
    return (
      <>
        <section className="detailHero" style={{ backgroundImage: `url(${p[4]})` }}>
          <div><small>CASE STUDY / {p[0]}</small><h1>{p[1]}</h1></div>
        </section>
        <section className="section detail">
          <div><small>PROJECT</small><p className="lead">{p[5]}</p></div>
          <div>
            <div className="facts">
              <span>Scope<b>{p[2]}</b></span>
              <span>Year<b>{p[3]}</b></span>
              <span>Studio<b>OBLASIA®</b></span>
            </div>
            <p>From first visual reference to final master, every frame was shaped to feel intentional, tactile and unmistakably alive.</p>
            <p><strong>Production:</strong> {p[6]}.</p>
          </div>
        </section>
        <div className="detailImg"><img src={p[4]} alt={p[1]} /></div>
        <section className="section"><button className="link" onClick={() => go("/work")}>← Back to selected work</button></section>
      </>
    );
  }

  return (
    <>
      <Hero label="02 / SELECTED WORK" title={<>Work that<br /><em>moves.</em></>} text="A growing archive of motion, image and ideas made for brands, artists and culture." img={IMG.light} />
      <section className="section all">{projects.map((p, i) => <Card key={p[0]} project={p} index={i % 3} />)}</section>
    </>
  );
}

function Portfolio() {
  return (
    <>
      <Hero label="03 / PORTFOLIO" title={<>A visual<br /><em>archive.</em></>} text="Selected work across film, animation, photography, campaigns and visual direction." img={IMG.dark} />
      <section className="paper portfolioIntro">
        <small>THE OBLASIA ARCHIVE</small>
        <h2>Still images.<br /><em>Moving images.</em><br />One visual language.</h2>
        <p>Every project begins with a point of view. Browse selected work below, then reach out when you have a brief worth making real.</p>
      </section>
      <section className="section portfolioGrid">
        {projects.map((p, i) => (
          <article className={`portfolioTile reveal d${i % 3}`} onClick={() => go(`/work/${p[0]}`)} key={p[0]}>
            <img src={p[4]} alt={p[1]} />
            <div><small>{p[0]} · {p[2]}</small><h3>{p[1]}</h3><span>Open project ↗</span></div>
          </article>
        ))}
      </section>
      <section className="dark"><small>HAVE A PROJECT?</small><h2>Let's put your<br /><em>world in motion.</em></h2><button onClick={() => go("/contact")}>Talk to the studio ↗</button></section>
    </>
  );
}

function Services() {
  return (
    <>
      <Hero label="04 / CAPABILITIES" title={<>One studio.<br /><em>Many frames.</em></>} text="Strategy, creative and production under one roof — with the flexibility to scale around the work." img={IMG.dark} />
      <section className="paper services">
        {services.map((s) => <div className="service reveal" key={s[0]}><span>{s[0]}</span><h2>{s[1]}</h2><p>{s[2]}</p><b>↗</b></div>)}
      </section>
      <section className="paper serviceProcess section">
        <small>HOW WE WORK</small>
        <div className="processGrid">
          <div><span>01</span><h3>Brief</h3><p>We understand the story, audience, ambition and constraints.</p></div>
          <div><span>02</span><h3>Build</h3><p>Concept, visual language, crew, production and post come together.</p></div>
          <div><span>03</span><h3>Deliver</h3><p>One considered final world, adapted across every required format.</p></div>
        </div>
      </section>
      <section className="dark"><small>BUILT AROUND THE IDEA</small><h2>Bring us the brief.<br /><em>We'll find the frame.</em></h2><button onClick={() => go("/contact")}>Start a project ↗</button></section>
    </>
  );
}

function About() {
  return (
    <>
      <Hero label="05 / THE STUDIO" title={<>Small team.<br /><em>Big world.</em></>} text="Independent by design. Global by reach. OBLASIA brings directors, animators, photographers and producers together around the idea." img={IMG.orange} />
      <section className="paper section about">
        <div><small>THE POINT OF VIEW</small></div>
        <div>
          <p className="lead">The best work happens when craft and culture collide.</p>
          <p>We keep the core team close and build the wider crew around each project. That means senior attention without agency layers — and access to the right talent when the brief gets ambitious.</p>
          <p>OBLASIA STUDIO works across commercial, editorial, branded and cultural projects, with a production mindset that keeps ideas sharp from first conversation to final delivery.</p>
          <div className="stats">
            <b>06<small>Core capabilities</small></b>
            <b>∞<small>Creative directions</small></b>
            <b>01<small>Obsessive standard</small></b>
          </div>
        </div>
      </section>
      <div className="band"><img src={IMG.light} alt="OBLASIA studio visual" /></div>
      <section className="section values">
        <small>WHAT MATTERS</small>
        <div className="valuesGrid">
          <div><span>01</span><h3>Curiosity</h3><p>We look outside the obvious reference and keep the visual language evolving.</p></div>
          <div><span>02</span><h3>Precision</h3><p>Small decisions compound into work that feels expensive, intentional and alive.</p></div>
          <div><span>03</span><h3>People</h3><p>The right collaborator can change everything. That's why our network matters.</p></div>
        </div>
      </section>
    </>
  );
}

function Roster() {
  return (
    <>
      <Hero label="06 / INDEPENDENT NETWORK" title={<>Make room for<br /><em>the makers.</em></>} text="Shooters, voice artists, editors, producers and every sharp freelance talent in between — if you make exceptional work, we want to know you." img={IMG.light} />
      <section className="section roster">
        {roles.map(([num, title, text]) => (
          <div className="rosterCard reveal" key={title}>
            <small>{num}</small><h2>{title}</h2><p>{text}</p>
          </div>
        ))}
      </section>
      <section className="dark"><small>JOIN THE ROSTER</small><h2>Good people make<br /><em>better work.</em></h2><a href={`mailto:${BUSINESS_EMAIL}?subject=OBLASIA%20Roster%20Application`}>Introduce yourself ↗</a></section>
    </>
  );
}

function Careers() {
  const [selected, setSelected] = useState("");
  const role = roles.find((r) => r[1] === selected);
  const subject = selected ? `OBLASIA Job Application — ${selected}` : "OBLASIA Job Application";

  return (
    <>
      <Hero label="07 / CAREERS & OPEN CALLS" title={<>Bring your<br /><em>craft.</em></>} text="OBLASIA is always looking for exceptional people across production, photography, film, voice, post and motion." img={IMG.orange} />

      <section className="paper careersIntro section">
        <small>OPEN CALL / GLOBAL</small>
        <h2>We're building a<br /><em>sharp network.</em></h2>
        <p>Choose the role closest to your craft. There is no need to wait for a listed vacancy — if your work is strong, send it. We review portfolios and introductions at <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>.</p>
      </section>

      <section className="section careers">
        <div className="careerHead"><small>POSITIONS / 10</small><p>Freelance · Project-based · Global</p></div>
        <div className="careerList">
          {roles.map(([num, title, text]) => (
            <button className={`careerRow ${selected === title ? "selected" : ""}`} onClick={() => setSelected(title)} key={title}>
              <span>{num}</span><h3>{title}</h3><p>{text}</p><b>↗</b>
            </button>
          ))}
        </div>
      </section>

      <section className="paper applyBox section">
        <div>
          <small>APPLICATION</small>
          <h2>{selected ? `Apply as ${selected}.` : "Ready to make something?"}</h2>
          <p>{selected ? "Your email will open with the role selected. Attach your portfolio, reel or relevant links before sending." : "Select a role above, then introduce yourself with your strongest work."}</p>
        </div>
        <a className="applyButton" href={`mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name:\nLocation:\nRole:\nPortfolio / Reel:\nInstagram / Website:\nShort introduction:\n")}`}>
          Email application ↗
        </a>
      </section>
    </>
  );
}

function Contact() {
  return (
    <>
      <section className="contact paper">
        <div>
          <small>08 / START A CONVERSATION</small>
          <h1>Have a brief?<br /><em>Let's make it move.</em></h1>
          <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL} ↗</a>
        </div>
        <div className="contactGrid">
          <div><small>Business & projects</small><a href={`mailto:${BUSINESS_EMAIL}`}><b>{BUSINESS_EMAIL}</b></a></div>
          <div><small>Studio phone</small><a href={`tel:${PHONE}`}><b>{PHONE}</b></a></div>
          <div><small>Studio</small><b>OBLASIA STUDIO</b></div>
          <div><small>Network</small><b>USA · INDIA · GLOBAL</b></div>
        </div>
      </section>
      <section className="dark contactCta">
        <small>DIRECT LINE</small>
        <h2>WhatsApp the<br /><em>studio.</em></h2>
        <a href={WHATSAPP} target="_blank" rel="noreferrer">Open WhatsApp ↗</a>
      </section>
    </>
  );
}

function App() {
  const route = useRoute();
  let page =
    route === "/" ? <Home /> :
    route === "/work" ? <Work /> :
    route.startsWith("/work/") ? <Work detail={route.split("/")[2]} /> :
    route === "/portfolio" ? <Portfolio /> :
    route === "/services" ? <Services /> :
    route === "/about" ? <About /> :
    route === "/roster" ? <Roster /> :
    route === "/careers" ? <Careers /> :
    <Contact />;

  return <Layout>{page}</Layout>;
}

createRoot(document.getElementById("root")).render(<App />);

addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  document.documentElement.style.setProperty("--scroll", max ? (scrollY / max) * 100 : 0);
}, { passive: true });
