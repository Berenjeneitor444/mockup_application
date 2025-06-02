export interface InfoItemProps {
    label: string;
    value: string | number | React.ReactNode;
    highlight?: boolean;
    fullWidth?: boolean;
}

export function InfoItem({
    label,
    value,
    highlight = false,
    fullWidth = false,
}: InfoItemProps) {
    return (
        <div
            className={`flex ${fullWidth ? 'flex-col space-y-1' : 'items-center justify-between'} rounded-md px-2.5 py-2 transition-colors ${
                highlight
                    ? 'bg-secondary/10 border-secondary/20 border'
                    : 'hover:bg-gray-50'
            }`}
        >
            <span
                className={`text-xs font-medium text-gray-700 sm:text-sm ${fullWidth ? 'text-xs tracking-wide text-gray-500 uppercase' : 'flex-shrink-0 truncate'} ${fullWidth ? '' : 'max-w-[45%]'}`}
            >
                {label}:
            </span>
            <div
                className={`text-xs font-semibold text-gray-900 sm:text-sm ${fullWidth ? 'text-sm sm:text-base' : 'min-w-0 flex-1 text-right'}`}
            >
                {typeof value === 'string' || typeof value === 'number' ? (
                    <span className="block truncate" title={String(value)}>
                        {value}
                    </span>
                ) : (
                    value
                )}
            </div>
        </div>
    );
}
