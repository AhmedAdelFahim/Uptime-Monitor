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
  console.log("error",error)
  let messages: string[] = ["Internal Server Error"];
  let code: number = 500;
  if (error?.code) {
    if (error?.name === 'MongoServerError' && error?.code === 11000) {
      let message: string = error.message;
      if (error?.modelName) {
        message = `${error.modelName} already exist`
      }
      messages = [message];
      code = 400
    } else if (error?.code === 400 || error?.code === 401) {
      messages = [error.message];
      code = error.code;
    }
  } else if (error.isJoi) {
    messages = error.details.map((error: any) => {
      return error.message
    });
    code = 400
  }

  return new CustomErrors(messages, code);
}

export default CustomErrors;