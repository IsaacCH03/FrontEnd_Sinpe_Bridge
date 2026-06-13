import { sendSinpeMessage } from "@/src/services/sinpe/sinpeMessageService";
import { sinpeMessageStyles as styles } from "@/src/styles/sinpeMessageStyles";
import { SinpeMessageResponse } from "@/src/types/sinpeMessage";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const sampleMessage =
  "Ha recibido 10.000,00 colones por BN SINPE MOVIL de HELLEN DAYANA CHEVEZ. plata -62976730. Referencia 2026061215183010902773853";

export default function SinpeMessageScreen() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState<SinpeMessageResponse | null>(null);

  async function handleSubmit() {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      setError("Pegue el mensaje recibido por SINPE Movil antes de enviarlo.");
      setResponse(null);
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setResponse(null);

      const data = await sendSinpeMessage({ message: trimmedMessage });
      setResponse(data);
    } catch (unknownError) {
      setError(
        unknownError instanceof Error
          ? unknownError.message
          : "No se pudo procesar el mensaje.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Mensaje de SINPE Movil</Text>
          <Text style={styles.helperText}>
            Pegue el mensaje recibido para registrar y verificar el pago.
          </Text>
          <TextInput
            style={styles.input}
            multiline
            value={message}
            onChangeText={setMessage}
            placeholder="Pegue aqui el mensaje de SINPE Movil..."
            placeholderTextColor="#64748B"
          />

          <View style={styles.actions}>
            <Pressable
              disabled={submitting}
              style={[styles.button, submitting && styles.disabledButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>
                {submitting ? "Procesando..." : "Procesar mensaje"}
              </Text>
            </Pressable>

            <Pressable
              disabled={submitting}
              style={[styles.button, styles.secondaryButton]}
              onPress={() => {
                setMessage(sampleMessage);
                setError("");
                setResponse(null);
              }}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                Cargar mensaje de prueba
              </Text>
            </Pressable>

            <Pressable
              disabled={submitting}
              style={[styles.button, styles.dangerButton]}
              onPress={() => {
                setMessage("");
                setError("");
                setResponse(null);
              }}
            >
              <Text style={[styles.buttonText, styles.dangerButtonText]}>
                Limpiar
              </Text>
            </Pressable>
          </View>

          {error ? (
            <View style={[styles.feedback, styles.errorFeedback]}>
              <Text style={styles.feedbackTitle}>No se pudo procesar</Text>
              <Text style={styles.feedbackText}>{error}</Text>
            </View>
          ) : null}

          {response ? (
            <View style={[styles.feedback, styles.successFeedback]}>
              <Text style={styles.feedbackTitle}>
                Mensaje procesado correctamente
              </Text>
              <Text style={styles.feedbackText}>
                {response.message ?? "El pago fue revisado correctamente."}
              </Text>

              {response.ignored ? (
                <ResponseRow label="Resultado" value="Mensaje no aplicado" />
              ) : null}
              {response.logId ? (
                <ResponseRow label="Registro" value={`#${response.logId}`} />
              ) : null}
              {response.parsedData?.amount ? (
                <ResponseRow
                  label="Monto"
                  value={`CRC ${response.parsedData.amount}`}
                />
              ) : null}
              {response.parsedData?.payerName ? (
                <ResponseRow
                  label="Cliente"
                  value={response.parsedData.payerName}
                />
              ) : null}
              {response.parsedData?.senderPhone ? (
                <ResponseRow
                  label="Telefono"
                  value={response.parsedData.senderPhone}
                />
              ) : null}
              {response.parsedData?.reference ? (
                <ResponseRow
                  label="Referencia"
                  value={response.parsedData.reference}
                />
              ) : null}
              {response.receivedAt ? (
                <ResponseRow
                  label="Fecha"
                  value={new Date(response.receivedAt).toLocaleString()}
                />
              ) : null}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ResponseRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.responseRow}>
      <Text style={styles.responseLabel}>{label}</Text>
      <Text style={styles.responseValue}>{value}</Text>
    </View>
  );
}
