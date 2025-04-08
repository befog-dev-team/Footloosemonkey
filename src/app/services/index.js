import axios from 'axios';

// Service for Admin
export async function addAdminData(formData) {
    try {
        const response = await axios.post('/api/admin/add', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error adding data: ${error.response?.data?.message || error.message}`);
        return {
            success: false,
            message: error.response?.data?.message || 'Unknown error'
        };
    }
}

export const getAdminData = async () => {
    try {
        const response = await axios.get('/api/admin/get');
        return response.data;
    } catch (error) {
        console.error('Error fetching admin data:', error);
        return {
            success: false,
            message: error.response?.data?.message || error.message
        };
    }
};

// CRUD Operations for get, add, update and delete for Admin
export async function login(formData) {
    try {
        const response = await axios.post('/api/admin/login', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error logging in: ${error.response?.data?.message || error.message}`);
        return {
            success: false,
            message: error.response?.data?.message || error.message
        };
    }
}

export async function addData(currentTab, formData) {
    try {
        const response = await axios.post(`/api/${currentTab}/add`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error adding data: ${error.response?.data?.message || error.message}`);
        return {
            success: false,
            message: error.response?.data?.message || error.message
        };
    }
}

export async function getData(currentTab) {
    try {
        const response = await axios.get(`/api/${currentTab}/get`);
        return response.data;
    } catch (error) {
        console.error(`Error getting data: ${error.response?.data?.message || error.message}`);
        return {
            success: false,
            message: error.response?.data?.message || error.message
        };
    }
}

export async function updateData(currentTab, formData) {
    try {
        const response = await axios.put(`/api/${currentTab}/update`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating data: ${error.response?.data?.message || error.message}`);
        return {
            success: false,
            message: error.response?.data?.message || error.message
        };
    }
}

// Service for Registration
export const addRegistrationData = async (data) => {
    try {
        const response = await axios.post('/api/register', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error submitting registration:', error);
        return {
            success: false,
            message: error.response?.data?.message || error.message
        };
    }
};

export async function getRegistrationData() {
    try {
        const response = await axios.get('/api/registration/get');
        return response.data;
    } catch (error) {
        console.error(`Error getting data: ${error.response?.data?.message || error.message}`);
        return {
            success: false,
            message: error.response?.data?.message || error.message
        };
    }
}

// Service for Payments
export async function addPaymentData(formData) {
    try {
        const response = await axios.post('/api/payment/add', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error adding data: ${error.response?.data?.message || error.message}`);
        return {
            success: false,
            message: error.response?.data?.message || error.message
        };
    }
}