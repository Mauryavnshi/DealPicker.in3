'use client';

/**
 * Compact form primitives used across admin CRUD pages.
 * These wrap plain HTML inputs with our design tokens — no extra deps.
 */
export function Field({ label, hint, error, children, required, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
          {label}{required && <span className="text-primary ml-0.5">*</span>}
        </span>
        {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
      </div>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-[11px] text-rose-400">{error}</p>}
    </label>
  );
}

export function TextInput({ className = '', ...props }) {
  return (
    <input
      {...props}
      className={`w-full h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary/60 transition-colors ${className}`}
    />
  );
}

export function NumberInput({ className = '', ...props }) {
  return (
    <input
      type="number"
      {...props}
      className={`w-full h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary/60 transition-colors font-mono ${className}`}
    />
  );
}

export function TextArea({ className = '', rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      {...props}
      className={`w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors resize-y ${className}`}
    />
  );
}

export function Select({ children, className = '', ...props }) {
  return (
    <select
      {...props}
      className={`w-full h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary/60 transition-colors ${className}`}
    >
      {children}
    </select>
  );
}

export function Toggle({ checked, onChange, label, hint }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-secondary border border-border'
        }`}
      >
        <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
      <div>
        <div className="text-sm font-medium">{label}</div>
        {hint && <div className="text-[11px] text-muted-foreground">{hint}</div>}
      </div>
    </label>
  );
}

/**
 * List editor — plain textarea, one line per item. Simple & robust.
 */
export function ListEditor({ value, onChange, placeholder }) {
  const text = Array.isArray(value) ? value.join('\n') : (value || '');
  return (
    <TextArea
      rows={5}
      value={text}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
    />
  );
}

/**
 * Key/value spec editor.
 */
export function SpecEditor({ value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const update = (i, patch) => onChange(items.map((r, idx) => idx === i ? { ...r, ...patch } : r));
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, { key: '', value: '' }]);
  return (
    <div className="space-y-2">
      {items.length === 0 && (
        <p className="text-xs text-muted-foreground">No specs yet. Add rows like <code className="px-1 rounded bg-secondary">Display</code> → <code className="px-1 rounded bg-secondary">6.7&quot; AMOLED</code>.</p>
      )}
      {items.map((row, i) => (
        <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-2">
          <TextInput placeholder="Key (e.g. Display)" value={row.key} onChange={(e) => update(i, { key: e.target.value })} />
          <TextInput placeholder="Value (e.g. 6.7&quot; AMOLED 120Hz)" value={row.value} onChange={(e) => update(i, { value: e.target.value })} />
          <button type="button" onClick={() => remove(i)} className="h-11 px-3 rounded-xl border border-border text-rose-400 hover:bg-rose-500/10 text-sm">Remove</button>
        </div>
      ))}
      <button type="button" onClick={add} className="mt-1 inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-border bg-secondary/60 text-xs hover:bg-secondary transition">+ Add spec row</button>
    </div>
  );
}

export function BilingualTabs({ value, onChange, children }) {
  return (
    <div>
      <div className="inline-flex rounded-full border border-border bg-secondary/60 p-0.5 mb-3">
        {['en', 'hi'].map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => onChange(loc)}
            className={`px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-full transition-colors ${
              value === loc ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {loc === 'en' ? 'English' : 'हिन्दी'}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
