import { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Stars from "../../components/decorations/Stars";
import ZodiacRing from "../../components/decorations/ZodiacRing";
import DecorativeElement from "../../components/decorations/DecorativeElement";
import BottomDecorativeElement from "../../components/decorations/BottomDecorativeElement";
import AmbientGlow from "../../components/decorations/AmbientGlow";
import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    category: "Vedic Basics",
    title: "What Is a Kundali? Understanding Your Vedic Birth Chart",
    excerpt: "Your Kundali is more than a horoscope. It is a precise astronomical snapshot of the sky at the moment of your birth — a map Vedic astrologers have used for millennia.",
    featured: true,
    tags: ["Kundali", "Beginners", "Jyotish"],
    content: `
## What Is a Kundali?

A Kundali — also called a Janam Kundali or birth chart — is a map of the sky at the exact moment and place of your birth. In Vedic astrology (Jyotish), this chart is considered a precise record of the planetary positions that were in effect when you entered the world.

Unlike Western astrology which focuses primarily on the Sun sign, Vedic astrology places equal — often greater — importance on the Moon sign (Rashi) and the Ascendant (Lagna). These three together form the core of your astrological identity.

## What Does a Kundali Contain?

A complete Kundali includes:

**The 12 Houses (Bhavas)** — each governing a specific domain of life such as self, wealth, communication, home, children, health, relationships, transformation, luck, career, community, and liberation.

**The 9 Planets (Navagrahas)** — Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu, each placed in a specific house and sign.

**The Ascendant (Lagna)** — the zodiac sign rising on the eastern horizon at your birth moment. This shapes your physical self and overall life approach.

**Planetary Aspects** — how planets influence each other and various houses based on their positions.

## Why Does Birth Time Matter?

The Ascendant changes approximately every two hours. A difference of even 10–15 minutes in birth time can shift which sign is rising, changing the entire house structure of the chart. This is why Vedic astrologers always ask for the most accurate birth time possible.

## The North Indian Style Chart

Kundali Marg uses the **North Indian diamond-style chart** — the most widely used format across northern India. In this format, the Ascendant is always placed in the top-centre diamond, and the houses remain fixed in position while the signs rotate based on your Lagna.

## How to Read Your Chart

Reading a Kundali is a lifelong study, but the starting point is simple. Identify your Lagna (Ascendant sign) — this is house 1. Find where your Moon is placed — this is your Rashi. Note which houses your planets occupy and look at which planets are strong or weak based on the sign they occupy.

Your Kundali is not a prediction set in stone — it is a map of tendencies, strengths, and karmic patterns. How you navigate that map is always your choice.
    `,
  },
  {
    id: 2,
    category: "Planets & Grahas",
    title: "The Nine Grahas: How Each Planet Shapes Your Destiny",
    excerpt: "In Vedic astrology, nine celestial bodies — Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu — each carry distinct energies that influence every area of human life.",
    featured: false,
    tags: ["Planets", "Grahas", "Jyotish"],
    content: `
## The Navagrahas — Nine Planets of Vedic Astrology

In Jyotish, the term "Graha" means "that which seizes or influences." The nine Grahas are the primary forces through which cosmic energy expresses itself in a human life. Unlike modern astronomy, Vedic astrology includes two shadow planets — Rahu and Ketu — which represent the lunar nodes and carry profound karmic significance.

## Surya (Sun)

The Sun represents the soul, authority, father, government, and vitality. A strong Sun gives confidence, leadership, and clarity of purpose. It rules Leo and is exalted in Aries.

## Chandra (Moon)

The Moon governs the mind, emotions, mother, home, and the subconscious. It changes signs approximately every 2.5 days, making it the fastest-moving Graha. It rules Cancer and is exalted in Taurus.

## Mangal (Mars)

Mars is the planet of energy, courage, conflict, siblings, and land. A well-placed Mars gives drive and physical strength. It rules Aries and Scorpio, and is exalted in Capricorn.

## Budha (Mercury)

Mercury rules communication, intellect, trade, and skills. It is the significator of speech and logical reasoning. It rules Gemini and Virgo, and is exalted in Virgo.

## Guru (Jupiter)

Jupiter is the great teacher — the planet of wisdom, expansion, children, spirituality, and fortune. It is the most benefic planet in Jyotish. It rules Sagittarius and Pisces, and is exalted in Cancer.

## Shukra (Venus)

Venus governs beauty, love, luxury, arts, and relationships. It is the significator of marriage and material pleasures. It rules Taurus and Libra, and is exalted in Pisces.

## Shani (Saturn)

Saturn is the planet of karma, discipline, delays, servants, and longevity. It teaches through challenge and restriction. It rules Capricorn and Aquarius, and is exalted in Libra.

## Rahu (North Node)

Rahu is a shadow planet with no physical body. It represents obsession, foreign lands, technology, unconventional paths, and worldly desire. It is considered a malefic but can give great material success.

## Ketu (South Node)

Ketu is the southern lunar node, opposite Rahu. It represents spiritual liberation, past-life karma, detachment, and mysticism. Where Rahu pulls toward the material, Ketu pulls toward the spiritual.

## Planetary Strength

A planet's strength depends on the sign it occupies, the house it is placed in, and its relationship with other planets. A strong benefic planet is a gift; a strong malefic demands discipline.
    `,
  },
  {
    id: 3,
    category: "Houses & Bhavas",
    title: "The 12 Houses of the Kundali: A Guide to the Bhavas",
    excerpt: "Each of the 12 houses in a Vedic birth chart governs a specific domain of life — from self and family to career, relationships, and spiritual liberation.",
    featured: false,
    tags: ["Houses", "Bhavas", "Chart Reading"],
    content: `
## The 12 Bhavas — Houses of the Kundali

The 12 houses of the Kundali divide life into distinct areas of experience. Every planet in your chart occupies one of these houses, colouring that area of life with the planet's energy. Understanding the houses is the foundation of chart interpretation.

## 1st House — Tanu Bhava (Self)

The house of the self, physical body, personality, and overall life direction. The Ascendant lord here is the most important planet in the chart.

## 2nd House — Dhana Bhava (Wealth)

Governs accumulated wealth, family, speech, food, and early childhood. Planets here influence your relationship with money and your voice.

## 3rd House — Sahaja Bhava (Courage)

Rules siblings, short journeys, communication, hands, and personal effort. A strong 3rd house gives courage and skill.

## 4th House — Sukha Bhava (Happiness)

The house of the mother, home, vehicles, land, and inner peace. It reflects your emotional foundation and sense of security.

## 5th House — Putra Bhava (Children and Intellect)

Governs children, creativity, intelligence, romance, and past-life merit (Purva Punya). A strong 5th house gives wisdom and luck.

## 6th House — Ari Bhava (Enemies and Health)

Rules enemies, debt, disease, service, and daily work. Planets here can indicate health challenges or the capacity to overcome obstacles.

## 7th House — Yuvati Bhava (Partnership)

The house of marriage, partnerships, business relationships, and open enemies. The most important house for relationship analysis.

## 8th House — Mrityu Bhava (Transformation)

Governs longevity, death, sudden events, inheritance, occult knowledge, and deep transformation. Feared but deeply important for spiritual growth.

## 9th House — Dharma Bhava (Fortune)

The most auspicious house — it rules luck, father, religion, higher learning, long journeys, and dharma. A strong 9th house is a great blessing.

## 10th House — Karma Bhava (Career)

The house of career, public life, status, and one's contribution to the world. The most visible house in the chart.

## 11th House — Labha Bhava (Gains)

Governs income, gains, elder siblings, social networks, and the fulfilment of desires. Planets here bring abundance.

## 12th House — Vyaya Bhava (Liberation)

The house of expenditure, foreign lands, isolation, sleep, and spiritual liberation (Moksha). It dissolves the boundaries of the self.

## How to Interpret Houses

Look at three things for each house: the sign occupying it, any planets placed within it, and the condition of its lord (ruling planet). All three together tell the full story of that life area.
    `,
  },
  {
    id: 4,
    category: "Dasha System",
    title: "Vimshottari Dasha: Reading the Timing of Your Life",
    excerpt: "The Vimshottari Dasha system is one of Jyotish's most powerful tools — a 120-year planetary period cycle that reveals which planet governs each phase of your life.",
    featured: false,
    tags: ["Dasha", "Timing", "Advanced"],
    content: `
## What Is the Vimshottari Dasha?

The word "Vimshottari" means 120 in Sanskrit. The Vimshottari Dasha is a system of planetary periods that spans 120 years — the theoretical maximum human lifespan in Vedic tradition. It is the most widely used timing system in Jyotish and is considered extraordinarily accurate for predicting the unfolding of karma over a lifetime.

## How It Works

The system is based on the position of your Moon at birth. The nakshatra (lunar mansion) the Moon occupies determines which planetary period (Mahadasha) is running at the time of birth, and how many years of that period remain.

The 9 planets each rule a Mahadasha of a specific duration. The Sun rules 6 years, the Moon 10 years, Mars 7 years, Rahu 18 years, Jupiter 16 years, Saturn 19 years, Mercury 17 years, Ketu 7 years, and Venus 20 years. The total adds up to 120 years, and the sequence always follows this fixed order.

## Mahadasha and Antardasha

Within each Mahadasha (major period), there are sub-periods called **Antardashas** (also called Bhuktis). Each of the 9 planets rules an Antardasha within every Mahadasha, in the same fixed sequence. This creates a two-level timing system of remarkable precision.

For example, during a Saturn Mahadasha (19 years), the first Antardasha is Saturn-Saturn, followed by Saturn-Mercury, Saturn-Ketu, and so on.

## How to Interpret a Dasha Period

The results of a Dasha period depend on the condition of the Dasha lord in your natal chart — its sign, house, and planetary relationships. They also depend on which houses the Dasha lord rules, and what the planets are doing in the sky during that period (transits).

A person running a Jupiter Mahadasha with a strong, well-placed Jupiter will typically experience expansion, learning, and good fortune. The same period for someone with a debilitated Jupiter may bring over-confidence or poor judgment instead.

## Why This Matters

The Dasha system explains why life feels fundamentally different at different ages — why your 20s feel nothing like your 40s even if your circumstances are similar. You are literally living under different planetary rulerships, each activating different parts of your chart.
    `,
  },
  {
    id: 5,
    category: "Relationships",
    title: "Kundali Milan: What Compatibility Matching Really Means",
    excerpt: "Kundali Milan is the traditional Vedic method for assessing compatibility between two individuals, examining 36 qualities across eight categories of harmony.",
    featured: false,
    tags: ["Compatibility", "Relationships", "Milan"],
    content: `
## What Is Kundali Milan?

Kundali Milan — also called Ashtakoot Milan or Gun Milan — is the traditional Vedic system for assessing compatibility between two individuals, most commonly before marriage. It examines eight specific categories of harmony (Koots) between two birth charts, assigning points to each, with a maximum total of 36 points.

## The Eight Koots

**Varna (1 point)** — Spiritual compatibility and ego levels. Assesses whether both individuals are operating at a similar spiritual wavelength.

**Vashya (2 points)** — The natural attraction and influence between the two. Indicates who holds more natural sway in the relationship.

**Tara (3 points)** — Birth star compatibility. Examines the relationship between the Moon nakshatras of both individuals for health and wellbeing in the union.

**Yoni (4 points)** — Physical and temperamental compatibility. Each nakshatra is associated with a specific animal symbol, and the relationship between these symbols indicates natural harmony.

**Graha Maitri (5 points)** — Friendship between the Moon sign lords of both individuals. Indicates mental compatibility, shared values, and intellectual rapport.

**Gana (6 points)** — Temperament compatibility. Nakshatras are divided into three Ganas: Deva (divine), Manushya (human), and Rakshasa (demon). The Gana match determines temperamental harmony.

**Bhakoot (7 points)** — Emotional and financial compatibility. Examines the relationship between the Moon signs of both partners.

**Nadi (8 points)** — The most important Koot. Nadi relates to health, genetics, and progeny. A Nadi dosha (mismatch) is traditionally considered a serious concern.

## Interpreting the Score

A score below 18 is generally considered incompatible. Between 18 and 24 is average compatibility. Between 24 and 32 is good compatibility. Between 32 and 36 is excellent compatibility.

## The Bigger Picture

A high Gun Milan score does not guarantee a happy marriage, and a low score does not doom a relationship. Traditional astrologers also examine both charts individually for the strength of the 7th house, the condition of Venus and Jupiter, and the presence of any Doshas before drawing conclusions. Kundali Milan is one lens — not the only one.
    `,
  },
  {
    id: 6,
    category: "Technology",
    title: "How We Built Kundali Marg: Precision Astrology Meets Modern Tech",
    excerpt: "Behind every birth chart on Kundali Marg is Swiss Ephemeris — the same engine used by professional astrologers worldwide. Here is how we built it.",
    featured: false,
    tags: ["Technology", "Behind the Scenes"],
    content: `
## The Challenge

Building a Vedic astrology application is a deceptively deep problem. The calculations involved — planetary longitudes, house cusps, nakshatra positions, ayanamsha corrections — require astronomical precision. A small error in any of these propagates into every interpretation built on top of it.

We wanted Kundali Marg to be something we could stand behind technically. That meant no shortcuts on the calculation layer.

## Swiss Ephemeris

The planetary calculation engine at the heart of Kundali Marg is **Swiss Ephemeris** — an open-source, high-precision ephemeris originally developed by Astrodienst in Switzerland. It is the same engine used by professional astrological software worldwide, and its accuracy is validated against NASA's JPL ephemeris data.

Swiss Ephemeris handles precise planetary longitudes for any date, time, and location, along with ayanamsha correction (we use the Lahiri ayanamsha, the standard for Vedic astrology), house cusp calculations, and accurate positions for Rahu and Ketu.

## The Stack

Kundali Marg is a full-stack JavaScript application built with React, Vite, and Tailwind CSS on the frontend, Node.js and Express on the backend, and MongoDB Atlas for storage. Authentication uses JWT with OTP-based email login. The app is deployed on Render.

The Kundali generation happens entirely on the backend. When you submit your birth details, our server calls Swiss Ephemeris, computes all planetary positions, calculates the Ascendant and house cusps, assigns each planet to its house and nakshatra, and returns the complete chart data to the frontend for rendering.

## The AI Layer

On top of the precise chart data, we layer an AI guide called Nakshatra — built to interpret your chart through the lens of classical Vedic principles. Nakshatra receives your full chart data as context and uses it to answer your questions, explain planetary placements, and help you understand what the chart is saying.

The goal was never to replace a human Jyotishi. It was to make the first layer of Vedic astrology — understanding what your chart contains and what it means — accessible to everyone, at any time.

## What's Next

We are working on expanding the calculation layer to include Vimshottari Dasha timelines, Ashtakavarga tables, divisional charts, and Kundali Milan scoring — all calculated with the same Swiss Ephemeris precision as the core birth chart.
    `,
  },
];

const categories = [
  "All",
  "Vedic Basics",
  "Planets & Grahas",
  "Houses & Bhavas",
  "Dasha System",
  "Relationships",
  "Technology",
];

const renderContent = (content) => {
  const lines = content.trim().split("\n");
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-lg font-light tracking-wider text-white mt-8 mb-3">
          {line.replace("## ", "")}
        </h2>
      );
      i++;
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    const parseBold = (text) => {
      const parts = text.split(/\*\*(.*?)\*\*/g);
      return parts.map((part, pi) =>
        pi % 2 === 1 ? (
          <span key={pi} className="text-white/85 font-normal">
            {part}
          </span>
        ) : (
          part
        )
      );
    };

    elements.push(
      <p key={i} className="text-sm font-light opacity-60 leading-relaxed mb-3">
        {parseBold(line)}
      </p>
    );
    i++;
  }

  return elements;
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [openPost, setOpenPost] = useState(null);

  useEffect(() => {
    if (openPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openPost]);

  const filtered = posts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured =
    activeCategory === "All" && search === ""
      ? filtered.find((p) => p.featured)
      : null;
  const rest = featured ? filtered.filter((p) => !p.featured) : filtered;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-teal-900 text-white relative overflow-hidden">
      <Stars />
      <ZodiacRing />
      <DecorativeElement />
      <AmbientGlow />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 text-center px-6 py-24 md:py-32">
        <p className="text-amber-400 text-xs tracking-[0.4em] mb-4 uppercase">
          Wisdom &amp; Insights
        </p>
        <h1 className="text-4xl md:text-6xl font-light tracking-wider mb-6">
          THE KUNDALI MARG
          <br />
          <span className="font-normal">JOURNAL</span>
        </h1>
        <p className="text-sm font-light opacity-60 max-w-xl mx-auto leading-relaxed mb-10">
          Guides on Vedic astrology, chart interpretation, and the technology
          behind Kundali Marg — for seekers at every level.
        </p>
        <div className="relative max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm font-light placeholder-white/30 focus:outline-none focus:border-amber-500/40 transition-all duration-300"
          />
        </div>
      </section>

      {/* Category filters */}
      <section className="relative z-10 px-6 pb-12">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`text-xs tracking-widest px-5 py-2 rounded-full border transition-all duration-300 font-light ${
                activeCategory === c
                  ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                  : "border-white/10 bg-white/3 opacity-50 hover:opacity-80 hover:border-white/20"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="relative z-10 py-6 px-6 bg-black/20">
          <div className="max-w-5xl mx-auto">
            <div
              onClick={() => setOpenPost(featured)}
              className="relative p-8 md:p-10 rounded-2xl border border-amber-500/15 bg-gradient-to-br from-amber-950/20 to-transparent hover:border-amber-500/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs tracking-widest text-amber-400 border border-amber-500/30 rounded-full px-3 py-1 bg-amber-500/5">
                  Featured
                </span>
                <span className="text-xs tracking-widest opacity-40 border border-white/10 rounded-full px-3 py-1">
                  {featured.category}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light tracking-wider mb-4 leading-snug">
                {featured.title}
              </h2>
              <p className="text-sm font-light opacity-60 leading-relaxed max-w-2xl mb-6">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
                <span className="text-amber-400 text-xs tracking-widest opacity-70">
                  READ ARTICLE
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Post grid */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {rest.length === 0 && !featured ? (
            <div className="text-center py-20 opacity-40">
              <p className="text-sm font-light tracking-wider">No articles found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {rest.map((post) => (
                <article
                  key={post.id}
                  onClick={() => setOpenPost(post)}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md hover:border-amber-400/30 transition-all duration-300 cursor-pointer flex flex-col gap-4"
                >
                  <span className="text-xs tracking-widest opacity-50 border border-white/10 rounded-full px-3 py-1 self-start">
                    {post.category}
                  </span>
                  <h3 className="text-sm font-normal tracking-wide leading-relaxed">
                    {post.title}
                  </h3>
                  <p className="text-xs font-light opacity-55 leading-relaxed flex-1">
                    {post.excerpt.slice(0, 110)}...
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs opacity-30 font-light">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative z-10 py-16 px-6 bg-black/20">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-amber-400 text-xs tracking-[0.4em] mb-3 uppercase">
            Stay Updated
          </p>
          <h2 className="text-3xl font-light tracking-wider mb-4">
            NEW ARTICLES, MONTHLY
          </h2>
          <p className="text-sm font-light opacity-50 leading-relaxed mb-8">
            Guides on Vedic astrology, new feature announcements, and insights
            from the Jyotish tradition — delivered thoughtfully.
          </p>
          <div className="flex gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm font-light placeholder-white/30 focus:outline-none focus:border-amber-500/40 transition-all duration-300"
            />
            <button className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-full text-xs font-medium tracking-widest transition-all duration-300 whitespace-nowrap">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-28 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 rounded-full bg-amber-600/10 blur-[50px]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[420px] h-[420px] rounded-full border border-amber-500/10" />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-amber-500/8" />
        </div>
        <p className="relative text-amber-400 text-xs tracking-[0.4em] mb-4 uppercase">
          Discover More
        </p>
        <h2 className="relative text-4xl md:text-5xl font-light tracking-wider mb-5">
          Your Destiny
          <br />
          Is Waiting
        </h2>
        <p className="relative opacity-50 mb-10 text-sm font-light tracking-wide">
          Discover what the universe has written for you.
        </p>
        <Link
          to="/signup"
          className="relative inline-block bg-amber-600 hover:bg-amber-500 text-white px-14 py-4 rounded-full font-medium tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(217,119,6,0.4)]"
        >
          CREATE YOUR KUNDALI
        </Link>
      </section>

      {/* Footer */}
      <section className="relative z-10 py-16 px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-6 text-xs font-light opacity-40 mb-2">
            {["Home", "About", "Services", "Privacy Policy", "Terms of Service"].map(
              (l) => (
                <a
                  key={l}
                  href="#"
                  className="hover:text-amber-400 hover:opacity-100 transition-all duration-200"
                >
                  {l}
                </a>
              )
            )}
          </div>
          <p className="text-xs opacity-20 mt-8 tracking-widest">
            © {new Date().getFullYear()} KUNDALI MARG
          </p>
        </div>
      </section>

      <BottomDecorativeElement />

      {/* Read Modal */}
      {openPost && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
          style={{ background: "rgba(0,0,0,0.80)", backdropFilter: "blur(8px)" }}
          onClick={() => setOpenPost(null)}
        >
          <div
            className="relative w-full md:max-w-2xl max-h-[92vh] md:max-h-[85vh] bg-gradient-to-b from-slate-900 to-gray-900 border border-white/10 rounded-t-2xl md:rounded-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-xs tracking-widest opacity-40 border border-white/10 rounded-full px-3 py-1">
                  {openPost.category}
                </span>
                <span className="text-xs opacity-25 hidden sm:block">
                  {openPost.date} · {openPost.readTime} read
                </span>
              </div>
              <button
                onClick={() => setOpenPost(null)}
                className="text-white/30 hover:text-white/70 transition-colors duration-200 text-lg leading-none ml-4"
              >
                ✕
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-6 md:px-8 py-6">
              <h1 className="text-2xl md:text-3xl font-light tracking-wider mb-6 leading-snug">
                {openPost.title}
              </h1>
              <div>{renderContent(openPost.content)}</div>
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/5">
                {openPost.tags.map((tag) => (
                  <span key={tag} className="text-xs opacity-25 font-light">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal footer CTA */}
            <div className="px-6 py-4 border-t border-white/5 flex-shrink-0">
              <Link
                to="/signup"
                className="block text-center bg-amber-600 hover:bg-amber-500 text-white py-3 rounded-full font-medium tracking-widest text-xs transition-all duration-300"
              >
                CREATE YOUR KUNDALI
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;