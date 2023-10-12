import { Model } from 'sequelize-typescript';
interface SectionCreationAttrs {
    name: string;
    count: number;
    description: string;
}
export declare class Section extends Model<Section, SectionCreationAttrs> {
    id: number;
    name: string;
    count: number;
    description: string;
}
export {};
