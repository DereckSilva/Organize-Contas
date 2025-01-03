import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class SlugService {
  createSlug(text: string): string {
    // ajustar slug
    text = text.replace('@', '-').replace('.', '-');
    return slugify(text, {
      lower: true,
      strict: true,
    });
  }
}
