// ─── Admin ────────────────────────────────────────────────────
export interface Admin {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Banquet Hall ─────────────────────────────────────────────
export type HallStatus = "Active" | "Inactive" | "Under Maintenance";

export interface BanquetHall {
  _id: string;
  name: string;
  description?: string;
  capacity: number;
  amenities: string[];
  images: string[];
  imagePublicIds?: string[];
  pricePerDay: number;
  status: HallStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Banquet Booking ──────────────────────────────────────────
export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Rejected";

export interface BanquetBooking {
  _id: string;
  referenceNumber: string;
  customerName: string;
  phone: string;
  email: string;
  hall: BanquetHall | string;
  eventType: string;
  date: string;
  time: string;
  numberOfGuests: number;
  foodRequirement?: string;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Event ────────────────────────────────────────────────────
export interface Event {
  _id: string;
  title: string;
  description?: string;
  banner?: string;
  date: string;
  time?: string;
  category?: string;
  featured: boolean;
  registrationEnabled: boolean;
  maximumGuests: number;
  registeredGuests: number;
  registrationDeadline?: string;
  isFull?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Event Registration ───────────────────────────────────────
export type RegistrationStatus = "Pending" | "Confirmed" | "Cancelled";

export interface EventRegistration {
  _id: string;
  referenceNumber: string;
  eventId: Event | string;
  customerName: string;
  phone: string;
  email: string;
  numberOfGuests: number;
  status: RegistrationStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Event Availability ───────────────────────────────────────
export interface EventAvailability {
  isFull: boolean;
  deadlinePassed: boolean;
  remainingSeats: number;
}

// ─── Restaurant ───────────────────────────────────────────────
export interface RestaurantCategory {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId: RestaurantCategory | string;
  isAvailable: boolean;
  veg: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Catering ─────────────────────────────────────────────────
export interface CateringPackage {
  _id: string;
  name: string;
  description?: string;
  images: string[];
  pricePerPlate?: number;
  createdAt: string;
  updatedAt: string;
}

export type CateringInquiryStatus =
  | "Pending"
  | "Confirmed"
  | "Rejected"
  | "Completed";

export interface CateringInquiry {
  _id: string;
  referenceNumber: string;
  customerName: string;
  phone: string;
  email: string;
  eventDate: string;
  eventTime?: string;
  location: string;
  numberOfGuests: number;
  selectedPackage?: CateringPackage | string;
  foodRequirements?: string;
  additionalRequirements?: string;
  status: CateringInquiryStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Gallery ──────────────────────────────────────────────────
export type GalleryType = "image" | "video";

export interface GalleryItem {
  _id: string;
  title?: string;
  type: GalleryType;
  url: string;
  category?: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Review ───────────────────────────────────────────────────
export interface Review {
  _id: string;
  customerName: string;
  rating: number;
  review: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Contact ──────────────────────────────────────────────────
export interface ContactInfo {
  _id: string;
  phone?: string;
  email?: string;
  address?: string;
  mapUrl?: string;
  socialLinks?: Record<string, string>;
  updatedAt: string;
}

export type ContactInquiryStatus = "Unread" | "Read" | "Closed";

export interface ContactInquiry {
  _id: string;
  referenceNumber: string;
  customerName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: ContactInquiryStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Branch ──────────────────────────────────────────────────
export interface Branch {
  _id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Settings ────────────────────────────────────────────────
export interface Settings {
  _id: string;
  hotelName?: string;
  tagline?: string;
  logo?: string;
  qrCode?: string;
  currency?: string;
  timezone?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Home Content ─────────────────────────────────────────────
export interface CtaButton {
  label: string;
  link: string;
  variant: "primary" | "secondary" | "outline";
}

export interface FeaturedSection {
  title: string;
  subtitle?: string;
  image?: string;
  link?: string;
}

export interface HomeContent {
  _id: string;
  heroImages: string[];
  tagline?: string;
  subtitle?: string;
  description?: string;
  featuredSections: FeaturedSection[];
  ctaButtons: CtaButton[];
  updatedAt: string;
}

// ─── About Content ───────────────────────────────────────────
export interface AboutContent {
  _id: string;
  title?: string;
  description?: string;
  vision?: string;
  mission?: string;
  images?: string[];
  updatedAt: string;
}

// ─── API Response Wrapper ─────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
