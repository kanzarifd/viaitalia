import axiosInstance from "./axiosInstance";

export const appointmentService = {
  // Get all appointments
  getAllAppointments: async () => {
    const response = await axiosInstance.get("/appointments");
    return response.data;
  },

  // Get appointment by ID
  getAppointmentById: async (id) => {
    const response = await axiosInstance.get(`/appointments/${id}`);
    return response.data;
  },

  // Get appointments by user ID
  getAppointmentsByUserId: async (userId) => {
    const response = await axiosInstance.get(`/appointments/user/${userId}`);
    return response.data;
  },

  // Create new appointment
  createAppointment: async (appointmentData) => {
    const response = await axiosInstance.post("/appointments", appointmentData);
    return response.data;
  },

  // Update appointment
  updateAppointment: async (id, appointmentData) => {
    const response = await axiosInstance.put(`/appointments/${id}`, appointmentData);
    return response.data;
  },

  // Update appointment status
  updateAppointmentStatus: async (id, status) => {
    const response = await axiosInstance.put(`/appointments/${id}`, { status });
    return response.data;
  },

  // Delete appointment
  deleteAppointment: async (id) => {
    const response = await axiosInstance.delete(`/appointments/${id}`);
    return response.data;
  }
};

export default appointmentService;
