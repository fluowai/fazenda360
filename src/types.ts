export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN_OPERATIONAL = 'ADMIN_OPERATIONAL',
  COMMERCIAL_CONSULTANT = 'COMMERCIAL_CONSULTANT',
  DOC_ANALYST = 'DOC_ANALYST',
  SELLER = 'SELLER',
  BROKER = 'BROKER',
  BUYER = 'BUYER'
}

export enum PropertyStatus {
  DRAFT = 'DRAFT',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
  FEATURED = 'FEATURED',
  NEGOTIATING = 'NEGOTIATING',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD',
  INACTIVE = 'INACTIVE',
  REJECTED = 'REJECTED'
}

export enum DocStatus {
  NOT_SENT = 'NOT_SENT',
  SENT = 'SENT',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED'
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  whatsapp?: string;
  creci?: string;
  region?: string;
  createdAt: any;
  updatedAt: any;
}

export interface Property {
  id: string;
  title: string;
  code: string;
  ownerId: string;
  type: string;
  city: string;
  state: string;
  region: string;
  totalArea: number;
  areaUnit: 'hectares' | 'alqueires' | 'm2';
  totalPrice: number;
  pricePerUnit: number;
  status: PropertyStatus;
  description: string;
  technicalDescription?: string;
  images: string[];
  videos?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  aptitudes: string[];
  infrastructure: {
    hasMainHouse: boolean;
    hasStaffHouse: boolean;
    hasCorral: boolean;
    hasSilo: boolean;
    energy: boolean;
    internet: boolean;
    waterSources: string[];
  };
  productivity: {
    soilType: string;
    clayContent?: string;
    topography: string;
  };
  documents: {
    [key: string]: {
      status: DocStatus;
      url?: string;
      uploadedAt?: any;
    };
  };
  createdAt: any;
  updatedAt: any;
}

export interface Lead {
  id: string;
  buyerId: string;
  propertyId?: string;
  status: string;
  score: number;
  assignedTo?: string;
  notes: string[];
  createdAt: any;
  updatedAt: any;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: any;
  updatedAt: any;
}

export interface Proposal {
  id: string;
  propertyId: string;
  buyerId: string;
  brokerId?: string;
  value: number;
  paymentTerms: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COUNTER_PROPOSAL';
  createdAt: any;
  updatedAt: any;
}
