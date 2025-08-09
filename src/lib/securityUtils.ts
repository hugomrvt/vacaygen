/**
 * Security utilities – hardened version
 */

import DOMPurify from 'dompurify';

/* ------------------------------------------------------------------
   XSS PROTECTION
   ------------------------------------------------------------------ */

/**
 * Escapes the five critical HTML entities.
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&#38;')
    .replace(/</g, '&#60;')
    .replace(/>/g, '&#62;')
    .replace(/"/g, '&#34;')
    .replace(/'/g, '&#39;');
}

/**
 * Sanitise arbitrary HTML returned by the generator.
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, { SAFE_FOR_JQUERY: true });
}

/* ------------------------------------------------------------------
   VALIDATION HELPERS
   ------------------------------------------------------------------ */

const unicodeLetters = '\\p{L}\\p{M}'; // full letter set

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]{1,64}@[^\s@]{1,253}$/u;
  return re.test(email) && email.length <= 254;
}

export function isValidName(name: string): boolean {
  const re = new RegExp(`^[${unicodeLetters} \\-']{1,100}$`, 'u');
  return re.test(name.trim());
}

export function isValidBackupContacts(c: string): boolean {
  const re = new RegExp(`^[${unicodeLetters} \\-',]{1,300}$`, 'u');
  return re.test(c.trim());
}

export function isValidDestination(dest: string): boolean {
  const re = new RegExp(`^[${unicodeLetters} \\-',\\.]{1,150}$`, 'u');
  return re.test(dest.trim());
}

export function isValidActivity(a: string): boolean {
  const re = new RegExp(`^[${unicodeLetters} \\-',\\.!]{1,200}$`, 'u');
  return re.test(a.trim());
}

/* ------------------------------------------------------------------
   GENERIC SANITIZATION
   ------------------------------------------------------------------ */

export function sanitizeInput(input: string, max = 500): string {
  return input.trim().replace(/\s+/g, ' ').slice(0, max);
}
export const sanitizeName = (n: string) => sanitizeInput(n, 100);
export const sanitizeDestination = (d: string) => sanitizeInput(d, 150);
export const sanitizeActivity = (a: string) => sanitizeInput(a, 200);

/* ------------------------------------------------------------------
   DATE HELPERS (UNCHANGED)
   ------------------------------------------------------------------ */

export function isValidDateString(dateString: string): boolean {
  if (!dateString) return false;
  const date = new Date(dateString);
  return !Number.isNaN(date.getTime()) && dateString === date.toISOString().split('T')[0];
}

export function isValidDateRange(start: string, end: string): boolean {
  if (!isValidDateString(start) || !isValidDateString(end)) return false;
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  const max = 365 * 24 * 60 * 60 * 1000; // 1 year
  return e > s && e - s <= max;
}

export function validateMessageContent(content: string): boolean {
  if (!content || content.trim().length === 0) return false;
  if (content.length > 5000) return false;
  const block = /(script|on\w+=|javascript:)/i;
  return !block.test(content);
}
