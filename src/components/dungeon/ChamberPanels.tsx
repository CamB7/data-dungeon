import type { ChamberTable } from "@/content/chambers";

export function SchemaPanel({
  tables,
  salt = false,
}: {
  tables: ChamberTable[];
  salt?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border bg-stone-950/90 overflow-hidden ${
        salt ? "border-brine/30" : "border-stone-700/80"
      }`}
    >
      <div className="border-b border-stone-700/80 px-4 py-3">
        <p
          className={`font-mono text-[11px] tracking-wider uppercase ${
            salt ? "text-brine-soft" : "text-stone-500"
          }`}
        >
          Chamber schema
        </p>
      </div>
      <div className="divide-y divide-stone-800/80">
        {tables.map((table) => (
          <div key={table.name} className="p-4">
            <div className="flex items-baseline justify-between gap-2">
              <code
                className={`font-mono text-sm ${
                  salt ? "text-brine" : "text-moss"
                }`}
              >
                {table.name}
              </code>
              <span className="text-xs text-stone-500">{table.columns.length} cols</span>
            </div>
            <p className="mt-1 text-xs text-stone-400">{table.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {table.columns.map((column) => (
                <span
                  key={column}
                  className={`rounded-md border px-2 py-0.5 font-mono text-[11px] ${
                    salt
                      ? "border-brine/25 bg-brine/5 text-salt"
                      : "border-stone-700/80 bg-stone-900/80 text-stone-300"
                  }`}
                >
                  {column}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SqlEditorPlaceholder({
  filename,
  starterQuery,
  disabled = true,
}: {
  filename: string;
  starterQuery: string;
  disabled?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-moss/25 bg-stone-950/90 shadow-[0_0_60px_rgba(168,201,160,0.08)]">
      <div className="flex items-center justify-between gap-2 border-b border-stone-700/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-torch-dim" />
          <span className="h-2.5 w-2.5 rounded-full bg-moss-soft" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone-500" />
          <span className="ml-3 font-mono text-[11px] tracking-wider text-stone-500">
            {filename}
          </span>
        </div>
        <button
          type="button"
          disabled={disabled}
          className="rounded-full bg-stone-800 px-4 py-1.5 font-mono text-[11px] tracking-wide text-stone-500 uppercase cursor-not-allowed"
          title="Query runner coming soon"
        >
          Run query
        </button>
      </div>
      <textarea
        readOnly={disabled}
        defaultValue={starterQuery}
        rows={8}
        className="w-full resize-none bg-transparent p-5 font-mono text-[13px] leading-6 text-moss/90 outline-none sm:text-sm"
        spellCheck={false}
      />
      <div className="border-t border-stone-700/80 px-4 py-3">
        <p className="font-mono text-[11px] text-stone-500">
          Results panel · coming with dungeon mechanics
        </p>
      </div>
    </div>
  );
}
