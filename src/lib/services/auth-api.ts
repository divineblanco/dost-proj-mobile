import { apiFetch } from "./api";

export type RegisterPayload = {
  first_name: string;
  last_name: string;
  email: string;
  location: string;
  role_id: string;
  organization_id?: string;
  terms_and_conditions: boolean;
  privacy_policy: boolean;
  medical_disclaimer: boolean;
};

export type RegisterResponse = {
  meta?: {
    api_version?: string;
    requested_version?: string;
    status?: number;
    timestamp?: string;
  };
  data?: {
    success?: boolean;
    message?: string;
    [key: string]: any;
  };
  message?: string;
  success?: boolean;
  [key: string]: any;
};

export async function registerUser(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const response = await apiFetch("/auth/registration", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (result?.success === false || result?.data?.success === false) {
    throw new Error(
      result?.message ||
      result?.data?.message ||
      "Registration failed."
    );
  }

  return result;
}
