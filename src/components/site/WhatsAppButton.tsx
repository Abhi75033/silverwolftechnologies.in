import { MessageCircle } from "lucide-react";
import { SITE } from "@/data/site";

export const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${SITE.whatsapp}?text=Hi%20Silver%20Wolf%20Technologies%2C%20I%27d%20like%20a%20free%20consultation.`}
    target="_blank"
    rel="noreferrer"
    aria-label="Chat with Silver Wolf Technologies on WhatsApp"
    className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-pulse-glow"
  >
    <MessageCircle className="h-6 w-6" />
  </a>
);
