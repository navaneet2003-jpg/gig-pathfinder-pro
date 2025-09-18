import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Clock, IndianRupee, Star, Briefcase, User, FileText, QrCode } from 'lucide-react';

export default function WorkerDashboard() {
  const navigate = useNavigate();
  const [wageRange, setWageRange] = useState([400, 600]); // For Gig Level 3
  
  const gigLevel = 3;
  const gigLevelRanges = {
    1: { min: 200, max: 300 },
    2: { min: 300, max: 400 },
    3: { min: 400, max: 600 },
    4: { min: 500, max: 700 },
    5: { min: 600, max: 900 },
  };

  const stats = [
    { label: 'Gig Level', value: gigLevel, icon: Star, color: 'primary' },
    { label: 'Jobs Applied', value: '12', icon: Briefcase, color: 'secondary' },
    { label: 'Profile Views', value: '45', icon: User, color: 'success' },
    { label: 'Documents', value: '✓', icon: FileText, color: 'success' },
  ];

  const availableJobs = [
    {
      id: 1,
      title: 'Plumbing Repair Work',
      company: 'HomeServices Ltd',
      location: 'Bandra, Mumbai',
      budget: '₹500-800',
      duration: '1-2 days',
      skills: ['Plumbing', 'Repair'],
      posted: '2 hours ago'
    },
    {
      id: 2,
      title: 'Electrical Installation',
      company: 'TechMaintain Co',
      location: 'Andheri, Mumbai',
      budget: '₹600-900',
      duration: '3-4 days',
      skills: ['Electrical Work', 'Installation'],
      posted: '5 hours ago'
    },
    {
      id: 3,
      title: 'Furniture Assembly',
      company: 'Individual',
      location: 'Powai, Mumbai',
      budget: '₹400-600',
      duration: '1 day',
      skills: ['Carpentry', 'Assembly'],
      posted: '1 day ago'
    },
  ];

  const appliedJobs = [
    {
      id: 1,
      title: 'Office Renovation',
      company: 'Corporate Solutions',
      status: 'Under Review',
      appliedDate: '2024-01-10',
      budget: '₹800-1200'
    },
    {
      id: 2,
      title: 'Home Repair Service',
      company: 'QuickFix Services',
      status: 'Shortlisted',
      appliedDate: '2024-01-08',
      budget: '₹500-700'
    },
  ];

  const assignedJobs = [
    {
      id: 1,
      title: 'Bathroom Renovation',
      client: 'Rajesh Kumar',
      status: 'In Progress',
      startDate: '2024-01-15',
      budget: '₹1500',
      dueDate: '2024-01-20'
    },
  ];

  const handleApplyJob = (jobId: number) => {
    // In real app, this would make API call
    alert(`Applied for job ${jobId}`);
  };

  return (
    <DashboardLayout title="Worker Dashboard">
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
          <TabsTrigger value="jobs">Find Jobs</TabsTrigger>
          <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
          <TabsTrigger value="assigned">Assigned Jobs</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="news">Industry News</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    Available Jobs Near You
                  </CardTitle>
                  <CardDescription>
                    Jobs matching your skills and location
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Advanced Search
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableJobs.map((job) => (
                  <Card key={job.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{job.title}</h4>
                        <p className="text-muted-foreground">{job.company}</p>
                      </div>
                      <Badge variant="secondary">{job.posted}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{job.budget}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{job.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button onClick={() => handleApplyJob(job.id)}>
                        Apply Now
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applied" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Applied Jobs History</CardTitle>
              <CardDescription>Track your job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appliedJobs.map((job) => (
                  <div key={job.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                      <p className="text-xs text-muted-foreground">Applied: {job.appliedDate}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={job.status === 'Shortlisted' ? 'success' : 'warning'}>
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

        <TabsContent value="assigned" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Assigned Jobs</CardTitle>
              <CardDescription>Jobs you've been hired for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignedJobs.map((job) => (
                  <Card key={job.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold">{job.title}</h4>
                        <p className="text-muted-foreground">Client: {job.client}</p>
                      </div>
                      <Badge variant="warning">{job.status}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date:</p>
                        <p className="font-medium">{job.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Due Date:</p>
                        <p className="font-medium">{job.dueDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">{job.budget}</span>
                      <div className="space-x-2">
                        <Button variant="success" size="sm">Accept</Button>
                        <Button variant="destructive" size="sm">Decline</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Gig Level & Wage Settings</CardTitle>
                <CardDescription>
                  Current Level: {gigLevel} (₹{gigLevelRanges[gigLevel as keyof typeof gigLevelRanges].min}-{gigLevelRanges[gigLevel as keyof typeof gigLevelRanges].max}/day)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Wage Range (per day)</span>
                    <span className="font-medium">₹{wageRange[0]} - ₹{wageRange[1]}</span>
                  </div>
                  <Slider
                    value={wageRange}
                    onValueChange={setWageRange}
                    min={gigLevelRanges[gigLevel as keyof typeof gigLevelRanges].min}
                    max={gigLevelRanges[gigLevel as keyof typeof gigLevelRanges].max}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>₹{gigLevelRanges[gigLevel as keyof typeof gigLevelRanges].min}</span>
                    <span>₹{gigLevelRanges[gigLevel as keyof typeof gigLevelRanges].max}</span>
                  </div>
                </div>
                
                <Button variant="hero" className="w-full">
                  Update Wage Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  QR Code Profile
                </CardTitle>
                <CardDescription>
                  Share your verified profile with employers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-32 h-32 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <Button variant="outline" onClick={() => navigate('/worker/qr-generation')}>
                    View QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Industry News & Trends</CardTitle>
              <CardDescription>Stay updated with the latest in your field</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <article className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold mb-2">Construction Industry Boom in Mumbai</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    New infrastructure projects are creating thousands of jobs for skilled workers...
                  </p>
                  <Badge variant="secondary">2 hours ago</Badge>
                </article>
                
                <article className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold mb-2">In-Demand Skills: Electrical & Plumbing</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    High demand for electrical and plumbing services in residential sector...
                  </p>
                  <Badge variant="secondary">5 hours ago</Badge>
                </article>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}