import React, { useState } from 'react';
import UserService from './UserService';
import './UserForm.css';

function UserForm() {
    const [user, setUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [showUsers, setShowUsers] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [singleUser, setSingleUser] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState('');

    // Email validation regex
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    // Phone number validation for exactly 10 digits
    const validatePhoneNumber = (phoneNumber) => {
        const re = /^[0-9]{10}$/;
        return re.test(phoneNumber);
    };

    // Validate the form before submitting
    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!user.username.trim()) {
            formErrors.username = 'Username is required';
            isValid = false;
        }

        if (!user.firstName.trim()) {
            formErrors.firstName = 'First name is required';
            isValid = false;
        }

        if (!user.lastName.trim()) {
            formErrors.lastName = 'Last name is required';
            isValid = false;
        }

        if (!validateEmail(user.email)) {
            formErrors.email = 'Invalid email address';
            isValid = false;
        }

        if (!validatePhoneNumber(user.phoneNumber)) {
            formErrors.phoneNumber = 'Phone number must be 10 digits';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    // Handle input change for each form field
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    // Function to create a new user
    const handleCreateUser = () => {
        if (validateForm()) {
            UserService.createUser(user)
                .then(response => {
                    setMessage(`User ${response.data.username} created successfully!`);
                    setErrors({});
                    setUser({
                        username: '',
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: ''
                    });
                    handleListUsers(); // Refresh the user list for anny new additions
                })
                .catch(error => {
                    setMessage('Failed to create user.');
                    console.error(error);
                });
        } else {
            setMessage('Please correct the errors in the form.');
        }
    };

    // Function to fetch and list all users
    const handleListUsers = () => {
        if (!showUsers) {
            UserService.getAllUsers()
                .then(response => {
                    setUsers(response.data);
                    setMessage('');
                })
                .catch(error => {
                    setMessage('Failed to retrieve users.');
                    console.error(error);
                });
        }
        setShowUsers(!showUsers);
    };

    // Function to handle edit button click
    const handleEditUserClick = (user) => {
        setEditMode(true);
        setEditUserId(user.id);
        setUser({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber
        });
    };

    // Function to update a user
    const handleUpdateUser = () => {
        if (validateForm()) {
            UserService.updateUser(editUserId, user)
                .then(response => {
                    setMessage(`User ${response.data.username} updated successfully!`);
                    setEditMode(false);
                    setUser({
                        username: '',
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: ''
                    });
                    handleListUsers(); // Refresh the user list for anny new additions
                })
                .catch(error => {
                    setMessage('Failed to update user.');
                    console.error(error);
                });
        } else {
            setMessage('Please correct the errors in the form.');
        }
    };

    // Function to cancel the edit
    const handleCancelEdit = () => {
        setEditMode(false);
        setEditUserId(null);
        setUser({
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: ''
        });
        setErrors({});
        setMessage('');
    };

    // Function to delete a user
    const handleDeleteUser = (userId) => {
        UserService.deleteUser(userId)
            .then(() => {
                setMessage(`User ${userId} deleted successfully!`);
                handleListUsers(); // Refresh the user list for any new additions
            })
            .catch(error => {
                setMessage('Failed to delete user.');
                console.error(error);
            });
    };

    // Function to show detailed user info for each user
    const handleShowUserInfo = (userId) => {
        UserService.getUserById(userId)
            .then(response => {
                setSelectedUser(response.data);
            })
            .catch(error => {
                setMessage('Failed to retrieve user info.');
                console.error(error);
            });
    };

    // Function to show a single user by ID in the user list format
    const handleShowSingleUser = () => {
        if (!selectedUserId.trim()) {
            setMessage('Please enter a valid user ID');
            return;
        }
        UserService.getUserById(selectedUserId)
            .then(response => {
                setSingleUser(response.data);
                setMessage('');
            })
            .catch(error => {
                setMessage('Failed to retrieve user.');
                console.error(error);
            });
    };

    return (
        <div className="UserForm">
            <h1>User Management</h1>

            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInputChange}
                />
                {errors.username && <p className="error">{errors.username}</p>}
            </div>

            <div className="form-group">
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleInputChange}
                />
                {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>

            <div className="form-group">
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleInputChange}
                />
                {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-group">
                <label>Phone Number</label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleInputChange}
                />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
            </div>

            {!editMode ? (
                <button onClick={handleCreateUser}>Create User</button>
            ) : (
                <div>
                    <button onClick={handleUpdateUser}>Submit</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            )}

            <button onClick={handleListUsers}>{showUsers ? 'Hide Users' : 'Show Users'}</button>

            <div className="form-group">
                <label>Enter User ID</label>
                <input
                    type="text"
                    name="selectedUserId"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                />
                <button onClick={handleShowSingleUser}>Show Single User</button>
            </div>

            {message && <p>{message}</p>}

            {showUsers && users.length > 0 && (
                <div>
                    <h2>Available Users</h2>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                {user.username} - {user.firstName} {user.lastName} ({user.email})
                                <button onClick={() => handleShowUserInfo(user.id)}>Show User Info</button>
                                <button onClick={() => handleEditUserClick(user)}>Edit</button>
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {singleUser && (
                <div>
                    <h2>Single User</h2>
                    <ul>
                        <li>
                            {singleUser.username} - {singleUser.firstName} {singleUser.lastName} ({singleUser.email})
                            <button onClick={() => handleShowUserInfo(singleUser.id)}>Show User Info</button>
                            <button onClick={() => handleEditUserClick(singleUser)}>Edit</button>
                            <button onClick={() => handleDeleteUser(singleUser.id)}>Delete</button>
                        </li>
                    </ul>
                </div>
            )}

            {selectedUser && (
                <div>
                    <h3>Selected User Info</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>ID:</td>
                                <td>{selectedUser.id}</td>
                            </tr>
                            <tr>
                                <td>Username:</td>
                                <td>{selectedUser.username}</td>
                            </tr>
                            <tr>
                                <td>First Name:</td>
                                <td>{selectedUser.firstName}</td>
                            </tr>
                            <tr>
                                <td>Last Name:</td>
                                <td>{selectedUser.lastName}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{selectedUser.email}</td>
                            </tr>
                            <tr>
                                <td>Phone Number:</td>
                                <td>{selectedUser.phoneNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default UserForm;
