export class DateUtil {
    formatDate(date: string): string{
        let d: Date = new Date(date);
        let month: string = `${ d.getMonth() + 1 }`;
        let day: string = `${ d.getDate() }`;
        let year: number = d.getFullYear()
            
        if (month.length < 2) {
            month = `0${ month }`;
        }
        if (day.length < 2) {
            day = `0${ day }`;
        }

        return [year, month, day].join('-');
    }
}