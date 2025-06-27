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
            secondaryInfo={`Cliente ${huespedResumen.NumeroCliente}`}
            badge={
                <Badge variant="outline" size="sm">
                    ID: {huespedResumen.IDHuesped}
                </Badge>
            }
            variant="primary"
            onDelete={onDelete}
            idHuesped={huespedResumen.IDHuesped}
            idReserva={huespedResumen.reservationNumber}
            hotel={huespedResumen.hotel}
            edit={edit}
        />
    );

    const personalItems: InfoItemProps[] = [
        { label: 'Edad', value: `${huespedResumen.Edad} años` },
        { label: 'Sexo', value: huespedResumen.Sexo },
        {
            label: 'Repetidor',
            value: huespedResumen.Repetidor,
            highlight: huespedResumen.Repetidor === 'Sí',
        },
        { label: 'Tipo Persona', value: huespedResumen.TipoPersona },
        { label: 'Firma', value: huespedResumen.Firma },
    ];

    const contactItems: InfoItemProps[] = [
        { label: 'Email', value: huespedResumen.Email, fullWidth: true },
        { label: 'Teléfono', value: huespedResumen.Telefono },
        { label: 'Tipo Documento', value: huespedResumen.TipoDocumento },
        { label: 'Nº Documento', value: huespedResumen.IDDocumento },
    ];

    const sections = [
        <InfoSection
            key="personal"
            title="Información Personal"
            items={personalItems}
        />,
        <InfoSection
            key="contact"
            title="Datos Comunicación"
            items={contactItems}
        />,
    ];

    return <BaseCard header={header} sections={sections} />;
}
