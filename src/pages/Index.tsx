import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreHeader from "@/components/StoreHeader";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import PromoWheel from "@/components/PromoWheel";
import { products, Product } from "@/data/products";

const categories = [
  { emoji: "🥚", label: "ovo surpresa" },
  { emoji: "💖", label: "ovo de Páscoa Barbie" },
  { emoji: "🍪", label: "ovo de Páscoa Trakinas" },
  { emoji: "🐢", label: "ovo de Páscoa Tortuguita" },
  { emoji: "🐕", label: "ovo de Páscoa Patrulha Canina" },
  { emoji: "🦔", label: "ovo de Páscoa Sonic" },
];

const priceRanges = [
  { label: "R$25", color: "bg-primary" },
  { label: "R$50", color: "bg-primary" },
  { label: "R$100", color: "bg-primary" },
  { label: "R$250", color: "bg-primary" },
];

const Index = () => {
  const [promoActive, setPromoActive] = useState(false);
  const [showWheel, setShowWheel] = useState(true);
  const [selectedEggs, setSelectedEggs] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleSelectEgg = (product: Product) => {
    setSelectedEggs((prev) => {
      const isSelected = prev.some((p) => p.id === product.id);
      if (isSelected) return prev.filter((p) => p.id !== product.id);
      if (prev.length >= 2) return prev;
      const next = [...prev, product];
      if (next.length === 2) {
        setTimeout(() => {
          navigate("/checkout", { state: { selectedEggs: next, promoActive: true } });
        }, 500);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader cartCount={selectedEggs.length} />

      {showWheel && (
        <PromoWheel
          onClose={(won) => {
            setShowWheel(false);
            if (won) setPromoActive(true);
          }}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 pt-6">
        <h1 className="text-xl font-bold text-foreground mb-4">
          ovo de páscoa infantil
        </h1>

        <div className="flex gap-6 mb-6 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => (
            <div key={cat.label} className="flex flex-col items-center gap-1 cursor-pointer min-w-[80px]">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center text-3xl hover:shadow-md transition-shadow">
                {cat.emoji}
              </div>
              <span className="text-[10px] text-center text-muted-foreground leading-tight">
                {cat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-foreground mb-2">
            navegue pelo preço desejado
          </p>
          <div className="flex gap-3">
            {priceRanges.map((range) => (
              <button
                key={range.label}
                className="bg-primary text-primary-foreground rounded-full px-6 py-2 text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                ovo de páscoa por até{" "}
                <span className="text-lg">{range.label}</span>
              </button>
            ))}
          </div>
        </div>

        {promoActive && (
          <div className="bg-primary/10 border-2 border-primary rounded-lg p-4 mb-6 flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <p className="font-bold text-primary text-lg">
                PROMOÇÃO ATIVA: 2 Ovos pelo preço de 1!
              </p>
              <p className="text-sm text-muted-foreground">
                Selecione 2 ovos abaixo para aproveitar a promoção.
                {selectedEggs.length > 0 && (
                  <span className="font-bold text-primary ml-2">
                    ({selectedEggs.length}/2 selecionados)
                  </span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12">
        <div className="flex gap-6">
          <div className="hidden lg:block w-56 flex-shrink-0">
            <FilterSidebar />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-foreground font-semibold">
                listagem de produtos
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {products.length} produtos encontrados
                </span>
                <select className="text-xs border border-border rounded px-2 py-1 bg-card">
                  <option>ordenar por: mais relevantes</option>
                  <option>menor preço</option>
                  <option>maior preço</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  promoActive={promoActive}
                  isSelected={selectedEggs.some((p) => p.id === product.id)}
                  onSelect={promoActive ? () => handleSelectEgg(product) : undefined}
                  selectionFull={selectedEggs.length >= 2}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
