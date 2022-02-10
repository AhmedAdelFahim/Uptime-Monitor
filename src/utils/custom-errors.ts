class CustomErrors extends Error {
  code: number;
  messages: string[];

  constructor(messages: string[], code: number) {
    super();
    this.messages = messages;
    this.code = code;
  }
}


export const errorMapping = (error: any): CustomErrors => {
  if (error?.name === 'MongoServerError' && error?.code === 11000) {
    return new CustomErrors([error.message], 400)
  } else if (error.isJoi) {
    const messages: string[] = error.details.map((error:any) => {
      return error.message
    });
    return new CustomErrors(messages, 400)
  } else {
    return new CustomErrors(["Internal Server Error"], 500);
  }
}

export default CustomErrors;