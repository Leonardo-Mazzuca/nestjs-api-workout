import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreatePostDto } from "./dtos/CreatePost.dto";
import { PostsService } from "./posts.service";
import { CreateGroupPostDto } from "./dtos/CreateGroupPost.dto";

//definir end point
@Controller('posts')
export class PostsController {

    constructor (private postService:PostsService){}

    @Post()
    @UsePipes(ValidationPipe)
    async createPost (@Body() {userId, ...createPostData}:CreatePostDto) {
         return await this.postService.createPost(userId, createPostData)
    }

    //POST posts/group
    @Post('group')
    @UsePipes(ValidationPipe)
    async createGroupPost (@Body() {userIds, ...createGroupPostData}:CreateGroupPostDto) {
        return await this.postService.createGroupPost(userIds, createGroupPostData)
    }


    @Get('group')
    async getGroupPosts () {
        return await this.postService.getGroupPosts();
    }

}