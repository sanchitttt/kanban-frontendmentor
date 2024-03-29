let routes = {
    BACKEND_ROUTE: `https://kanban-backend-hazel.vercel.app/v1`,
    SIGNUP_ROUTE: `https://kanban-backend-hazel.vercel.app/v1/auth/register`,
    LOGIN_ROUTE: `https://kanban-backend-hazel.vercel.app/v1/auth/login`,
    DASHBOARD_ROUTE: `https://kanban-backend-hazel.vercel.app/v1/dashboard`,
    EDIT_TASK_ROUTE: `https://kanban-backend-hazel.vercel.app/v1/dashboard/editTask`,
    ADD_TASK_ROUTE: `https://kanban-backend-hazel.vercel.app/v1/dashboard/addTask`,
    EDIT_BOARD_ROUTE: `https://kanban-backend-hazel.vercel.app/v1/dashboard/editBoard`,
    ADD_BOARD_ROUTE: `https://kanban-backend-hazel.vercel.app/v1/dashboard/addBoard`,
    SUBTASKS_PATCH_ROUTE: `https://kanban-backend-hazel.vercel.app/v1/dashboard/viewTask`,
    DELETE_BOARD_ROUTE: `https://kanban-backend-hazel.vercel.app/v1/dashboard/deleteBoard`,
    DELETE_TASK_ROUTE: `https://kanban-backend-hazel.vercel.app/v1/dashboard/deleteTask`,
    GENERATE_BOARD_ROUTE: `https://kanban-backend-hazel.vercel.app/v1/openai`
}

export default routes;