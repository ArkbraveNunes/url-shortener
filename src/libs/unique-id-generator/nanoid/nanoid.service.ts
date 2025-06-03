import { customAlphabet } from 'nanoid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NanoidService {
  generateCode(lengthCode: number = 6): string {
    const uniqueString = customAlphabet(
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      lengthCode,
    );
    return uniqueString();
  }
}
