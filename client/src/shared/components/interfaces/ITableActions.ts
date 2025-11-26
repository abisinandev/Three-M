export interface Action<T> {
    label: string;
    className: string;
    onClick: (row: T) => void;
}