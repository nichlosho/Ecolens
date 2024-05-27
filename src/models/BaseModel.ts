import mongoose, { Model, Schema } from 'mongoose';
import { IModel } from '../interfaces/IModel';

export abstract class BaseModel<T> implements IModel {
    public get dbName(): string {
        return 'Ecolens';
    }
    public get collectionName(): string {
        return '';
    }
    protected model: Model<T>;
    private dbConnectionString: string;

    public constructor(dbConnectionString: string) {
        this.dbConnectionString = dbConnectionString;
        this.createModel();
    }
    public getSchema(): Schema<T> {
        return null;
    }
    protected async createModel() {
        try {
            await mongoose.connect(this.dbConnectionString);
            this.model = mongoose.model<T>(
                this.collectionName,
                this.getSchema()
            );
            console.log(
                '✅----------- Connection Successful for ' +
                    this.collectionName +
                    ' Collection -----------✅'
            );
        } catch (e) {
            console.error(e);
        }
    }

    // ---------------------------------- Public Interfaces ----------------------------------//

    // ----------------------------------- GET -----------------------------------\\
    public async find(filter?: object): Promise<T[]> {
        // fix to return
        const query = this.model.find(filter);
        try {
            return await query.exec();
        } catch (e) {
            console.error(e);
            return [];
        }
    }
    public async findById(id: string): Promise<T | null> {
        const query = this.model.findById(id);
        try {
            const item: T = await query.exec();
            return item;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
    // ----------------------------------- POST -----------------------------------\\
    public async insertMany(item: T[] | T): Promise<unknown> {
        try {
            return await this.model.insertMany(
                Array.isArray(item) ? item : [item]
            );
        } catch (e) {
            console.error(e);
            return null;
        }
    }
    // ----------------------------------- PUT -----------------------------------\\
    public async update(filter: object, updateItem: object): Promise<unknown> {
        const query = this.model.findOneAndUpdate(filter, updateItem, {
            new: true,
        });
        try {
            return await query.exec();
        } catch (e) {
            console.error(e);
            return null;
        }
    }
    // ----------------------------------- DELETE -----------------------------------\\
    public async delete(objectId: IMongooseFilter): Promise<unknown> {
        const query = this.model.findOneAndDelete(objectId);
        try {
            return await query.exec();
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}

export interface IMongooseFilter {
    _id: mongoose.Types.ObjectId;
}
