import { Injectable } from '@nestjs/common';
const slugify = require('slugify');

@Injectable()
export class SlugProvider {
    // constructor(private configService: ConfigService) { }

    // slugify(slug: string): Promise<string> {
    //     return slugify(slug, this.config.get('slugify'));
    // }

    // replacement(): string {
    //     return this.config.get('slugify.replacement');
    // }
}