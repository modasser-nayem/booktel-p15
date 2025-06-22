export interface ApiResponse<T> {
   success: boolean;
   message: string;
   data: T;
}

export interface ApiErrorResponse {
   success: boolean;
   message: string;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   errors: any;
}

export interface PaginatedResponse<T> {
   data: T;
   meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
   };
}
