/**
 * AmbientGlow
 *
 * Renders soft radial amber + violet glow blobs behind page content.
 *
 * Usage:
 *   import AmbientGlow from "../components/AmbientGlow";
 *   <AmbientGlow />
 */

const AmbientGlow = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Top-left amber glow */}
    <div
      style={{
        position: "absolute",
        top: "-5%",
        left: "20%",
        width: "480px",
        height: "480px",
        background: "radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)",
        filter: "blur(60px)",
        borderRadius: "50%",
      }}
    />
    {/* Bottom-right amber glow */}
    <div
      style={{
        position: "absolute",
        bottom: "10%",
        right: "15%",
        width: "360px",
        height: "360px",
        background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
        filter: "blur(70px)",
        borderRadius: "50%",
      }}
    />
    {/* Center violet accent */}
    <div
      style={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
        filter: "blur(50px)",
        borderRadius: "50%",
      }}
    />
  </div>
);

export default AmbientGlow;