import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const segments = [
  { label: "10% OFF", color: "#e74c3c" },
  { label: "2 POR 1! 🎉", color: "#2ecc71" },
  { label: "Frete Grátis", color: "#3498db" },
  { label: "15% OFF", color: "#f39c12" },
  { label: "30% OFF", color: "#9b59b6" },
  { label: "40% OFF", color: "#e67e22" },
  { label: "2 POR 1! 🎉", color: "#1abc9c" },
  { label: "Brinde Especial", color: "#e91e63" },
];

interface PromoWheelProps {
  onClose: (won: boolean) => void;
}

const PromoWheel = ({ onClose }: PromoWheelProps) => {
  const [open, setOpen] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);

  const segmentAngle = 360 / segments.length;

  // Draw wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 10;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-center, -center);

    segments.forEach((seg, i) => {
      const startAngle = (i * segmentAngle * Math.PI) / 180;
      const endAngle = ((i + 1) * segmentAngle * Math.PI) / 180;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + (segmentAngle * Math.PI) / 360);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 13px 'Open Sans', sans-serif";
      ctx.fillText(seg.label, radius - 15, 5);
      ctx.restore();
    });

    ctx.restore();

    // Center circle
    ctx.beginPath();
    ctx.arc(center, center, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "hsl(var(--border))";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [rotation]);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    // Always land on segment index 1 ("2 POR 1! 🎉")
    // Segment 1 center is at 1.5 * segmentAngle = 67.5 degrees
    // The pointer is at the top (270 degrees in canvas coords, or effectively 0 degrees since we read from top)
    // We need the wheel to stop so segment 1 is at the pointer
    // Pointer is at right (0°), segment 1 center is at segmentAngle * 1.5
    // Final rotation should place segment 1 at 0°: 360 - (segmentAngle * 1.5)
    const targetOffset = 360 - segmentAngle * 1.5;
    const totalSpins = 5; // full rotations
    const finalDegrees = totalSpins * 360 + targetOffset;

    let start: number | null = null;
    const duration = 4000;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setRotation(eased * finalDegrees);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        setResult("2 POR 1! 🎉");
      }
    };

    requestAnimationFrame(animate);
  };

  const handleClaim = () => {
    setOpen(false);
    onClose(true);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { setOpen(false); onClose(!!result); } }}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 bg-gradient-to-b from-primary to-primary/90">
        <div className="p-6 text-center">
          {/* Header */}
          <div className="mb-4">
            <span className="text-4xl">🐰</span>
            <h2 className="text-xl font-extrabold text-primary-foreground mt-2">
              PROMOÇÃO DE PÁSCOA!
            </h2>
            <p className="text-primary-foreground/80 text-sm mt-1">
              Gire a roleta e ganhe um desconto especial!
            </p>
          </div>

          {/* Wheel */}
          <div className="relative inline-block mb-4">
            {/* Pointer */}
            <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 z-10 text-2xl">
              ▶
            </div>
            <canvas
              ref={canvasRef}
              width={280}
              height={280}
              className="rounded-full shadow-lg"
            />
          </div>

          {/* Result or Spin button */}
          {result ? (
            <div className="space-y-3">
              <div className="bg-card rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Você ganhou:</p>
                <p className="text-2xl font-extrabold text-primary">{result}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Leve 2 ovos de Páscoa pelo preço de 1!
                </p>
              </div>
              <Button
                onClick={handleClaim}
                className="w-full bg-accent text-accent-foreground font-bold text-lg py-6 hover:bg-accent/90"
              >
                🎉 RESGATAR PROMOÇÃO
              </Button>
            </div>
          ) : (
            <Button
              onClick={spin}
              disabled={spinning}
              className="w-full bg-accent text-accent-foreground font-bold text-lg py-6 hover:bg-accent/90 disabled:opacity-70"
            >
              {spinning ? "Girando..." : "🎰 GIRAR A ROLETA!"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoWheel;
