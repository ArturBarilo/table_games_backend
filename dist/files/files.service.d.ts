import { Logger } from '@nestjs/common';
export declare class FilesService {
    logger: Logger;
    constructor();
    createFile(file: any): Promise<string>;
}
