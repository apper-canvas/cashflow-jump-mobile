import { sendOverdueInvoiceEmail } from '../utils/emailUtils';
import { toast } from 'react-toastify';

// Keep track of notifications sent to avoid duplicates
const notificationTracker = {
  sentNotifications: new Set()
};

// Check if a notification has already been sent for this invoice
const hasNotificationBeenSent = (invoiceId) => {
  return notificationTracker.sentNotifications.has(invoiceId);
};

// Mark a notification as sent
const markNotificationAsSent = (invoiceId) => {
  notificationTracker.sentNotifications.add(invoiceId);
};

// Load sent notifications from localStorage
const loadSentNotifications = () => {
  try {
    const saved = localStorage.getItem('sentInvoiceNotifications');
    if (saved) {
      const parsed = JSON.parse(saved);
      notificationTracker.sentNotifications = new Set(parsed);
    }
  } catch (error) {
    console.error('Error loading notification history:', error);
  }
};

// Save sent notifications to localStorage
const saveSentNotifications = () => {
  try {
    localStorage.setItem(
      'sentInvoiceNotifications', 
      JSON.stringify([...notificationTracker.sentNotifications])
    );
  } catch (error) {
    console.error('Error saving notification history:', error);
  }
};

// Send email notification for overdue invoice
export const sendOverdueNotification = async (invoice) => {
  if (!invoice.clientEmail) {
    toast.error(`Cannot send notification for invoice ${invoice.invoiceNumber}: Missing client email`);
    return false;
  }
  
  if (hasNotificationBeenSent(invoice.id)) {
    return false; // Already sent
  }
  
  await sendOverdueInvoiceEmail(invoice);
  markNotificationAsSent(invoice.id);
  saveSentNotifications();
  
  return true;
};