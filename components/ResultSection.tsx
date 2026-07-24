"use client";

import { useResultStore } from "@/store/resultStore";
import CongratsBanner from "./CongratsBanner";
import CertificateCard from "./CertificateCard";
import PrizeCards from "./PrizeCards";
import OfficialDetails from "./OfficialDetails";

export default function ResultSection() {
  const { winner, prizeTickets, checked } = useResultStore();

  if (!checked || !winner || !prizeTickets) return null;

  return (
    <section className="animate-in fade-in duration-500">
      <CertificateCard winner={winner} />
      <PrizeCards
        prizeTickets={prizeTickets}
        highlightTicket={winner.ticketNumber}
        highlightPosition={Number(winner.position)}
      />
      <OfficialDetails winner={winner} />
    </section>
  );
}
