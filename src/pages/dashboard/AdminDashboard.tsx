import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileCheck, Shield, Users, Building, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Pending Verifications', value: '47', icon: Clock, color: 'warning' },
    { label: 'Documents Verified', value: '1,234', icon: FileCheck, color: 'success' },
    { label: 'Worker Profiles', value: '892', icon: Users, color: 'primary' },
    { label: 'Employer Profiles', value: '156', icon: Building, color: 'secondary' },
  ];

  const pendingDocuments = [
    { id: 1, name: 'Rajesh Kumar', type: 'Aadhaar Card', submitted: '2024-01-15', category: 'worker' },
    { id: 2, name: 'TechCorp Pvt Ltd', type: 'PAN Card', submitted: '2024-01-15', category: 'employer' },
    { id: 3, name: 'Priya Sharma', type: 'Voter ID', submitted: '2024-01-14', category: 'worker' },
    { id: 4, name: 'StartupXYZ', type: 'GST Certificate', submitted: '2024-01-14', category: 'employer' },
  ];

  const pendingBackgroundChecks = [
    { id: 1, name: 'Amit Singh', location: 'Mumbai Police Station', status: 'pending', submitted: '2024-01-13' },
    { id: 2, name: 'Sunita Devi', location: 'Delhi Police Station', status: 'in_progress', submitted: '2024-01-12' },
    { id: 3, name: 'Rohit Gupta', location: 'Bangalore Police Station', status: 'pending', submitted: '2024-01-11' },
  ];

  return (
    <DashboardLayout title="Verification Admin Dashboard">
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

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents">Document Verification</TabsTrigger>
          <TabsTrigger value="background">Background Checks</TabsTrigger>
          <TabsTrigger value="profiles">Profile Management</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                Pending Document Verifications
              </CardTitle>
              <CardDescription>
                Review and verify submitted documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{doc.name}</p>
                        <Badge variant={doc.category === 'worker' ? 'secondary' : 'warning'}>
                          {doc.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{doc.type}</p>
                      <p className="text-xs text-muted-foreground">Submitted: {doc.submitted}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="success" size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm">
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="background" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Background Verification Status
              </CardTitle>
              <CardDescription>
                Monitor police verification progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingBackgroundChecks.map((check) => (
                  <div
                    key={check.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{check.name}</p>
                      <p className="text-sm text-muted-foreground">{check.location}</p>
                      <p className="text-xs text-muted-foreground">Submitted: {check.submitted}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={check.status === 'pending' ? 'warning' : 'secondary'}>
                        {check.status === 'pending' ? 'Pending' : 'In Progress'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Update Status
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profiles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Worker Profile Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">5 pending profile update requests</p>
                  <Button variant="outline">Review Requests</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Employer Profile Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">3 pending employer registrations</p>
                  <Button variant="outline">Review Requests</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}