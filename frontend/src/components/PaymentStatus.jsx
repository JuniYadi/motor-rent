import Badge from "react-bootstrap/Badge";

export default function PaymentStatus({ status }) {
  if (!status) return null;

  const statusLists = {
    MENUNGGU_PEMBAYARAN: "secondary",
    MENUNGGU_VERIFIKASI: "warning",
    LUNAS: "success",
    DITOLAK: "danger",
  };

  return <Badge bg={statusLists[status]}>{status.replace("_", " ")}</Badge>;
}
