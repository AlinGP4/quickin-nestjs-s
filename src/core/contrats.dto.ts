import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NewContractDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    idProperty: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    dni: string;
}

export class DeleteContractDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    idContract: number;
}

export class SingContractDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    idContract: string;
}


export class GetContractsByDNIDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    dni: string;
}