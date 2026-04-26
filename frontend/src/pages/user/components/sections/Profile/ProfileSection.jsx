import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import axiosInstance from '../../../../../api/axiosInstance';
import {
  ProfileContainer,
  ProfileHeader,
  ProfileTitle,
  ProfileSubtitle,
  ProfileContent,
  ProfileForm,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  ButtonGroup,
  SaveButton,
  CancelButton,
  PasswordSection,
  PasswordTitle,
  SuccessMessage,
  ErrorMessage
} from './Profile.styles';

const ProfileSection = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    clearMessages();
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    clearMessages();
  };

  const clearMessages = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    try {
      const response = await axiosInstance.put('/auth/update', formData);
      
      if (response.data.success) {
        setSuccessMessage('Profil mis à jour avec succès!');
        updateUser(response.data.user);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    clearMessages();

    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('Les nouveaux mots de passe ne correspondent pas');
      setPasswordLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setErrorMessage('Le nouveau mot de passe doit contenir au moins 6 caractères');
      setPasswordLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.put('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      if (response.data.success) {
        setSuccessMessage('Mot de passe changé avec succès!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Erreur lors du changement du mot de passe');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileTitle>
          <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Mon Profil
        </ProfileTitle>
        <ProfileSubtitle>
          Gérez vos informations personnelles et votre mot de passe
        </ProfileSubtitle>
      </ProfileHeader>

      <ProfileContent>
        {successMessage && (
          <SuccessMessage>
            {successMessage}
          </SuccessMessage>
        )}

        {errorMessage && (
          <ErrorMessage>
            {errorMessage}
          </ErrorMessage>
        )}

        <ProfileForm onSubmit={handleProfileUpdate}>
          <FormGroup>
            <FormLabel>Prénom</FormLabel>
            <FormInput
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Entrez votre prénom"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Nom</FormLabel>
            <FormInput
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Entrez votre nom"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Entrez votre email"
            />
          </FormGroup>

          
          <ButtonGroup>
            <SaveButton type="submit" disabled={loading}>
              {loading ? 'Mise à jour...' : 'Mettre à jour le profil'}
            </SaveButton>
          </ButtonGroup>
        </ProfileForm>

        <PasswordSection>
          <PasswordTitle>Changer le mot de passe</PasswordTitle>
          <ProfileForm onSubmit={handlePasswordUpdate}>
            <FormGroup>
              <FormLabel>Mot de passe actuel</FormLabel>
              <FormInput
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Entrez votre mot de passe actuel"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormInput
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Entrez le nouveau mot de passe"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
              <FormInput
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirmez le nouveau mot de passe"
              />
            </FormGroup>

            <ButtonGroup>
              <SaveButton type="submit" disabled={passwordLoading}>
                {passwordLoading ? 'Changement...' : 'Changer le mot de passe'}
              </SaveButton>
            </ButtonGroup>
          </ProfileForm>
        </PasswordSection>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default ProfileSection;
