import Badge from './Badge';

interface StatusBadgeProps {
    status: number | string;
    type?: 'reservation' | 'client';
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const getStatusConfig = (status: number | string) => {
        return {
            variant: 'outline' as const,
            text: `Estado: ${String(status)}`,
        };
    };

    const config = getStatusConfig(status);

    return (
        <Badge variant={config.variant} size="sm">
            {config.text}
        </Badge>
    );
}
