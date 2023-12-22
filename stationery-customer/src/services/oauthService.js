// google
export const getGoogleAuthUrl = () => {
	const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env;
	const url = `https://accounts.google.com/o/oauth2/v2/auth`;
	const query = {
		client_id: VITE_GOOGLE_CLIENT_ID,
		redirect_uri: VITE_GOOGLE_REDIRECT_URI,
		response_type: "code",
		scope: [
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email",
		].join(" "),
		prompt: "consent",
		access_type: "offline", // gets refreshToken
	};
	const strQuery = new URLSearchParams(query).toString();
	return `${url}?${strQuery}`;
};
