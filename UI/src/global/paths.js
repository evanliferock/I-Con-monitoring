// Defining the path extensions including the admin pages
const PATHS = {
    LOGIN: '/Login',
    MAIN: '/MainPage',
    MAIN_MATCHING: '/(|MainPage)',
    PLAN: '/MaintenancePlan',
    COMPLETE_CANCEL: '/CompleteCancel',
    PROFILE: '/UserProfile',
    ADMIN_PATHS: {
        ADMIN: '/AdminUser',
        CREATE_USER: '/CreateUser',
        EDIT_USER: '/EditUser',
    }
};

export default PATHS;
