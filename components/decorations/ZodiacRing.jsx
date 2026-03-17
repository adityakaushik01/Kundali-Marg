import aries from "../../src/assets/zodiac-signs/aries.png";
import taurus from "../../src/assets/zodiac-signs/taurus.png";
import gemini from "../../src/assets/zodiac-signs/gemini.png";
import cancer from "../../src/assets/zodiac-signs/cancer.png";
import leo from "../../src/assets/zodiac-signs/leo.png";
import virgo from "../../src/assets/zodiac-signs/virgo.png";
import libra from "../../src/assets/zodiac-signs/libra.png";
import scorpio from "../../src/assets/zodiac-signs/scorpio.png";
import sagittarius from "../../src/assets/zodiac-signs/sagittarius.png";
import capricorn from "../../src/assets/zodiac-signs/capricorn.png";
import aquarius from "../../src/assets/zodiac-signs/aquarius.png";
import pisces from "../../src/assets/zodiac-signs/pisces.png";

const ZODIAC_IMAGES = [
  { name: "Aries", src: aries },
  { name: "Taurus", src: taurus },
  { name: "Gemini", src: gemini },
  { name: "Cancer", src: cancer },
  { name: "Leo", src: leo },
  { name: "Virgo", src: virgo },
  { name: "Libra", src: libra },
  { name: "Scorpio", src: scorpio },
  { name: "Sagittarius", src: sagittarius },
  { name: "Capricorn", src: capricorn },
  { name: "Aquarius", src: aquarius },
  { name: "Pisces", src: pisces },
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