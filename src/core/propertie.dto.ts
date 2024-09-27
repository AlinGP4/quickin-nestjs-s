import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NewPropertyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    address: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    zipCode: number;

    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    size: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    rooms: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    bathrooms: number;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    garage: boolean;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    dni: string;
}

export class GetProertyByOwnerDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    dni: string;
}

export class DeletePropertyDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;
}

export class EditPropertyDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    address: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    zipCode: number;

    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    size: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    rooms: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    bathrooms: number;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    garage: boolean;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    dni: string;
}