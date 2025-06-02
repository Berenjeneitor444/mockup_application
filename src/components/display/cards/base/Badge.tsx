interface BadgeProps {
    children: React.ReactNode;
    variant?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'warning'
        | 'danger'
        | 'outline'
        | 'accent';
    size?: 'sm' | 'md' | 'lg';
}

export default function Badge({
    children,
    variant = 'primary',
    size = 'md',
}: BadgeProps) {
    const baseStyles =
        'inline-flex items-center justify-center rounded-full font-medium transition-colors';

    const variants = {
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-white',
        success: 'bg-green-600 text-white',
        warning: 'bg-amber-600 text-white',
        danger: 'bg-red-600 text-white',
        accent: 'bg-indigo-600 text-white',
        outline:
            'border border-secondary text-secondary bg-white hover:bg-secondary/5',
    };

    const sizes = {
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}>
            {children}
        </span>
    );
}
