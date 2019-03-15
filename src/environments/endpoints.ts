const IP_WALMEET_CORE = "http://walmeet-core.dev.walmeet.architecturemx.prod.walmart.com";
// const IP_WALMEET_CORE = "http://localhost";
const PORT_WALMEET_CORE = "8080";
const IP_WALMEET_BUSINESS = "http://walmeet-business.dev.walmeet.architecturemx.prod.walmart.com";
// const IP_WALMEET_BUSINESS = "http://localhost";
const PORT_WALMEET_BUSINESS = "8080";
const URL_NET_FOUNDATION_9209 = 'https://dpgta0101.mx.wal-mart.com:9209';

export const SEARCH_USER_BY_LOGIN_USER = `${URL_NET_FOUNDATION_9209}/searchService/searchUser`;

const URL_WALMEET_CORE = `${IP_WALMEET_CORE}:${PORT_WALMEET_CORE}/walmart`; 
const URL_WALMEET_BUSINESS = `${IP_WALMEET_BUSINESS}:${PORT_WALMEET_BUSINESS}/walmart`;

export const GET_DOMAINS = 'https://dpgta0101.mx.wal-mart.com:9208/authorizationService/getDomains';
export const VALIDATE_USER = 'https://dpgta0101.mx.wal-mart.com:9207/authenticationService/validateUser';
export const GET_USER_DETAIL = 'https://dpgta0101.mx.wal-mart.com:9208/authorizationService/getUserDetail';

export const GET_BUILDINGS = `${URL_WALMEET_CORE}/manageBuildiing/findall`;
export const GET_CONFIG = `${URL_WALMEET_CORE}/manageBuildiing/getconfigbuilding`;


export const GET_CAPACITY_MEETING_ROOM_FILTERS = `${URL_WALMEET_CORE}/manageMeetingRoom/getCapacityCatalog`;
export const GET_MEETING_ROOM_FILTERS = `${URL_WALMEET_CORE}/manageMeetingRoom/findall`; 
export const GET_MEETING_ROOM_BULDING_BY_ID = `${URL_WALMEET_CORE}/manageMeetingRoom/findbyid`;
export const GET_IMAGE_MAP = `${URL_WALMEET_CORE}/manageMeetingRoom/getImage`

export const FIND_BY_USER_MEETINGROOM = `${URL_WALMEET_BUSINESS}/meetingRoomReservation/findAll`;
export const VERIFY_SUPPLIER = `${URL_WALMEET_BUSINESS}/meetingRoomReservation/checkIsSupplier`;
export const GET_MEETING_ROOMS_SEARCH = `${URL_WALMEET_BUSINESS}/meetingRoomReservation/search` ;
export const GET_SCHEDULE_RESERVATION_BY_ID =`${URL_WALMEET_BUSINESS}/meetingRoomReservation/getAvailability`;
export const GENERATE_RESERVATION = `${URL_WALMEET_BUSINESS}/meetingRoomReservation/generateReservation`;
export const GET_AVAILABILITY_DAY = `${URL_WALMEET_BUSINESS}/meetingRoomReservation/getDayMeetingRoom`;
export const GET_NOTIFICATION = `${URL_WALMEET_BUSINESS}/meetingRoomReservation/getNotification`;

export const CANCEL_RESERVATION = `${URL_WALMEET_BUSINESS}/reservationWorFlow/cancel`;
export const REPORT_INCIDENT = `${URL_WALMEET_BUSINESS}/reservationWorFlow/reportIncident`;



// // LOGIN SERVICES 
// const URL_NET_FOUNDATION = 'https://dpgta0101.mx.wal-mart.com:9207';
// const URL_NET_FOUNDATION_9208 = 'https://dpgta0101.mx.wal-mart.com:9208';
// const AUTHENTICATION_SERVICE = '/authenticationService' ; 
// const AUTHORIZATION_SERVICE = '/authorizationService' ; 


// export const ENDPOINT_LOGIN_VALIDATE_CREDENTIALS = URL_NET_FOUNDATION+AUTHENTICATION_SERVICE+'/validateUserCredentials';
// export const ENDPOINT_LOGIN_RENEW_TOKEN = URL_NET_FOUNDATION+AUTHENTICATION_SERVICE+'/renewToken';
// export const ENDPOINT_LOGIN_GET_NAVIGATION_ITEMS = URL_NET_FOUNDATION_9208+AUTHORIZATION_SERVICE+'/getNavigationItems';
// export const ENDPOINT_LOGOUT = URL_NET_FOUNDATION+AUTHENTICATION_SERVICE+'/logOutUser';

// export const ENDPOINT_LOGIN_GET_USER_DETAIL = URL_NET_FOUNDATION_9208+AUTHORIZATION_SERVICE+'/getUserDetail';
// export const ENDPOINT_LOGIN_GET_MENU_LIST = URL_NET_FOUNDATION_9208+AUTHORIZATION_SERVICE+'/getNavigationItems';
// export const ENDPOINT_LOGIN_GET_USER_ROLES = URL_NET_FOUNDATION_9208+AUTHORIZATION_SERVICE+'/getUserRoles';

// export const ENDPOINT_GET_DOMAIN_LIST = URL_NET_FOUNDATION_9208+AUTHORIZATION_SERVICE+'/getDomains';

// //LOGIN WITHOUT USER ROL
// export const ENDPOINT_LOGIN_VALIDATE_USER_REQUEST = URL_NET_FOUNDATION+AUTHENTICATION_SERVICE+'/validateUser'

// //SEARCH USER
// export const ENDPOINT_GET_DETAILS_USER_BY_ID = URL_NET_FOUNDATION_9209 + '/searchService/searchUser';

// //WALMEET ENDPOINTS
// const IP_WALMEET_CORE = "http://localhost";
// const PORT_WALMEET_CORE = "8080";
// const IP_WALMEET_BUSINESS = "http://localhost";
// const PORT_WALMEET_BUSINESS = "8081";

// const URL_WALMEET_CORE = IP_WALMEET_CORE + ":" + PORT_WALMEET_CORE + '/walmart'; 
// const URL_WALMEET_BUSINESS = IP_WALMEET_BUSINESS + ":" + PORT_WALMEET_BUSINESS + '/walmart';

// export const ENDPOINT_WALMEET_CREATE_MEETING_ROOM= URL_WALMEET_CORE + '/manageMeetingRoom/savemeetingroom';
// export const ENDPOINT_WALMEET_EDIT_MEETING_ROOM = URL_WALMEET_CORE + '/manageMeetingRoom/editmeetingroom';
// export const ENDPOINT_WALMEET_DELETE_MEETING_ROOM = URL_WALMEET_CORE + '/manageMeetingRoom/deletemeetingroom';


// export const ENDPOINT_WALMEET_GET_CAPACITY_MEETING_ROOM_FILTERS = URL_WALMEET_CORE + '/manageMeetingRoom/getCapacityCatalog';
// export const ENDPOINT_WALMEET_GET_TYPE_MEETING_ROOM_FILTERS = URL_WALMEET_CORE + '/manageMeetingRoom/findAll';

// export const ENDPOINT_BUILDINGS_GET     = URL_WALMEET_CORE + '/manageBuildiing/findall';
// export const ENDPOINT_BUILDINGS_CREATE = URL_WALMEET_CORE + '/manageBuildiing/savebuilding';
// export const ENDPOINT_BUILDINGS_UPDATE = URL_WALMEET_CORE + '/manageBuildiing/editbuildiing';
// export const ENDPOINT_BUILDINGS_DELETE = URL_WALMEET_CORE + '/manageBuildiing/deletebuilding';
// export const ENDPOINT_BUILDINGS_GET_BY_ID = URL_WALMEET_CORE + '/manageBuildiing/findbuildinngbyid';

// export const ENDPOINT_CONFIG_BUILDINGS_GET  =  URL_WALMEET_CORE + '/manageBuildiing/getconfigbuilding';
// export const ENDPOINT_CONFIG_BUILDINGS_SAVE =  URL_WALMEET_CORE + '/manageBuildiing/saveconfigbuilding';

// export const ENDPOINT_GET_BUILDING_BY_USER = URL_WALMEET_CORE + '/manageBuildiing/getbuildingbyidadmin';

// export const ENDPOINT_WALMEET_CREATE_ADMINISTRATOR_GENERAL = URL_WALMEET_CORE + '/manageAdministrator/saveadministrator' ;
// export const ENDPOINT_WALMEET_DELETE_ADMINISTRATOR_GENERAL = URL_WALMEET_CORE + '/manageAdministrator/deleteadministrator' ;
// export const ENDPOINT_WALMEET_GET_ADMINISTRATOR_GENERAL_BY_ID = URL_WALMEET_CORE + '/manageAdministrator/findadministratorbyid' ;
// export const ENDPOINT_WALMEET_GET_ADMINISTRATOR_GENERAL_FILTERS = URL_WALMEET_CORE + '/manageAdministrator/findall' ;

// export const ENDPOINT_WALMEET_GET_MEETING_ROOMS_RESERVATION = URL_WALMEET_BUSINESS + '/meetingRoomReservation/search' ;
// export const ENDPOINT_WALMEET_GET_AVAILABILITY_MEETING_ROOM_BY_ID = URL_WALMEET_BUSINESS + '/meetingRoomReservation/getAvailability';



// export const ENDPOINT_WALMEET_GET_RESERVATION_FILTERS = URL_WALMEET_BUSINESS + '/meetingRoomReservation/findAll';



// export const ENDPOINT_WALMEET_VERIFY_SUPPLIER = URL_WALMEET_BUSINESS + '/meetingRoomReservation/checkIsSupplier';

// export const ENDPOINT_WALMEET_CHECK_IN_RESERVATION = URL_WALMEET_BUSINESS + '/reservationWorFlow/checkIn';

// export const ENDPOINT_WALMEET_APPROVAL_RESERVATION = URL_WALMEET_BUSINESS + '/reservationWorFlow/approvalReservation';



// export const ENDPOINT_WALMEET_GET_CUSTOM_SCHEDULE_FILTERS = URL_WALMEET_CORE + '/customSchedule/findAll';
// export const ENDPOINT_WALMEET_GET_CUSTOM_SCHEDULE_BY_ID = URL_WALMEET_CORE + '/customSchedule/getCustomScheduleById';
// export const ENDPOINT_WALMEET_CREATE_CUSTOM_SCHEDULE = URL_WALMEET_CORE + '/customSchedule/saveCustomSchedule';
// export const ENDPOINT_WALMEET_EDIT_CUSTOM_SCHEDULE = URL_WALMEET_CORE + '/customSchedule/editCustomSchedule';
// export const ENDPOINT_WALMEET_DELETE_CUSTOM_SCHEDULE = URL_WALMEET_CORE + '/customSchedule/deleteCustomSchedule';

// export const ENDPOINT_WALMEET_CREATE_SUPPLIER = URL_WALMEET_CORE + '/manageAdministrator/saveadministrator' ;
// export const ENDPOINT_WALMEET_DELETE_SUPPLIER = URL_WALMEET_CORE + '/manageAdministrator/deleteadministrator' ;
// export const ENDPOINT_WALMEET_GET_SUPPLIER_BY_ID = URL_WALMEET_CORE + '/manageAdministrator/findadministratorbyid' ;
// export const ENDPOINT_WALMEET_GET_SUPPLIER_FILTERS = URL_WALMEET_CORE + '/manageAdministrator/findall' ;

// // MYAPP Endpoints 
// const MYAPP_URL = 'http://localhost:4004/walmart' ; 
// const MYAPP_CUSTOMER = '/customer' ;
// const CUSTOMER = MYAPP_URL + MYAPP_CUSTOMER ; 

// export const ENDPOINT_MYAPP_CREATE_CUSTOMER = CUSTOMER+'/create' ;


// // DEFAULT HEADERS
// export const HEADERS = { 
// //    "Content-Type" : 'text/plain', 
//     "Content-Type" : 'application/json', 
//     "Accept" : "application/json, text/plain, */*",
//     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
// }
