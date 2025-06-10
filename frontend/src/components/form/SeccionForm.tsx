import { ReactElement } from 'react';
import CampoForm from './CampoForm';

interface SeccionFormProps {
    children: ReactElement<typeof CampoForm> | ReactElement<typeof CampoForm>[];
    titulo: string;
}

export default function SeccionForm({ children, titulo }: SeccionFormProps) {
    return (
        <div className="mb-4 rounded-md bg-gray-50 p-4 md:col-span-2 lg:col-span-3">
            <h3 className="mb-3 border-b pb-2 text-lg font-medium text-gray-800">
                {titulo}
            </h3>
            <div className="grid grid-cols-1 justify-items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {children}
            </div>
        </div>
    );
}
