export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="animate-pulse">
        <div className="h-8 w-56 bg-[#0c2d4a] rounded mb-6" />
        <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl p-6 mb-6">
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#0c2d4a] rounded" />
                <div className="flex-1">
                  <div className="h-3 w-28 bg-[#0c2d4a] rounded mb-2" />
                  <div className="h-4 w-56 bg-[#0c2d4a] rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
