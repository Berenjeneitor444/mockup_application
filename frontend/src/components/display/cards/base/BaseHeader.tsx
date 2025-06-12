import { useNavigate } from 'react-router-dom';

interface BaseHeaderProps {
    title: string;
    subtitle?: string;
    badge?: React.ReactNode;
    primaryInfo?: string;
    secondaryInfo?: string;
    variant?: 'primary' | 'secondary' | 'accent';
    idReserva?: string;
    idHuesped?: string;
    edit?: boolean;
    onDelete?: (IDHuesped: string) => void;
}

export default function BaseHeader({
    title,
    subtitle,
    badge,
    primaryInfo,
    secondaryInfo,
    variant = 'primary',
    idReserva,
    idHuesped,
    edit,
    onDelete,
}: BaseHeaderProps) {
    const variants = {
        primary: 'from-primary to-primary/90',
        secondary: 'from-secondary to-secondary/90',
        accent: 'from-indigo-600 to-indigo-700',
    };

    const textColor = variant === 'secondary' ? 'text-white' : 'text-white';
    const subtitleColor =
        variant === 'secondary' ? 'text-white/90' : 'text-white/90';

    const navigator = useNavigate();

    return (
        <div
            className={`relative bg-gradient-to-br ${variants[variant]} flex flex-col justify-between p-4 text-white sm:p-6`}
        >
            {/* Action Icons */}
            <div className="absolute top-4 right-4 flex space-x-2">
                {edit && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (idReserva) {
                                // Navigate to edit page with reservation ID
                                void navigator(`/editar/${idReserva}`);
                            }
                        }}
                        className="text-white transition hover:opacity-80"
                    >
                        Edit
                    </button>
                )}
                {onDelete && idHuesped && (
                    <button
                        onClick={() => onDelete(idHuesped)}
                        className="text-white transition hover:opacity-80"
                    >
                        {/* Delete Icon Placeholder */}
                        Delete
                    </button>
                )}
            </div>

            {/* Main Content */}
            <div className="space-y-3">
                <div>
                    <h2
                        className={`text-xl font-bold tracking-tight sm:text-2xl ${textColor} leading-tight`}
                    >
                        {title}
                    </h2>
                    {subtitle && (
                        <p
                            className={`text-sm sm:text-base ${subtitleColor} mt-1`}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Info Grid */}
                {(primaryInfo || secondaryInfo) && (
                    <div className="grid grid-cols-1 gap-2 text-sm">
                        {primaryInfo && (
                            <div
                                className={`${subtitleColor} flex items-center gap-2`}
                            >
                                <span className="font-medium">
                                    {primaryInfo}
                                </span>
                            </div>
                        )}
                        {secondaryInfo && (
                            <div
                                className={`${subtitleColor} flex items-center gap-2`}
                            >
                                <span>{secondaryInfo}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Badge at bottom */}
            {badge && !onDelete && (
                <div className="mt-4 flex justify-end">{badge}</div>
            )}
        </div>
    );
}
