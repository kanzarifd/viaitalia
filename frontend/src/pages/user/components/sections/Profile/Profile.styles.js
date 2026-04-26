import styled from 'styled-components';

export const ProfileContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  min-height: calc(100vh - 200px);
`;

export const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const ProfileTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  svg {
    color: #4CAF50;
  }
`;

export const ProfileSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

export const ProfileContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const ProfileForm = styled.form`
  margin-bottom: 2rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }

  option {
    background: #2d3748;
    color: #ffffff;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

export const SaveButton = styled.button`
  background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
  color: #ffffff;
  border: 2px solid #4CAF50;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
    border-color: #45a049;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const CancelButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const PasswordSection = styled.div`
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  padding-top: 2rem;
  margin-top: 2rem;
`;

export const PasswordTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1.5rem;
`;

export const SuccessMessage = styled.div`
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
`;

export const ErrorMessage = styled.div`
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
`;
