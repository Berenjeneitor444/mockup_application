import { InfoItem, InfoItemProps } from './InfoItem';

interface InfoSectionProps {
    title: string;
    items: InfoItemProps[];
    className?: string;
    columns?: 1 | 2;
}

export function InfoSection({
    title,
    items,
    className = '',
    columns = 1,
}: InfoSectionProps) {
    return (
        <div className={`space-y-3 ${className}`}>
            <h3 className="border-secondary/20 border-b-2 pb-2 text-xs font-bold tracking-wide text-gray-800 uppercase sm:text-sm">
                {title}
            </h3>
            <div
                className={`space-y-1 ${columns === 2 ? 'grid grid-cols-2 gap-x-3 gap-y-1' : ''}`}
            >
                {items.map((item, index) => (
                    <InfoItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
}
