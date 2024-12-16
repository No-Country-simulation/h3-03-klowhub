export function formatPublicationDate(initialDate: string): string {
    const today = new Date();
    const publicationDate = new Date(initialDate);

    // Calcula la diferencia en milisegundos entre las fechas
    const diffInMs = today.getTime() - publicationDate.getTime();

    // Convierte la diferencia a días
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        return "Publicado hoy";
    } else {
        return `Publicado hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    }
}