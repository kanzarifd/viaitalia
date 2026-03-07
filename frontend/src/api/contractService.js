import axiosInstance from "./axiosInstance";

export const contractService = {
  // Upload contract
  uploadContract: async (formData) => {
    try {
      const response = await axiosInstance.post("/contracts/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading contract:', error);
      throw error;
    }
  },

  // Get user's own contract
  getContractByUserId: async (userId) => {
    try {
      // For regular users getting their own contract, use /my-contract endpoint
      // For admin viewing specific user's contract, use /user/:userId endpoint
      const url = userId && userId !== 'undefined' && userId !== null
        ? `${axiosInstance.defaults.baseURL}/contracts/user/${userId}`
        : `${axiosInstance.defaults.baseURL}/contracts/my-contract`;
      
      console.log('Fetching contract from URL:', url);
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching contract:', error);
      throw error;
    }
  },

  // Get all contracts (admin only)
  getAllContracts: async () => {
    try {
      const response = await axiosInstance.get("/contracts");
      return response.data;
    } catch (error) {
      console.error('Error fetching contracts:', error);
      throw error;
    }
  },

  // Update contract status (admin only)
  updateContractStatus: async (contractId, status) => {
    try {
      const response = await axiosInstance.patch(`/contracts/${contractId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating contract status:', error);
      throw error;
    }
  },

  // Download contract (admin only)
  downloadContract: async (contractId) => {
    try {
      const response = await axiosInstance.get(`/contracts/${contractId}/download`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error downloading contract:', error);
      throw error;
    }
  },

  // Delete contract (admin only)
  deleteContract: async (contractId) => {
    try {
      const response = await axiosInstance.delete(`/contracts/${contractId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting contract:', error);
      throw error;
    }
  },

  // Get contract status (authenticated users)
  getContractStatus: async (userId) => {
    try {
      const response = await axiosInstance.get(`/contracts/status/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contract status:', error);
      throw error;
    }
  },

  // View contract (admin only)
  viewContract: async (contractId) => {
    try {
      const response = await axiosInstance.get(`/contracts/${contractId}/view`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error viewing contract:', error);
      throw error;
    }
  }
};

export default contractService;
