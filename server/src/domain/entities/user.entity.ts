import { SubscripionPlan } from "@domain/enum/users/subscription-plan.enum";
import { SubscriptionStatus } from "@domain/enum/users/subscription-status.enum";
import { UserRole } from "@domain/enum/users/user-role.enum";
import { Email } from "@domain/value-objects/user/email.vo";
import { Password } from "@domain/value-objects/user/password.vo";
import { Phone } from "@domain/value-objects/user/phone.vo";

export class UserEntity {
  private readonly _id?: string;
  private _fullName: string;
  private readonly _email: Email;
  private readonly _phone: Phone;
  private _password: Password;
  private _role: string = UserRole.USER;
  private _isEmailVerified: boolean = false;
  private _isVerified: boolean = false;
  private _isBlocked: boolean = false;
  private _subscriptionStatus: string = SubscriptionStatus.INACTIVE;
  private _subscriptionPlan: string = SubscripionPlan.FREE;

  constructor(
    fullName: string,
    email: Email,
    phone: Phone,
    password: Password,
    role: string = UserRole.USER,
    isEmailVerified: boolean = false,
    isVerified: boolean = false,
    isBlocked: boolean = false,
    subscriptionStatus: string = SubscriptionStatus.INACTIVE,
    subscriptionPlan: string = SubscripionPlan.FREE,
    id?: string,
  ) {
    if (!fullName || fullName.length < 0) {
      throw new Error("Full name must be at least 2 characters");
    }

    this._fullName = fullName;
    this._email = email;
    this._phone = phone;
    this._password = password;
    this._role = role;
    this._isEmailVerified = isEmailVerified;
    this._isVerified = isVerified;
    this._isBlocked = isBlocked;
    this._subscriptionStatus = subscriptionStatus;
    this._subscriptionPlan = subscriptionPlan;
    this._id = id;
  }

  static create(data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role?: string;
    isEmailVerified?: boolean;
    isVerified?: boolean;
    isBlocked?: boolean;
    subscriptionStatus?: string;
    id?: string;
  }): UserEntity {
    return new UserEntity(
      data.fullName,
      Email.create(data.email),
      Phone.create(data.phone),
      Password.create(data.password),
      data.role,
      data.isEmailVerified,
      data.isVerified,
      data.isBlocked,
      data.subscriptionStatus,
      data.id,
    );
  }

  get id(): string | undefined {
    return this._id;
  }

  get fullName(): string {
    return this._fullName;
  }

  get email(): string {
    return this._email.value;
  }

  get phone(): string {
    return this._phone.value;
  }

  get password(): string {
    return this._password.value;
  }

  get role(): string {
    return this._role;
  }

  get isEmailVerified(): boolean | undefined {
    return this._isEmailVerified;
  }

  get isVerified(): boolean | undefined {
    return this._isVerified;
  }

  get isBlocked(): boolean | undefined {
    return this._isBlocked;
  }

  get subscriptionStatus(): string | undefined {
    return this._subscriptionStatus;
  }

  changePassword(newPassword: string): void {
    this._password = Password.create(newPassword);
  }

  verifyEmail(): void {
    this._isEmailVerified = true;
  }

  blockUser(): void {
    this._isBlocked = true;
  }

  unblockUser(): void {
    this._isBlocked = false;
  }

  toObject() {
    return {
      id: this._id,
      fullName: this._fullName,
      email: this._email.value,
      phone: this._phone.value,
      role: this._role,
      isEmailVerified: this._isEmailVerified,
      isVerified: this._isVerified,
      isBlocked: this._isBlocked,
      subscriptionStatus: this._subscriptionStatus,
    };
  }
}
