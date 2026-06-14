import Link from "next/link";
import React from "react";

function MyWorks() {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Coming Soon</h1>
        <p className="text-sm text-foreground-muted">
          I'm working on something new and exciting. Check back soon for
          updates.
        </p>
        <Link href="/" data-cursor="disable" className="px-1.5 py-1 bg-white text-black! hover:bg-white/80 transition-all duration-300 rounded-md inline-block">
          Go Back
        </Link>
      </div>
    </section>
  );
}

export default MyWorks;
