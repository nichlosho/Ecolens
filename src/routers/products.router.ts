import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { createCaseInsensitiveFilter } from '../helper/collectionFilter';
import { IProduct } from '../interfaces/IProduct';
import { IMongooseFilter } from '../models/BaseModel';
import { ProductModel } from '../models/ProductModel';
import { BaseModelRouter } from './baseModel.router';

export class ProductRouter extends BaseModelRouter<IProduct> {
    constructor(mongoDBConnection: string) {
        super();
        this.model = new ProductModel(mongoDBConnection);
    }

    public override initializeRoutes(): void {
        // ----------------------------------- GET -----------------------------------\\

        // localhost:3000/products
        // localhost:3000/products?category=eyeglasses&material=wood
        this.router.get(
            '/',
            async (req: Request, res: Response): Promise<void> => {
                try {
                    const { category, material } = req.query;
                    let filter: object = {};
                    if (category) {
                        filter = createCaseInsensitiveFilter(
                            filter,
                            'category',
                            category as string
                        );
                    }
                    if (material) {
                        filter = createCaseInsensitiveFilter(
                            filter,
                            'glassesInfo.material',
                            material as string
                        );
                    }
                    const products = await this.model.find(filter);
                    if (products) {
                        res.status(200).json();
                    } else {
                        res.status(404).json({ error: 'Product not found' });
                    }
                    
                } catch (error) {
                    console.error('Error fetching products:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        );

        // localhost:3000/products/1
        this.router.get(
            '/:id',
            async (req: Request, res: Response): Promise<void> => {
                const productId = req.params.id;
                try {
                    const product = await this.model.findById(productId);
                    if (product) {
                        res.status(200).json();
                    } else {
                        res.status(404).json({ error: 'Product not found' });
                    }
                   
                } catch (error) {
                    console.error('Error fetching product:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        );

        // ----------------------------------- POST -----------------------------------//
        this.router.post('/', async (req: Request, res: Response) => {
            try {
                const newProducts = req.body as IProduct[];
                if (!Array.isArray(newProducts)) {
                    return res.status(400).json({ error: 'Request body must be an array of products' });
                }

                const result = await this.model.insertMany(newProducts);
                if (result) {
                    res.status(201).json(result);
                } else {
                    res.status(500).json({ error: 'Failed to create new products' });
                }
            } catch (error) {
                console.error('Error creating products:', error);
                res.status(400).json({ error: error.message });
            }
        });

        // ----------------------------------- PUT -----------------------------------\\

        this.router.put('/:id', async (req: Request, res: Response) => {
            const id = req?.params?.['id'];

            try {
                const updatedProduct: IProduct = req.body as IProduct;
                const query = { _id: new mongoose.Types.ObjectId(id) };
                const updateItem = {
                    $set: updatedProduct,
                };
                const result = await this.model.update(query, updateItem);

                result
                    ? res
                          .status(200)
                          .send(`Successfully updated Product with id ${id}`)
                    : res
                          .status(304)
                          .send(`Product with id: ${id} not updated`);
            } catch (error) {
                console.error(error.message);
                res.status(400).send(error.message);
            }
        });

        // ----------------------------------- DELETE -----------------------------------\\

        this.router.delete('/:id', async (req: Request, res: Response) => {
            const id = req?.params?.['id'];
            const query: IMongooseFilter = {
                _id: new mongoose.Types.ObjectId(id),
            };

            try {
                const result = await this.model.delete(query);

                if (result) {
                    res.status(202).send(
                        `Successfully removed Product with id ${id}`
                    );
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
}
