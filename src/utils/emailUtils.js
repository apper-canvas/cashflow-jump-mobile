import nodemailer from 'nodemailer';
import { format } from 'date-fns';

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    service: import.meta.env.VITE_EMAIL_SERVICE,
    host: import.meta.env.VITE_EMAIL_HOST,
    port: import.meta.env.VITE_EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: import.meta.env.VITE_EMAIL_USER,
      pass: import.meta.env.VITE_EMAIL_PASS,
    },
  });
};

// Generate HTML email template for overdue invoice
const generateOverdueInvoiceEmail = (invoice) => {
  const paymentLink = `${import.meta.env.VITE_APP_URL}/pay-invoice/${invoice.id}`;
  const formattedDueDate = format(new Date(invoice.dueDate), 'MMMM dd, yyyy');
  const formattedAmount = parseFloat(invoice.amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #d32f2f;">Overdue Invoice Reminder</h2>
      </div>
      
      <p>Dear ${invoice.clientName},</p>
      
      <p>This is a friendly reminder that your invoice <strong>${invoice.invoiceNumber}</strong> for ${formattedAmount} is now overdue. The payment was due on ${formattedDueDate}.</p>
      
      <p>Please make your payment as soon as possible to avoid any further late fees or service interruptions.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${paymentLink}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Make Payment Now</a>
      </div>
      
      <p>If you have already made this payment, please disregard this notice.</p>
      
      <p>If you have any questions or concerns about this invoice, please don't hesitate to contact us.</p>
      
      <p>Thank you for your business.</p>
      
      <p>Sincerely,<br>The CashFlow Team</p>
    </div>
  `;
};

// Send email notification for overdue invoice
export const sendOverdueInvoiceEmail = async (invoice) => {
  const transporter = createTransporter();
  return transporter.sendMail({
    from: `"CashFlow" <${import.meta.env.VITE_EMAIL_USER}>`,
    to: invoice.clientEmail,
    subject: `Overdue Invoice: ${invoice.invoiceNumber}`,
    html: generateOverdueInvoiceEmail(invoice),
  });
};