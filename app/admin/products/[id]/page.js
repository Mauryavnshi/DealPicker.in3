'use client';
import { useParams } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
export default function Page() {
  const { id } = useParams();
  return <ProductForm productId={id} />;
}
