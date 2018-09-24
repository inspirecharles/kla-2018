import HomeContainer from "./components/HomeContainer";
import LotteryResultContainer from "./components/LotteryResultContainer";
import TicketsContainer from "./components/TicketsContainer";
import NewsContainer from "./components/NewsContainer";
import ResultContainer from "./components/ResultContainer";
import ComingSoonContainer from "./components/comingsoon/ComingSoonContainer";
import TermsContainer from "./components/site/TermsContainer";
import PrivacyContainer from "./components/site/PrivacyContainer";

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
    path: "/results/:game_slug",
    exact: true,
    component: ComingSoonContainer,
    title: 'Results (Game)'
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
  {
    path: "/buy-now",
    exact: true,
    component: ComingSoonContainer,
    title: 'Buy Now'
  },
  {
    path: "/get-notified",
    exact: true,
    component: ComingSoonContainer,
    title: 'Buy Now'
  },
  {
    path: "/terms-and-conditions",
    exact: true,
    component: TermsContainer,
    title: 'Terms and Conditions'
  },
  {
    path: "/privacy",
    exact: true,
    component: PrivacyContainer,
    title: 'Privacy Policy'
  },


];

export default routes;