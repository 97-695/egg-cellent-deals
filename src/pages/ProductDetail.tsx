import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import StoreHeader from "@/components/StoreHeader";
import { products, Product } from "@/data/products";
import { productImagesById } from "@/data/productImages";
import { Star, Truck, Clock, MapPin, ChevronRight, Heart, Share2, Minus, Plus, ShoppingCart, X } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { promoActive, selectedEggs: prevSelected } = (location.state as { promoActive?: boolean; selectedEggs?: Product[] }) || {};

  const product = products.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; qty: number }[]>([]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <StoreHeader />
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <p className="text-lg text-muted-foreground">Produto não encontrado</p>
          <button onClick={() => navigate("/")} className="mt-4 text-primary underline">Voltar</button>
        </div>
      </div>
    );
  }

  const imgSrc = productImagesById[product.id];
  const totalCart = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const addToCart = () => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + quantity } : i);
      }
      return [...prev, { product, qty: quantity }];
    });
    setShowCart(true);
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateCartQty = (productId: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((i) => {
        if (i.product.id === productId) {
          const newQty = Math.max(1, i.qty + delta);
          return { ...i, qty: newQty };
        }
        return i;
      })
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader cartCount={cartItems.reduce((s, i) => s + i.qty, 0)} />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <button onClick={() => navigate("/")} className="hover:text-primary">página inicial</button>
          <ChevronRight className="h-3 w-3" />
          <span>páscoa</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name.toLowerCase()}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12">
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <button className="flex items-center gap-1 hover:text-primary">
            <Heart className="h-4 w-4" /> favoritar
          </button>
          <button className="flex items-center gap-1 hover:text-primary">
            <Share2 className="h-4 w-4" /> compartilhar
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Image */}
          <div className="lg:col-span-5">
            <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center min-h-[400px]">
              <img src={imgSrc} alt={product.name} className="max-h-[350px] w-auto object-contain" />
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-4">
            <h1 className="text-xl font-bold text-foreground mb-3">{product.name}</h1>

            {product.rating > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= product.rating ? "fill-accent text-accent" : "text-border"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.reviews} avaliação{product.reviews !== 1 ? "ões" : ""}</span>
              </div>
            )}

            <div className="mb-4">
              <p className="text-3xl font-bold text-foreground">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                💳 R$ {product.price.toFixed(2).replace(".", ",")} em até 1x de R$ {product.price.toFixed(2).replace(".", ",")} sem juros
              </p>
              <p className="text-sm text-muted-foreground">
                📦 R$ {product.price.toFixed(2).replace(".", ",")} em até {product.installments}x de R$ {product.installmentPrice.toFixed(2).replace(".", ",")}
              </p>
            </div>

            <p className="text-sm text-foreground leading-relaxed mb-4">
              O {product.name} é perfeito para presentear quem você ama nesta Páscoa. 
              Chocolate de alta qualidade {product.filled ? "com recheio especial" : ""} da marca {product.brand}.
              {product.giftIncluded ? " Acompanha brinde exclusivo!" : ""}
            </p>

            <div className="flex gap-2 mb-4">
              {product.pickupTime && (
                <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary rounded-full px-3 py-1">
                  retire em {product.deliveryTime}
                </span>
              )}
            </div>

            <button className="text-sm text-primary hover:underline mb-2 block">mais informações</button>
            <button className="text-sm text-primary hover:underline block">política de troca e devolução</button>
          </div>

          {/* Buy Box */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-lg p-5 sticky top-6">
              <p className="text-2xl font-bold text-foreground mb-1">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                💳 em até {product.installments}x de R$ {product.installmentPrice.toFixed(2).replace(".", ",")} sem juros
              </p>

              {/* Location */}
              <div className="border border-border rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Vila Andrade, São Paulo - SP</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-primary" />
                      <span>Retire em {product.deliveryTime}</span>
                    </div>
                    <span className="text-success font-bold">grátis</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Truck className="h-3 w-3 text-muted-foreground" />
                      <span>receber em até {product.pickupTime}</span>
                    </div>
                    <span className="font-semibold text-foreground">R$ 12,90</span>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <p className="text-sm font-bold text-foreground text-center mb-2">quantidade:</p>
              <div className="flex items-center justify-center gap-3 mb-5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary/10"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-bold text-foreground w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary/10"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={addToCart}
                className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-bold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                comprar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowCart(false)} />
          <div className="relative w-full max-w-md bg-card shadow-xl flex flex-col h-full animate-in slide-in-from-right">
            {/* Cart Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-bold text-lg">minha cesta</span>
              </div>
              <button onClick={() => setShowCart(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Sua cesta está vazia</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-start gap-3 border-b border-border pb-4">
                    <img
                      src={productImagesById[item.product.id]}
                      alt={item.product.name}
                      className="h-16 w-16 object-contain flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className="text-xs text-foreground line-clamp-2 pr-2">{item.product.name}</p>
                        <button onClick={() => removeFromCart(item.product.id)}>
                          <X className="h-4 w-4 text-primary flex-shrink-0" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-2 border border-primary rounded-full">
                          <button
                            onClick={() => updateCartQty(item.product.id, -1)}
                            className="w-7 h-7 flex items-center justify-center text-primary"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-bold text-foreground">{item.qty}</span>
                          <button
                            onClick={() => updateCartQty(item.product.id, 1)}
                            className="w-7 h-7 flex items-center justify-center text-primary"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-foreground">
                          R$ {(item.product.price * item.qty).toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-border p-4 space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>subtotal</span>
                  <span className="line-through">R$ {totalCart.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground">
                  <span>total</span>
                  <span>R$ {totalCart.toFixed(2).replace(".", ",")}</span>
                </div>
                <button
                  onClick={() => {
                    navigate("/checkout", {
                      state: {
                        selectedEggs: cartItems.map((i) => i.product),
                        promoActive: promoActive || false,
                      },
                    });
                  }}
                  className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-bold text-sm hover:bg-primary/90"
                >
                  continuar
                </button>
                <button
                  onClick={() => setShowCart(false)}
                  className="w-full text-primary font-bold text-sm hover:underline"
                >
                  continuar comprando
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
