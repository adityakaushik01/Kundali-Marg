import { toast } from "sonner";

const TestToast = () => {
  return (
    <div className="flex flex-wrap gap-3 p-6">
      <button
        onClick={() => toast.success("Kundali generated successfully!")}
        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg text-white text-sm"
      >
        Success
      </button>

      <button
        onClick={() => toast.error("Failed to connect to server")}
        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg text-white text-sm"
      >
        Error
      </button>

      <button
        onClick={() => toast.warning("Approximate birth time may affect lagna")}
        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-white text-sm"
      >
        Warning
      </button>

      <button
        onClick={() => toast.info("Using Lahiri ayanamsa by default")}
        className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg text-white text-sm"
      >
        Info
      </button>

      <button
        onClick={() =>
          toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
              loading: "Calculating planetary positions...",
              success: "Kundali generated successfully!",
              error:   "Calculation failed. Please try again.",
            }
          )
        }
        className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded-lg text-white text-sm"
      >
        Promise
      </button>

      <button
        onClick={() =>
          toast("Birth chart saved", {
            description: "Your Kundali has been saved to your profile.",
          })
        }
        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm"
      >
        Default
      </button>
    </div>
  );
};

export default TestToast;