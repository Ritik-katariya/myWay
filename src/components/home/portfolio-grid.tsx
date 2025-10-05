"use client";

import { useState, useEffect, useCallback } from "react";
import { PortfolioCard, type Portfolio } from "./portfolio-card";
import { PortfolioSkeleton } from "./portfolio-skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PortfolioGridProps {
  filters: { category: string; skills: string[] };
}

// Mock function to simulate API call
const fetchPortfolios = async (
  page: number,
  filters: { category: string; skills: string[] }
): Promise<{
  portfolios: Portfolio[];
  hasMore: boolean;
  total: number;
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data
  const mockPortfolios: Portfolio[] = Array.from({ length: 12 }, (_, i) => ({
    id: `portfolio-${page}-${i}`,
    name: `Developer ${page * 12 + i + 1}`,
    bio: `Passionate ${
      filters.category === "web"
        ? "web"
        : filters.category === "mobile"
        ? "mobile"
        : "full-stack"
    } developer with ${
      Math.floor(Math.random() * 5) + 1
    }+ years of experience building scalable applications and user-friendly interfaces.`,
    avatar: `/placeholder.svg?height=64&width=64&query=developer-avatar-${i}`,
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS"].slice(
      0,
      Math.floor(Math.random() * 3) + 3
    ),
    projectCount: Math.floor(Math.random() * 20) + 5,
    likes: Math.floor(Math.random() * 100) + 10,
    views: Math.floor(Math.random() * 1000) + 100,
    rating: Number((Math.random() * 2 + 3).toFixed(1)),
    featured: Math.random() > 0.8,
    location: [
      "San Francisco, CA",
      "New York, NY",
      "London, UK",
      "Berlin, DE",
      "Remote",
    ][Math.floor(Math.random() * 5)],
    experience: `${Math.floor(Math.random() * 5) + 1}+ years experience`,
  }));

  // Simulate occasional errors
  if (Math.random() > 0.9) {
    throw new Error("Failed to fetch portfolios");
  }

  return {
    portfolios: mockPortfolios,
    hasMore: page < 5, // Simulate 5 pages max
    total: 60,
  };
};

export function PortfolioGrid({ filters }: PortfolioGridProps) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const loadPortfolios = useCallback(
    async (pageNum: number, reset = false) => {
      try {
        if (reset) {
          setLoading(true);
          setError(null);
        } else {
          setLoadingMore(true);
        }

        const result = await fetchPortfolios(pageNum, filters);

        if (reset) {
          setPortfolios(result.portfolios);
        } else {
          setPortfolios((prev) => [...prev, ...result.portfolios]);
        }

        setHasMore(result.hasMore);
        setTotal(result.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [filters]
  );

  // Load initial data and reset when filters change
  useEffect(() => {
    setPage(1);
    loadPortfolios(1, true);
  }, [loadPortfolios]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadPortfolios(nextPage, false);
  };

  const handleRetry = () => {
    setError(null);
    loadPortfolios(page, page === 1);
  };

  const handleLike = (portfolioId: string) => {
    setPortfolios((prev) =>
      prev.map((p) => (p.id === portfolioId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleView = (portfolioId: string) => {
    setPortfolios((prev) =>
      prev.map((p) => (p.id === portfolioId ? { ...p, views: p.views + 1 } : p))
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <PortfolioSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error && portfolios.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert className="max-w-md mx-auto border-red-500/30 bg-red-500/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={handleRetry}>
              <RefreshCw className="w-3 h-3 mr-1" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {filters.category === "all"
              ? "All Portfolios"
              : `${filters.category} Portfolios`}
          </h2>
          <p className="text-white/60">
            Showing {portfolios.length} of {total} portfolios
            {filters.skills.length > 0 && (
              <span> • Filtered by: {filters.skills.join(", ")}</span>
            )}
          </p>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {portfolios.map((portfolio) => (
          <div className="will-change-transform transition-transform duration-200 hover:translate-y-[-2px]">
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              onLike={handleLike}
              onView={handleView}
            />
          </div>
        ))}
      </div>

      {/* Load More / Error */}
      {error && portfolios.length > 0 && (
        <Alert className="mb-6 border-red-500/30 bg-red-500/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Failed to load more portfolios</span>
            <Button variant="outline" size="sm" onClick={handleRetry}>
              <RefreshCw className="w-3 h-3 mr-1" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Load More Button */}
      {hasMore && !error && (
        <div className="text-center">
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            size="lg"
            className="bg-sky-800 hover:bg-sky-700 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_22px_rgba(6,182,212,0.25)] transition-all"
          >
            {loadingMore ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Loading More...
              </>
            ) : (
              "Load More Portfolios"
            )}
          </Button>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && portfolios.length > 0 && (
        <div className="text-center py-8">
          <p className="text-white/70">You've reached the end! 🎉</p>
          <p className="text-sm text-white/50 mt-1">
            Showing all {portfolios.length} portfolios
          </p>
        </div>
      )}

      {/* Loading More Skeletons */}
      {loadingMore && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <PortfolioSkeleton key={`loading-${i}`} />
          ))}
        </div>
      )}
    </div>
  );
}
