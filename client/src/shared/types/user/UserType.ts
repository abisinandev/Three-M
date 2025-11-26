export type UserType = {
    id: string;
    userCode: string;             // like Zerodha client code (e.g., AB1234)
    
    // Basic Info
    fullName: string;
    email: string;
    phone: string;
    
    // Auth & Security
    role: string;
    isVerified: boolean;          // mobile verification
    isEmailVerified: boolean;     // email verification
    isSubscribed: boolean;
    
    // KYC (mocked)
    kycStatus: "NOT_STARTED" | "PENDING" | "VERIFIED" | "REJECTED";
    kycLevel: "BASIC" | "FULL";   // like Paytm / CoinDCX
    panNumber?: string;
    aadhaarLast4?: string;        // never store full Aadhaar
    dob?: string;                 // from KYC document
    address?: {
        line1: string;
        line2?: string;
        city: string;
        state: string;
        pincode: string;
    };

    // Profile
    profileImage?: string;
    createdAt: string;
};



// export type UserType = {
//     id?: string,
//     userCode:string,
//     fullName: string;
//     email: string;
//     phone: string;
//     role: string;
//     isVerified: boolean;
//     isEmailVerfied: boolean;
//     isSubscribed: boolean;
//     createdAt: string;
// }
