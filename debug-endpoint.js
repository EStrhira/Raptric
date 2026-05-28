// Add this to your browser console to test the endpoint
async function testWarrantyEndpoint() {
  try {
    console.log('Testing warranty activation endpoint...');
    
    const response = await fetch('/.netlify/functions/warranty-activation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        phoneNumber: '1234567890',
        email: 'test@example.com',
        billImage: null,
        motorImage: null
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('Response data:', data);
    } else {
      const text = await response.text();
      console.log('Response text (first 500 chars):', text.substring(0, 500));
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

// Test the simple endpoint
async function testSimpleEndpoint() {
  try {
    console.log('Testing simple endpoint...');
    const response = await fetch('/.netlify/functions/test-endpoint');
    const data = await response.json();
    console.log('Simple endpoint response:', data);
  } catch (error) {
    console.error('Simple endpoint error:', error);
  }
}

// Run tests
testSimpleEndpoint();
testWarrantyEndpoint();
