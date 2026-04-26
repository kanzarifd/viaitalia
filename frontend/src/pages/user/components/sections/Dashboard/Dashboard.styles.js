import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 200px);
`;

export const DashboardHeader = styled.div`
  margin-bottom: 3rem;
`;

export const DashboardTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

export const DashboardSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

export const WelcomeCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

export const WelcomeMessage = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

export const WelcomeUser = styled.span`
  color: #4CAF50;
  font-weight: 700;
`;

export const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const SectionCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const SectionIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

export const SectionDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 1rem 0;
  line-height: 1.4;
`;

export const SectionBadge = styled.div`
  display: inline-block;
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
`;

// Keep the old components for the progress dashboard design
export const DashboardWrapper = styled.div`
  padding: 2rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const Card = styled.div`
  background: #020617;
  border: 1px solid #1e293b;
  border-radius: 18px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  color: #ffffff;

  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 0.5rem;
    }
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #ffffff;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #1e293b;
  border-radius: 10px;
  margin: 1rem 0;
`;

export const ProgressFill = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  background: #22c55e;
  border-radius: 10px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const Status = styled.div`
  font-size: 0.8rem;
  color: ${(props) => (props.active ? "#22c55e" : "#64748b")};
`;

export const Button = styled.button`
  margin-top: 1rem;
  background: #22c55e;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  color: black;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #16a34a;
    transform: translateY(-1px);
  }
`;
