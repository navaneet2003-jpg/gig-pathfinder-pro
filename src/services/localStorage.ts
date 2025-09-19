// LocalStorage service for managing application data
export interface StorageData {
  users: any[];
  jobs: any[];
  applications: any[];
  documents: any[];
  profileUpdateRequests: any[];
}

class LocalStorageService {
  private readonly STORAGE_KEY = 'jobPortalData';

  private getDefaultData(): StorageData {
    return {
      users: [
        // Default admin users
        {
          id: 'admin-1',
          name: 'Chaitanya',
          email: 'chaitanya@gmail.com',
          phone: '',
          password: 'syntaacs',
          role: 'admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'admin-2',
          name: 'Anil Kumar',
          email: 'anilkumar@gmail.com',
          phone: '',
          password: 'syntaacs',
          role: 'admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ],
      jobs: [],
      applications: [],
      documents: [],
      profileUpdateRequests: []
    };
  }

  private getData(): StorageData {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : this.getDefaultData();
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return this.getDefaultData();
    }
  }

  private saveData(data: StorageData): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // User management
  createUser(userData: any): boolean {
    try {
      const data = this.getData();
      const newUser = {
        ...userData,
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      data.users.push(newUser);
      this.saveData(data);
      return true;
    } catch (error) {
      console.error('Error creating user:', error);
      return false;
    }
  }

  getUser(email: string, password: string, role?: string): any | null {
    try {
      const data = this.getData();
      return data.users.find(user => 
        user.email === email && 
        user.password === password &&
        (!role || user.role === role)
      );
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  getUserById(id: string): any | null {
    try {
      const data = this.getData();
      return data.users.find(user => user.id === id);
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }

  updateUser(userId: string, updates: any): boolean {
    try {
      const data = this.getData();
      const userIndex = data.users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        data.users[userIndex] = {
          ...data.users[userIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        this.saveData(data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  }

  deleteUser(userId: string): boolean {
    try {
      const data = this.getData();
      data.users = data.users.filter(user => user.id !== userId);
      this.saveData(data);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  getWorkersByKioskId(kioskId: string): any[] {
    try {
      const data = this.getData();
      return data.users.filter(user => 
        user.role === 'worker' && user.createdBy === kioskId
      );
    } catch (error) {
      console.error('Error getting workers by kiosk:', error);
      return [];
    }
  }

  // Job management
  createJob(jobData: any): boolean {
    try {
      const data = this.getData();
      const newJob = {
        ...jobData,
        id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        applicants: [],
        status: 'open'
      };
      data.jobs.push(newJob);
      this.saveData(data);
      return true;
    } catch (error) {
      console.error('Error creating job:', error);
      return false;
    }
  }

  getJobsByEmployerId(employerId: string): any[] {
    try {
      const data = this.getData();
      return data.jobs.filter(job => job.employerId === employerId);
    } catch (error) {
      console.error('Error getting jobs by employer:', error);
      return [];
    }
  }

  getJob(jobId: string): any | null {
    try {
      const data = this.getData();
      return data.jobs.find(job => job.id === jobId);
    } catch (error) {
      console.error('Error getting job:', error);
      return null;
    }
  }

  updateJob(jobId: string, updates: any): boolean {
    try {
      const data = this.getData();
      const jobIndex = data.jobs.findIndex(job => job.id === jobId);
      if (jobIndex !== -1) {
        data.jobs[jobIndex] = { ...data.jobs[jobIndex], ...updates };
        this.saveData(data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating job:', error);
      return false;
    }
  }

  deleteJob(jobId: string): boolean {
    try {
      const data = this.getData();
      data.jobs = data.jobs.filter(job => job.id !== jobId);
      this.saveData(data);
      return true;
    } catch (error) {
      console.error('Error deleting job:', error);
      return false;
    }
  }

  getAllJobs(): any[] {
    try {
      const data = this.getData();
      return data.jobs.filter(job => job.status === 'open');
    } catch (error) {
      console.error('Error getting all jobs:', error);
      return [];
    }
  }

  // Application management
  applyForJob(workerId: string, jobId: string): boolean {
    try {
      const data = this.getData();
      const application = {
        id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        jobId,
        workerId,
        status: 'applied',
        appliedAt: new Date().toISOString()
      };
      data.applications.push(application);
      
      // Add to job applicants
      const job = data.jobs.find(j => j.id === jobId);
      if (job) {
        job.applicants = job.applicants || [];
        job.applicants.push(workerId);
      }
      
      this.saveData(data);
      return true;
    } catch (error) {
      console.error('Error applying for job:', error);
      return false;
    }
  }

  getApplicationsByWorkerId(workerId: string): any[] {
    try {
      const data = this.getData();
      return data.applications.filter(app => app.workerId === workerId);
    } catch (error) {
      console.error('Error getting applications by worker:', error);
      return [];
    }
  }

  withdrawApplication(applicationId: string): boolean {
    try {
      const data = this.getData();
      const appIndex = data.applications.findIndex(app => app.id === applicationId);
      if (appIndex !== -1) {
        const application = data.applications[appIndex];
        // Remove from job applicants
        const job = data.jobs.find(j => j.id === application.jobId);
        if (job) {
          job.applicants = job.applicants.filter((id: string) => id !== application.workerId);
        }
        // Remove application
        data.applications.splice(appIndex, 1);
        this.saveData(data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error withdrawing application:', error);
      return false;
    }
  }

  // Document management
  addDocument(userId: string, document: any): boolean {
    try {
      const data = this.getData();
      const newDoc = {
        ...document,
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        verified: false,
        uploadedAt: new Date().toISOString()
      };
      data.documents.push(newDoc);
      this.saveData(data);
      return true;
    } catch (error) {
      console.error('Error adding document:', error);
      return false;
    }
  }

  getDocumentsByUserId(userId: string): any[] {
    try {
      const data = this.getData();
      return data.documents.filter(doc => doc.userId === userId);
    } catch (error) {
      console.error('Error getting documents by user:', error);
      return [];
    }
  }

  getAllDocuments(): any[] {
    try {
      const data = this.getData();
      return data.documents;
    } catch (error) {
      console.error('Error getting all documents:', error);
      return [];
    }
  }

  updateDocumentStatus(docId: string, verified: boolean): boolean {
    try {
      const data = this.getData();
      const docIndex = data.documents.findIndex(doc => doc.id === docId);
      if (docIndex !== -1) {
        data.documents[docIndex].verified = verified;
        this.saveData(data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating document status:', error);
      return false;
    }
  }

  // Profile update requests
  addProfileUpdateRequest(userId: string, updates: any): boolean {
    try {
      const data = this.getData();
      const request = {
        id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        updates,
        status: 'pending',
        requestedAt: new Date().toISOString()
      };
      data.profileUpdateRequests.push(request);
      this.saveData(data);
      return true;
    } catch (error) {
      console.error('Error adding profile update request:', error);
      return false;
    }
  }

  getProfileUpdateRequests(): any[] {
    try {
      const data = this.getData();
      return data.profileUpdateRequests.filter(req => req.status === 'pending');
    } catch (error) {
      console.error('Error getting profile update requests:', error);
      return [];
    }
  }

  updateProfileRequest(requestId: string, status: 'approved' | 'rejected'): boolean {
    try {
      const data = this.getData();
      const reqIndex = data.profileUpdateRequests.findIndex(req => req.id === requestId);
      if (reqIndex !== -1) {
        const request = data.profileUpdateRequests[reqIndex];
        request.status = status;
        
        if (status === 'approved') {
          // Apply the updates to the user
          this.updateUser(request.userId, request.updates);
        }
        
        this.saveData(data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating profile request:', error);
      return false;
    }
  }
}

export const storageService = new LocalStorageService();