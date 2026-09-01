import { Link } from 'react-router-dom';

/* Feature-card artwork (hosted on Tinder's CDN).
   If the wrong picture lands on the wrong card, just swap two URLs below. */
const ART = {
  cherry: 'https://tinder.com/static/build/08421da885c9615b0d718a82c54c5e5b.webp',
  moon: 'https://tinder.com/static/build/656acdfe52796afe429cb6b3f694aad1.webp',
  music: 'https://tinder.com/static/build/2410fd1c701e077323b1f575af075a4a.webp',
  circle: 'https://tinder.com/static/build/d2f09124ee83db4510162b8422d1566c.webp',
};

/* -------------------------------------------------------------------------- */
/*  Small shared bits                                                          */
/* -------------------------------------------------------------------------- */

function CtaButton({ to = '/login', children, variant = 'solid', className = '' }) {
  const base =
    'inline-flex items-center justify-center rounded-full px-8 h-[52px] text-[16px] font-bold transition-colors duration-200';
  const styles =
    variant === 'solid'
      ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-teal-400 hover:to-blue-500'
      : 'border-2 border-current bg-transparent hover:bg-white/10';
  return (
    <Link to={to} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

/* Per-card colour treatment, mirroring tinder.com. */
const CARD_THEMES = {
  maroon: {
    bg: 'bg-[#5b0e12]',
    tag: 'text-white/85',
    title: 'text-white',
    body: 'text-white/90',
  },
  aubergine: {
    bg: 'bg-[#2a1a2f]',
    tag: 'text-[#f0a9d0]',
    title: 'text-[#f0a9d0]',
    body: 'text-white/90',
  },
  light: {
    bg: 'bg-white',
    tag: 'text-gray-500',
    title: 'text-gray-900',
    body: 'text-gray-700',
  },
};

function FeatureCard({ tag, title, blurb, img, theme }) {
  const t = CARD_THEMES[theme] || CARD_THEMES.light;
  return (
    <div
      data-aos="fade-up"
      className={`flex min-h-[560px] flex-col rounded-2xl p-8 md:min-h-[84vh] md:p-10 ${t.bg}`}
    >
      {/* top: label + headline */}
      <div>
        <p className={`text-sm font-bold ${t.tag}`}>{tag}</p>
        <h3
          className={`mt-2 font-serif text-[34px] font-bold leading-[1.05] md:text-[46px] ${t.title}`}
        >
          {title}
        </h3>
      </div>

      {/* middle: artwork fills the gap */}
      <div className="flex flex-1 items-center justify-center py-6">
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="max-h-[40vh] max-w-[80%] object-contain md:max-h-[46vh]"
        />
      </div>

      {/* bottom: copy + link */}
      <div className={t.body}>
        <p className="text-[15px] leading-relaxed md:text-base">{blurb}</p>
        <span className="mt-2 inline-block text-[15px] font-bold underline underline-offset-4">
          Learn more →
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sections                                                                   */
/* -------------------------------------------------------------------------- */

function WhatsNew() {
  return (
    <section className="bg-[#f7f6f3] px-4 pb-16 pt-16 md:px-6 md:pt-20">
      <div className="mx-auto max-w-[1500px]">
        <h2
          data-aos="fade-up"
          className="font-serif text-[30px] font-semibold leading-tight tracking-tight text-black md:text-[46px]"
        >
          A lot has changed since your last swipe.
        </h2>

        <div className="mt-8 grid gap-3 md:mt-10 md:grid-cols-3">
          <FeatureCard
            tag="Circle Mode"
            title="With friends > without"
            blurb="Meeting new people hits different in a group. Bring a friend, they bring a friend."
            img={ART.cherry}
            theme="maroon"
          />
          <FeatureCard
            tag="Vibe Match"
            title="Shared wavelength"
            blurb="See what drives someone before you say hi. Match on goals, interests and energy."
            img={ART.moon}
            theme="aubergine"
          />
          <FeatureCard
            tag="Taste Mode"
            title="Common ground"
            blurb="Your music, books and side projects on your profile. Find people who actually get it."
            img={ART.music}
            theme="light"
          />
        </div>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="bg-[#f7f6f3] px-6 pb-28 md:pb-36">
      <div className="mx-auto max-w-4xl" data-aos="fade-up">
        <p className="font-poppins text-[27px] font-medium leading-[1.3] tracking-tight text-red-600 md:text-[44px] md:leading-[1.25]">
          The best things that ever happened to you started with{' '}
          <span className="font-serif italic font-normal">
            &ldquo;let&rsquo;s just see.&rdquo;
          </span>
        </p>
        <p className="mt-7 font-poppins text-[21px] font-medium leading-[1.45] tracking-tight text-red-600/85 md:mt-9 md:text-[30px] md:leading-[1.4]">
          More people to learn from. More rooms to walk into. More momentum than
          you&rsquo;d ever build alone.
        </p>
        <p className="mt-10 font-serif text-lg italic text-red-600/70 md:mt-12 md:text-xl">
          &ndash;&nbsp;Welcome to Tinder
        </p>
      </div>
    </section>
  );
}

function CircleMode() {
  return (
    <section className="bg-gradient-to-b from-red-600 to-red-800 px-6 pb-24 pt-28 text-center text-white md:pb-32 md:pt-36">
      <div className="mx-auto max-w-4xl">
        <h2
          data-aos="fade-up"
          className="font-serif text-[30px] font-bold leading-[1.12] text-pink-200 md:text-[50px]"
        >
          You + a friend
          <br />
          Them + a friend
          <br />
          No big deal
          <br />
          <span className="text-white">
            Hangouts <em className="italic">hit different</em> in a group
          </span>
        </h2>
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-200/80 md:text-xs">
          Meet Circle Mode
        </p>

        <div className="mt-16 md:mt-24" data-aos="fade-up">
          <h3 className="font-serif text-2xl font-bold md:text-4xl">
            Party of <em className="italic">four</em>
          </h3>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-pink-50/90 md:text-[17px]">
            Meeting people doesn&rsquo;t have to feel like an interview. Circle
            Mode keeps it simple &mdash; you bring someone, they bring someone,
            and suddenly it&rsquo;s just four people figuring out if this turns
            into something: a friendship, a collaboration, a new part of your
            circle. Less pressure. More real.
          </p>
        </div>

        <div className="mt-12 md:mt-16" data-aos="zoom-in">
          <img
            src={ART.circle}
            alt="Friends meeting up in a group"
            loading="lazy"
            className="mx-auto w-full max-w-3xl"
          />
        </div>
      </div>
    </section>
  );
}

function VibeMatch() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 text-center text-white md:py-32"
      style={{
        backgroundColor: '#0b1020',
        backgroundImage:
          'radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)',
        backgroundSize: '42px 42px',
      }}
    >
      <div className="mx-auto max-w-4xl">
        <h2
          data-aos="fade-up"
          className="text-3xl font-extrabold leading-tight md:text-5xl"
        >
          A little <em className="italic">context</em>
          <br />
          goes a long way
        </h2>
        <p className="mt-4 text-sm uppercase tracking-widest text-indigo-300/80">
          Vibe Match
        </p>

        <div className="mt-16" data-aos="fade-up">
          <h3 className="text-2xl font-bold md:text-3xl">
            Shared <em className="italic">chemistry</em>
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-slate-300">
            What someone is working toward is already the conversation. Vibe
            Match puts your goals, interests and energy on your profile, so you
            can find the people who match your direction &mdash; or complement
            it. Filter by what matters to you, or let it come up naturally.
          </p>
        </div>

        <div
          className="mx-auto mt-14 grid max-w-3xl gap-4 md:grid-cols-2"
          data-aos="fade-up"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Your focus
            </p>
            <p className="mt-2 text-sm text-slate-200">
              Building a startup · Learning to run · Reading more · Finding a gym
              buddy
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              You and Julian
            </p>
            <p className="mt-2 text-sm text-slate-200">
              92% aligned &mdash; both into side projects, early mornings and
              long walks with no agenda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TasteMode() {
  return (
    <section className="bg-pink-100 px-6 py-24 text-center md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2
          data-aos="fade-up"
          className="text-3xl font-extrabold leading-tight text-fuchsia-600 md:text-5xl"
        >
          A shared obsession says more than{' '}
          <em className="italic">&ldquo;hey&rdquo;</em> ever could
        </h2>
        <p className="mt-4 text-sm uppercase tracking-widest text-fuchsia-500/70">
          Taste Mode
        </p>

        <div className="mt-16" data-aos="fade-up">
          <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">
            No <em className="italic">small talk</em>
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-gray-700">
            Put what you&rsquo;re into on your profile &mdash; the music, the
            books, the projects, the rabbit holes. Taste Mode surfaces people who
            are into the same things. Skip &ldquo;hey.&rdquo; Start with
            something real.
          </p>
        </div>

        <div
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
          data-aos="zoom-in"
        >
          <div className="-rotate-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-lg">
            &ldquo;Let&rsquo;s go skate this weekend&rdquo;
          </div>
          <div className="rotate-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-lg">
            &ldquo;You&rsquo;ve read this one too?&rdquo;
          </div>
          <div className="-rotate-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-lg">
            &ldquo;Same playlist, no notes&rdquo;
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyTinder() {
  return (
    <section className="bg-red-600 px-6 py-24 text-white md:py-32">
      <div className="mx-auto max-w-4xl" data-aos="fade-up">
        <h2 className="text-3xl font-extrabold md:text-5xl">
          Ok but&hellip; <em className="italic">why</em> Tinder?
        </h2>
        <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-pink-50/90 md:text-[17px]">
          <p>
            Tinder is where you meet the people you wouldn&rsquo;t have met
            otherwise &mdash; a new friend, a collaborator, a mentor, the person
            who invites you to the thing that changes your year. Behind every
            match is a real person, and that has always been the point.
          </p>
          <p>
            Create a profile, set what you&rsquo;re looking for, and start
            swiping. When you both swipe right, it&rsquo;s a match. From there
            it&rsquo;s yours: send a message, make a plan, see where it goes.
          </p>
          <p>
            With Circle Mode, Vibe Match, Taste Mode and more, Tinder is built
            for every kind of connection &mdash; casual, close, or somewhere in
            between. Download the Tinder app free on iOS and Android.
          </p>
        </div>
        <div className="mt-10">
          <CtaButton variant="outline">Get the app</CtaButton>
        </div>
      </div>
    </section>
  );
}

function Questions() {
  return (
    <section className="bg-[#f7f6f3] px-6 py-24 text-center md:py-28">
      <div className="mx-auto max-w-3xl" data-aos="fade-up">
        <h2 className="text-3xl font-extrabold text-gray-900 md:text-5xl">
          Any questions? Everyone has <em className="italic">at least</em> one.
        </h2>
        <div className="mt-8">
          <CtaButton to="/login" variant="outline" className="text-gray-900">
            Visit FAQs
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h: 'Legal', items: ['Privacy', 'Cookie Policy', 'Terms', 'Community Guidelines'] },
    { h: 'Careers', items: ['Tech Blog', 'Careers Portal', 'Press Room'] },
    { h: 'Social', items: ['Instagram', 'TikTok', 'YouTube', 'Twitter'] },
  ];
  return (
    <footer className="overflow-hidden bg-[#111] px-6 pt-16 text-gray-400">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
        {cols.map((col) => (
          <div key={col.h}>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {col.h}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {col.items.map((i) => (
                <li key={i}>
                  <a href="#" className="hover:text-white">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-6xl text-xs text-gray-600">
        © {new Date().getFullYear()} Tinder — built for connection and growth.
      </p>

      <h2 className="mt-6 select-none whitespace-nowrap text-center text-[22vw] font-extrabold leading-[0.8] tracking-tight text-red-600">
        Tinder
      </h2>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */

export default function LandingSections() {
  return (
    <div className="w-full">
      <WhatsNew />
      <Statement />
      <CircleMode />
      <VibeMatch />
      <TasteMode />
      <WhyTinder />
      <Questions />
      <Footer />
    </div>
  );
}
