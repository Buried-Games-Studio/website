import { Metadata } from "next";
import { ServicesContent } from "@/components/pages/services-content";

export const metadata: Metadata = {
    title: 'Services',
    description: 'Explore the game development services offered by Buried Games Studio, from full game development to art, audio, and QA.',
    alternates: { canonical: '/services' },
};

export default function ServicesPage() {
    return <ServicesContent />;
}
