// API service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

interface LoginPayload {
  email?: string;
  phone?: string;
  password: string;
}

interface SignupPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface RoleSelectionPayload {
  userId: string;
  role: string;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data?: T;
  token?: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any,
    isFormData: boolean = false
  ): Promise<ApiResponse<T>> {
    try {
      const token = localStorage.getItem('authToken');
      const headers: Record<string, string> = {
        'Accept': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const config: RequestInit = {
        method,
        headers,
      };

      if (body && !isFormData) {
        headers['Content-Type'] = 'application/json';
        config.body = JSON.stringify(body);
      } else if (body && isFormData) {
        // For FormData, don't set Content-Type (browser will set it)
        config.body = body;
        delete headers['Content-Type'];
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as ApiResponse<T>;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Auth endpoints
  async login(payload: LoginPayload) {
    return this.request<{ userId: string; user: any }>(
      '/api/auth/login',
      'POST',
      payload
    );
  }

  async signup(payload: SignupPayload) {
    return this.request<{ userId: string; user: any }>(
      '/api/auth/signup',
      'POST',
      payload
    );
  }

  async logout() {
    return this.request(
      '/api/auth/logout',
      'POST'
    );
  }

  // Role endpoints
  async selectRole(payload: RoleSelectionPayload) {
    return this.request<{ role: string }>(
      '/api/user/role',
      'POST',
      payload
    );
  }

  async getRole(userId: string) {
    return this.request<{ role: string }>(
      `/api/user/${userId}/role`,
      'GET'
    );
  }

  // Resume endpoints
  async uploadResume(userId: string, file: File) {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', file);

    return this.request<{ fileUrl: string }>(
      '/api/resume/upload',
      'POST',
      formData,
      true
    );
  }

  async getResume(userId: string) {
    return this.request<{ fileUrl: string }>(
      `/api/resume/${userId}`,
      'GET'
    );
  }

  // Readiness score endpoints
  async getReadinessScore(userId: string, role: string) {
    return this.request<{ score: number; breakdown: any }>(
      `/api/readiness-score/${userId}/${role}`,
      'GET'
    );
  }

  // Skills data endpoints
  async getSkillsData(userId: string, role: string) {
    return this.request<{ skills: any[]; score: number }>(
      `/api/skills/${userId}/${role}`,
      'GET'
    );
  }

  // Competency gap endpoints
  async getCompetencyGap(userId: string, role: string) {
    return this.request<{ gaps: any[] }>(
      `/api/competency-gap/${userId}/${role}`,
      'GET'
    );
  }

  // Roadmap endpoints
  async getRoadmap(userId: string, role: string) {
    return this.request<{ roadmap: any[] }>(
      `/api/roadmap/${userId}/${role}`,
      'GET'
    );
  }
}

export const apiService = new ApiService(API_BASE_URL);
