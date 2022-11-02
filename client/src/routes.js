import { MAIN_ROUTE, ACCOUNT_ROUTE, PEOPLE_ROUTE } from "./utils/consts";
import { MainPage, AccountPage, PeoplePage} from './pages';

export const authRoutes = [
    {
        path: ACCOUNT_ROUTE,
        Component: AccountPage
    },
    {
        path: PEOPLE_ROUTE,
        Component: PeoplePage
    }
];

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    }
];