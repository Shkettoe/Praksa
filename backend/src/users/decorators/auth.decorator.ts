import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export const UserAuth = createParamDecorator(
    (data:never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()
        return request.userCurrent
    }
)