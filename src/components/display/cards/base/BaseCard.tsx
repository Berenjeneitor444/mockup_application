import { Card } from './Card';

interface BaseCardProps {
    header: React.ReactNode;
    sections: React.ReactNode[];
    className?: string;
    variant?: 'default' | 'elevated' | 'outlined';
}

export function BaseCard({
    header,
    sections,
    className = '',
    variant = 'default',
}: BaseCardProps) {
    return (
        <Card variant={variant} className={`w-full ${className}`}>
            <div className="flex flex-col">
                {/* Header Section - Always full width on top */}
                <div className="w-full">{header}</div>

                {/* Content Section */}
                <div className="p-4 sm:p-6">
                    <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                        {sections.map((section, index) => (
                            <div key={index} className="w-full">
                                {section}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}
