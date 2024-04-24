import { Request, Response } from 'express';
import { createCaseInsensitiveFilter } from 'src/helper/collectionFilter';
import { ICustomer } from 'src/interfaces/ICustomer';
import { CustomerModel } from 'src/models/CustomerModel';
import { BaseModelRouter } from './baseModel.router';

export class CustomerRouter extends BaseModelRouter<ICustomer> {
    constructor(mongoDBConnection: string) {
        super();
        this.model = new CustomerModel(mongoDBConnection);
    }

    public override initializeRoutes(): void {
        // ----------------------------------- GET -----------------------------------\\
        // localhost:3000/customer
        // localhost:3000/customer?id=123
        this.router.get(
            '/',
            async (req: Request, res: Response): Promise<void> => {
                try {
                    const { id } = req.query;
                    let filter: object = {};
                    if (id) {
                        filter = createCaseInsensitiveFilter(
                            filter,
                            'id',
                            id as string
                        );
                    }
                    const customers = await this.model.getDocuments(filter);
                    res.json(customers);
                } catch (error) {
                    console.error('Error fetching products:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        );

        // localhost:3000/customer/1
        this.router.get(
            '/:id',
            async (req: Request, res: Response): Promise<void> => {
                const productId = req.params.id;
                try {
                    const product = await this.model.getById(productId);
                    if (!product) {
                        res.status(404).json({ error: 'Product not found' });
                    } else {
                        res.json(product);
                    }
                } catch (error) {
                    console.error('Error fetching product:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        );

        // ----------------------------------- POST -----------------------------------\\
        // ----------------------------------- PUT -----------------------------------\\
        // ----------------------------------- DELETE -----------------------------------\\
    }
}
