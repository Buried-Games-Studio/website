import { Metadata } from "next";
import { ServicesContent } from "@/components/pages/services-content";

export const metadata: Metadata = {
    title: 'Game Development Services in Kuwait',
    description: 'Professional game development and app development services from Kuwait. Buried Games Studio offers full-cycle game development, mobile app porting, 2D/3D art, QA testing, and backend development.',
    alternates: { canonical: '/services' },
};

export default function ServicesPage() {
    return <ServicesContent />;
}
