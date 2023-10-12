import { Module } from '@nestjs/common';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Section } from './sections.model';

@Module({
  controllers: [SectionsController],
  providers: [SectionsService],
  imports: [SequelizeModule.forFeature([Section])],
})
export class SectionsModule {}
