import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading guild records...">
      {/* Character Panel Skeleton */}
      <div className="bg-[#211913] border-2 border-[#3d2c20] rounded-lg p-5">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#3c2a1d]">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-md bg-[#16110d] border border-[#3c2a1d]" />
            <div className="space-y-2">
              <div className="w-36 h-6 bg-[#2c1f17] rounded" />
              <div className="w-24 h-3.5 bg-[#251a13] rounded" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-24 h-8 bg-[#17110d] rounded border border-[#35251a]" />
            <div className="w-24 h-8 bg-[#17110d] rounded border border-[#35251a]" />
          </div>
        </div>

        {/* XP Bar Skeleton */}
        <div className="my-4 space-y-2">
          <div className="flex justify-between">
            <div className="w-28 h-3.5 bg-[#251a13] rounded" />
            <div className="w-20 h-3.5 bg-[#251a13] rounded" />
          </div>
          <div className="w-full h-3.5 bg-[#120e0b] rounded border border-[#3a281c]" />
        </div>

        {/* Stat Bars Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-[#3c2a1d]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-[#18120e] p-3 rounded border border-[#38271b] space-y-2">
              <div className="flex justify-between">
                <div className="w-20 h-3 bg-[#2a1d15] rounded" />
                <div className="w-10 h-3 bg-[#2a1d15] rounded" />
              </div>
              <div className="w-full h-1.5 bg-[#100c09] rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Quest List Skeleton */}
      <div className="bg-[#211913] border-2 border-[#3d2c20] rounded-lg p-5 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-[#3c2a1d]">
          <div className="w-48 h-6 bg-[#2a1e16] rounded" />
          <div className="w-28 h-8 bg-[#2a1e16] rounded" />
        </div>

        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#18110c] border border-[#332216] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#251a13]" />
              <div className="space-y-2">
                <div className="w-56 h-4 bg-[#281b13] rounded" />
                <div className="flex gap-2">
                  <div className="w-16 h-3 bg-[#20150f] rounded" />
                  <div className="w-12 h-3 bg-[#20150f] rounded" />
                </div>
              </div>
            </div>
            <div className="w-20 h-7 bg-[#281b13] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};
