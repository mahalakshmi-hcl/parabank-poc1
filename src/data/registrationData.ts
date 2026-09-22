import { randomUUID } from 'crypto';
 
export function createRegistrationData() {
  return {
    firstName: 'Test',
    lastName: 'User',
    address: '123 Main Street',
    city: 'Hyderabad',
    state: 'Telangana',
    zipCode: '500001',
    phone: '9876543210',
    ssn: '123456789',
    username: `pw${randomUUID().replace(/-/g, '').slice(0, 12)}`,
    password: 'Test@12345',
    confirmPassword: 'Test@12345'
  };
}