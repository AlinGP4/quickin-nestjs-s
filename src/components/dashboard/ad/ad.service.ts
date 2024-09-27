import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { responseError, responseSusses } from 'src/shared/utils';
import { EntityManager } from 'typeorm';

@Injectable()
export class AdService {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager
    ) { }

    async getAdLink() {
        try {
            const data = await this.entityManager.query('SELECT ad,COUNT(*) as count FROM dashboard GROUP BY dashboard.ad')
            return responseSusses('list ad', data)
        } catch (err) {
            console.error(err);
            return responseError('Error getting all ad', null)
        }
    }

    async adLink(ref) {
        try {
            await this.entityManager.query("INSERT INTO dashboard  (dashboard.ad) VALUES (?)", [ref])
            return responseSusses('ad created', null)
        } catch (err) {
            console.error(err);
            return responseError('ad not created', null)
        }
    }
}
