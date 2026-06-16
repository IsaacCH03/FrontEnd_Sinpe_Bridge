import { modalStyles as styles } from "@/src/styles/fraudDetailModalStyles";
import { FraudAttempt } from "@/src/types/fraudAttempt";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface FraudDetailModalProps {
  visible: boolean;
  fraud: FraudAttempt | null;
  onClose: () => void;
}

export default function FraudDetailModal({
  visible,
  fraud,
  onClose,
}: FraudDetailModalProps) {
  if (!fraud) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Detalles del Fraude</Text>

          <View style={styles.modalBody}>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Referencia:</Text>
              <Text style={styles.modalValue}>{fraud.reference}</Text>
            </View>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Monto Sospechoso:</Text>
              <Text style={[styles.modalValue, { fontWeight: "bold", color: "#E85D75" }]}>
                CRC {fraud.amount}
              </Text>
            </View>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Tipo de Fraude:</Text>
              <Text style={[styles.modalValue, { fontWeight: "bold", color: "#991b1b" }]}>
                {fraud.fraudType}
              </Text>
            </View>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Fecha y Hora:</Text>
              <Text style={styles.modalValue}>
                {new Date(fraud.attemptDate).toLocaleString()}
              </Text>
            </View>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>ID de Registro (DB):</Text>
              <Text style={styles.modalValue}>#{fraud.id}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar Detalles</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}