import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class SlugService {
  createSlug(text: string): string {
    return slugify(text, {
      replacement: '-',
      remove: /@./g,
      lower: true,
      strict: true,
    });
  }
}
