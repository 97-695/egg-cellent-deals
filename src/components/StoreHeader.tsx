import { useState } from "react";
import { Search, Heart, ShoppingCart, User, MapPin } from "lucide-react";

interface StoreHeaderProps {
  cartCount?: number;
}

const StoreHeader = ({ cartCount = 0 }: StoreHeaderProps) => {
  const [cep, setCep] = useState("");
  const [cepConfirmed, setCepConfirmed] = useState(false);

  const handleCepSubmit = () => {
    if (cep.replace(/\D/g, "").length === 8) {
      setCepConfirmed(true);
    }
  };

  const formatCep = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    return digits;
  };

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-primary px-4 py-1">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-primary-foreground">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg tracking-tight">americanas</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {cepConfirmed ? (
                <span>
                  entregue em {cep}{" "}
                  <button onClick={() => setCepConfirmed(false)} className="underline ml-1">
                    alterar
                  </button>
                </span>
              ) : (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="digite seu CEP"
                    value={cep}
                    onChange={(e) => setCep(formatCep(e.target.value))}
                    onKeyDown={(e) => e.key === "Enter" && handleCepSubmit()}
                    className="bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 rounded px-2 py-0.5 text-xs w-24 outline-none"
                  />
                  <button
                    onClick={handleCepSubmit}
                    className="bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded px-2 py-0.5 text-xs transition-colors"
                  >
                    ok
                  </button>
                </div>
              )}
            </div>
            <span>baixe o app</span>
            <span>peça seu cartão</span>
            <span className="font-semibold">cliente ★</span>
            <span>mais vendidos</span>
            <span>nossas lojas</span>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="bg-primary px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="busque aqui seu produto"
              className="w-full rounded-full py-2 px-4 pr-10 text-sm text-foreground outline-none"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <div className="hidden md:flex items-center gap-4 text-primary-foreground">
            <div className="flex items-center gap-1 text-xs">
              <User className="h-5 w-5" />
              <span>olá, faça seu login</span>
            </div>
            <Heart className="h-5 w-5" />
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;
