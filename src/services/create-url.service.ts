import { Injectable } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

class UrlBuilderParams {
  url: string;
  pageNum: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: string;
  defaultLimit?: number;
  defaultSortBy?: string;
  defaultSortOrder?: string;
}

@Injectable()
export class CreateUrlService {
  constructor(private configurationService: ConfigurationService) {}
  createPageUrl({
    url,
    pageNum,
    limit,
    search,
    sort,
    order,
    defaultLimit = 10,
    defaultSortBy = 'created_at',
    defaultSortOrder = 'desc',
  }: UrlBuilderParams): string {
    const queryParams = new URLSearchParams();

    queryParams.append('page', pageNum.toString());

    if (limit && limit !== defaultLimit) {
      queryParams.append('limit', limit.toString());
    }

    if (search && search.trim() !== '') {
      queryParams.append('search', search);
    }

    if (sort && sort !== defaultSortBy) {
      queryParams.append('sortBy', sort);
    }

    if (order && order !== defaultSortOrder) {
      queryParams.append('sortOrder', order);
    }

    const queryString = queryParams.toString();
    return `${this.configurationService.baseUrl + url}${queryString ? '?' + queryString : ''}`;
  }
}
