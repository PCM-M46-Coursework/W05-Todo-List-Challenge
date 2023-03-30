const AppSettings =
{
    development: {
        GH_ROOT: '/'
    },
    production: {
        GH_ROOT: '/w05-todo-list-challenge'
    },
    routes: [
        { path: "/", page: "LandingPage" }
    ]
};
export default AppSettings;