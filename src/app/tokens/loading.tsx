export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-[#0c2d4a] rounded mb-6" />
        <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl overflow-hidden">
          <div className="h-12 bg-[#0c2d4a]" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 border-t border-[#0c2a4a] bg-[#0c2d4a]/50" />
          ))}
        </div>
      </div>
    </div>
  );
}
