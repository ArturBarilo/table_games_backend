import { HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';


@Injectable()
export class FilesService {
    logger: Logger;

    constructor(){
        this.logger = new Logger(FilesService.name)
    }

    async createFile(file: any): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static');
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }
            
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            
            this.logger.log('avatar successfully created')
            return fileName;

        } catch(error) {
            this.logger.error('file write error')
            throw new HttpException('File write error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
