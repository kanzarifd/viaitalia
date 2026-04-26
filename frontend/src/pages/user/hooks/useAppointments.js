import { useState, useEffect } from 'react';
import appointmentService from '../../../api/appointmentService';

export const useAppointments = (userId) => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    type: '',
    etat: 'PRESENTIEL',
    notes: ''
  });
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await appointmentService.getAppointmentsByUserId(userId);
      if (response.success && response.data) {
        setAppointments(response.data);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Erreur lors de la récupération des rendez-vous');
    } finally {
      setIsLoading(false);
    }
  };

  const createAppointment = async (appointmentData) => {
    if (!userId) return;
    
    setIsCreating(true);
    setError(null);
    
    try {
      const response = await appointmentService.createAppointment({
        ...appointmentData,
        userId
      });
      
      if (response.success && response.data) {
        setAppointments(prev => [...prev, response.data]);
        return response.data;
      }
    } catch (err) {
      console.error('Error creating appointment:', err);
      setError('Erreur lors de la création du rendez-vous');
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      const response = await appointmentService.deleteAppointment(appointmentId);
      if (response.success) {
        setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
      }
    } catch (err) {
      console.error('Error deleting appointment:', err);
      setError('Erreur lors de la suppression du rendez-vous');
      throw err;
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const response = await appointmentService.updateAppointmentStatus(appointmentId, status);
      if (response.success && response.data) {
        setAppointments(prev => 
          prev.map(apt => 
            apt.id === appointmentId ? { ...apt, status: response.data.status } : apt
          )
        );
      }
    } catch (err) {
      console.error('Error updating appointment status:', err);
      setError('Erreur lors de la mise à jour du statut');
      throw err;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetNewAppointment = () => {
    setNewAppointment({
      date: '',
      time: '',
      type: '',
      etat: 'PRESENTIEL',
      notes: ''
    });
  };

  useEffect(() => {
    fetchAppointments();
  }, [userId]);

  return {
    appointments,
    isLoading,
    isCreating,
    newAppointment,
    error,
    fetchAppointments,
    createAppointment,
    deleteAppointment,
    updateAppointmentStatus,
    setNewAppointment,
    handleInputChange,
    resetNewAppointment
  };
};
