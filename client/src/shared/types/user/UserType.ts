export type UserType = {
    id: string;
    userCode: string;       

    fullName: string;
    email: string;
    phone: string;
    
    role: string;
    isVerified: boolean;   
    isEmailVerified: boolean;  
    kycId: string;
    isSubscribed: boolean;
    isBlocked: boolean;
    
    kycStatus: string;
    panNumber?: string;
    aadhaarNumber?: string; 
    // dob?: string; 
    address?: {
        fullAddress?: string;
        city: string;
        state: string;
        pincode: string;
    };

    // Profile
    profileImage?: string;
    createdAt: string;
};
