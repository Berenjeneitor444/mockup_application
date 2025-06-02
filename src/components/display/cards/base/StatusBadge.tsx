import Badge from './Badge';

interface StatusBadgeProps {
    status: number | string;
    type?: 'reservation' | 'client';
}

export function StatusBadge({
    status,
    type = 'reservation',
}: StatusBadgeProps) {
    const getStatusConfig = (status: number | string, type: string) => {
        if (type === 'reservation') {
            const numStatus =
                typeof status === 'number' ? status : parseInt(status);

            switch (numStatus) {
                case 1:
                    return { variant: 'success' as const, text: 'Confirmada' };
                case 2:
                    return { variant: 'warning' as const, text: 'Pendiente' };
                case 3:
                    return { variant: 'danger' as const, text: 'Cancelada' };
                default:
                    return { variant: 'outline' as const, text: 'Sin Estado' };
            }
        }
        return { variant: 'outline' as const, text: String(status) };
    };

    const config = getStatusConfig(status, type);

    return (
        <Badge variant={config.variant} size="sm">
            {config.text}
        </Badge>
    );
}
