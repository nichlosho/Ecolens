import { Request, Response } from 'express';
import { createCaseInsensitiveFilter } from '../helper/collectionFilter';
import { IUser } from '../interfaces/IUser';
import { UserModel } from '../models/UserModel';
import { BaseModelRouter } from './baseModel.router';

export class UserRouter extends BaseModelRouter<IUser> {
    constructor(mongoDBConnection: string) {
        super();
        this.model = new UserModel(mongoDBConnection);
    }

    public override initializeRoutes(): void {
        // ----------------------------------- GET -----------------------------------\\

        // localhost:3000/user
        // localhost:3000/user?firstName=Lisa&email=lisa@example.com
        // localhost:3000/user?firstName=Lisa
        this.router.get(
            '/',
            this.validateAuth,
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
                    console.error('Error fetching users:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        );

        // localhost:3000/user/1
        this.router.get(
            '/:id',
            this.validateAuth,
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

        // this.router.post('/', async (req: Request, res: Response) => {
        //     try {
        //         const newCustomer = req.body as IUser;
        //         const result = await this.model.insertMany(newCustomer);

        //         if (result) {
        //             res.status(201).send(
        //                 `Successfully created a new customer with result ${result}`
        //             );
        //         } else {
        //             res.status(500).send('Failed to create new customer');
        //         }
        //     } catch (error) {
        //         console.error(error);
        //         res.status(400).send(error.message);
        //     }
        // });

        // ----------------------------------- PUT -----------------------------------\\
        // ----------------------------------- DELETE -----------------------------------\\
    }

    // private checkSession(req: Request): boolean {
    //     return req.session.id.length > 0;
    // }

    private validateAuth(req, res, next): void {
        if (req.isAuthenticated()) {
            console.log('user is authenticated');
            console.log(JSON.stringify(req.user));
            return next();
        }
        console.log('user is not authenticated');
        res.redirect('/');
    }
}
