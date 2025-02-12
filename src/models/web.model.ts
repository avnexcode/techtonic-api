import { ZodError } from 'zod';

export class WebResponse<T = undefined> {
  status: boolean;
  statusCode: number;
  message: string;
  data?: T;
  errors?: string;
  details?: ZodError;
}

export class MetaResponse {
  total: number;
  limit: number;
  page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export class QueryResponse<T> {
  data: T[];
  meta: MetaResponse;
}

export class QueryParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'created_at' | 'price';
  sortOrder?: 'asc' | 'desc';
}
