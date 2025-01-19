import { GreetingRequest, GreetingResponse } from "../types/greeting";

export const greetingService = {
  getGreeting: (request: GreetingRequest): GreetingResponse => {
    return {
      message: `Hello, ${request.name}!`,
    };
  },
};
