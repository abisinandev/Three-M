import { LOGGER_TYPES } from "@infrastructure/inversify_di/types/express/logger.types";
import { WinstonLoggerService } from "@infrastructure/providers/logger/logger.service";
import { ContainerModule } from "inversify";


export const LoggerModule = new ContainerModule(({ bind }) => {
    bind(LOGGER_TYPES.ILogger).to(WinstonLoggerService)
});