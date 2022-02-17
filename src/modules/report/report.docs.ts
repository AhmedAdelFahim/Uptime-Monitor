export const getReportRequestBody = {
  content: {
    'application/json': {
      'schema': {
        'type': 'object',
        'description': 'must provide id or tag one of them',
        'properties': {
          id: {
            'type': 'string',
            'example': 'dahdkhakj012938jksahdaa',
          }, tag: {
            'type': 'string',
            'example': 'tag',
          },
        },
      },
    },
  },
};

export const getReportRequestResponses = {
  '200': {
    'description': 'get report',
    'content': {
      'application/json': {
        'schema': {
          'type': 'object',
          'properties': {
            'data': {
              'type': 'object',
              'properties': {

                'downtime': {
                  type: 'number',
                  example: 60,
                },
                'uptime': {
                  type: 'number',
                  example: 0,
                },
                'responseTime': {
                  type: 'number',
                  example: 9,
                },
                'outages': {
                  type: 'number',
                  example: 1,
                },
                'availability': {
                  type: 'number',
                  example: 0,
                },
                'history': {
                  type: 'array',
                  example: {

                    '_id': '620c0af0914ddfc3936405b5',
                    'userId': '620c04318040f06a5f83928e',
                    'status': 'down',
                    'responseTime': 9,
                    'error': 'connect ECONNREFUSED 127.0.0.1:9000',
                    'createdAt': '2022-02-15T20:20:00.032Z',
                    'updatedAt': '2022-02-15T20:20:00.032Z',
                    '__v': 0,

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
