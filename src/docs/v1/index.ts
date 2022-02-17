import {
  loginRequestBody,
  loginRequestResponses,
  signUpRequestBody,
  signUpRequestResponses,
} from '../../modules/user/user.docs';
import {
  urlCreateRequestBody,
  urlCreateRequestResponses, urlDeleteRequestResponses, urlGetRequestResponses,
  urlUpdateRequestBody,
  urlUpdateRequestResponses,
} from '../../modules/url/url.docs';
import {getReportRequestBody, getReportRequestResponses} from '../../modules/report/report.docs';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Uptime monitoring API Documentation',
  },
  host: '127.0.0.1:3001',
  basePath: '/api/v1',
  paths: {
    '/users/signup': {
      'post': {
        'tags': ['Users'],
        'summary': 'Sign Up',
        'operationId': 'sign-up',
        'requestBody': signUpRequestBody,
        'responses': signUpRequestResponses,
      },
    },
    '/users/login': {
      'post': {
        'tags': ['Users'],
        'summary': 'login',
        'operationId': 'login',
        'requestBody': loginRequestBody,
        'responses': loginRequestResponses,
      },
    },
    '/urls': {
      'post': {
        'tags': ['URLs'],
        'summary': 'create URL to be monitored',
        'operationId': 'create-url',
        'requestBody': urlCreateRequestBody,
        'responses': urlCreateRequestResponses,
      },
      'get': {
        'tags': ['URLs'],
        'summary': 'get URLs',
        'operationId': 'get-url',
        'responses': urlGetRequestResponses,
      },
    },
    '/urls/{id}': {
      'put': {
        'tags': ['URLs'],
        'summary': 'update URL',
        'operationId': 'update-url',
        'parameters': [
          {
            'in': 'path',
            'name': 'id',
            'schema': {
              'type': 'string',
            },
          },
        ],
        'requestBody': urlUpdateRequestBody,
        'responses': urlUpdateRequestResponses,
      },
      'delete': {
        'tags': ['URLs'],
        'summary': 'delete URL',
        'operationId': 'delete-url',
        'parameters': [
          {
            'in': 'path',
            'name': 'id',
            'schema': {
              'type': 'string',
            },
          },
        ],
        'responses': urlDeleteRequestResponses,
      },
    },
    '/reports': {
      'post': {
        'tags': ['Reports'],
        'summary': 'get report',
        'operationId': 'get-report',
        'requestBody': getReportRequestBody,
        'responses': getReportRequestResponses,
      },
    },
  },
  tags: [
    {
      'name': 'Users',
      'description': 'Users APIs',
    },
    {
      'name': 'URLs',
      'description': 'URLs APIs',
    },
    {
      'name': 'Reports',
      'description': 'Reports APIs',
    },
  ],
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};
