import axios from 'axios';

const API_URL = 'http://localhost:8080/users';

class UserService {
    createUser(user) {
        return axios.post(API_URL, user);
    }

    getAllUsers() {
        return axios.get(API_URL);
    }

    getUserById(userId) {
        return axios.get(`${API_URL}/${userId}`);
    }

    updateUser(userId, user) {
        return axios.put(`${API_URL}/${userId}`, user);
    }

    deleteUser(userId) {
        return axios.delete(`${API_URL}/${userId}`);
    }
}

export default new UserService();
