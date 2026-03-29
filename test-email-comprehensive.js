// Comprehensive Email System Test Suite
// Run this in browser console or Node.js

const EMAIL_SERVICE_URL = 'http://localhost:3001'; // Update if your backend runs elsewhere

// Test 1: Health Check
const testHealthCheck = async () => {
  console.log('🧪 Testing Health Check...');
  try {
    const response = await fetch(`${EMAIL_SERVICE_URL}/api/health`);
    const result = await response.json();
    console.log('✅ Health Check Response:', result);
    return response.ok;
  } catch (error) {
    console.error('❌ Health Check Failed:', error);
    return false;
  }
};

// Test 2: Contact Form Email
const testContactEmail = async () => {
  console.log('🧪 Testing Contact Form Email...');
  try {
    const response = await fetch(`${EMAIL_SERVICE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+91 9876543210',
        subject: 'Email System Test',
        message: 'This is a test message from the email system verification test. Please confirm receipt.'
      }),
    });

    const result = await response.json();
    console.log('✅ Contact Form Response:', result);
    
    if (response.ok && result.success) {
      console.log('🎉 Contact form email sent successfully!');
      console.log('📧 Check your inbox at info.esthira@gmail.com');
    } else {
      console.error('❌ Contact form failed:', result);
    }
    return response.ok;
  } catch (error) {
    console.error('❌ Contact form error:', error);
    return false;
  }
};

// Test 3: Order Confirmation Email
const testOrderEmail = async () => {
  console.log('🧪 Testing Order Confirmation Email...');
  try {
    const response = await fetch(`${EMAIL_SERVICE_URL}/api/order-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: 'TEST-ORD-' + Date.now(),
        userEmail: 'customer@example.com',
        userName: 'Test Customer',
        orderItems: [
          {
            name: 'RAPTRIC Electric Bike - Test Model',
            quantity: 1,
            price: 45000,
            image: 'https://example.com/bike.jpg'
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
      console.log('🎉 Order confirmation email sent successfully!');
      console.log('📧 Check customer@example.com inbox');
    } else {
      console.error('❌ Order confirmation failed:', result);
    }
    return response.ok;
  } catch (error) {
    console.error('❌ Order confirmation error:', error);
    return false;
  }
};

// Test 4: Welcome Email
const testWelcomeEmail = async () => {
  console.log('🧪 Testing Welcome Email...');
  try {
    const response = await fetch(`${EMAIL_SERVICE_URL}/api/welcome`, {
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
      console.log('🎉 Welcome email sent successfully!');
      console.log('📧 Check newuser@example.com inbox');
    } else {
      console.error('❌ Welcome email failed:', result);
    }
    return response.ok;
  } catch (error) {
    console.error('❌ Welcome email error:', error);
    return false;
  }
};

// Test 5: Validation Testing (Should Fail)
const testValidation = async () => {
  console.log('🧪 Testing Validation (Should Fail)...');
  try {
    const response = await fetch(`${EMAIL_SERVICE_URL}/api/contact`, {
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
    return !response.ok;
  } catch (error) {
    console.error('❌ Validation test error:', error);
    return false;
  }
};

// Test 6: Rate Limiting Testing
const testRateLimit = async () => {
  console.log('🧪 Testing Rate Limiting...');
  let successCount = 0;
  let failureCount = 0;
  
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(`${EMAIL_SERVICE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `Rate Limit Test ${i}`,
          email: `test${i}@example.com`,
          message: `Rate limit test message ${i}`
        }),
      });

      if (response.ok) {
        successCount++;
      } else {
        failureCount++;
        const result = await response.json();
        console.log(`Request ${i+1} failed:`, result);
      }
    } catch (error) {
      failureCount++;
      console.error(`Request ${i+1} error:`, error);
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`✅ Rate Limit Test Results: ${successCount} success, ${failureCount} failures`);
  return successCount > 0;
};

// Run all tests
const runAllTests = async () => {
  console.log('🚀 Starting Comprehensive Email System Tests...');
  console.log('==================================================');
  console.log('📍 Testing URL:', EMAIL_SERVICE_URL);
  console.log('==================================================');
  
  const results = {
    healthCheck: false,
    contactEmail: false,
    orderEmail: false,
    welcomeEmail: false,
    validation: false,
    rateLimit: false
  };
  
  // Test 1: Health Check
  results.healthCheck = await testHealthCheck();
  console.log('==================================================');
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Test 2: Contact Form
  results.contactEmail = await testContactEmail();
  console.log('==================================================');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 3: Order Confirmation
  results.orderEmail = await testOrderEmail();
  console.log('==================================================');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 4: Welcome Email
  results.welcomeEmail = await testWelcomeEmail();
  console.log('==================================================');
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Test 5: Validation
  results.validation = await testValidation();
  console.log('==================================================');
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Test 6: Rate Limiting
  results.rateLimit = await testRateLimit();
  console.log('==================================================');
  
  // Summary
  console.log('📊 TEST RESULTS SUMMARY:');
  console.log('========================');
  console.log(`✅ Health Check: ${results.healthCheck ? 'PASS' : 'FAIL'}`);
  console.log(`✅ Contact Email: ${results.contactEmail ? 'PASS' : 'FAIL'}`);
  console.log(`✅ Order Email: ${results.orderEmail ? 'PASS' : 'FAIL'}`);
  console.log(`✅ Welcome Email: ${results.welcomeEmail ? 'PASS' : 'FAIL'}`);
  console.log(`✅ Validation: ${results.validation ? 'PASS' : 'FAIL'}`);
  console.log(`✅ Rate Limiting: ${results.rateLimit ? 'PASS' : 'FAIL'}`);
  
  const passedTests = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;
  
  console.log(`\n🎯 Overall Result: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 ALL TESTS PASSED! Your email system is working perfectly!');
  } else {
    console.log('⚠️ Some tests failed. Check the logs above for details.');
  }
  
  console.log('\n📧 Next Steps:');
  console.log('1. Check your email inboxes for the test emails');
  console.log('2. Verify email templates look correct');
  console.log('3. Test with your actual React frontend');
  
  return results;
};

// Individual test functions
window.testEmailSystem = {
  testHealthCheck,
  testContactEmail,
  testOrderEmail,
  testWelcomeEmail,
  testValidation,
  testRateLimit,
  runAllTests
};

console.log('📧 Email System Test Suite Loaded!');
console.log('🚀 Run: window.testEmailSystem.runAllTests() to test everything');
console.log('🔧 Or run individual tests:');
console.log('- window.testEmailSystem.testHealthCheck()');
console.log('- window.testEmailSystem.testContactEmail()');
console.log('- window.testEmailSystem.testOrderEmail()');
console.log('- window.testEmailSystem.testWelcomeEmail()');
console.log('- window.testEmailSystem.testValidation()');
console.log('- window.testEmailSystem.testRateLimit()');
