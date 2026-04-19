import { GlobalStyle } from "../globalStyles";
import { lazy, Suspense } from "react";
import styled from "styled-components";

const Home = lazy(() => import("./Home"));
const Header = lazy(() => import("../components/header/index"));
const Footer = lazy(() => import("../components/footer/index"));
const ScrollToTop = lazy(() => import("../components/scrollTotop/index"));

const Container = styled.div`
  background: linear-gradient(135deg, #0a0b10 0%, #1a1b2e 100%);
  min-height: 100vh;
`;

function Accueil() {
  return (
    <>
   <Suspense fallback={null}>
        <GlobalStyle />
        {/* Hi There! */}
        <Header />
        <Container>
          <Home />
        </Container>
        <Footer />
        <ScrollToTop />
      </Suspense>
    </>
  );
}

export default Accueil;