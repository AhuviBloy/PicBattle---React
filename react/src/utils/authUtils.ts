export const getUserDataFromToken = (): { userId: string | null, name: string | null, email: string | null, role: string | null } => {
    const token = sessionStorage.getItem("token");
    if (!token) return { userId: null, name: null, email: null, role: null };

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return {
            userId: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null,
            name: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || null,
            email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || null,
            role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null
        };
    } catch (error) {
        console.error("Error decoding token:", error);
        return { userId: null, name: null, email: null, role: null };
    }
};

