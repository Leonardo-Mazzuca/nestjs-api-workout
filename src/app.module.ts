import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UserModule,PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
