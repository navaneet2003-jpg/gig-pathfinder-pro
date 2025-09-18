import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Briefcase, Users, Clock, CheckCircle, QrCode, Eye } from 'lucide-react';

export default function EmployerDashboard() {
  const navigate = useNavigate();
  
  const stats = [
    { label: 'Active Jobs', value: '8', icon: Briefcase, color: 'primary' },
    { label: 'Applications', value: '34', icon: Users, color: 'secondary' },
    { label: 'Hired Workers', value: '12', icon: CheckCircle, color: 'success' },
    { label: 'Completed Jobs', value: '45', icon: Clock, color: 'warning' },
  ];

  const activeJobs = [
    {
      id: 1,
      title: 'Plumbing Repair Work',
      category: 'Maintenance',
      workersRequired: 2,
      budget: '₹500-800',
      applications: 8,
      status: 'Active',
      posted: '2024-01-15'
    },
    {
      id: 2,
      title: 'Office Renovation',
      category: 'Construction',
      workersRequired: 5,
      budget: '₹800-1200',
      applications: 15,
      status: 'Active',
      posted: '2024-01-14'
    },
    {
      id: 3,
      title: 'Garden Maintenance',
      category: 'Agriculture',
      workersRequired: 1,
      budget: '₹400-600',
      applications: 3,
      status: 'Draft',
      posted: '2024-01-13'
    },
  ];

  const jobHistory = [
    {
      id: 1,
      title: 'Kitchen Renovation',
      workers: 3,
      budget: '₹15000',
      status: 'Completed',
      completedDate: '2024-01-10'
    },
    {
      id: 2,
      title: 'Electrical Wiring',
      workers: 2,
      budget: '₹8000',
      status: 'Completed',
      completedDate: '2024-01-05'
    },
    {
      id: 3,
      title: 'Painting Work',
      workers: 4,
      budget: '₹12000',
      status: 'Partially Closed',
      completedDate: '2024-01-01'
    },
  ];

  const applications = [
    {
      id: 1,
      jobTitle: 'Plumbing Repair Work',
      workerName: 'Rajesh Kumar',
      skills: ['Plumbing', 'Repair'],
      gigLevel: 3,
      expectedWage: '₹600/day',
      appliedDate: '2024-01-15'
    },
    {
      id: 2,
      jobTitle: 'Office Renovation',
      workerName: 'Amit Singh',
      skills: ['Construction', 'Painting'],
      gigLevel: 4,
      expectedWage: '₹800/day',
      appliedDate: '2024-01-14'
    },
    {
      id: 3,
      jobTitle: 'Office Renovation',
      workerName: 'Priya Sharma',
      skills: ['Electrical', 'Installation'],
      gigLevel: 3,
      expectedWage: '₹700/day',
      appliedDate: '2024-01-14'
    },
  ];

  return (
    <DashboardLayout title="Employer Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="jobs">Job Listings</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="history">Job History</TabsTrigger>
          <TabsTrigger value="verify">Verify Workers</TabsTrigger>
          <TabsTrigger value="news">Industry News</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Job Listings</CardTitle>
                  <CardDescription>Manage your posted jobs</CardDescription>
                </div>
                <Button variant="hero">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <Card key={job.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{job.title}</h4>
                        <p className="text-muted-foreground">{job.category}</p>
                      </div>
                      <Badge variant={job.status === 'Active' ? 'success' : 'warning'}>
                        {job.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Workers Needed</p>
                        <p className="font-medium">{job.workersRequired}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="font-medium">{job.budget}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Applications</p>
                        <p className="font-medium">{job.applications}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Posted</p>
                        <p className="font-medium">{job.posted}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      {job.applications > 0 && (
                        <Button size="sm">
                          View Applications ({job.applications})
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Worker Applications</CardTitle>
              <CardDescription>Review applications from workers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((app) => (
                  <Card key={app.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold">{app.workerName}</h4>
                        <p className="text-sm text-muted-foreground">Applied for: {app.jobTitle}</p>
                        <p className="text-xs text-muted-foreground">Applied: {app.appliedDate}</p>
                      </div>
                      <Badge variant="secondary">Level {app.gigLevel}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Skills</p>
                        <div className="flex gap-1 mt-1">
                          {app.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Expected Wage</p>
                        <p className="font-medium">{app.expectedWage}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="success" size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Hire
                      </Button>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Job History</CardTitle>
              <CardDescription>Previous jobs and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobHistory.map((job) => (
                  <div key={job.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {job.workers} workers • Completed: {job.completedDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={
                          job.status === 'Completed' ? 'success' : 
                          job.status === 'Partially Closed' ? 'warning' : 'destructive'
                        }
                      >
                        {job.status}
                      </Badge>
                      <p className="text-sm font-medium mt-1">{job.budget}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verify" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Verify Worker by QR Code
              </CardTitle>
              <CardDescription>
                Scan or upload QR code to verify worker profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-8 border-2 border-dashed rounded-lg">
                <QrCode className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h4 className="font-medium mb-2">Scan QR Code</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Use your camera to scan a worker's QR code or upload an image
                </p>
                <div className="space-y-2">
                  <Button variant="hero">
                    Start Camera Scan
                  </Button>
                  <div className="text-sm text-muted-foreground">or</div>
                  <Button variant="outline">
                    Upload QR Image
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Verification Benefits:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Instantly access complete worker profiles</li>
                  <li>• View verified documents and background checks</li>
                  <li>• See skills, experience, and gig level</li>
                  <li>• Check previous work history and ratings</li>
                  <li>• Ensure worker authenticity and credentials</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Industry News & Trends</CardTitle>
              <CardDescription>Stay updated with market trends and opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <article className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold mb-2">Rising Demand for Skilled Construction Workers</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Government infrastructure projects driving high demand for verified workers...
                  </p>
                  <Badge variant="secondary">1 hour ago</Badge>
                </article>
                
                <article className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold mb-2">New Safety Regulations for Construction Sites</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Updated safety protocols and certification requirements for workers...
                  </p>
                  <Badge variant="secondary">3 hours ago</Badge>
                </article>
                
                <article className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold mb-2">Digital Verification Reduces Hiring Time by 60%</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Employers report significant time savings with QR code-based worker verification...
                  </p>
                  <Badge variant="secondary">1 day ago</Badge>
                </article>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}