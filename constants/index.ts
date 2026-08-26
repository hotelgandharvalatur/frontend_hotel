export const BOOKING_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  REJECTED: "Rejected",
  COMPLETED: "Completed",
} as const;

export type BookingStatusValue = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export const CATERING_INQUIRY_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  REJECTED: "Rejected",
  COMPLETED: "Completed",
} as const;

export const CONTACT_INQUIRY_STATUS = {
  UNREAD: "Unread",
  READ: "Read",
  CLOSED: "Closed",
} as const;

export const REGISTRATION_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
} as const;
