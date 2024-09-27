import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { responseError, responseSusses } from 'src/shared/utils';
import { EntityManager } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {

    }

    async getAll(): Promise<any> {
        try {
            const allUsers = await this.entityManager.query("SELECT * FROM users");
            return responseSusses('All users', allUsers)
        } catch (err) {
            console.error(err);
            return responseError('Error geting all users', null)
        }
    }
}
