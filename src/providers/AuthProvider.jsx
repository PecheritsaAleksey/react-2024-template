import React, { useEffect, useState } from "react";
import { supabaseClient } from "../config/supabase";
import useStore from "../store";
import Loading from "../components/Loading";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const { setUser } = useStore();

  useEffect(() => {
    supabaseClient.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser({ id: user.id, email: user.email });
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return <div>{children}</div>;
};

export default AuthProvider;
