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
        // localhost:3000/customers
        // localhost:3000/customers?firstName=Lisa&email=lisa@example.com
        // localhost:3000/customers?firstName=Lisa
        this.router.get(
            '/',
            async (req: Request, res: Response): Promise<void> => {
                try {
                    const { firstName, email } = req.query;
                    let filter: object = {};
                    if (firstName) {
                        filter = createCaseInsensitiveFilter(
                            filter,
                            'firstName',
                            firstName as string
                        );
                    }
                    if (email) {
                        filter = createCaseInsensitiveFilter(
                            filter,
                            'email',
                            email as string
                        );
                    }

                    const customer = await this.model.find(filter);
                    res.json(customer);
                } catch (error) {
                    console.error('Error fetching customers:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        );

        // localhost:3000/customer/1
        this.router.get(
            '/:id',
            async (req: Request, res: Response): Promise<void> => {
                const customerId = req.params.id;
                try {
                    const customer = await this.model.findById(customerId);
                    if (!customer) {
                        res.status(404).json({ error: 'customer not found' });
                    } else {
                        res.json(customer);
                    }
                } catch (error) {
                    console.error('Error fetching customer:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        );

        // ----------------------------------- POST -----------------------------------\\
        // ----------------------------------- PUT -----------------------------------\\
        // ----------------------------------- DELETE -----------------------------------\\
    }
}
