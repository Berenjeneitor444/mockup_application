import React from 'react';

// tipos de los props
interface CampoFormProps {
    label: string;
    children: React.ReactElement<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >;
}

export default function CampoForm({ label, children }: CampoFormProps) {
    // extraemos la propiedad name del hijo, si es un elemento React
    // y lo asignamos a htmlFor del label para enlazarlo con el input
    let inputName: string | undefined;
    let formatIfTextArea: string | undefined;

    if (React.isValidElement(children)) {
        const childElement = children as React.ReactElement<{ name?: string }>;
        inputName = childElement.props.name;
        if (children.type === 'textarea')
            formatIfTextArea = 'col-span-full row-span-2 w-full';
    }

    return (
        <div
            className={`mb-4 w-full ${!!formatIfTextArea && formatIfTextArea}`}
        >
            <label
                htmlFor={inputName}
                className="mb-1 block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="mt-1">
                {React.cloneElement(children, {
                    className:
                        'focus:border-secondary-focus focus:ring-secondary-focus w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none',
                })}
            </div>
        </div>
    );
}
