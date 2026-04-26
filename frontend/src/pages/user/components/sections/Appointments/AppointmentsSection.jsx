import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import { useAppointments } from '../../../hooks/useAppointments';
import { animateAppointmentCard, animateBookingForm } from '../../../utils/animations';
import {
  AppointmentsContainer,
  AppointmentsHeader,
  AppointmentsTitle,
  ToggleButton,
  BookingForm,
  FormGrid,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  FormTextarea,
  SubmitButton,
  LoadingSpinner,
  AppointmentsList,
  AppointmentsListHeader,
  AppointmentCard,
  AppointmentHeader,
  AppointmentContent,
  AppointmentActions,
  StatusBadge,
  AppointmentTitle,
  AppointmentDetails,
  AppointmentDetail,
  DetailIcon,
  CancelButton,
  StatusText,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  NotificationMessage
} from './Appointments.styles';

const AppointmentsSection = () => {
  const { user } = useAuth();
  const {
    appointments,
    isLoading,
    isCreating,
    newAppointment,
    createAppointment,
    deleteAppointment,
    updateAppointmentStatus,
    handleInputChange,
    resetNewAppointment
  } = useAppointments(user?.id);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleToggleForm = () => {
    setShowBookingForm(!showBookingForm);
    if (!showBookingForm) {
      resetNewAppointment();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createAppointment(newAppointment);
      setShowBookingForm(false);
      resetNewAppointment();
      showNotification('Rendez-vous créé avec succès!', 'success');
    } catch (error) {
      console.error('Error creating appointment:', error);
      showNotification('Erreur lors de la création du rendez-vous', 'error');
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await updateAppointmentStatus(appointmentId, 'CANCELLED');
      showNotification('Rendez-vous annulé', 'success');
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      showNotification('Erreur lors de l\'annulation', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const formatAppointmentDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAppointmentTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'Confirmé';
      case 'CANCELLED':
        return 'Annulé';
      case 'PENDING':
      default:
        return 'En attente';
    }
  };

  const renderAppointmentCard = (appointment, index) => (
    <AppointmentCard
      key={appointment.id}
      ref={(el) => {
        if (el) {
          animateAppointmentCard(el, index * 0.1);
        }
      }}
    >
      <AppointmentHeader>
        <AppointmentContent>
          <StatusBadge status={appointment.status}>
            {getStatusLabel(appointment.status)}
          </StatusBadge>
          <AppointmentTitle>{appointment.type}</AppointmentTitle>
          <AppointmentDetails>
            <AppointmentDetail>
              <DetailIcon>📅</DetailIcon>
              {formatAppointmentDate(appointment.date)}
            </AppointmentDetail>
            <AppointmentDetail>
              <DetailIcon>🕐</DetailIcon>
              {formatAppointmentTime(appointment.date)}
            </AppointmentDetail>
            <AppointmentDetail>
              <DetailIcon>📍</DetailIcon>
              {appointment.etat === 'PRESENTIEL' ? 'Présentiel' : 'En ligne'}
            </AppointmentDetail>
            {appointment.notes && (
              <AppointmentDetail>
                <DetailIcon>📝</DetailIcon>
                {appointment.notes}
              </AppointmentDetail>
            )}
          </AppointmentDetails>
        </AppointmentContent>
        <AppointmentActions>
          {appointment.status === 'PENDING' && (
            <CancelButton onClick={() => handleCancelAppointment(appointment.id)}>
              Annuler
            </CancelButton>
          )}
          {appointment.status === 'CONFIRMED' && (
            <StatusText status={appointment.status}>Confirmé</StatusText>
          )}
          {appointment.status === 'CANCELLED' && (
            <StatusText status={appointment.status}>Annulé</StatusText>
          )}
        </AppointmentActions>
      </AppointmentHeader>
    </AppointmentCard>
  );

  const renderBookingForm = () => (
    <BookingForm
      ref={(el) => {
        if (el) {
          animateBookingForm(el);
        }
      }}
      onSubmit={handleSubmit}
    >
      <FormGrid>
        <FormGroup>
          <FormLabel>Date</FormLabel>
          <FormInput
            type="date"
            name="date"
            value={newAppointment.date}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Heure</FormLabel>
          <FormInput
            type="time"
            name="time"
            value={newAppointment.time}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
      </FormGrid>
      
      <FormGroup>
        <FormLabel>Service</FormLabel>
        <FormSelect
          name="type"
          value={newAppointment.type}
          onChange={handleInputChange}
          required
        >
          <option value="">Sélectionnez un service</option>
          <option value="consultation">Consultation d'admission</option>
          <option value="documents">Aide aux documents</option>
          <option value="visa">Assistance visa</option>
          <option value="logement">Recherche logement</option>
          <option value="orientation">Orientation académique</option>
        </FormSelect>
      </FormGroup>
      
      <FormGroup>
        <FormLabel>Mode de rendez-vous</FormLabel>
        <FormSelect
          name="etat"
          value={newAppointment.etat}
          onChange={handleInputChange}
          required
        >
          <option value="PRESENTIEL">Présentiel</option>
          <option value="EN_LIGNE">En ligne</option>
        </FormSelect>
      </FormGroup>
      
      <FormGroup>
        <FormLabel>Notes (optionnel)</FormLabel>
        <FormTextarea
          name="notes"
          value={newAppointment.notes}
          onChange={handleInputChange}
          placeholder="Ajoutez des notes supplémentaires..."
        />
      </FormGroup>
      
      <SubmitButton type="submit" disabled={isCreating}>
        {isCreating ? (
          <>
            <LoadingSpinner viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.3" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </LoadingSpinner>
            Création en cours...
          </>
        ) : (
          <>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2m0 0l2-2m-2 2l-2-2" />
            </svg>
            Confirmer le Rendez-vous
          </>
        )}
      </SubmitButton>
    </BookingForm>
  );

  const renderEmptyState = () => (
    <EmptyState>
      <EmptyStateIcon>📅</EmptyStateIcon>
      <EmptyStateText>Vous n'avez pas encore de rendez-vous.</EmptyStateText>
    </EmptyState>
  );

  return (
    <AppointmentsContainer>
      {notification && (
        <NotificationMessage type={notification.type}>
          {notification.message}
        </NotificationMessage>
      )}
      
      <AppointmentsHeader>
        <AppointmentsTitle>
          Nouveau Rendez-vous ({appointments.length})
        </AppointmentsTitle>
        <ToggleButton onClick={handleToggleForm}>
          {showBookingForm ? 'Annuler' : 'Ajouter'}
        </ToggleButton>
      </AppointmentsHeader>

      {showBookingForm && renderBookingForm()}
      
      <AppointmentsList>
        <AppointmentsListHeader>Mes Rendez-vous</AppointmentsListHeader>
        
        {isLoading ? (
          <EmptyState>
            <LoadingSpinner viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.3" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </LoadingSpinner>
            <EmptyStateText>Chargement...</EmptyStateText>
          </EmptyState>
        ) : appointments.length === 0 ? (
          renderEmptyState()
        ) : (
          appointments.map(renderAppointmentCard)
        )}
      </AppointmentsList>
    </AppointmentsContainer>
  );
};

export default AppointmentsSection;
