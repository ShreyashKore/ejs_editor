export function Logo({ className }: { className?: string }) {
  return (
    <h1
      className={`text-[1.5rem] font-extrabold tracking-tight ${className ?? ""}`}
    >
      <span className="bg-gradient-to-tr from-primary to-secondary bg-clip-text text-transparent">
        EJS
      </span>{" "}
      Editor
    </h1>
  );
}
