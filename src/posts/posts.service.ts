import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PostsService  {

    constructor (private prisma:PrismaService) {}

    async createPost (userId:number,data:Prisma.PostCreateWithoutUserInput) {
        return await this.prisma.post.create({ 
            data : {
            ...data,
            userId
        }
    });
    }

    async createGroupPost (userIds: number[], data:Prisma.GroupPostCreateWithoutUsersInput) {
        return await this.prisma.groupPost.create({
            data: {
                ...data,
                users: {
                    create: userIds.map(id => ({ userId: id }))
                }
            }
        })
    }

    async getGroupPosts () {
        return await this.prisma.groupPost.findMany({
            include: {
                users: {
                    select: {
                        user: true
                    }
                }
            }
        })
    }

}