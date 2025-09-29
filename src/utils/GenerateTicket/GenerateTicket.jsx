import { jsPDF } from "jspdf";

const generateTicketPDF = (ticket, event) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(22);
  doc.text("Event Ticket", 105, 20, { align: "center" });

  // Event Info
  doc.setFontSize(14);
  doc.text(`Event: ${event?.name}`, 20, 50);
  doc.text(`Date: ${event?.date}`, 20, 60);
  doc.text(`Location: ${event?.location}`, 20, 70);

  // Ticket Info
  doc.text(`Ticket ID: ${ticket.ticketId}`, 20, 90);
  doc.text(`Email: ${ticket.email}`, 20, 100);
  doc.text(`Status: ${ticket.status}`, 20, 110);
  doc.text(
    `Issued At: ${new Date(ticket.createdAt).toLocaleString()}`,
    20,
    120
  );

  // QR Code
  if (ticket.qrCode) {
    doc.addImage(ticket.qrCode, "PNG", 140, 60, 50, 50);
  }

  // Save PDF
  doc.save(`ticket-${ticket.ticketId}.pdf`);
};

export default generateTicketPDF;
