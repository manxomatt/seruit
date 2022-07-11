import { Module } from '@nestjs/common';
import { BlogCommentsResolver } from './comments.resolver';
import { BlogCommentsService } from './comments.service';

@Module({
  providers: [BlogCommentsResolver, BlogCommentsService],
})
export class BlogCommentsModule {}
