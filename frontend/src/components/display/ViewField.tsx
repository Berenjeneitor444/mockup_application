interface ViewFieldProps {
    label: string;
    value: boolean | string | number | Date | null | undefined;
}

export default function ViewField({ label, value }: ViewFieldProps) {
    let formattedValue;
    if (value === null || value === undefined || value === '') {
        formattedValue = 'N/A';
    } else if (value instanceof Date) {
        formattedValue = value.toLocaleDateString();
    } else if (typeof value === 'boolean') {
        formattedValue = value ? 'Sí' : 'No';
    } else {
        formattedValue = value;
    }
    return (
        <div className="mb-4 flex flex-col">
            <span className="font-semibold text-gray-700">{label}:</span>
            <span className="text-gray-600">{formattedValue}</span>
        </div>
    );
}
