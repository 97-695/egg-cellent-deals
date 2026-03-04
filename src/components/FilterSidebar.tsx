import { Checkbox } from "@/components/ui/checkbox";

const filters = {
  departamento: [{ label: "alimentos e bebidas", count: 13 }],
  categoria: [{ label: "páscoa", count: 13 }],
  subcategoria: [{ label: "ovo de páscoa", count: 13 }],
  preco: [
    "R$ 0 - R$ 25",
    "R$ 25 - R$ 50",
    "R$ 50 - R$ 100",
    "R$ 100 - R$ 250",
    "R$ 250 - R$ 500",
    "R$ 500 - R$ 1.000",
  ],
  brinde: [
    { label: "não", count: 7 },
    { label: "sim", count: 5 },
  ],
  condicao: [{ label: "novo", count: 10 }],
  recheado: [
    { label: "não", count: 4 },
    { label: "sim", count: 8 },
  ],
  vegano: [{ label: "não", count: 13 }],
  marca: [
    { label: "Ferrero Rocher", count: 2 },
    { label: "Kinder", count: 3 },
    { label: "Lacta", count: 2 },
    { label: "Lindt", count: 1 },
    { label: "Topcau", count: 4 },
    { label: "Garoto", count: 1 },
  ],
};

const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-4">
    <h3 className="text-sm font-bold text-foreground mb-2">{title}</h3>
    {children}
  </div>
);

const FilterSidebar = () => {
  return (
    <aside className="w-full">
      <h2 className="text-sm font-bold text-foreground mb-4">filtrar por</h2>

      <FilterSection title="Departamento">
        {filters.departamento.map((f) => (
          <label key={f.label} className="flex items-center gap-2 text-xs text-muted-foreground mb-1 cursor-pointer">
            <Checkbox className="h-3.5 w-3.5" />
            {f.label} <span className="text-muted-foreground/60">({f.count})</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Categoria">
        {filters.categoria.map((f) => (
          <label key={f.label} className="flex items-center gap-2 text-xs text-muted-foreground mb-1 cursor-pointer">
            <Checkbox className="h-3.5 w-3.5" />
            {f.label} <span className="text-muted-foreground/60">({f.count})</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Preço">
        {filters.preco.map((p) => (
          <label key={p} className="flex items-center gap-2 text-xs text-muted-foreground mb-1 cursor-pointer">
            <Checkbox className="h-3.5 w-3.5" />
            {p}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Acompanha Brinde">
        {filters.brinde.map((f) => (
          <label key={f.label} className="flex items-center gap-2 text-xs text-muted-foreground mb-1 cursor-pointer">
            <Checkbox className="h-3.5 w-3.5" />
            {f.label} <span className="text-muted-foreground/60">({f.count})</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Condição do Item">
        {filters.condicao.map((f) => (
          <label key={f.label} className="flex items-center gap-2 text-xs text-muted-foreground mb-1 cursor-pointer">
            <Checkbox className="h-3.5 w-3.5" />
            {f.label} <span className="text-muted-foreground/60">({f.count})</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="É Recheado">
        {filters.recheado.map((f) => (
          <label key={f.label} className="flex items-center gap-2 text-xs text-muted-foreground mb-1 cursor-pointer">
            <Checkbox className="h-3.5 w-3.5" />
            {f.label} <span className="text-muted-foreground/60">({f.count})</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="É Vegano">
        {filters.vegano.map((f) => (
          <label key={f.label} className="flex items-center gap-2 text-xs text-muted-foreground mb-1 cursor-pointer">
            <Checkbox className="h-3.5 w-3.5" />
            {f.label} <span className="text-muted-foreground/60">({f.count})</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Marca">
        {filters.marca.map((f) => (
          <label key={f.label} className="flex items-center gap-2 text-xs text-muted-foreground mb-1 cursor-pointer">
            <Checkbox className="h-3.5 w-3.5" />
            {f.label} <span className="text-muted-foreground/60">({f.count})</span>
          </label>
        ))}
      </FilterSection>
    </aside>
  );
};

export default FilterSidebar;
