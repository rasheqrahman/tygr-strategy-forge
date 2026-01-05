
/**
 * Simple email validation
 */
export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Password must be at least 8 characters
 */
export function validatePassword(password: string) {
  return password.length >= 8;
}
