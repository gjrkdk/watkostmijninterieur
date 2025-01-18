export interface GreetingRequest {
  name: string;
}

export interface GreetingResponse {
  message: string;
}

export function getGreeting(request: GreetingRequest): GreetingResponse {
  return {
    message: `Hello, ${request.name}!`,
  };
}
