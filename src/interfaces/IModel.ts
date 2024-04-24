export interface IModel {
    get dbName(): string;
    get collectionName(): string;
    getSchema(): any;
}
