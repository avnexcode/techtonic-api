export class CreateCategoryRequest {
  name: string;
  description?: string;
}

export class UpdateCategoryRequest {
  name?: string;
  description?: string;
}
