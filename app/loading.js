import { ProductGridSkeleton } from '@/components/product/ProductSkeleton';

export default function Loading() {
  return (
    <div className="container mx-auto pt-16 md:pt-24 pb-16">
      <div className="h-10 w-2/3 max-w-lg rounded shimmer" />
      <div className="mt-4 h-4 w-1/2 max-w-md rounded shimmer" />
      <div className="mt-12">
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
