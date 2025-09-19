import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { storageService } from '@/services/localStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, UserPlus } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const workCategories = [
  'Construction', 'Electrical', 'Plumbing', 'Carpentry', 'Painting',
  'Cleaning', 'Security', 'Delivery', 'Maintenance', 'Other'
];

const commonSkills = [
  'Wiring', 'Pipe Fitting', 'Masonry', 'Welding', 'AC Repair',
  'House Cleaning', 'Office Cleaning', 'Painting', 'Carpentry',
  'Appliance Repair', 'Gardening', 'Driver', 'Cook'
];

export default function RegisterWorker() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    email: '',
    phone: '',
    password: '',
    location: '',
    address: '',
    aadhaarNumber: '',
    panNumber: '',
    voterCard: '',
    preferredLanguage: 'english',
    travellableDistance: 10,
    workCategory: [] as string[],
    skills: [] as string[],
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, workCategory: [...formData.workCategory, category] });
    } else {
      setFormData({ 
        ...formData, 
        workCategory: formData.workCategory.filter(c => c !== category) 
      });
    }
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    } else {
      setFormData({ 
        ...formData, 
        skills: formData.skills.filter(s => s !== skill) 
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    if (!formData.name || !formData.phone || !formData.password) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const workerData = {
      ...formData,
      role: 'worker',
      createdBy: user.id,
      updatedBy: user.id,
      gigLevel: 1,
      wageRange: { min: 200, max: 300 },
      trustScore: 0
    };

    const success = storageService.createUser(workerData);
    
    if (success) {
      toast({
        title: "Worker Registered",
        description: "Worker has been successfully registered.",
      });
      navigate('/kiosk/dashboard');
    } else {
      toast({
        title: "Registration Failed",
        description: "Failed to register worker. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout title="Register New Worker">
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate('/kiosk/dashboard')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                Register New Worker
              </CardTitle>
              <CardDescription>
                Fill in the worker's information for registration
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthdate">Birth Date</Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Phone number"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create password"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                <Input
                  id="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                  placeholder="12-digit Aadhaar number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address (Optional)</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Full address"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="panNumber">PAN Number (Optional)</Label>
                <Input
                  id="panNumber"
                  value={formData.panNumber}
                  onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                  placeholder="PAN number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="voterCard">Voter Card (Optional)</Label>
                <Input
                  id="voterCard"
                  value={formData.voterCard}
                  onChange={(e) => setFormData({ ...formData, voterCard: e.target.value })}
                  placeholder="Voter card number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredLanguage">Preferred Language</Label>
                <Select value={formData.preferredLanguage} onValueChange={(value) => setFormData({ ...formData, preferredLanguage: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="marathi">Marathi</SelectItem>
                    <SelectItem value="gujarati">Gujarati</SelectItem>
                    <SelectItem value="tamil">Tamil</SelectItem>
                    <SelectItem value="bengali">Bengali</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="travellableDistance">Travellable Distance (km)</Label>
                <Input
                  id="travellableDistance"
                  type="number"
                  value={formData.travellableDistance}
                  onChange={(e) => setFormData({ ...formData, travellableDistance: parseInt(e.target.value) || 0 })}
                  placeholder="10"
                  min="1"
                  max="100"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Work Categories</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {workCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={formData.workCategory.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <Label htmlFor={category} className="text-sm">{category}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Skills</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {commonSkills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={formData.skills.includes(skill)}
                      onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                    />
                    <Label htmlFor={skill} className="text-sm">{skill}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/kiosk/dashboard')}
              >
                Cancel
              </Button>
              <Button type="submit" variant="hero">
                Register Worker
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}