import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import { UpdateUserDto } from "./dtos/UpdateUser.dto";
import { UpdateUserSettingsDto } from "./dtos/UpdateUserSettings.dto";

// anotar o controller = criar endpoint 

//utilizar DTOS para fazer a transferencia de dados
@Controller('users')
export class UsersController {

    constructor (private userService:UserService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createUser (@Body() createUserDto:CreateUserDto) {

        return await this.userService.createUser(createUserDto)

    }

    @Get()
    async getUsers () {
        return await this.userService.getUsers()
    }

    //especificando uma rota dinãmica
    @Get(':id')
    //pegando o parâmetro da url
    async getUserById (@Param('id', ParseIntPipe) id:number) {
        const user = await this.userService.getUserById(id)

        if(!user){
            // retornando erro caso usuário não exista
            throw new HttpException('User not found',404);

        }

        return user;
    }

    @Patch(':id')
     updateUserById (@Param('id', ParseIntPipe) id:number, @Body() data:UpdateUserDto) {
       return this.userService.updateUserById(id, data) 
    }

    @Delete(':id')
    deleteUserById (@Param('id', ParseIntPipe) id:number) {
        return this.userService.deleteUserById(id)
    }

    //PATCH users/:id/settings
    @Patch(':id/settings')
    updateUserSettingsByUserId (@Param('id', ParseIntPipe) id:number, @Body() updateUserSettingsDto:UpdateUserSettingsDto) {

        return this.userService.updateUserSettings(id, updateUserSettingsDto)

    }

    
}