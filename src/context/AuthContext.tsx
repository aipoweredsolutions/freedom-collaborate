import { createContext, useContext, useState, type ReactNode } from 'react';

// Define the User type
interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password?: string) => Promise<void>;
    register: (name: string, email: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Mock login function
    const login = async (email: string, _password?: string) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            let role: 'user' | 'admin' = 'user';
            let name = 'Demo User';

            if (email === 'admin@freedom.com') {
                role = 'admin';
                name = 'Admin User';
            } else if (email === 'user@freedom.com') {
                name = 'Test User';
            }

            setUser({
                id: email === 'admin@freedom.com' ? 'admin_1' : 'user_1',
                name,
                email,
                role,
            });
            setIsLoading(false);
        }, 1000);
    };

    // Mock register function
    const register = async (name: string, email: string) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setUser({
                id: '2',
                name,
                email,
                role: 'user',
            });
            setIsLoading(false);
        }, 1000);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logout,
            isAuthenticated: !!user,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
