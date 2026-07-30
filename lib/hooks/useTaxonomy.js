'use client';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

// Simple hook — caches categories per session.
export function useCategories() {
  const { data, error, isLoading } = useSWR('/api/categories', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60_000,
  });
  return { categories: data || [], error, isLoading };
}

export function useBrands() {
  const { data, error, isLoading } = useSWR('/api/brands', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60_000,
  });
  return { brands: data || [], error, isLoading };
}
