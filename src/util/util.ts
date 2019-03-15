export class DateREST {

    public static getDateFormat( date:Date ) {
        let month = date.getUTCMonth().toString().length === 1 ? `0${date.getUTCMonth()+1}` : `${date.getUTCMonth()+1}`;
        return `${date.getDate()}/${month}/${date.getFullYear()}`;
    }

    public static getTimeFormat() {
        let time = new Date();
        return `${time.getHours()}:${time.getMinutes()}`;
    }

}

export class UtilUser {

    public static getDomainUser( userDetail:any ) {
        let params = userDetail.LoginNameWithDomain.split('\\');
        return params[0];
    }

}

