import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, Shield, Briefcase } from 'lucide-react';

const userRoles = [
  {
    id: 'kiosk',
    title: 'Kiosk Centre',
    description: 'Register and manage worker profiles on behalf of job seekers',
    icon: Building2,
    color: 'primary',
  },
  {
    id: 'admin',
    title: 'Verification Admin',
    description: 'Verify documents, approve registrations and manage applications',
    icon: Shield,
    color: 'success',
  },
  {
    id: 'worker',
    title: 'Worker/Employee',
    description: 'Create profile, upload documents and search for job opportunities',
    icon: Users,
    color: 'secondary',
  },
  {
    id: 'employer',
    title: 'Employer',
    description: 'Post job listings, verify workers and hire qualified candidates',
    icon: Briefcase,
    color: 'warning',
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    navigate(`/${roleId}/auth`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-secondary-light">
      <header className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-primary">JobPortal</h1>
          <p className="text-muted-foreground">Professional employment platform</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 gradient-hero bg-clip-text text-transparent">
            Welcome to JobPortal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform connecting job seekers with employers through verified profiles and seamless verification processes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {userRoles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-elegant hover:-translate-y-2 ${
                  selectedRole === role.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 rounded-full bg-primary-light">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-sm">
                    {role.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            variant="hero"
            size="xl"
            className="mb-4"
            disabled={!selectedRole}
            onClick={() => selectedRole && handleRoleSelect(selectedRole)}
          >
            Get Started
          </Button>
          <p className="text-sm text-muted-foreground">
            Select your role above to continue
          </p>
        </div>
      </main>

      <footer className="p-6 text-center text-muted-foreground">
        <p>&copy; 2024 JobPortal. Professional employment solutions.</p>
      </footer>
    </div>
  );
}