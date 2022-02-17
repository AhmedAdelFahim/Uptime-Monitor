import Logger from '../middlewares/logger';

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
  Logger.log('error', JSON.stringify(error));
  let messages: string[] = ['Internal Server Error'];
  let code: number = 500;
  const handledCodes = [400, 401, 404];
  if (error?.code) {
    if (error?.name === 'MongoServerError' && error?.code === 11000) {
      let message: string = error.message;
      if (error?.modelName) {
        message = `${error.modelName} already exist`;
      }
      messages = [message];
      code = 400;
    } else if (handledCodes.includes(error?.code)) {
      messages = [error.message];
      code = error.code;
    }
  } else if (error.isJoi) {
    messages = error.details.map((error: any) => {
      return error.message;
    });
    code = 400;
  }

  return new CustomErrors(messages, code);
};

export default CustomErrors;
