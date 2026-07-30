import ProductCard from '@/components/product/ProductCard';

export default function ProductGrid({ products, className = '' }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ${className}`}>
      {products.map((p) => <ProductCard key={p.id || p.slug} product={p} />)}
    </div>
  );
}
