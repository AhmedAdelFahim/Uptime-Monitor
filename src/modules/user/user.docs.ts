export const signUpRequestBody = {
  content: {
    'application/json': {
      'schema': {
        'type': 'object',
        'properties': {
          email: {
            'type': 'string',
            'example': 'ahmed@gmail.com',
          }, password: {
            'type': 'string',
            'example': 'P@ssw0rd',
          },
          passwordConfirmation: {
            'type': 'string',
            'example': 'P@ssw0rd',
          },
        },
        'required': [
          'email',
          'passwordConfirmation',
          'password',
        ],
      },
    },
  },
};

export const signUpRequestResponses = {
  '200': {
    'description': 'sign up successfully',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'message': {
              'type': 'string',
              'example': 'sign up successfully',
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
              'example': ['Password Confirmation must be matched with password'],
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

export const loginRequestBody = {
  content: {
    'application/json': {
      'schema': {
        'type': 'object',
        'properties': {
          email: {
            'type': 'string',
            'example': 'ahmed@gmail.com',
          }, password: {
            'type': 'string',
            'example': 'P@ssw0rd',
          },
        },
        'required': [
          'email',
          'password',
        ],
      },
    },
  },
};

export const loginRequestResponses = {
  '200': {
    'description': 'login successfully',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'message': {
              'type': 'string',
              'example': 'login successfully',
            },
            'data': {
              'type': 'object',
              'properties': {
                'email': {
                  type: 'string',
                  example: 'rovoyar231@goonby.com',
                },
                'userId': {
                  type: 'string',
                  example: '620c04318040f06a5f83928e',
                },
                'token': {
                  type: 'string',
                  // eslint-disable-next-line max-len
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvdm95YXIyMzFAZ29vbmJ5LmNvbSIsInVzZXJJZCI6IjYyMGMwNDMxODA0MGYwNmE1ZjgzOTI4ZSIsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTY0NDk1NDc3NCwiZXhwIjoxNjQ1MDQxMTc0fQ.oubWWWq0RydD5CezctFX_Gc0_pRJ7s_rCt6LgTR51Co',
                },
                'isVerified': {
                  type: 'boolean',
                  example: true,
                },
              },
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
              'example': ['email is not verified'],
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
