export default function MainStatsSection() {
  return (
    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 px-4 md:px-16 mb-4 mt-4">
      <div className="flex flex-col items-center gap-2">
        <span className="rounded-full bg-primary/10 p-4 mb-2">
          <svg width="32" height="32" fill="none" stroke="#111" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </span>
        <span className="text-3xl font-bold text-primary">69,907</span>
        <span className="text-gray-700 text-lg mt-1">Population</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="rounded-full bg-primary/10 p-4 mb-2">
          <svg width="32" height="32" fill="none" stroke="#111" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M16 8l-8 8M8 8h8v8"/></svg>
        </span>
        <span className="text-3xl font-bold text-primary">159,728,779.75 m<sup>2</sup></span>
        <span className="text-gray-700 text-lg mt-1">Area</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="rounded-full bg-primary/10 p-4 mb-2">
          <svg width="32" height="32" fill="none" stroke="#111" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 17V9a5 5 0 0110 0v8"/></svg>
        </span>
        <span className="text-3xl font-bold text-primary">31
        </span>
        <span className="text-gray-700 text-lg mt-1">Social Services</span>
      </div>
    </div>
  );
}
