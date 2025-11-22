import type { Role } from "@domain/enum/users/user-role.enum";
import { Email } from "@domain/value-objects/user/email.vo";
import { Password } from "@domain/value-objects/user/password.vo";

export class AdminEntity {
    private readonly _id?: string;
    private _adminCode: string;
    private _fullName: string;
    private _email: Email;
    private _password: Password;
    private _role: Role;
    private _permissions?: string;
    private _isBlocked?: boolean;
    private _profile?: string;
    private _createdAt?: string;

    constructor(props: {
        id: string;
        adminCode: string;
        fullName: string;
        email: Email;
        password: Password;
        role: Role;
        permissions?: string;
        isBlocked?: boolean;
        profile?: string;
        createdAt?: string;
    }) {
        this._id = props.id;
        this._adminCode = props.adminCode;
        this._fullName = props.fullName;
        this._email = props.email;
        this._password = props.password;
        this._role = props.role;
        this._isBlocked = props.isBlocked;
        this._permissions = props.permissions;
        this._profile = props.profile;
        this._createdAt = props.createdAt;
    }

    static reconstitute(props: {
        id: string;
        adminCode: string;
        fullName: string;
        email: string;
        password: string;
        role: Role;
        isBlocked?: boolean;
        permissions?: string;
        profile?: string;
        createdAt?: string;
    }): AdminEntity {
        return new AdminEntity({
            id: props.id,
            adminCode: props.adminCode,
            fullName: props.fullName,
            email: Email.create(props.email),
            password: Password.create(props.password),
            role: props.role,
            isBlocked: props.isBlocked,
            createdAt: props.createdAt,
            permissions: props.permissions,
            profile: props.profile,
        })
    }

    get id() { return this._id };
    get adminCode() { return this._adminCode };
    get fullName() { return this._fullName };
    get email() { return this._email.value; };
    get password() { return this._password.value };
    get role() { return this._role; };
    get isBlocked() { return this._isBlocked; };
    get permissions() { return this._permissions; };
    get profile() { return this._profile; };
    get createdAt() { return this._createdAt; };


    changePassword(newPassword: string): void {
        this._password = Password.create(newPassword);
    }
}