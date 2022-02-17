export const urlCreateRequestBody = {
  content: {
    'application/json': {
      'schema': {
        'type': 'object',
        'properties': {
          name: {
            'type': 'string',
            'example': 'google',
          },
          url: {
            'type': 'string',
            'example': 'google.com',
          },
          path: {
            'type': 'string',
            'example': '/api',
          },
          webhook: {
            'type': 'string',
            'example': 'http://example.com/api',
          },
          protocol: {
            'type': 'string',
            'enum': ['http', 'https'],
            'example': 'https',
          },
          tags: {
            'type': 'array',
            'example': ['tag'],
          },
          port: {
            'type': 'number',
            'example': 9000,
          },
          timeout: {
            'type': 'number',
            'example': 2,
            'default': 5,
            'description': '(defaults to 5 seconds): The timeout of the polling request',
          },
          threshold: {
            'type': 'number',
            'example': 2,
            'default': 1,
          },
          ignoreSSL: {
            'type': 'boolean',
            'example': false,
            'description': 'A flag to ignore broken/expired SSL certificates in case of using the HTTPS protocol',
          },
          interval: {
            'type': 'string',
            'default': '10m',
            'example': '01m',
            'description': 'value between [00m-59m] or [00h-23h] m for minute and h for hour.',
          },
          authentication: {
            type: 'object',
            description: 'An HTTP authentication header, with the Basic scheme, to be sent with the polling request',
            properties: {
              username: {
                type: 'string',
                example: 'user',
              },
              password: {
                type: 'string',
                example: 'pass',
              },
            },
          },
          httpHeaders: {
            type: 'object',
            example: {
              'Content-Type': 'application/json',
            },
          },
        },
        'required': [
          'name',
          'url',
          'protocol',
        ],
      },
    },
  },
};

export const urlCreateRequestResponses = {
  '200': {
    'description': 'url is created successfully',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'message': {
              'type': 'string',
              'example': 'url is created successfully',
            },
          },
        },
      },
    },
  },
  '400': {
    'description': 'validation error',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'messages': {
              'type': 'array',
              'example': ['interval must be value between [00m-59m] or [00h-23h] m for minute and h for hour.'],
            },
            'code': {
              'type': 'number',
              'example': 400,
            },

          },
        },
      },
    },
  },
  '401': {
    'description': 'authorization error',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'messages': {
              'type': 'array',
              'example': ['Unauthorized'],
            },
            'code': {
              'type': 'number',
              'example': 401,
            },

          },
        },
      },
    },
  },
  '500': {
    'description': 'Internal server error',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'messages': {
              'type': 'array',
              'example': ['Internal server error'],
            },
            'code': {
              'type': 'number',
              'example': 500,
            },

          },
        },
      },
    },
  },
};

export const urlUpdateRequestBody = {
  content: {
    'application/json': {
      'schema': {
        'type': 'object',
        'properties': {
          name: {
            'type': 'string',
            'example': 'google',
          },
          url: {
            'type': 'string',
            'example': 'google.com',
          },
          path: {
            'type': 'string',
            'example': '/api',
          },
          webhook: {
            'type': 'string',
            'example': 'http://example.com/api',
          },
          protocol: {
            'type': 'string',
            'enum': ['http', 'https'],
            'example': 'https',
          },
          tags: {
            'type': 'array',
            'example': ['tag'],
          },
          port: {
            'type': 'number',
            'example': 9000,
          },
          timeout: {
            'type': 'number',
            'example': 2,
            'default': 5,
            'description': '(defaults to 5 seconds): The timeout of the polling request',
          },
          threshold: {
            'type': 'number',
            'example': 2,
            'default': 1,
          },
          ignoreSSL: {
            'type': 'boolean',
            'example': false,
            'description': 'A flag to ignore broken/expired SSL certificates in case of using the HTTPS protocol',
          },
          interval: {
            'type': 'string',
            'default': '10m',
            'example': '01m',
            'description': 'value between [00m-59m] or [00h-23h] m for minute and h for hour.',
          },
          authentication: {
            type: 'object',
            description: 'An HTTP authentication header, with the Basic scheme, to be sent with the polling request',
            properties: {
              username: {
                type: 'string',
                example: 'user',
              },
              password: {
                type: 'string',
                example: 'pass',
              },
            },
          },
          httpHeaders: {
            type: 'object',
            example: {
              'Content-Type': 'application/json',
            },
          },
        },
        'required': [
          'name',
          'url',
          'protocol',
        ],
      },
    },
  },
};

export const urlUpdateRequestResponses = {
  '200': {
    'description': 'url is created successfully',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'message': {
              'type': 'string',
              'example': 'url is created successfully',
            },
          },
        },
      },
    },
  },
  '400': {
    'description': 'validation error',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'messages': {
              'type': 'array',
              'example': ['interval must be value between [00m-59m] or [00h-23h] m for minute and h for hour.'],
            },
            'code': {
              'type': 'number',
              'example': 400,
            },

          },
        },
      },
    },
  },
  '401': {
    'description': 'authorization error',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'messages': {
              'type': 'array',
              'example': ['Unauthorized'],
            },
            'code': {
              'type': 'number',
              'example': 401,
            },

          },
        },
      },
    },
  },
  '500': {
    'description': 'Internal server error',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'messages': {
              'type': 'array',
              'example': ['Internal server error'],
            },
            'code': {
              'type': 'number',
              'example': 500,
            },

          },
        },
      },
    },
  },
};

export const urlDeleteRequestResponses = {
  '200': {
    'description': 'url is deleted successfully',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'message': {
              'type': 'string',
              'example': 'url is deleted successfully',
            },
          },
        },
      },
    },
  },
  '404': {
    'description': 'validation error',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'messages': {
              'type': 'array',
              'example': ['url not found'],
            },
            'code': {
              'type': 'number',
              'example': 404,
            },

          },
        },
      },
    },
  },
  '401': {
    'description': 'authorization error',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'messages': {
              'type': 'array',
              'example': ['Unauthorized'],
            },
            'code': {
              'type': 'number',
              'example': 401,
            },

          },
        },
      },
    },
  },
  '500': {
    'description': 'Internal server error',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'messages': {
              'type': 'array',
              'example': ['Internal server error'],
            },
            'code': {
              'type': 'number',
              'example': 500,
            },

          },
        },
      },
    },
  },
};

export const urlGetRequestResponses = {
  '200': {
    'description': 'list urls',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'data': {
              'type': 'object',
              'properties': {
                _id: {
                  'type': 'string',
                  'example': '620c0acc914ddfc3936405b3',
                },
                userId: {
                  'type': 'string',
                  'example': '620c04318040f06a5f83928e',
                },
                name: {
                  'type': 'string',
                  'example': 'google',
                },
                url: {
                  'type': 'string',
                  'example': 'google.com',
                },
                path: {
                  'type': 'string',
                  'example': '/api',
                },
                webhook: {
                  'type': 'string',
                  'example': 'http://example.com/api',
                },
                protocol: {
                  'type': 'string',
                  'enum': ['http', 'https'],
                  'example': 'https',
                },
                tags: {
                  'type': 'array',
                  'example': ['tag'],
                },
                port: {
                  'type': 'number',
                  'example': 9000,
                },
                timeout: {
                  'type': 'number',
                  'example': 2,
                  'default': 5,
                  'description': '(defaults to 5 seconds): The timeout of the polling request',
                },
                threshold: {
                  'type': 'number',
                  'example': 2,
                  'default': 1,
                },
                ignoreSSL: {
                  'type': 'boolean',
                  'example': false,
                  'description': 'A flag to ignore broken/expired SSL certificates in case of using the HTTPS protocol',
                },
                interval: {
                  'type': 'string',
                  'default': '10m',
                  'example': '01m',
                  'description': 'value between [00m-59m] or [00h-23h] m for minute and h for hour.',
                },
                authentication: {
                  type: 'object',
                  description: 'An HTTP authentication header, with the Basic scheme, to be sent with the polling request',
                  properties: {
                    username: {
                      type: 'string',
                      example: 'user',
                    },
                    password: {
                      type: 'string',
                      example: 'pass',
                    },
                  },
                },
                httpHeaders: {
                  type: 'object',
                  example: {
                    'Content-Type': 'application/json',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '401': {
    'description': 'authorization error',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'messages': {
              'type': 'array',
              'example': ['Unauthorized'],
            },
            'code': {
              'type': 'number',
              'example': 401,
            },

          },
        },
      },
    },
  },
  '500': {
    'description': 'Internal server error',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'messages': {
              'type': 'array',
              'example': ['Internal server error'],
            },
            'code': {
              'type': 'number',
              'example': 500,
            },

          },
        },
      },
    },
  },
};
