import { Injectable } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

class UrlBuilderParams {
  url: string;
  pageNum: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
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
    sortBy,
    sortOrder,
    defaultLimit = 10,
    defaultSortBy = 'created_at',
    defaultSortOrder = 'desc',
  }: UrlBuilderParams): string {
    const queryParams = new URLSearchParams();

    // Always add page number
    queryParams.append('page', pageNum.toString());

    // Add other params only if they have values and differ from defaults
    if (limit && limit !== defaultLimit) {
      queryParams.append('limit', limit.toString());
    }

    if (search && search.trim() !== '') {
      queryParams.append('search', search);
    }

    if (sortBy && sortBy !== defaultSortBy) {
      queryParams.append('sortBy', sortBy);
    }

    if (sortOrder && sortOrder !== defaultSortOrder) {
      queryParams.append('sortOrder', sortOrder);
    }

    const queryString = queryParams.toString();
    return `${this.configurationService.baseUrl + url}${queryString ? '?' + queryString : ''}`;
  }
}
