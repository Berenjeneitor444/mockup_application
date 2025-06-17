export function dateFormatter(date: Date | undefined, pattern: string): string {
    if (!date) return '';
    return pattern
        .replace(/yyyy/, String(date.getUTCFullYear()).padStart(4, '0'))
        .replace(/MM/, String(date.getUTCMonth() + 1).padStart(2, '0'))
        .replace(/dd/, String(date.getUTCDate()).padStart(2, '0'))
        .replace(/hh/, String(date.getUTCHours()).padStart(2, '0'))
        .replace(/mm/, String(date.getUTCMinutes()).padStart(2, '0'))
        .replace(/ss/, String(date.getUTCSeconds()).padStart(2, '0'));
}

export function dateParser(date: string | undefined): Date | undefined {
    // si no hay fecha devuelve null
    if (!date) return;
    const dateStr: string = date.replaceAll('-', '');
    const yyyy = parseInt(dateStr.substring(0, 4));
    const mm = parseInt(dateStr.substring(4, 6));
    const dd = parseInt(dateStr.substring(6, 8));
    if (date.length < 14) return new Date(Date.UTC(yyyy, mm - 1, dd));
    const hh = parseInt(dateStr.substring(8, 10));
    const min = parseInt(dateStr.substring(10, 12));
    const sec = parseInt(dateStr.substring(12, 14));
    return new Date(Date.UTC(yyyy, mm - 1, dd, hh, min, sec));
}

// convierte resultado del input type date (hh:mm) a hhmmss o viceversa
export function timeFormatter(
    timeStr: string,
    toNumeric: boolean = true
): string {
    if (toNumeric) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return `${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}00`;
    } else {
        const hours = timeStr.substring(0, 2);
        const minutes = timeStr.substring(2, 4);
        return `${hours}:${minutes}`;
    }
}
