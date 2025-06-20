interface SelectBoxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    id?: string;
    className?: string;
}

export const SelectBox = ({
    checked,
    onChange,
    label,
    id = "checkBox",
    className,
}: SelectBoxProps) => {
    return (
        <div className={`flex items-center ${className}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                id={id}
                className="size-4 rounded border-gray-300 bg-gray-200 text-blue-600
          focus:ring-blue-500"
            />
            <label htmlFor={id} className="ml-2 text-gray-700">{label}</label>
        </div>
    );
};