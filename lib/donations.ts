import { throwApiError } from "./api";
import { getApiBaseUrl } from "./env";

type CheckoutResponse = {
  checkoutUrl?: string;
  result?: {
    checkoutUrl?: string;
  };
};

export async function createDonationCheckout(amount: number) {
  const response = await fetch(`${getApiBaseUrl()}/donations/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });

  if (!response.ok) {
    await throwApiError(response, "Falha ao iniciar checkout da doação");
  }

  const data = (await response.json()) as CheckoutResponse;
  const checkoutUrl = data.checkoutUrl ?? data.result?.checkoutUrl;

  if (!checkoutUrl) {
    throw new Error("Checkout da doação não retornou uma URL válida");
  }

  return checkoutUrl;
}
