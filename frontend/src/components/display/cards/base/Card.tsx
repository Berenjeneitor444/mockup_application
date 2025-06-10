interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'elevated' | 'outlined';
}

export function Card({
    children,
    className = '',
    variant = 'default',
}: CardProps) {
    const variants = {
        default:
            'border border-gray-200 shadow-sm hover:shadow-lg hover:border-secondary',
        elevated: 'shadow-md hover:shadow-xl border-0',
        outlined: 'border-2 border-gray-300 hover:border-secondary shadow-none',
    };

    return (
        <div
            className={`overflow-hidden rounded-lg bg-white transition-all duration-300 ${variants[variant]} ${className}`}
        >
            {children}
        </div>
    );
}
