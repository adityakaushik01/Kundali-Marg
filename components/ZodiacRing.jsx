/**
 * ZodiacRing
 *
 * Place 12 images in /src/assets/zodiac/ named:
 * aries.png, taurus.png, gemini.png, cancer.png, leo.png, virgo.png,
 * libra.png, scorpio.png, sagittarius.png, capricorn.png, aquarius.png, pisces.png
 *
 * Usage:
 *   import ZodiacRing from "../components/ZodiacRing";
 *   <ZodiacRing />
 */

const ZODIAC_IMAGES = [
  { name: "Aries",       src: "src/assets/aries.png"       },
  { name: "Taurus",      src: "src/assets/taurus.png"      },
  { name: "Gemini",      src: "src/assets/gemini.png"      },
  { name: "Cancer",      src: "src/assets/cancer.png"      },
  { name: "Leo",         src: "src/assets/leo.png"         },
  { name: "Virgo",       src: "src/assets/virgo.png"       },
  { name: "Libra",       src: "src/assets/libra.png"       },
  { name: "Scorpio",     src: "src/assets/scorpio.png"     },
  { name: "Sagittarius", src: "src/assets/sagittarius.png" },
  { name: "Capricorn",   src: "src/assets/capricorn.png"   },
  { name: "Aquarius",    src: "src/assets/aquarius.png"    },
  { name: "Pisces",      src: "src/assets/pisces.png"      },
];

const RING_RADIUS = 450;
const ICON_SIZE   = 100;
const RING_SIZE   = 760;

const ZodiacRing = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    <style>{`
      @keyframes zr-spin {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to   { transform: translate(-50%, -50%) rotate(360deg); }
      }
      @keyframes zr-counterSpin {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to   { transform: translate(-50%, -50%) rotate(-360deg); }
      }
    `}</style>

    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: `${RING_SIZE}px`,
        height: `${RING_SIZE}px`,
        animation: "zr-spin 120s linear infinite",
      }}
    >
      {/* Faint ring circle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: `${RING_RADIUS * 2}px`,
          height: `${RING_RADIUS * 2}px`,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "1px solid rgba(245,158,11,0.08)",
        }}
      />

      {ZODIAC_IMAGES.map((zodiac, i) => {
        const angle = (i / ZODIAC_IMAGES.length) * 360;
        const rad   = (angle * Math.PI) / 180;
        const x     = RING_SIZE / 2 + RING_RADIUS * Math.sin(rad);
        const y     = RING_SIZE / 2 - RING_RADIUS * Math.cos(rad);

        return (
          <img
            key={zodiac.name}
            src={zodiac.src}
            alt={zodiac.name}
            style={{
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
              width: `${ICON_SIZE}px`,
              height: `${ICON_SIZE}px`,
              objectFit: "contain",
              opacity: 0.12,
              transform: "translate(-50%, -50%)",
              animation: "zr-counterSpin 120s linear infinite",
              filter: "brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(5deg)"
            }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        );
      })}
    </div>
  </div>
);

export default ZodiacRing;