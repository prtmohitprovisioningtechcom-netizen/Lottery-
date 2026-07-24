import Banner from "@/components/Banner";
import Ticker from "@/components/Ticker";
import CheckResultForm from "@/components/CheckResultForm";
import ResultSection from "@/components/ResultSection";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen pb-10">
      <main className="mx-auto w-full max-w-lg px-3 pt-4 sm:px-4 sm:pt-6">
        <Banner />
      </main>

      <div className="mx-auto my-5 w-full max-w-4xl px-3 sm:px-4">
        <Ticker />
      </div>

      <main className="mx-auto w-full max-w-lg px-3 sm:px-4">
        <CheckResultForm />
        <ResultSection />
      </main>
    </div>
  );
}
