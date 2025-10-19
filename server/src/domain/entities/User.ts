export class User {
    constructor(
        public fullName: string,
        public email: string,
        public phone: string,
        private password: string,
        public role?: string,
        public isVerified?: boolean,
        public isSubscribed?: boolean
    ) { }

    public getPassword(): string {
        return this.password
    }

    public setPassword(password: string): void {
        this.password = password
    }
}