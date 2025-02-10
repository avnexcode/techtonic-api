export class WebResponse<T = undefined> {
  status: boolean;
  statusCode: number;
  message: string;
  data?: T;
}
