export default function convertHourToMinutes(time: string) {
    // input example "08:00"

    // Will take each element between ':', tranform them into 'Number' type and return them into an array of size 2.
    const [hour, minutes] = time.split(':').map(Number); 

    const timeInMinutes = (hour * 60) + minutes;
    return timeInMinutes;
}