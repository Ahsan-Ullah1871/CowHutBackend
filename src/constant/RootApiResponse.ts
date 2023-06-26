const root_api_response = {
  welcomeMessage:
    'Welcome to the Online Cow Selling Backend API documentation!',
  mainUrl: 'https://assignment-3-cow-hut.vercel.app',
  paths: [
    {
      url: '/api/v1/auth/signup',
      description: 'Register a new user',
      methods: ['POST'],
    },

    {
      url: '/api/v1/users',
      description: 'Retrieve a list of all users',
      methods: ['GET'],
    },
    {
      url: '/api/v1/users/{user_id}',
      description: 'Retrieve details of a specific user',
      methods: ['GET', 'PATCH', 'DELETE'],
    },
    {
      url: '/api/v1/cows',
      description: 'Retrieve a list of all cows',
      methods: ['GET'],
    },
    {
      url: '/api/v1/cows/{cow_id}',
      description: 'Retrieve details of a specific cow',
      methods: ['GET'],
    },
    {
      url: '/api/v1/cows',
      description: 'Create a new cow',
      methods: ['POST'],
    },
    {
      url: '/api/v1/cows/{cow_id}',
      description: 'Update details of a specific cow',
      methods: ['PATCH'],
    },
    {
      url: '/api/v1/cows/{cow_id}',
      description: 'Delete a specific cow',
      methods: ['DELETE'],
    },
    {
      url: '/api/v1/orders',
      description: 'Retrieve a list of all orders',
      methods: ['GET'],
    },

    {
      url: '/api/v1/orders',
      description: 'Create a new order',
      methods: ['POST'],
    },
  ],
}

export default root_api_response
