import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Users, FileCheck, QrCode, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { storageService } from '@/services/localStorage';
import UserProfile from '@/components/common/UserProfile';

export default function KioskDashboard() {
  const navigate = useNavigate();
  
  const stats = [
    { label: 'Workers Registered', value: '247', icon: Users, color: 'primary' },
    { label: 'Documents Verified', value: '189', icon: FileCheck, color: 'success' },
    { label: 'QR Codes Generated', value: '156', icon: QrCode, color: 'secondary' },
    { label: 'This Month', value: '23', icon: BarChart3, color: 'warning' },
  ];

  const recentRegistrations = [
    { id: 1, name: 'Rajesh Kumar', status: 'pending_documents', date: '2024-01-15' },
    { id: 2, name: 'Priya Sharma', status: 'background_check', date: '2024-01-14' },
    { id: 3, name: 'Amit Singh', status: 'completed', date: '2024-01-13' },
    { id: 4, name: 'Sunita Devi', status: 'document_upload', date: '2024-01-12' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending_documents': return 'warning';
      case 'background_check': return 'secondary';
      case 'document_upload': return 'destructive';
      default: return 'muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'pending_documents': return 'Pending Verification';
      case 'background_check': return 'Background Check';
      case 'document_upload': return 'Document Upload';
      default: return status;
    }
  };

  return (
    <DashboardLayout title="Kiosk Centre Dashboard">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Manage worker registrations and verifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full"
              onClick={() => navigate('/kiosk/register-worker')}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Register New Worker
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={() => navigate('/kiosk/manage-workers')}
            >
              <Users className="h-4 w-4 mr-2" />
              Manage Workers
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={() => navigate('/worker/qr-generation')}
            >
              <QrCode className="h-4 w-4 mr-2" />
              Generate QR Codes
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
            <CardDescription>
              Latest worker registration activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRegistrations.map((registration) => (
                <div
                  key={registration.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{registration.name}</p>
                    <p className="text-sm text-muted-foreground">{registration.date}</p>
                  </div>
                  <Badge variant={getStatusColor(registration.status) as any}>
                    {getStatusText(registration.status)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}