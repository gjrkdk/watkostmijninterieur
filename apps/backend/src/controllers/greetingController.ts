import { greetingService } from "../service/greetingService";
import { GreetingRequest, GreetingResponse } from "../types/greeting";

export const greetingController = {
  handleGreeting: (name: string): GreetingResponse => {
    const request: GreetingRequest = { name };
    return greetingService.getGreeting(request);
  },
};
