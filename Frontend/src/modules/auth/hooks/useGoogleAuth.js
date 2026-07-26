import { useEffect, useRef } from "react";

export default function useGoogleAuth({ onSuccess, onError }) {
  const tokenClient = useRef(null);

  useEffect(() => {
    tokenClient.current = google.accounts.oauth2.initTokenClient({
      client_id: "use_client_id here ",
      scope: "openid email profile",
      callback: (response) => {
        if (response.error) {
          onError?.(response);
        } else {
          onSuccess?.(response);
        }
      },
    });
  }, [onSuccess, onError]);

  const login = () => {
    tokenClient.current?.requestAccessToken();
  };

  return login;
}
