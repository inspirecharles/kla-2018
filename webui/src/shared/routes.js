import HomeContainer from "./components/HomeContainer";
import LotteryResultContainer from "./components/LotteryResultContainer";
import TicketsContainer from "./components/TicketsContainer";
import NewsContainer from "./components/NewsContainer";
import ResultContainer from "./components/ResultContainer";
import ComingSoonContainer from "./components/comingsoon/ComingSoonContainer";

const routes = [
  {
    path: "/",
    exact: true,
    component: HomeContainer
  },
  {
    path: "/results",
    exact: true,
    component: ComingSoonContainer,
    title: 'Results'
  },
  {
    path: "/:game_slug/:draw_id",
    exact: true,
    component: ResultContainer
  },
  {
    path: "/tickets",
    exact: true,
    component: ComingSoonContainer,
    title: 'Tickets'
  },
  {
    path: "/news",
    exact: true,
    component: ComingSoonContainer,
    title: 'News'
  },
];

export default routes;