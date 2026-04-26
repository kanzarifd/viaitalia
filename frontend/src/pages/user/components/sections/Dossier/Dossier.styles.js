import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const DossierContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const DossierHeader = styled.div`
  margin-bottom: 2rem;
`;

export const DossierTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

export const DossierProgress = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const ProgressText = styled.div`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

export const ProgressBar = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  height: 12px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
  border-radius: 10px;
  transition: width 0.6s ease;
  width: ${props => props.percentage || 0}%;
`;

export const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StepCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: ${props => props.locked ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  animation: ${slideUp} 0.6s ease-out;
  animation-delay: ${props => props.delay || 0}s;
  animation-fill-mode: both;
  
  ${props => {
    if (props.locked) {
      return `
        opacity: 0.6;
        border-color: rgba(251, 191, 36, 0.3);
      `;
    }
    
    switch (props.status) {
      case 'success':
        return `
          border-color: rgba(34, 197, 94, 0.3);
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(34, 197, 94, 0.2);
          }
        `;
      case 'warning':
        return `
          border-color: rgba(251, 191, 36, 0.3);
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(251, 191, 36, 0.2);
          }
        `;
      default:
        return `
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
          }
        `;
    }
  }}
`;

export const StepIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

export const StepContent = styled.div`
  flex: 1;
`;

export const StepTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
`;

export const StepStatus = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  
  ${props => {
    switch (props.status) {
      case 'success':
        return `
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.3);
        `;
      case 'warning':
        return `
          background: rgba(251, 191, 36, 0.2);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.3);
        `;
      default:
        return `
          background: rgba(107, 114, 128, 0.2);
          color: #6b7280;
          border: 1px solid rgba(107, 114, 128, 0.3);
        `;
    }
  }}
`;

export const StepDescription = styled.p`
  color: #a0a0a0;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  line-height: 1.5;
`;

export const StepTime = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

export const StepActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const StepButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
          }
        `;
      case 'secondary':
        return `
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          
          &:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
          }
        `;
      case 'success':
        return `
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.3);
        `;
      default:
        return `
          background: rgba(107, 114, 128, 0.2);
          color: #6b7280;
          border: 1px solid rgba(107, 114, 128, 0.3);
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const LoadingSpinner = styled.svg`
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
`;

export const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.7;
`;

export const EmptyStateText = styled.div`
  h3 {
    color: #ffffff;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #a0a0a0;
    font-size: 1rem;
  }
`;

export const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
`;
