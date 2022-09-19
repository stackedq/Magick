declare class ConfigService {
    getAll(currentPage?: number, page?: number): Promise<import("axios").AxiosResponse<any>>;
    getOne(search: any): Promise<import("axios").AxiosResponse<any>>;
    get(id: any): Promise<import("axios").AxiosResponse<any>>;
    create(data: any): Promise<import("axios").AxiosResponse<any>>;
    update(id: any, data: any): Promise<import("axios").AxiosResponse<any>>;
    delete(id: number): Promise<import("axios").AxiosResponse<any>>;
}
declare const _default: ConfigService;
export default _default;