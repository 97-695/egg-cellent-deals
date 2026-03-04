import { Search, Heart, ShoppingCart, User, MapPin } from "lucide-react";

const StoreHeader = () => {
  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-primary px-4 py-1">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-primary-foreground">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg tracking-tight">americanas</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>entregue em 65726-140</span>
            <span>baixe o app</span>
            <span>peça seu cartão</span>
            <span className="font-semibold">cliente ★</span>
            <span>mais vendidos</span>
            <span>nossas lojas</span>
            <span>entrega rápida</span>
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
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-card border-b border-border px-4 py-2 overflow-x-auto scrollbar-hide">
        <div className="mx-auto flex max-w-7xl items-center gap-6 text-xs text-muted-foreground whitespace-nowrap">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> todos os departamentos</span>
          <span>mercado</span>
          <span>climatização</span>
          <span>calçados</span>
          <span>eletrodomésticos</span>
          <span>informática</span>
          <span>áudio e vídeo</span>
          <span>eletropartáteis</span>
          <span>móveis</span>
          <span className="text-primary font-semibold">Páscoa</span>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;
