import { SectionsService } from './sections.service';
export declare class SectionsController {
    private sectionsService;
    constructor(sectionsService: SectionsService);
    getAllSections(): string;
}
