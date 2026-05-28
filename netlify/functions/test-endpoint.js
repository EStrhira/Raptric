exports.handler = async (event) => {
  try {
    console.log('Test function called with:', {
      httpMethod: event.httpMethod,
      path: event.path,
      headers: event.headers
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true,
        message: 'Test function is working!',
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Test function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: false,
        error: error.message,
        message: 'Test function failed'
      })
    };
  }
};
