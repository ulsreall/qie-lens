export default function Loading() {
  return (
    <div className="min-h-screen bg-[#020a18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-[#0c2d4a] rounded mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-[#0c2d4a] rounded-xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80 bg-[#0c2d4a] rounded-xl" />
            <div className="h-80 bg-[#0c2d4a] rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
