import HuespedResumen from '../../../types/HuespedResumen';
import Badge from './base/Badge';
import { BaseCard } from './base/BaseCard';
import BaseHeader from './base/BaseHeader';
import { InfoItemProps } from './base/InfoItem';
import { InfoSection } from './base/InfoSection';

interface HuespedCardProps {
    huespedResumen: HuespedResumen;
    edit?: boolean;
    onDelete?: (IDHuesped: string) => void;
}

export default function HuespedCard({
    huespedResumen,
    edit,
    onDelete,
}: HuespedCardProps) {
    const header = (
        <BaseHeader
            title={huespedResumen.Nombre ?? ''}
            subtitle={huespedResumen.Nombre_Pila}
            primaryInfo={`País: ${huespedResumen.Pais}`}
            secondaryInfo={`Cliente ${huespedResumen.TipoCliente}`}
            badge={
                <Badge variant="outline" size="sm">
                    ID: {huespedResumen.IDHuesped}
                </Badge>
            }
            variant="primary"
            onDelete={onDelete}
            idHuesped={huespedResumen.IDHuesped}
            idReserva={huespedResumen.reservationNumber}
            edit={edit}
        />
    );

    const personalItems: InfoItemProps[] = [
        { label: 'Edad', value: `${huespedResumen.Edad} años` },
        { label: 'Sexo', value: huespedResumen.Sexo },
        {
            label: 'Cliente Repetidor',
            value: huespedResumen.Repetidor,
            highlight: huespedResumen.Repetidor === 'Sí',
        },
        { label: 'Tipo de Cliente', value: huespedResumen.TipoCliente },
    ];

    const contactItems: InfoItemProps[] = [
        { label: 'Email', value: huespedResumen.Email, fullWidth: true },
        { label: 'Teléfono', value: huespedResumen.Telefono },
        { label: 'Tipo de Documento', value: huespedResumen.TipoDocumento },
        { label: 'Número de Documento', value: huespedResumen.IDDocumento },
    ];

    const sections = [
        <InfoSection
            key="personal"
            title="Información Personal"
            items={personalItems}
        />,
        <InfoSection
            key="contact"
            title="Información de Contacto"
            items={contactItems}
        />,
    ];

    return <BaseCard header={header} sections={sections} />;
}
