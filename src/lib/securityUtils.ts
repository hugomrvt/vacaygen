/**
 * Security utilities for input validation and sanitization
 */
// XSS Protection - Escape HTML characters
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Input validation helpers
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export function isValidName(name: string): boolean {
  // Allow letters, spaces, hyphens, apostrophes (common in names)
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']{1,100}$/;
  return nameRegex.test(name.trim());
}

export function isValidBackupContacts(contacts: string): boolean {
  // Allow letters, spaces, hyphens, apostrophes, commas (for multiple contacts)
  const contactsRegex = /^[a-zA-ZÀ-ÿ\s\-',]{1,300}$/;
  return contactsRegex.test(contacts.trim());
}

export function isValidDestination(destination: string): boolean {
  // Allow letters, spaces, hyphens, commas, periods (common in place names)
  const destinationRegex = /^[a-zA-ZÀ-ÿ\s\-,.]{1,150}$/;
  return destinationRegex.test(destination.trim());
}

export function isValidActivity(activity: string): boolean {
  // Allow letters, spaces, basic punctuation
  const activityRegex = /^[a-zA-ZÀ-ÿ\s\-,.!]{1,200}$/;
  return activityRegex.test(activity.trim());
}

// Date validation
export function isValidDateRange(startDate: string, endDate: string): boolean {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // End date should be after start date
  if (end <= start) return false;
  
  // Reasonable vacation length (max 365 days)
  const maxDuration = 365 * 24 * 60 * 60 * 1000; // 365 days in milliseconds
  if (end.getTime() - start.getTime() > maxDuration) return false;
  
  return true;
}

// Content validation for generated messages
export function validateMessageContent(content: string): boolean {
  if (!content || content.trim().length === 0) return false;
  
  // Check for reasonable message length
  if (content.length > 5000) return false;
  
  // Basic check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /data:text\/html/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i
  ];
  
  return !suspiciousPatterns.some(pattern => pattern.test(content));
}

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .slice(0, 500); // Limit length to prevent excessive input
}

export function sanitizeName(name: string): string {
  return sanitizeInput(name).slice(0, 100);
}

export function sanitizeDestination(destination: string): string {
  return sanitizeInput(destination).slice(0, 150);
}

export function sanitizeActivity(activity: string): string {
  return sanitizeInput(activity).slice(0, 200);
}

// Rate limiting helper (client-side basic implementation)
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  constructor(private maxRequests: number = 10, private windowMs: number = 60000) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(timestamp => now - timestamp < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return true;
  }
  
  getRemainingRequests(identifier: string): number {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    const validRequests = requests.filter(timestamp => now - timestamp < this.windowMs);
    
    return Math.max(0, this.maxRequests - validRequests.length);
  }
}

// Create a global rate limiter instance
export const messageGenerationLimiter = new RateLimiter(20, 300000); // 20 requests per 5 minutes
