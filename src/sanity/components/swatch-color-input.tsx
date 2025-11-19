import { set, unset, type StringInputProps } from "sanity";

type SwatchOption = {
  title: string;
  value: string;
  preview?: string;
};

export function SwatchColorInput(props: StringInputProps) {
  const { value, onChange, schemaType } = props;

  const options =
    (schemaType.options?.list as SwatchOption[] | undefined) ?? [];

  const handleSelect = (newValue: string) => {
    onChange(newValue ? set(newValue) : unset());
  };

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-3">
        {options.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => handleSelect(color.value)}
            className={`
              relative h-7 w-7 rounded-lg border-2 transition-all hover:scale-105
              ${
                value === color.value
                  ? "border-blue-600 ring ring-blue-200 scale-105"
                  : "border-gray-300"
              }
            `}
            style={{ backgroundColor: color.preview }}
            title={color.title}
          >
            {value === color.value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="h-4 w-4 drop-shadow-lg"
                  fill="white"
                  viewBox="0 0 20 20"
                  style={{
                    filter:
                      color.value === "white" || color.value === "light"
                        ? "drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
                        : "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm ">
        Selected:{" "}
        <strong>
          {options.find((c) => c.value === value)?.title || "None"}
        </strong>
      </p>
    </div>
  );
}
