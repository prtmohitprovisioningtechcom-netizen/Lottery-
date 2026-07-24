import Banner from "@/components/Banner";
import Ticker from "@/components/Ticker";
import CheckResultForm from "@/components/CheckResultForm";
import ResultSection from "@/components/ResultSection";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-lg px-3 py-4 sm:px-4 sm:py-6">
      <Banner />
      <Ticker />
      <CheckResultForm />
      <ResultSection />

    </main>
  );
}
