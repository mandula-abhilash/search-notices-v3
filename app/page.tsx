import { SearchBar } from "@/components/search-bar";
import { FeaturedSection } from "@/components/featured-section";
import { RecentNotifications } from "@/components/recent-notifications";
import { TopUniversities } from "@/components/top-universities";

export default function Home() {
  return (
    <div className="mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <div className="hero-gradient mb-8 rounded-2xl p-12 text-white">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Your Gateway to{" "}
            <span className="text-accent-foreground">
              Academic Success
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-white/90">
            Stay updated with the latest exam notifications, results, and university information.
            Your one-stop destination for all academic updates.
          </p>
          <SearchBar />
        </div>
      </section>

      <FeaturedSection />
      
      <div className="grid gap-8 md:grid-cols-2">
        <RecentNotifications />
        <TopUniversities />
      </div>
    </div>
  );
}