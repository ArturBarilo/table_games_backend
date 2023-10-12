import { Column, Model, Table, DataType } from 'sequelize-typescript';

interface SectionCreationAttrs {
    name: string;
    count: number;
    description: string;
}

@Table({ tableName: 'sections'})
export class Section extends Model<Section, SectionCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @Column({type: DataType.INTEGER, defaultValue: 0})
    count: number;

    @Column({type: DataType.STRING, allowNull: true})
    description: string;
}