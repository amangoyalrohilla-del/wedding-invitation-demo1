import { createRoot } from "react-dom/client";
import { InviteApp } from "@/components/InviteApp";

// Standalone preview entry: renders the exact same components as the Next.js page.
document.documentElement.lang = "hi";
const el = document.getElementById("root");
if (el) createRoot(el).render(<InviteApp />);
