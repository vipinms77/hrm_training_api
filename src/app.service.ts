import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Generates a success response object with the given data.
   *
   * @param {any} data - The data to be included in the response.
   * @return {any} The success response object.
   */
  generateSuccessResponse(data: any): any {
    return {
      message: 'success',
      data: data,
    };
  }
}
