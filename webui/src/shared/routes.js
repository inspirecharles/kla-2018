import HomeContainer from "./components/HomeContainer";
import LotteryResultContainer from "./components/LotteryResultContainer";
import TicketsContainer from "./components/TicketsContainer";
import NewsContainer from "./components/news/NewsContainer";
import NewsDetailContainer from "./components/news/NewsDetailContainer";
import ResultContainer from "./components/ResultContainer";
import ComingSoonContainer from "./components/comingsoon/ComingSoonContainer";
import TermsContainer from "./components/site/TermsContainer";
import PrivacyContainer from "./components/site/PrivacyContainer";
import SearchResultContainer from "./components/results/SearchResultContainer";

const routes = [
  {
    path: "/",
    exact: true,
    component: HomeContainer
  },
  {
    path: "/results",
    exact: true,
    component: LotteryResultContainer,
    title: 'Results'
  },
  {
    path: "/:game_slug/results/:draw_id?",
    exact: true,
    component: SearchResultContainer,
    title: 'Results (Game)'
  },
  {
    path: "/check-your-ticket",
    exact: true,
    component: ComingSoonContainer,
    title: 'Tickets'
  },
  {
    path: "/news",
    exact: true,
    component: NewsContainer,
    title: 'News'
  },
  {
    path: "/news/:slug",
    exact: true,
    component: NewsDetailContainer,
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
  {
    path: "/:game_slug",
    exact: true,
    component: ResultContainer
  },


];

export default routes;