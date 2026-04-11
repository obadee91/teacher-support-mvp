"use client";

interface Props {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
  validationError: string;
}

export default function GenerateButton({ onClick, loading, disabled, validationError }: Props) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled || loading}
        className="w-full min-h-[52px] py-4 rounded-lg bg-accent text-white font-semibold text-lg hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {loading ? "Generating support strategies..." : "Generate Support Strategies"}
      </button>
      {validationError && (
        <p className="text-red-500 text-sm mt-2 text-center">{validationError}</p>
      )}
    </div>
  );
}
