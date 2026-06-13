import { requestJson } from "@/src/services/httpClient";
import {
  SinpeMessageRequest,
  SinpeMessageResponse,
} from "@/src/types/sinpeMessage";

const SINPE_MESSAGE_ENDPOINT = "/sms";
const DEFAULT_SINPE_SENDER = "BN SINPE MOVIL";

export async function sendSinpeMessage(
  data: SinpeMessageRequest,
): Promise<SinpeMessageResponse> {
  return requestJson<SinpeMessageResponse>(SINPE_MESSAGE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Sender: DEFAULT_SINPE_SENDER,
      Message: data.message,
      ReceivedAt: new Date().toISOString(),
    }),
  });
}
