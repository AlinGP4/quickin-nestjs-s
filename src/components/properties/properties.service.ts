import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { DeletePropertyDto, EditPropertyDto, NewPropertyDto } from 'src/core/propertie.dto';
import { Property } from 'src/core/property.interface';
import { responseError, responseSusses } from 'src/shared/utils';
import { EntityManager } from 'typeorm';

@Injectable()
export class PropertiesService {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {

    }

    async getAll(): Promise<any> {
        try {
            const allProperties = await this.entityManager.query("SELECT *, u.name as user_name, u.lastname as user_lastname FROM properties as p INNER JOIN users as u ON p.dni = u.dni WHERE NOT p.hired");
            return responseSusses('All properies', allProperties)
        } catch (err) {
            console.error(err);
            return responseError('Error geting all properies', null)
        }

    }

    getDataById(): any {
    }

    async getDataByOwner(dni: string): Promise<any> {
        try {
            const allProperties = await this.entityManager.query("SELECT * FROM properties WHERE dni = ?", [dni]);
            return responseSusses('All properies', allProperties)
        } catch (err) {
            console.error(err);
            return responseError('Error geting all properies', null)
        }
    }

    async addProperties(newPropertieDto: NewPropertyDto) {
        try {
            const responseOfInsert = await this.entityManager.query("INSERT INTO properties (properties.dni, properties.zipcode, properties.address, properties.size, properties.rooms, properties.bathroom, properties.garage, properties.price ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [newPropertieDto.dni, newPropertieDto.zipCode, newPropertieDto.address, newPropertieDto.size, newPropertieDto.rooms, newPropertieDto.bathrooms, newPropertieDto.garage, newPropertieDto.price])

            const propertyCreated: Property = {
                id: responseOfInsert.insertId,
                dni: newPropertieDto.dni,
                zipcode: newPropertieDto.zipCode,
                address: newPropertieDto.address,
                size: newPropertieDto.size,
                rooms: newPropertieDto.rooms,
                garage: newPropertieDto.garage,
                bathroom: newPropertieDto.bathrooms,
                price: newPropertieDto.price
            }

            return responseSusses('Propery created', propertyCreated)
        } catch (err) {
            console.error(err);
            return responseError('Propery not created', null)
        }
    }

    async updateDataPropertie(editPropertieDto: EditPropertyDto): Promise<any> {
        try {
            await this.entityManager.query("UPDATE properties SET properties.zipCode = ?, properties.address = ?,  properties.size = ?, properties.rooms = ?,   properties.bathroom = ? , properties.garage = ? , properties.price = ? WHERE id = ?",
                [editPropertieDto.zipCode, editPropertieDto.address, editPropertieDto.size, editPropertieDto.rooms, editPropertieDto.bathrooms, editPropertieDto.garage, editPropertieDto.price, editPropertieDto.id])

            const propertyUpdated: Property = {
                id: editPropertieDto.id,
                zipcode: editPropertieDto.zipCode,
                address: editPropertieDto.address,
                size: editPropertieDto.size,
                rooms: editPropertieDto.rooms,
                garage: editPropertieDto.garage,
                bathroom: editPropertieDto.bathrooms,
                price: editPropertieDto.price,
                dni: editPropertieDto.dni,
            }

            return responseSusses('Propery updated', propertyUpdated)
        } catch (err) {
            console.error(err);
            return responseError('Propery not updated', null)
        }
    }

    async deleteProperties(deletePropertiesDto: DeletePropertyDto): Promise<any> {
        try {
            await this.entityManager.query("DELETE FROM properties WHERE id = ?",
                [deletePropertiesDto.id])
            return responseSusses('Propery deleted', { id: deletePropertiesDto })
        } catch (err) {
            console.error(err);
            return responseError('Propery not deleted', null)
        }
    }
}
