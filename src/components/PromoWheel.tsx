import { useState, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const segments = [
  { label: "10% OFF", color: "#e74c3c", emoji: "🥚" },
  { label: "60% OFF! 🎉", color: "#2ecc71", emoji: "🐰" },
  { label: "Frete Grátis", color: "#3498db", emoji: "📦" },
  { label: "15% OFF", color: "#f39c12", emoji: "🌷" },
  { label: "30% OFF", color: "#9b59b6", emoji: "🎀" },
  { label: "40% OFF", color: "#e67e22", emoji: "🍫" },
  { label: "5% OFF", color: "#1abc9c", emoji: "🐣" },
  { label: "Brinde Especial", color: "#e91e63", emoji: "🎁" },
];

const SEGMENT_ANGLE = 360 / segments.length; // 45deg

interface PromoWheelProps {
  onClose: (won: boolean) => void;
}

const PromoWheel = ({ onClose }: PromoWheelProps) => {
  const [open, setOpen] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [wheelRotation, setWheelRotation] = useState(0);

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);

    // Land on segment index 1 ("60% OFF! 🎉")
    const finalRotation = 5 * 360 + 292.5;
    setWheelRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult("60% OFF! 🎉");
    }, 4000);
  }, [spinning]);

  const handleClaim = () => {
    setOpen(false);
    onClose(true);
  };

  // Build conic-gradient
  const conicStops = segments
    .map((seg, i) => {
      const start = i * SEGMENT_ANGLE;
      const end = (i + 1) * SEGMENT_ANGLE;
      return `${seg.color} ${start}deg ${end}deg`;
    })
    .join(", ");

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setOpen(false);
          onClose(!!result);
        }
      }}
    >
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden border-0 bg-gradient-to-b from-[#4a1a6b] to-[#2d1045] rounded-2xl [&>button]:hidden">
        <div className="p-6 text-center relative overflow-hidden">
          {/* Floating Easter decorations */}
          <div className="absolute top-2 left-4 text-3xl opacity-60 animate-bounce" style={{ animationDelay: "0s" }}>🐰</div>
          <div className="absolute top-8 right-6 text-2xl opacity-50 animate-bounce" style={{ animationDelay: "0.5s" }}>🥚</div>
          <div className="absolute bottom-20 left-6 text-2xl opacity-40 animate-bounce" style={{ animationDelay: "1s" }}>🌷</div>
          <div className="absolute bottom-16 right-4 text-3xl opacity-50 animate-bounce" style={{ animationDelay: "0.3s" }}>🐣</div>

          {/* Header */}
          <div className="mb-5 relative z-10">
            <div className="text-5xl mb-1">🐰🥚🐣</div>
            <h2 className="text-2xl font-extrabold text-yellow-300 mt-2 drop-shadow-lg"
              style={{ textShadow: "0 2px 10px rgba(255,200,0,0.5)" }}>
              PROMOÇÃO DE PÁSCOA!
            </h2>
            <p className="text-white/80 text-sm mt-1">
              Gire a roleta e ganhe um desconto especial! 🎉
            </p>
          </div>

          {/* Wheel container */}
          <div className="relative inline-flex items-center justify-center mb-5">
            {/* Outer glow ring */}
            <div className="absolute w-[300px] h-[300px] rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #ffd700, #ff6b6b, #ffd700, #ff6b6b, #ffd700)",
                filter: "blur(8px)",
                opacity: 0.4,
              }}
            />

            {/* Pointer at top */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 drop-shadow-lg">
              <div
                className="w-0 h-0"
                style={{
                  borderLeft: "14px solid transparent",
                  borderRight: "14px solid transparent",
                  borderTop: "28px solid #ffd700",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
                }}
              />
            </div>

            {/* Wheel */}
            <div
              className="relative w-[280px] h-[280px] rounded-full border-4 border-yellow-400 shadow-2xl overflow-hidden"
              style={{
                background: `conic-gradient(${conicStops})`,
                transform: `rotate(${wheelRotation}deg)`,
                transition: spinning
                  ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                  : "none",
              }}
            >
              {/* Segment labels */}
              {segments.map((seg, i) => {
                const angle = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
                return (
                  <div
                    key={i}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                      transform: `rotate(${angle}deg)`,
                    }}
                  >
                    <div
                      className="absolute left-1/2 top-[12px] -translate-x-1/2 flex flex-col items-center"
                      style={{
                        transformOrigin: "center center",
                      }}
                    >
                      <span className="text-lg">{seg.emoji}</span>
                      <span
                        className="text-[10px] font-bold text-white whitespace-nowrap"
                        style={{
                          textShadow: "0 1px 3px rgba(0,0,0,0.7)",
                        }}
                      >
                        {seg.label}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Segment lines */}
              {segments.map((_, i) => (
                <div
                  key={`line-${i}`}
                  className="absolute top-0 left-1/2 w-[1px] h-1/2 bg-white/30 origin-bottom"
                  style={{ transform: `rotate(${i * SEGMENT_ANGLE}deg)` }}
                />
              ))}

              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-2xl">🐰</span>
              </div>
            </div>
          </div>

          {/* Result or Spin button */}
          <div className="relative z-10">
            {result ? (
              <div className="space-y-3 animate-fade-in">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-yellow-400/30">
                  <p className="text-white/70 text-sm">🎊 Você ganhou:</p>
                  <p className="text-3xl font-extrabold text-yellow-300 mt-1"
                    style={{ textShadow: "0 2px 10px rgba(255,200,0,0.5)" }}>
                    {result}
                  </p>
                  <p className="text-white/60 text-xs mt-2">
                    60% de desconto em qualquer produto! 🍫🥚
                  </p>
                </div>
                <Button
                  onClick={handleClaim}
                  className="w-full font-bold text-lg py-6 rounded-xl border-0"
                  style={{
                    background: "linear-gradient(135deg, #ffd700, #ff8c00)",
                    color: "#2d1045",
                    boxShadow: "0 4px 20px rgba(255,200,0,0.4)",
                  }}
                >
                  🎉 RESGATAR PROMOÇÃO
                </Button>
              </div>
            ) : (
              <Button
                onClick={spin}
                disabled={spinning}
                className="w-full font-bold text-lg py-6 rounded-xl border-0 disabled:opacity-70"
                style={{
                  background: spinning
                    ? "linear-gradient(135deg, #888, #666)"
                    : "linear-gradient(135deg, #ffd700, #ff8c00)",
                  color: spinning ? "#fff" : "#2d1045",
                  boxShadow: spinning ? "none" : "0 4px 20px rgba(255,200,0,0.4)",
                }}
              >
                {spinning ? "🎰 Girando..." : "🎰 GIRAR A ROLETA!"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoWheel;
