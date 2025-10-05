import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioSkeleton() {
  return (
    <Card className="border-cyan-500/20 bg-[#0a1628]/60">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32 bg-white/10" />
            <Skeleton className="h-3 w-24 bg-white/10" />
            <Skeleton className="h-3 w-20 bg-white/10" />
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          <Skeleton className="h-5 w-16 rounded-full bg-white/10" />
          <Skeleton className="h-5 w-20 rounded-full bg-white/10" />
          <Skeleton className="h-5 w-14 rounded-full bg-white/10" />
          <Skeleton className="h-5 w-18 rounded-full bg-white/10" />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-16 bg-white/10" />
            <Skeleton className="h-4 w-12 bg-white/10" />
            <Skeleton className="h-4 w-10 bg-white/10" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-16 bg-white/10" />
          <Skeleton className="h-8 w-28 bg-white/10" />
        </div>
      </CardContent>
    </Card>
  );
}
