export class CreateBannerRequest {
  title: string;
  image?: string;
  description?: string;
  badge?: string;
}

export class UpdateBannerRequest {
  title?: string;
  image?: string;
  description?: string;
  badge?: string;
}
