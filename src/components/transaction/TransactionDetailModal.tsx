import { modalStyles as styles } from "@/src/styles/transactionDetailModalStyles";
import { Transaction } from "@/src/types/transaction";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface TransactionDetailModalProps {
  visible: boolean;
  transaction: Transaction | null;
  onClose: () => void;
}

export default function TransactionDetailModal({
  visible,
  transaction,
  onClose,
}: TransactionDetailModalProps) {
  if (!transaction) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Detalles del Registro</Text>

          <View style={styles.modalBody}>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Referencia:</Text>
              <Text style={styles.modalValue}>{transaction.reference}</Text>
            </View>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Monto Procesado:</Text>
              <Text style={[styles.modalValue, { fontWeight: "bold", color: "#4F46E5" }]}>
                CRC {transaction.amount}
              </Text>
            </View>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Teléfono Origen:</Text>
              <Text style={styles.modalValue}>
                {transaction.senderNumber || "No registrado"}
              </Text>
            </View>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Fecha y Hora:</Text>
              <Text style={styles.modalValue}>
                {new Date(transaction.paymentDate).toLocaleString()}
              </Text>
            </View>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Estado Interno:</Text>
              <Text
                style={[
                  styles.modalValue,
                  {
                    fontWeight: "bold",
                    color: transaction.status === "Aprobado" ? "#065f46" : "#991b1b",
                  },
                ]}
              >
                {transaction.status}
              </Text>
            </View>

            <View style={styles.modalRowVertical}>
              <Text style={styles.modalLabel}>Resultado de Verificación:</Text>
              <Text style={styles.modalValueBlock}>{transaction.verificationResult}</Text>
            </View>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>ID de Pago (DB):</Text>
              <Text style={styles.modalValue}>#{transaction.id}</Text>
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