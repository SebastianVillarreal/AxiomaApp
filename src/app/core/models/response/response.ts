export interface ApiResponse<T> {
    StatusCode: number;
    Success: boolean;
    Error: boolean;
    Message: string;
    Response: T;
    response: T;
}
export interface ReturnDataResponse {
    data: number;
    Msg: string;
}