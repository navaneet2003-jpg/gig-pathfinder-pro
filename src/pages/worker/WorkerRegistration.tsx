import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const workCategories = [
  'Construction', 'Domestic Help', 'Delivery', 'Security', 'Cleaning',
  'Maintenance', 'Agriculture', 'Food Service', 'Retail', 'Manufacturing'
];

const skills = [
  'Carpentry', 'Plumbing', 'Electrical Work', 'Painting', 'Cooking',
  'Driving', 'Gardening', 'Computer Skills', 'Customer Service', 'Languages'
];

const languages = ['Hindi', 'English', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Punjabi'];

export default function WorkerRegistration() {
  const navigate = useNavigate();
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
    preferredLanguage: '',
    travellableDistance: 10,
    workCategory: [] as string[],
    skills: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.aadhaarNumber || !formData.preferredLanguage) {
      toast({
        title: "Registration Failed",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Navigate to document upload
    navigate('/worker/documents');
    
    toast({
      title: "Registration Successful",
      description: "Please proceed to upload your documents.",
    });
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      workCategory: prev.workCategory.includes(category)
        ? prev.workCategory.filter(c => c !== category)
        : [...prev.workCategory, category]
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-secondary-light p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/worker/auth')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-primary">Worker Registration</h1>
          <div className="w-20" />
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Worker Profile Registration
            </CardTitle>
            <CardDescription>
              Fill in your details to create your worker profile
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">Date of Birth</Label>
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
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
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
              </div>

              {/* Identity Documents */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Identity Documents</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadhaar">Aadhaar Number *</Label>
                    <Input
                      id="aadhaar"
                      value={formData.aadhaarNumber}
                      onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                      placeholder="Enter Aadhaar number"
                      maxLength={12}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pan">PAN Number (Optional)</Label>
                    <Input
                      id="pan"
                      value={formData.panNumber}
                      onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                      placeholder="Enter PAN number"
                      maxLength={10}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voter">Voter Card Number (Optional)</Label>
                  <Input
                    id="voter"
                    value={formData.voterCard}
                    onChange={(e) => setFormData({ ...formData, voterCard: e.target.value })}
                    placeholder="Enter Voter Card number"
                  />
                </div>
              </div>

              {/* Work Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Work Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language *</Label>
                    <Select value={formData.preferredLanguage} onValueChange={(value) => setFormData({ ...formData, preferredLanguage: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem key={language} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="distance">Travelable Distance (km)</Label>
                    <Input
                      id="distance"
                      type="number"
                      value={formData.travellableDistance}
                      onChange={(e) => setFormData({ ...formData, travellableDistance: parseInt(e.target.value) || 0 })}
                      min="1"
                      max="100"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Work Categories</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {workCategories.map((category) => (
                      <Button
                        key={category}
                        type="button"
                        variant={formData.workCategory.includes(category) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleCategoryToggle(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Skills</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {skills.map((skill) => (
                      <Button
                        key={skill}
                        type="button"
                        variant={formData.skills.includes(skill) ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => handleSkillToggle(skill)}
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button type="button" variant="outline" onClick={() => navigate('/worker/auth')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
                
                <Button type="submit" variant="hero" size="lg">
                  Continue to Documents
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}