export const validatePhoneNumber = (phoneNumber: string): boolean => {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(phoneNumber);
  };
  
  