"use client"

import { useState } from "react"
import { FuturisticHeader } from "@/components/home/futuristic-header"
import { PortfolioFilters } from "@/components/home/portfolio-filters"
import { PortfolioGrid } from "@/components/home/portfolio-grid"

export default function HomePage() {
  const [filters, setFilters] = useState({ category: "all", skills: [] as string[] })

  // Mock user state - you can replace this with actual auth logic
  const isLoggedIn = false // Change to true to see logged-in state
  const user = {
    name: "John Doe",
    avatar: "/user-avatar.jpg",
  }

  return (
    <div className="min-h-screen bg-[#06081c] ">
      {/* Header */}
      <FuturisticHeader />

      {/* Hero Section with Filters */}
      <main className="pt-16  w-[90%] mx-auto">
        <PortfolioFilters onFilterChange={setFilters} />

        {/* Portfolio Grid */}
        <PortfolioGrid filters={filters} />
      </main>
    </div>
  )
}
