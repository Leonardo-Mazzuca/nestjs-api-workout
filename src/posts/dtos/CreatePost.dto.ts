import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"


export class CreatePostDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(290)
    title: string

    @IsString()
    @IsNotEmpty()

    description: string

    @IsNumber()
    @IsNotEmpty()
    userId: number

}