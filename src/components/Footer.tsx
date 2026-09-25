import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog" width={20} height={20} />
          <span className="font-display text-sm font-bold uppercase tracking-wide">
            FitLog
          </span>
        </div>
        <p className="text-xs text-muted text-center sm:text-right">
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
