import { Injectable } from '@nestjs/common';
import { MetaResponse } from 'src/models/web.model';
import { CreateUrlService } from './create-url.service';

class MetaGeneratorParams {
  total: number;
  page: number;
  limit: number;
  url: string;
  search?: string;
  sort?: string;
  order?: string;
}

@Injectable()
export class MetaService {
  constructor(private readonly createUrlService: CreateUrlService) {}

  generateMeta({
    total,
    page,
    limit,
    url,
    search,
    sort,
    order,
  }: MetaGeneratorParams): MetaResponse {
    const lastPage = Math.ceil(total / limit);

    const nextPageUrl =
      page < lastPage
        ? this.createUrlService.createPageUrl({
            url,
            pageNum: page + 1,
            limit,
            search,
            sort,
            order,
          })
        : null;

    const prevPageUrl =
      page > 1
        ? this.createUrlService.createPageUrl({
            url,
            pageNum: page - 1,
            limit,
            search,
            sort,
            order,
          })
        : null;

    return {
      total,
      page,
      limit,
      last_page: lastPage,
      next_page_url: nextPageUrl,
      prev_page_url: prevPageUrl,
    };
  }
}
