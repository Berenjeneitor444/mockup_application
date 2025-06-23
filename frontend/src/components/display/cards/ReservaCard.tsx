import { ReservaResumen } from '../../../types/ReservaResumen';
import { BaseCard } from './base/BaseCard';
import BaseHeader from './base/BaseHeader';
import { InfoItemProps } from './base/InfoItem';
import { InfoSection } from './base/InfoSection';
import { StatusBadge } from './base/StatusBadge';

interface ReservaCardProps {
    reservaResumen: ReservaResumen;
    onDelete?: () => void;
    edit?: boolean;
}

export default function ReservaCard({
    reservaResumen,
    onDelete,
    edit,
}: ReservaCardProps) {
    const header = (
        <BaseHeader
            title={`Reserva #${reservaResumen.ReservationNumber}`}
            subtitle={reservaResumen.hotel}
            primaryInfo={`Check-in: ${reservaResumen.FechaEntrada || 'N/A'}`}
            secondaryInfo={`Check-out: ${reservaResumen.FechaSalida || 'N/A'}`}
            badge={<StatusBadge status={reservaResumen.Estado ?? 'N/A'} />}
            variant="secondary"
            onDelete={onDelete}
            idReserva={reservaResumen.ReservationNumber}
            hotel={reservaResumen.hotel}
            edit={edit}
        />
    );

    const reservationItems: InfoItemProps[] = [
        {
            label: 'Habitación',
            value: reservaResumen.Habitacion || 'No asignada',
            highlight: true,
        },
        {
            label: 'Motivo de Viaje',
            value: reservaResumen.MotivoViaje || 'No especificado',
            fullWidth: true,
        },
        {
            label: 'Fecha de Entrada',
            value: reservaResumen.FechaEntrada || 'N/A',
        },
        {
            label: 'Fecha de Salida',
            value: reservaResumen.FechaSalida || 'N/A',
        },
    ];

    const occupancyItems: InfoItemProps[] = [
        { label: 'Adultos', value: reservaResumen.AD || 0 },
        { label: 'Niños', value: reservaResumen.NI || 0 },
        { label: 'Junior', value: reservaResumen.JR || 0 },
        { label: 'Cunas', value: reservaResumen.CU || 0 },
    ];

    const sections = [
        <InfoSection
            key="details"
            title="Detalles de la Reserva"
            items={reservationItems}
        />,
        <InfoSection
            key="occupancy"
            title="Ocupación de la Habitación"
            items={occupancyItems}
            columns={2}
        />,
    ];

    return <BaseCard header={header} sections={sections} />;
}
