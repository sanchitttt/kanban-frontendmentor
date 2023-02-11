let routes = {
    BACKEND_ROUTE: `http://localhost:8082/v1`,
    SIGNUP_ROUTE: `http://localhost:8082/v1/auth/register`,
    LOGIN_ROUTE: `http://localhost:8082/v1/auth/login`,
    DASHBOARD_ROUTE: `http://localhost:8082/v1/dashboard`,
    EDIT_TASK_ROUTE: `http://localhost:8082/v1/dashboard/editTask`,
    ADD_TASK_ROUTE: `http://localhost:8082/v1/dashboard/addTask`,
    EDIT_BOARD_ROUTE: `http://localhost:8082/v1/dashboard/editBoard`,
    ADD_BOARD_ROUTE: `http://localhost:8082/v1/dashboard/addBoard`,
    SUBTASKS_PATCH_ROUTE : `http://localhost:8082/v1/dashboard/viewTask`,
    DELETE_BOARD_ROUTE : `http://localhost:8082/v1/dashboard/deleteBoard`,
    DELETE_TASK_ROUTE : `http://localhost:8082/v1/dashboard/deleteTask`,
}

export default routes;