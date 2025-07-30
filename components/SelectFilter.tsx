export default function SelectFilter({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    options: { value: number; label: string }[];
}) {
    return (
        <div className="flex flex-col gap-2 sm:w-auto w-full">
            <label htmlFor={label} className="text-sm text-gray-600">{label}</label>
            <select
                className="border border-gray-300 rounded-md p-2"
                name={label}
                id={label}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}