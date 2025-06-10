import React from 'react';
import CampoForm from '../form/CampoForm';

interface FilterFormParams {
    children: React.ReactElement<typeof CampoForm | (typeof CampoForm)[]>;
    titulo: string;
    onReset: (e: React.FormEvent<HTMLFormElement>) => void;
}
export default function FilterForm({
    children,
    titulo,
    onReset,
}: FilterFormParams) {
    return (
        <form
            className="rounded-lg border border-gray-200 bg-gray-100 p-6 shadow-md"
            onReset={onReset}
        >
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-800">{titulo}</h1>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-between gap-4 lg:flex-nowrap">
                {children}
            </div>

            <button
                type="reset"
                className="bg-secondary hover:bg-secondary-hover focus:ring-secondary-focus rounded-md px-6 py-3 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
                Reset
            </button>
        </form>
    );
}
