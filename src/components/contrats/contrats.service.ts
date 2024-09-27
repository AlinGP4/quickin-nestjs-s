import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { DeleteContractDto, GetContractsByDNIDto, NewContractDto, SingContractDto } from 'src/core/contrats.dto';
import { responseError, responseSusses } from 'src/shared/utils';
import { EntityManager } from 'typeorm';

@Injectable()
export class ContratsService {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {

    }

    async addContrats(newContractDto: NewContractDto): Promise<any> {
        try {
            await this.entityManager.query(`CALL CreateContract(?, ? , ?);`, [newContractDto.idProperty, new Date().getTime(), newContractDto.dni])
            return responseSusses('Contract created', null)
        } catch (err) {
            console.error(err);
            return responseError('Contract not created', null)
        }
    }

    async deleteContrats(deleteContractDto: DeleteContractDto): Promise<any> {
        try {
            await this.entityManager.query(`CALL DeleteContract(?);`, [deleteContractDto.idContract])
            return responseSusses('Contract deleted', null)
        } catch (err) {
            console.error(err);
            return responseError('Contract not deleted', null)
        }
    }

    async getContrats(GetContractsByDNIdto: GetContractsByDNIDto): Promise<any> {
        try {
            const allContrats = await this.entityManager.query(`SELECT 
                *,
                c.id as contract_id,
                ownerHome.name as owner_name,
                ownerHome.lastname as owner_lastname,
                renter.name as renter_name,
                renter.lastname as renter_lastname
            FROM 
                contrats AS c
            INNER JOIN 
                properties AS p ON c.id_propertie = p.id
            INNER JOIN 
                users AS renter ON c.dni_renter = renter.dni
            INNER JOIN 
                users AS ownerHome ON p.dni = ownerHome.dni WHERE renter.dni = ?;`, [GetContractsByDNIdto.dni])
            return responseSusses("all contract", allContrats)
        } catch (err) {
            console.error(err);
            return responseError("can't get contracts", null)
        }
    }

    async signContract(singContract: SingContractDto): Promise<any> {
        try {
            const signDate = new Date().getTime();
            await this.entityManager.query(`UPDATE contrats SET contrats.sign_contact = ? WHERE contrats.id = ?`, [signDate, singContract.idContract])
            return responseSusses('Contract signed', {
                signDate: signDate,
                idContract: singContract.idContract
            })
        } catch (err) {
            console.error(err);
            return responseError('Contract not signed', null)
        }
    }
}


/**
 * TRANSACCIÓN PARA CREAR CONTRATO
 */

/*
    DELIMITER $$

    DROP PROCEDURE IF EXISTS CreateContract;
    CREATE PROCEDURE CreateContract(
        IN idProperty INT,
        IN startContratDate VarChar(30),
        IN dniRenter VarChar(12)
    )
    BEGIN
        DECLARE exit handler FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se podido crear el contrato';
        END;

        START TRANSACTION;
        
        IF (SELECT properties.hired FROM properties WHERE properties.id = idProperty) = 1 THEN 
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Home hired';
        END IF;
        
        UPDATE properties
        SET properties.hired = true
        WHERE properties.id = idProperty;
        
        IF (SELECT COUNT(*) FROM users WHERE dni = dniRenter) = 0 THEN 
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Renter no existe';
        END IF;

        INSERT INTO contrats (contrats.start_contract, contrats.id_propertie, contrats.dni_renter) VALUES (startContratDate, idProperty, dniRenter);
        COMMIT;
    END$$

    DELIMITER ;
*/

/**
 * TRANSACCIÓN PARA ELIMINAR CONTRATO
 */

/*
    DELIMITER $$

    DROP PROCEDURE IF EXISTS DeleteContract;
    CREATE PROCEDURE DeleteContract(
        IN idContract INT
    )
    BEGIN
        DECLARE idProperty INT;
        
        DECLARE exit handler FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
        END;

        START TRANSACTION;

        SELECT contrats.id_propertie INTO idProperty FROM contrats WHERE id = idContract;

        UPDATE properties
        SET properties.hired = false
        WHERE properties.id = idProperty;

        DELETE FROM contrats WHERE id = idContract;
        
        COMMIT;
    END$$

    DELIMITER ;
*/