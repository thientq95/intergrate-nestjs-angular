export class DateUtil {
    static getNow(): string {
        return new Date().toISOString();
    }

    static getFullDate(newDate) {
        let today = new Date(newDate);
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    }

    static convertMonthYearToDateTime(month: number, year: number) {
        const date = new Date();
        date.setMonth(month);
        date.setFullYear(year);
        return date;
    }
}
