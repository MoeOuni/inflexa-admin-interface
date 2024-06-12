export interface Address {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
}

export interface SalesHistory {
    orderId?: string;
    date?: Date;
    amount?: number;
}

export interface Pricing {
    productId?: string;
    specialPrice?: number;
}

export interface OrderPreferences {
    preferredShippingMethod?: string;
    deliverySchedule?: string;
    orderFrequency?: string;
}

export interface CommunicationLog {
    date?: Date;
    type?: string;
    details?: string;
}

export interface SupportTicket {
    ticketId?: string;
    date?: Date;
    issue?: string;
    status?: string;
}

export interface LoyaltyProgram {
    programId?: string;
    points?: number;
    tier?: string;
}

export interface Contract {
    contractId?: string;
    date?: Date;
    details?: string;
}

export interface ComplianceDocument {
    documentId?: string;
    type?: string;
    date?: Date;
}

export interface UserAccess {
    userId?: string;
    role?: string;
}

export interface Customer {
    customerId?: string;
    name?: string;
    contactInfo?: {
        billingAddress?: Address[];
        shippingAddress?: Address[];
        phone?: string;
        email?: string;
        fax?: string;
    };
    taxIdentification?: string;
    financialInfo?: {
        creditLimit?: number;
        paymentTerms?: string;
        bankDetails?: {
            bankName?: string;
            accountNumber?: string;
            routingNumber?: string;
        };
        currency?: string;
    };
    salesInfo?: {
        salesHistory?: SalesHistory[];
        pricing?: Pricing[];
        orderPreferences?: OrderPreferences;
    };
    communicationAndSupport?: {
        communicationLog?: CommunicationLog[];
        supportTickets?: SupportTicket[];
        accountManager?: string;
    };
    relationshipManagement?: {
        customerSegmentation?: string[];
        marketingPreferences?: {
            emailOptIn?: boolean;
            smsOptIn?: boolean;
        };
        loyaltyPrograms?: LoyaltyProgram[];
    };
    complianceAndDocumentation?: {
        contracts?: Contract[];
        complianceDocuments?: ComplianceDocument[];
    };
    analyticsAndReporting?: {
        customerScorecard?: {
            totalSpent?: number;
            averageOrderValue?: number;
            orderCount?: number;
        };
        purchasePatterns?: {
            frequentProducts?: string[];
            purchaseFrequency?: string;
        };
        customerLifetimeValue?: number;
    };
    integrationAndAccessibility?: {
        crmIntegrationId?: string;
        userAccess?: UserAccess[];
    };
    archivedAt?: Date,
    deletedAt?: Date,
    status?: string,
}
