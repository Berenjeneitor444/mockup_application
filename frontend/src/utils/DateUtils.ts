export function dateFormatter(date: Date, pattern: string): string {
    return pattern
        .replace(/yyyy/, date.getFullYear().toString())
        .replace(/MM/, String(date.getMonth() + 1).padStart(2, '0'))
        .replace(/dd/, String(date.getDate()).padStart(2, '0'))
        .replace(/hh/, String(date.getHours()).padStart(2, '0'))
        .replace(/mm/, String(date.getMinutes()).padStart(2, '0'))
        .replace(/ss/, String(date.getSeconds()).padStart(2, '0'));
}

export function dateParser(date: string | undefined): Date | null {
    // si no hay fecha devuelve null
    if (!date) return null;
    const yyyy = parseInt(date.substring(0, 4));
    const mm = parseInt(date.substring(4, 6));
    const dd = parseInt(date.substring(6, 8));
    if (date.length < 14) return new Date(yyyy, mm - 1, dd);
    const hh = parseInt(date.substring(8, 10));
    const min = parseInt(date.substring(10, 12));
    const sec = parseInt(date.substring(12, 14));
    return new Date(yyyy, mm - 1, dd, hh, min, sec);
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
