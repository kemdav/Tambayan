import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

// Define the shape of the user object (customize as needed)
interface AdminUser {
  id: string;
  email: string;
  [key: string]: any;
}

interface AdminUserContextType {
  user: AdminUser | null;
  loading: boolean;
}

const AdminUserContext = createContext<AdminUserContextType>({ user: null, loading: true });

export const useAdminUser = () => useContext(AdminUserContext);

export const AdminUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setUser({
          ...user,
          id: user.id,
          email: user.email ?? '',
          user_metadata: user.user_metadata || user.app_metadata?.user_metadata || {},
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <AdminUserContext.Provider value={{ user, loading }}>
      {children}
    </AdminUserContext.Provider>
  );
}; 