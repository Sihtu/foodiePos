interface Config {
  googleClientId: string;
  googleClientSecret: string;
  backOfficeUrl: string;
  spaceEndpoint: string;
  spaceAccessKeyId: string;
  spaceSecretAccessKey: string;
  orderAppUrl: string;
  orderAppApiUrl: string;
}

export const config: Config = {
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  backOfficeUrl: process.env.NEXT_PUBLIC_BACKOFFICE_API_BASE_URL || "",
  spaceEndpoint: process.env.SPACE_ENDPOINT || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY_ID || "",
  spaceSecretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY || "",
  orderAppUrl: process.env.NEXT_PUBLIC_ORDER_APP_URL || "",
  orderAppApiUrl: process.env.NEXT_PUBLIC_ORDER_API_BASE_URL || "",
};
