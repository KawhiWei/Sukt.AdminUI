export interface IMenuRouter {
    key: string;
    title: string;
    path: string;
    children: IMenuRouter[];
    icon?: string;
}