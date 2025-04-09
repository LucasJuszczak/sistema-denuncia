import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComplaintsModule } from 'src/complaints/complaints.module';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [ComplaintsModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {}
