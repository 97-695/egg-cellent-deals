import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StoreHeader from "@/components/StoreHeader";
import { Product } from "@/data/products";
import { productImagesById } from "@/data/productImages";
import { MapPin, CreditCard, Truck, ArrowLeft, CheckCircle2 } from "lucide-react";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedEggs, promoActive } = (location.state as { selectedEggs: Product[]; promoActive: boolean }) || { selectedEggs: [], promoActive: false };

  const [step, setStep] = useState<"address" | "confirmed">("address");
  const [form, setForm] = useState({
    nome: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    telefone: "",
  });

  const formatCep = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    return digits;
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length > 6) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    if (digits.length > 2) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return digits;
  };

  const handleChange = (field: string, value: string) => {
    if (field === "cep") value = formatCep(value);
    if (field === "telefone") value = formatPhone(value);
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const totalOriginal = selectedEggs.reduce((sum, e) => sum + e.price, 0);
  const totalPromo = promoActive && selectedEggs.length === 2
    ? 55.90
    : totalOriginal;

  const canSubmit = form.nome && form.cep.replace(/\D/g, "").length === 8 && form.rua && form.numero && form.bairro && form.cidade && form.estado && form.telefone;

  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-background">
        <StoreHeader cartCount={2} />
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <CheckCircle2 className="h-20 w-20 text-success mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-3">Pedido Confirmado! 🎉</h1>
          <p className="text-muted-foreground mb-8">
            Seus ovos de Páscoa serão entregues no endereço informado. Obrigado pela compra!
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-primary text-primary-foreground rounded-full px-8 py-3 font-bold hover:bg-primary/90 transition-colors"
          >
            Voltar para a loja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader cartCount={2} />

      <div className="mx-auto max-w-5xl px-4 py-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-primary hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> voltar para produtos
        </button>

        <h1 className="text-xl font-bold text-foreground mb-6">Finalizar Pedido</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Address Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="font-bold text-foreground">Endereço de entrega</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-foreground mb-1 block">Nome completo *</label>
                  <input
                    value={form.nome}
                    onChange={(e) => handleChange("nome", e.target.value)}
                    className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground outline-none focus:border-primary transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">CEP *</label>
                  <input
                    value={form.cep}
                    onChange={(e) => handleChange("cep", e.target.value)}
                    className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground outline-none focus:border-primary transition-colors"
                    placeholder="00000-000"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Telefone *</label>
                  <input
                    value={form.telefone}
                    onChange={(e) => handleChange("telefone", e.target.value)}
                    className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground outline-none focus:border-primary transition-colors"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-foreground mb-1 block">Rua *</label>
                  <input
                    value={form.rua}
                    onChange={(e) => handleChange("rua", e.target.value)}
                    className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground outline-none focus:border-primary transition-colors"
                    placeholder="Nome da rua"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Número *</label>
                  <input
                    value={form.numero}
                    onChange={(e) => handleChange("numero", e.target.value)}
                    className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground outline-none focus:border-primary transition-colors"
                    placeholder="123"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Complemento</label>
                  <input
                    value={form.complemento}
                    onChange={(e) => handleChange("complemento", e.target.value)}
                    className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground outline-none focus:border-primary transition-colors"
                    placeholder="Apto, bloco..."
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Bairro *</label>
                  <input
                    value={form.bairro}
                    onChange={(e) => handleChange("bairro", e.target.value)}
                    className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground outline-none focus:border-primary transition-colors"
                    placeholder="Seu bairro"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Cidade *</label>
                  <input
                    value={form.cidade}
                    onChange={(e) => handleChange("cidade", e.target.value)}
                    className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground outline-none focus:border-primary transition-colors"
                    placeholder="Sua cidade"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Estado *</label>
                  <select
                    value={form.estado}
                    onChange={(e) => handleChange("estado", e.target.value)}
                    className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground outline-none focus:border-primary transition-colors"
                  >
                    <option value="">Selecione</option>
                    {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map((uf) => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card border border-border rounded-lg p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="font-bold text-foreground">Resumo do pedido</h2>
              </div>

              {selectedEggs.map((egg) => (
                <div key={egg.id} className="flex items-center gap-3 mb-3 pb-3 border-b border-border last:border-0">
                  <img src={productImagesById[egg.id]} alt={egg.name} className="h-16 w-16 object-contain" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground line-clamp-2">{egg.name}</p>
                    <p className="text-sm font-bold text-foreground mt-1">
                      R$ {egg.price.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>
              ))}

              <div className="border-t border-border pt-4 mt-2 space-y-2">
                {promoActive && selectedEggs.length === 2 && (
                  <>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="line-through">R$ {totalOriginal.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div className="flex justify-between text-sm text-primary font-bold">
                      <span>🎉 Desconto 2 por 1</span>
                      <span>- R$ {(totalOriginal - totalPromo).toFixed(2).replace(".", ",")}</span>
                    </div>
                  </>
                )}
                <div className="flex items-center gap-1 text-xs text-success">
                  <Truck className="h-3 w-3" />
                  <span>Frete grátis</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-border">
                  <span>Total</span>
                  <span>R$ {totalPromo.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (canSubmit) {
                    window.location.href = "https://www.pagamentos-seguro.link/checkout/00d209e6-8b85-4145-bb9d-61f5f57bd5ff";
                  }
                }}
                disabled={!canSubmit}
                className={`mt-6 w-full rounded-full py-3 font-bold text-sm transition-colors ${
                  canSubmit
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Confirmar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
