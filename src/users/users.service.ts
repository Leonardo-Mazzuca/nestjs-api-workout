import { HttpException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {

    constructor(private prisma:PrismaService) { }

    async createUser (data:Prisma.UserCreateInput) {
        
        return await this.prisma.user.create({ data: {
            ...data,
            userSetting: {
                create: {
                    notificationsOn: false,
                    smsEnable: true
                }
            }
        } });	

    }

    async getUsers () {

        return await this.prisma.user.findMany({
            include: {
                userSetting: true,
                posts: true
            }
        });

    }

     getUserById (id:number) {
        return this.prisma.user.findUnique({ 
            where: { id }, 
            include: {
            userSetting: {
                select: {
                    smsEnable: true,
                    notificationsOn: true
                }
            },
            posts: true
        }
    });
    }

    async updateUserById (id:number, data:Prisma.UserUpdateInput) {
        
        const user = await this.getUserById(id);

        if(!user) {
            throw new HttpException('User not found', 404);
        }

        if(data.username){
            // vai entrar aqui caso o nome ja exista
            const findUser = await this.prisma.user.findUnique({ where: { username: data.username as string } });
            if(findUser){
                throw new HttpException('User already exists', 400);
            }

        }

        //vai agir normalmente caso o nome não exista
        return this.prisma.user.update({ where: { id }, data });

    }

    async deleteUserById (id: number) {

        const findUser = await this.getUserById(id);

        if(!findUser) {
            throw new HttpException('User not found', 404);
        }

        return this.prisma.user.delete({ where: { id } });

    }

    async updateUserSettings (userId: number,data:Prisma.UserSettingUpdateInput) {
        const findUser = await this.getUserById(userId);

        if(!findUser) {
            throw new HttpException('User not found', 404);
        }

        if(!findUser.userSetting){
            throw new HttpException('Bad request', 400);
        }

        return this.prisma.userSetting.update({ where: { userId }, data });
    }

}