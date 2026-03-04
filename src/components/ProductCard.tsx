import { Star, Truck, Clock } from "lucide-react";
import type { Product } from "@/data/products";
import { productImages } from "@/data/productImages";

interface ProductCardProps {
  product: Product;
  promoActive?: boolean;
}

const ProductCard = ({ product, promoActive }: ProductCardProps) => {
  const displayPrice = promoActive ? product.price : product.price;
  const imgSrc = productImages[product.brand] || productImages["default"];

  return (
    <div className="bg-card rounded-lg border border-border p-3 flex flex-col hover:shadow-md transition-shadow relative group">
      {product.sponsored && (
        <span className="absolute top-2 left-2 text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded">
          patrocinado
        </span>
      )}

      {/* Image area */}
      <div className="flex items-center justify-center h-40 mb-3">
        <img src={imgSrc} alt={product.name} className="h-full w-auto object-contain" />
      </div>

      {/* Product info */}
      <h3 className="text-xs text-foreground leading-tight mb-2 line-clamp-2 min-h-[2.5rem]">
        {product.name}
      </h3>

      {/* Rating */}
      {product.rating > 0 && (
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${star <= product.rating ? "fill-accent text-accent" : "text-border"}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">{product.rating}</span>
        </div>
      )}

      {/* Price */}
      <div className="mt-auto">
        {promoActive && (
          <div className="bg-primary/10 border border-primary rounded px-2 py-1 mb-2">
            <span className="text-[10px] font-bold text-primary">🎉 PROMOÇÃO: 2 ovos pelo preço de 1!</span>
          </div>
        )}
        <p className="text-lg font-bold text-foreground">
          R$ {displayPrice.toFixed(2).replace(".", ",")}
        </p>
        <p className="text-[10px] text-muted-foreground">
          em até {product.installments}x de R$ {product.installmentPrice.toFixed(2).replace(".", ",")} sem juros
        </p>
        <p className="text-[10px] text-muted-foreground">no cartão de crédito</p>

        {/* Delivery info */}
        <div className="mt-2 space-y-1">
          {product.pickupTime && (
            <div className="flex items-center gap-1">
              <Truck className="h-3 w-3 text-success" />
              <span className="text-[10px] text-success font-semibold">
                receba em {product.pickupTime}
              </span>
            </div>
          )}
          {product.deliveryTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-primary" />
              <span className="text-[10px] text-primary font-semibold">
                retire em {product.deliveryTime}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
