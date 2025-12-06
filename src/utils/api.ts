import type { AuthResponse, User, CheckoutResponse } from '../types';

const API_BASE = '/api';

/**
 * Helper to get auth headers
 */
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/**
 * Register a new user
 */
export async function register(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }
  
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
}

/**
 * Login user
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
}

/**
 * Get current user info
 */
export async function getCurrentUser(): Promise<User | null> {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const response = await fetch(`${API_BASE}/user/me`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        return null;
      }
      throw new Error('Failed to fetch user');
    }
    
    return await response.json();
  } catch {
    return null;
  }
}

/**
 * Logout user
 */
export function logout(): void {
  localStorage.removeItem('token');
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}

/**
 * Create Stripe checkout session
 */
export async function createCheckoutSession(): Promise<string> {
  const response = await fetch(`${API_BASE}/payment/checkout`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create checkout session');
  }
  
  const data: CheckoutResponse = await response.json();
  return data.url;
}
