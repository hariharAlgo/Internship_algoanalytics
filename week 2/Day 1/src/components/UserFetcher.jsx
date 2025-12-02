import { useState, useEffect } from 'react';

function UserFetcher() {
    // State for our data and UI status
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Define the async function inside the effect
        const fetchUserData = async () => {
            try {
                setIsLoading(true);

                // Faking a network request delay (2 seconds)
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Mock response data
                const mockUser = {
                    id: 42,
                    name: "Alex Rivera",
                    email: "alex.rivera@example.com",
                    role: "Frontend Engineer"
                };

                setUser(mockUser);
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Something went wrong while fetching data.");
            } finally {
                // Always turn off loading, success or fail
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []); // Empty array means this runs once when component mounts

    return (
        <div className="card">
            <h2>User Profile</h2>

            {isLoading && <p className="loading">⏳ Fetching user details...</p>}

            {error && <p className="error">❌ {error}</p>}

            {/* Only show profile if we have a user and aren't loading */}
            {!isLoading && user && (
                <div className="user-profile">
                    <h3>👤 {user.name}</h3>
                    <p>📧 {user.email}</p>
                    <p>💼 {user.role}</p>
                </div>
            )}
        </div>
    );
}

export default UserFetcher;
