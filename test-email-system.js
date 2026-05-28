// Test script for all email endpoints
// Run this in browser console or as a separate test file

// Test 1: Contact Form Email
const testContactEmail = async () => {
  console.log('🧪 Testing Contact Form Email...');
  
  try {
    const response = await fetch('https://us-central1-esthira-raptric.cloudfunctions.net/sendContactEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+91 9876543210',
        message: 'This is a test contact form submission from the email system test.'
      }),
    });

    const result = await response.json();
    console.log('✅ Contact Form Response:', result);
    
    if (response.ok && result.success) {
      console.log('🎉 Contact form email working!');
    } else {
      console.error('❌ Contact form failed:', result);
    }
  } catch (error) {
    console.error('❌ Contact form error:', error);
  }
};

// Test 2: Order Confirmation Email
const testOrderEmail = async () => {
  console.log('🧪 Testing Order Confirmation Email...');
  
  try {
    const response = await fetch('https://us-central1-esthira-raptric.cloudfunctions.net/sendOrderEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: 'TEST-ORD-123456',
        userEmail: 'customer@example.com',
        userName: 'Test Customer',
        orderItems: [
          {
            name: 'RAPTRIC Electric Bike',
            quantity: 1,
            price: 45000,
            image: '/bike-test.jpg'
          }
        ],
        totalAmount: 45000,
        shippingAddress: {
          street: '123 Test Street',
          city: 'Bangalore',
          state: 'Karnataka',
          postalCode: '560001',
          country: 'India'
        },
        estimatedDelivery: '5-7 business days',
        paymentMethod: 'Credit Card'
      }),
    });

    const result = await response.json();
    console.log('✅ Order Confirmation Response:', result);
    
    if (response.ok && result.success) {
      console.log('🎉 Order confirmation email working!');
    } else {
      console.error('❌ Order confirmation failed:', result);
    }
  } catch (error) {
    console.error('❌ Order confirmation error:', error);
  }
};

// Test 3: Welcome Email
const testWelcomeEmail = async () => {
  console.log('🧪 Testing Welcome Email...');
  
  try {
    const response = await fetch('https://us-central1-esthira-raptric.cloudfunctions.net/sendWelcomeEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: 'newuser@example.com',
        userName: 'New Test User',
        loginMethod: 'email'
      }),
    });

    const result = await response.json();
    console.log('✅ Welcome Email Response:', result);
    
    if (response.ok && result.success) {
      console.log('🎉 Welcome email working!');
    } else {
      console.error('❌ Welcome email failed:', result);
    }
  } catch (error) {
    console.error('❌ Welcome email error:', error);
  }
};

// Test 4: Test with wrong data (should fail validation)
const testValidation = async () => {
  console.log('🧪 Testing Validation (should fail)...');
  
  try {
    const response = await fetch('https://us-central1-esthira-raptric.cloudfunctions.net/sendContactEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '', // Invalid: empty name
        email: 'invalid-email', // Invalid: bad email
        message: 'short' // Invalid: too short
      }),
    });

    const result = await response.json();
    console.log('✅ Validation Test Response:', result);
    
    if (!response.ok && result.error) {
      console.log('🎉 Validation working correctly!');
    } else {
      console.error('❌ Validation not working:', result);
    }
  } catch (error) {
    console.error('❌ Validation test error:', error);
  }
};

// Run all tests
const runAllTests = async () => {
  console.log('🚀 Starting Email System Tests...');
  console.log('=====================================');
  
  await testContactEmail();
  console.log('=====================================');
  
  await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
  
  await testOrderEmail();
  console.log('=====================================');
  
  await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
  
  await testWelcomeEmail();
  console.log('=====================================');
  
  await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
  
  await testValidation();
  console.log('=====================================');
  console.log('🏁 All tests completed!');
};

// Export functions to run manually
window.testEmailSystem = {
  testContactEmail,
  testOrderEmail,
  testWelcomeEmail,
  testValidation,
  runAllTests
};

console.log('📧 Email System Test Script Loaded!');
console.log('Run: window.testEmailSystem.runAllTests() to test all email functions');
console.log('Or run individual tests:');
console.log('- window.testEmailSystem.testContactEmail()');
console.log('- window.testEmailSystem.testOrderEmail()');
console.log('- window.testEmailSystem.testWelcomeEmail()');
console.log('- window.testEmailSystem.testValidation()');
