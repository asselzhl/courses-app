export function getCourseDuration (durationInMinutes) {
    let hours: string | number = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    let unit;
    if (hours === 1) {
        unit = 'hour';
    } else {
        unit = 'hours';
    }

    if (hours < 10) {   
        hours = hours.toString().padStart(2, '0');
    }

    return `${hours}:${minutes} ${unit}`;
}