interface Config {
  googleClientId: string;
  googleClientSecret: string;
  backOfficeUrl: string;
}

export const config: Config = {
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  backOfficeUrl : process.env.NEXT_PUBLIC_BACKOFFICE_API_BASE_URL || ""
};
