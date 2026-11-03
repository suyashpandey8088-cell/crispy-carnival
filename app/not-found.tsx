import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <span className="mono muted">404 / AN UNWRITTEN CHAPTER</span>
      <h1>This idea is still taking shape.</h1>
      <p>The page you’re looking for isn’t part of the exhibition.</p>
      <Link className="outline-button" href="/">
        Return to the exhibition
        <ArrowUpRight size={16} />
      </Link>
    </main>
  );
}
