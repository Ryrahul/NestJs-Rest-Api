import { IsNotEmpty } from "class-validator";

export class ProfileDto{
    @IsNotEmpty()
    email:string

}