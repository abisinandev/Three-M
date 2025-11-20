import { CurrencyTypes } from "@domain/enum/users/currency-enum";
import { KycStatusType } from "@domain/enum/users/kyc-status.enum";
import { SubscripionPlan } from "@domain/enum/users/subscription-plan.enum";
import { SubscriptionStatus } from "@domain/enum/users/subscription-status.enum";
import { UserRole } from "@domain/enum/users/user-role.enum";
import { Email } from "@domain/value-objects/user/email.vo";
import { Password } from "@domain/value-objects/user/password.vo";
import { Phone } from "@domain/value-objects/user/phone.vo";
import { UserCode } from "@domain/value-objects/user/user-code.vo";


export class UserEntity {
  private readonly _id?: string;
  private readonly _userCode: UserCode;
  private _fullName: string;
  private readonly _email: Email;
  private readonly _phone: Phone;
  private _password: Password;
  private _role: UserRole;
  private _isEmailVerified: boolean;
  private _isVerified: boolean;
  private _isBlocked: boolean;
  private _subscriptionStatus: SubscriptionStatus;
  private _subscriptionPlan: SubscripionPlan;
  private _currency: CurrencyTypes;
  private readonly _kycId?: string;
  private _kycStatus: KycStatusType;
  private readonly _walletId?: string;
  private _walletBalance: number;
  private _isTwoFactorEnabled: boolean;
  private _twoFactorSecret?: string;
  private _qrCodeUrl?: string;
  private _createdAt?: Date;

  private constructor(props: {
    id?: string;
    userCode: UserCode;
    fullName: string;
    email: Email;
    phone: Phone;
    password: Password;
    role: UserRole;
    isEmailVerified: boolean;
    isVerified: boolean;
    isBlocked: boolean;
    subscriptionStatus: SubscriptionStatus;
    subscriptionPlan: SubscripionPlan;
    currency: CurrencyTypes;
    kycId?: string;
    kycStatus: KycStatusType;
    walletId?: string;
    walletBalance: number;
    isTwoFactorEnabled: boolean;
    twoFactorSecret?: string;
    qrCodeUrl?: string;
    _createdAt?: Date
  }) {

    if (!props.fullName || props.fullName.length < 2) {
      throw new Error("Full name must be at least 2 characters");
    }

    this._id = props.id;
    this._userCode = props.userCode;
    this._fullName = props.fullName;
    this._email = props.email;
    this._phone = props.phone;
    this._password = props.password;
    this._role = props.role;
    this._isEmailVerified = props.isEmailVerified;
    this._isVerified = props.isVerified;
    this._isBlocked = props.isBlocked;
    this._subscriptionStatus = props.subscriptionStatus;
    this._subscriptionPlan = props.subscriptionPlan;
    this._currency = props.currency;
    this._kycId = props.kycId;
    this._kycStatus = props.kycStatus;
    this._walletId = props.walletId;
    this._walletBalance = props.walletBalance;
    this._isTwoFactorEnabled = props.isTwoFactorEnabled;
    this._twoFactorSecret = props.twoFactorSecret;
    this._qrCodeUrl = props.qrCodeUrl;
    this._createdAt = props._createdAt;
  }

  static create(data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role?: string;
    currency?: CurrencyTypes;
  }): UserEntity {
    return new UserEntity({
      userCode: UserCode.create("USR"),
      fullName: data.fullName,
      email: Email.create(data.email),
      phone: Phone.create(data.phone),
      password: Password.create(data.password),
      role: (data.role as UserRole) ?? UserRole.USER,
      isEmailVerified: false,
      isVerified: false,
      isBlocked: false,
      subscriptionStatus: SubscriptionStatus.INACTIVE,
      subscriptionPlan: SubscripionPlan.FREE,
      currency: data.currency ?? CurrencyTypes.INR,
      kycStatus: KycStatusType.NULL,
      walletBalance: 0,
      isTwoFactorEnabled: false
    });
  }

  static reconstitute(props: {
    id: string;
    userCode: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role: UserRole;
    isEmailVerified: boolean;
    isVerified: boolean;
    isBlocked: boolean;
    subscriptionStatus: SubscriptionStatus;
    subscriptionPlan: SubscripionPlan;
    currency: CurrencyTypes;
    kycId?: string;
    kycStatus: KycStatusType;
    walletId?: string;
    walletBalance: number;
    isTwoFactorEnabled: boolean;
    twoFactorSecret?: string;
    qrCodeUrl?: string;
    createdAt?: Date;
  }): UserEntity {
    return new UserEntity({
      id: props.id,
      userCode: UserCode.rebuild(props.userCode),
      fullName: props.fullName,
      email: Email.create(props.email),
      phone: Phone.create(props.phone),
      password: Password.rebuild(props.password),
      role: props.role,
      isEmailVerified: props.isEmailVerified,
      isVerified: props.isVerified,
      isBlocked: props.isBlocked,
      subscriptionStatus: props.subscriptionStatus,
      subscriptionPlan: props.subscriptionPlan,
      currency: props.currency,
      kycId: props.kycId,
      kycStatus: props.kycStatus,
      walletId: props.walletId,
      walletBalance: props.walletBalance,
      isTwoFactorEnabled: props.isTwoFactorEnabled,
      twoFactorSecret: props.twoFactorSecret,
      qrCodeUrl: props.qrCodeUrl,
      _createdAt: props.createdAt,
    });
  }

  get id() { return this._id; };
  get userCode() { return this._userCode.value; };
  get fullName() { return this._fullName; };
  get email() { return this._email.value; };
  get phone() { return this._phone.value; };
  get password() { return this._password.value; };
  get role() { return this._role; };
  get currency() { return this._currency; };
  get walletBalance() { return this._walletBalance; };
  get kycStatus() { return this._kycStatus; };
  get isTwoFactorEnabled() { return this._isTwoFactorEnabled; };
  get isEmailVerified() { return this._isEmailVerified };
  get isBlocked() { return this._isBlocked };
  get isVerified() { return this._isVerified };
  get subscriptionStatus() { return this._subscriptionStatus };
  get subscriptionPlan() { return this._subscriptionPlan };
  get walletId() { return this._walletId };
  get kycId() { return this._kycId };
  get twoFactorSecret() { return this._twoFactorSecret };
  get qrCodeUrl() { return this._qrCodeUrl };
  get createdAt() { return this._createdAt };
  
  changePassword(newPassword: string): void {
    this._password = Password.create(newPassword);
  }

  verifyEmail(): void {
    this._isEmailVerified = true;
  }

  block(): void {
    this._isBlocked = true;
  }

  unblock(): void {
    this._isBlocked = false;
  }

  enable2FA(secret: string): void {
    this._twoFactorSecret = secret;
  };

  setPending2FA(secret: string): void {
    this._qrCodeUrl = secret
  };

  setQrCode(qrCode: string): void {
    this._qrCodeUrl = qrCode
  };

  updateKycStatus(status: KycStatusType): void {
    this._kycStatus = status;
  };

  creditWallet(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    this._walletBalance += amount;
  };

  debitWallet(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    if (this._walletBalance < amount) throw new Error("Insufficient balance");
    this._walletBalance -= amount
  };

}
