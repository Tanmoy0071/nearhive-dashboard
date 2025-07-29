import { Timestamp } from "firebase/firestore"; // Use this if using Firestore

export type Store = {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  category: string;
  createdAt: Timestamp; // Or Date if you convert it
  email: string;
  featuredProductIds: string[];
  followerIds: string[];
  greenFlags: number;
  isActive: boolean;
  isBlocked: boolean;
  isPaused: boolean;
  location: string;
  logoUrl: string;
  name: string;
  ownerId: string;
  phone: string;
  redFlags: number;
  storeDomain: string;
  storeId: string;
  storeLocation: {
    lat: number;
    long: number;
  };
}

export type Middlemen = {
  address: string;
  age: number;
  dateOfBirth: string; // "DD/MM/YYYY" format
  email: string;
  emergencyContact: string;
  fcmToken: string;
  fullName: string;
  hasVehicle: boolean;
  idProof: string; // e.g., "Aadhaar"
  idProofImageUrl: string;
  isAvailable: boolean;
  lastEarningUpdateDate: string; // "YYYY-MM-DD" format
  middlemanId: string;
  password: string;
  phoneNumber: string;
  registrationDate: Timestamp ; // Timestamp or ISO string
  todayEarning: number;
  upiId: string;
  vehicleRegistrationNumber: string;
};

export type User = {
  addresses: string[]; // Array of address strings
  createdAt: Timestamp ; // Firestore timestamp or ISO string
  email: string;
  firstName: string;
  lastName: string;
  lastUpdated: Timestamp ; // Firestore timestamp or ISO string
  likedPosts: string[]; // Array of post IDs or titles
  location: string;
  phoneNumber: string;
  photoURL: string;
};


export type Order = {
  commission: number;
  couponCode: string;
  couponDiscount: number;
  couponID: string;
  customerCoordinates : {
    lat : number ;
    long : number ;
  }
  deliveryFee: number;
  isDeliveryFeeOff: boolean;
  isPlatformFeeOff: boolean;
  orderAt: Timestamp; // Firestore timestamp or ISO string
  orderId: string;
  paymentId: string;
  paymentMethod: "COD" | "ONLINE" | string; // Can expand if needed
  platformFee: number;
  products: {
    imageUrl: string;
    mrp: number;
    name: string;
    note: string;
    price: number;
    productId: string;
    quantity: number;
    variant: string;
  }[];
  status: {
    ordered: {
      message: string;
      timestamp: Timestamp; // Firestore timestamp or ISO string
    };
    // You can add more status stages like "shipped", "delivered" later
  };
  storeCoordinates: {
    lat: number;
    lng: number;
  };
  storeId: string;
  storename: string;
  totalAmount: number;
  userId: string;
};
