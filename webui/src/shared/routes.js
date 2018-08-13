import HomeContainer from "./components/HomeContainer";
import LotteryResultContainer from "./components/LotteryResultContainer";
import TicketsContainer from "./components/TicketsContainer";
import NewsContainer from "./components/NewsContainer";

const routes = [
  {
    path: "/",
    exact: true,
    component: HomeContainer
  },
  {
    path: "/results",
    exact: true,
    component: LotteryResultContainer
  },
  {
    path: "/tickets",
    exact: true,
    component: TicketsContainer
  },
  {
    path: "/news",
    exact: true,
    component: NewsContainer
  },
];

export default routes;