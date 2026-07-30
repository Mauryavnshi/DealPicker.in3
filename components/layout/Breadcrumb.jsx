import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {it.href && !last ? (
                <Link href={it.href} className="hover:text-foreground transition-colors">
                  {it.label}
                </Link>
              ) : (
                <span className={last ? 'text-foreground' : ''}>{it.label}</span>
              )}
              {!last && <ChevronRight className="h-3 w-3 opacity-60" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
