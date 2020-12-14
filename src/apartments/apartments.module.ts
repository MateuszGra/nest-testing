import {Module} from "@nestjs/common";
import {ApartmentsController} from "./apartments.controller";
import {ApartmentsService} from "./apartments.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ApartmentsEntity} from "./apartments.entity";

@Module({
    controllers: [ApartmentsController],
    providers: [ApartmentsService]
})
export class ApartmentsModule {
}