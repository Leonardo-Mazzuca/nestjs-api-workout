import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {


    onModuleInit() {

        try {
            this.$connect()
            console.log('Conectado a db');
            
        } catch (e) {
            console.log('Erro ao conectar com a database: ', e);
            
        }
    }


}