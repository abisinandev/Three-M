import { KycStatusType } from "@domain/enum/users/kyc-status.enum";
import { KycDocumentVO } from "@domain/value-objects/user/kyc-documents.vo";

export class KycEntity {
    private readonly _id?: string;
    private readonly _userId: string;
    private readonly _isKycVerified?: boolean;
    private readonly _panNumber: string | null;
    private readonly _status: KycStatusType;
    private readonly _adhaarNumber: string | null;
    private readonly _documents: KycDocumentVO[] | null;
    private readonly _address: {
        fullAddress: string;
        city: string;
        state: string;
        pincode: string;
    } | null;
    private readonly _rejectionReason?: string | null;
    private readonly _createdAt?: Date | null;

    private constructor(props: {
        id?: string;
        userId: string;
        isKycVerified?: boolean;
        status: KycStatusType;
        documents: KycDocumentVO[];
        panNumber: string;
        adhaarNumber: string;
        address: {
            fullAddress: string;
            city: string;
            state: string;
            pincode: string;
        };
        rejectionReason: string;
        createdAt?: Date | null;

    }) {
        this._id = props.id;
        this._userId = props.userId;
        this._isKycVerified = props.isKycVerified;
        this._status = props.status;
        this._documents = props.documents ?? null;
        this._panNumber = props.panNumber ?? null;
        this._adhaarNumber = props.adhaarNumber ?? null;
        this._address = props.address ?? null;
        this._rejectionReason = props.rejectionReason ?? null;
        this._createdAt = props.createdAt ?? null;
    }

    static create(data: {
        userId: string,
        documents: KycDocumentVO[],
        panNumber: string,
        adhaarNumber: string,
        address: {
            fullAddress: string,
            city: string,
            state: string,
            pincode: string,
        },
    }): KycEntity {
        return new KycEntity({
            userId: data.userId,
            isKycVerified: false,
            status: KycStatusType.PENDING,
            documents: data.documents,
            panNumber: data.panNumber,
            adhaarNumber: data.adhaarNumber,
            address: data.address,
            rejectionReason: "",
        })
    }

    static reconstitute(data: {
        id: string,
        userId: string,
        isKycVerified: boolean,
        status: KycStatusType,
        documents: KycDocumentVO[],
        panNumber: string,
        adhaarNumber: string,
        address: {
            fullAddress: string,
            city: string,
            state: string,
            pincode: string,
        },
        createdAt?: Date | null;
        rejectionReason: string,
    }): KycEntity {
        return new KycEntity({
            id: data.id,
            userId: data.userId,
            isKycVerified: data.isKycVerified ?? "PENDING",
            status: data.status ?? KycStatusType.NULL,
            documents: data.documents ?? [],
            panNumber: data.panNumber ?? null,
            adhaarNumber: data.adhaarNumber ?? null,
            address: data.address ?? null,
            rejectionReason: data.rejectionReason ?? null,
            createdAt: data.createdAt ?? null,
        })
    }

    get id() { return this._id };
    get userId() { return this._userId };
    get isKycVerified() { return this._isKycVerified };
    get documents() { return this._documents };
    get address() { return this._address };
    get panNumber() { return this._panNumber };
    get adhaarNumber() { return this._adhaarNumber };
    get status() { return this._status };
    get rejectionReason() { return this._rejectionReason };
    get createdAt() { return this._createdAt };
}