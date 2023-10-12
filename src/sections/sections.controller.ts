import { Body, Controller, Delete, Get, Post, Param, ParseIntPipe, Patch, Req } from '@nestjs/common';
import { SectionsService } from './sections.service';


@Controller('sections')
export class SectionsController {
    constructor(private sectionsService: SectionsService) {}

    @Get()
    getAllSections() {
        return "Worked";
    }

}
