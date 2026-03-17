import { Toaster } from "sonner";

const ToasterProvider = () => (
  <Toaster
    position="top-center"
    theme="dark"
    gap={8}
    toastOptions={{
      classNames: {
        toast:
          "!bg-[rgba(8,12,24,0.85)] !backdrop-blur-2xl !border !rounded-xl !shadow-[0_8px_32px_rgba(0,0,0,0.4)] !font-light !tracking-wide !text-slate-200 !text-sm",
        title: "!font-normal !text-sm !tracking-wide",
        description: "!text-slate-400 !text-xs !font-light !mt-0.5",
        success: "!border-amber-400/30 [&_[data-title]]:!text-amber-400",
        error: "!border-rose-400/30  [&_[data-title]]:!text-rose-400",
        warning: "!border-orange-400/30 [&_[data-title]]:!text-orange-400",
        info: "!border-sky-400/30   [&_[data-title]]:!text-sky-400",
        loading: "!border-slate-500/30 [&_[data-title]]:!text-amber-400",
      },
    }}
    icons={{
      success: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="10" cy="10" r="8.5" />
          <path d="M6.5 10.5L9 13L13.5 7.5" />
        </svg>
      ),
      error: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="#f87171"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <circle cx="10" cy="10" r="8.5" />
          <path d="M7 7L13 13M13 7L7 13" />
        </svg>
      ),
      warning: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="#fb923c"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 3L18 17H2L10 3Z" />
          <path d="M10 8.5V12" />
          <circle cx="10" cy="14.5" r="0.8" fill="#fb923c" stroke="none" />
        </svg>
      ),
      info: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <circle cx="10" cy="10" r="8.5" />
          <path d="M10 9.5V14" />
          <circle cx="10" cy="6.5" r="0.8" fill="#38bdf8" stroke="none" />
        </svg>
      ),
      loading: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{ animation: "spin 0.9s linear infinite" }}
        >
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <circle
            cx="10"
            cy="10"
            r="8.5"
            stroke="rgba(245,158,11,0.15)"
            strokeWidth="1.5"
          />
          <path
            d="M10 1.5A8.5 8.5 0 0 1 18.5 10"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    }}
  />
);

export default ToasterProvider;
