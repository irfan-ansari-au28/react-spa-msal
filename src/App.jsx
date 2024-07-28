import React, { useState } from 'react';
import { PageLayout } from './components/PageLayout';
import { loginRequest } from './authConfig';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import './App.css';
import Button from 'react-bootstrap/Button';

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [profileData, setProfileData] = useState(null);

    const fetchProfileData = (emailId) => {
        fetch(`http://localhost:5000/api/v1/entity/getUser?emailId=${emailId}`)
            .then(response => response.json())
            .then(data => setProfileData(data))
            .catch(error => console.error('Error fetching profile data:', error));
    };

    return (
        <>
            <h5 className="profileContent">Welcome {accounts[0].name}</h5>
            {profileData ? (
                <div>
                    <p>Email ID: {profileData.emailId}</p>
                    <p>Display Name: {profileData.displayName}</p>
                    <p>Role: {profileData.role}</p>
                </div>
            ) : (
                <Button variant="secondary" onClick={() => fetchProfileData('sample2@email.com')}>
                    Request Profile
                </Button>
            )}
        </>
    );
};

const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in to see your profile information.</h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <MainContent />
        </PageLayout>
    );
}
