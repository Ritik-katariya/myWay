// Comprehensive error handling utilities

export interface ApiError {
  success: false;
  error: string;
  details?: any;
  statusCode?: number;
}

export interface ApiSuccess<T = any> {
  success: true;
  data: T;
  message?: string;
  count?: number;
}

export type ApiResponse<T = any> = ApiSuccess<T> | ApiError;

// Error types
export enum ErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  CONFLICT_ERROR = 'CONFLICT_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export class CustomError extends Error {
  public type: ErrorType;
  public statusCode: number;
  public details?: any;

  constructor(
    message: string,
    type: ErrorType = ErrorType.UNKNOWN_ERROR,
    statusCode: number = 500,
    details?: any
  ) {
    super(message);
    this.name = 'CustomError';
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;
  }
}

// Error handler for API routes
export function handleApiError(error: any): ApiError {
  console.error('API Error:', error);

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const validationErrors = Object.values(error.errors).map((err: any) => err.message);
    return {
      success: false,
      error: 'Validation failed',
      details: validationErrors,
      statusCode: 400
    };
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    return {
      success: false,
      error: `${field} already exists`,
      statusCode: 409
    };
  }

  // Custom error
  if (error instanceof CustomError) {
    return {
      success: false,
      error: error.message,
      details: error.details,
      statusCode: error.statusCode
    };
  }

  // Default error
  return {
    success: false,
    error: 'Internal server error',
    statusCode: 500
  };
}

// Success response helper
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  count?: number
): ApiSuccess<T> {
  return {
    success: true,
    data,
    message,
    count
  };
}

// Client-side error handler
export function handleClientError(error: any): string {
  console.error('Client Error:', error);

  if (error instanceof TypeError && error.message.includes('fetch')) {
    return 'Network error - please check your connection';
  }

  if (error.message) {
    return error.message;
  }

  return 'An unexpected error occurred';
}

// Validation helpers
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateRequired(value: any, fieldName: string): string | null {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
}

export function validateLength(value: string, min: number, max: number, fieldName: string): string | null {
  if (value.length < min) {
    return `${fieldName} must be at least ${min} characters long`;
  }
  if (value.length > max) {
    return `${fieldName} must be no more than ${max} characters long`;
  }
  return null;
}

// Rate limiting helper (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000 // 1 minute
): boolean {
  const now = Date.now();
  const key = identifier;
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// Database connection error handler
export function handleDatabaseError(error: any): ApiError {
  console.error('Database Error:', error);

  if (error.name === 'MongoNetworkError') {
    return {
      success: false,
      error: 'Database connection failed',
      statusCode: 503
    };
  }

  if (error.name === 'MongoTimeoutError') {
    return {
      success: false,
      error: 'Database operation timed out',
      statusCode: 504
    };
  }

  return {
    success: false,
    error: 'Database error occurred',
    statusCode: 500
  };
}

// Async error wrapper for API routes
export function asyncHandler<T extends any[], R>(
  fn: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      throw error;
    }
  };
}

// Error logging utility
export function logError(error: any, context?: string) {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    context: context || 'Unknown',
    message: error.message || 'Unknown error',
    stack: error.stack,
    type: error.type || 'Unknown',
    statusCode: error.statusCode || 500
  };

  console.error('Error Log:', JSON.stringify(errorInfo, null, 2));
  
  // In production, you might want to send this to an error tracking service
  // like Sentry, LogRocket, or similar
}
