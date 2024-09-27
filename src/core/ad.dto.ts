import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class NewAdDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ref: string;
}