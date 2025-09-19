import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { User, Edit, X } from 'lucide-react';
import { storageService } from '@/services/localStorage';

export default function UserProfile() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});

  if (!user) return null;

  const handleSave = async () => {
    const success = await updateProfile(formData);
    if (success) {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setIsEditing(false);
    } else {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRequestUpdate = () => {
    // For kiosk workers, submit request to admin
    if (user.role === 'worker' && user.createdBy === 'kiosk') {
      storageService.addProfileUpdateRequest(user.id, formData);
      toast({
        title: "Update Request Submitted",
        description: "Your profile update request has been submitted for approval.",
      });
      setIsEditing(false);
      return;
    }
    handleSave();
  };

  const renderField = (key: string, value: any, label: string, type: string = 'text') => {
    if (key === 'password' || key === 'id' || key === 'createdAt' || key === 'updatedAt') return null;
    
    return (
      <div key={key} className="space-y-2">
        <Label>{label}</Label>
        {isEditing ? (
          type === 'textarea' ? (
            <Textarea
              value={formData[key] || ''}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          ) : type === 'select' ? (
            <Select value={formData[key] || ''} onValueChange={(val) => setFormData({ ...formData, [key]: val })}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {key === 'preferredLanguage' && (
                  <>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="marathi">Marathi</SelectItem>
                    <SelectItem value="gujarati">Gujarati</SelectItem>
                  </>
                )}
                {key === 'type' && (
                  <>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          ) : (
            <Input
              type={type}
              value={formData[key] || ''}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          )
        ) : (
          <div className="text-sm bg-muted p-2 rounded">
            {Array.isArray(value) ? value.join(', ') : value || 'Not provided'}
          </div>
        )}
      </div>
    );
  };

  const getTrustScore = () => {
    const docs = storageService.getDocumentsByUserId(user.id);
    const verifiedDocs = docs.filter(doc => doc.verified).length;
    return Math.min(100, verifiedDocs * 20);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>User Profile</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Trust Score: {getTrustScore()}%</Badge>
              {!isEditing ? (
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>
            {user.role === 'worker' && user.createdBy === 'kiosk' 
              ? 'Updates require admin approval'
              : 'View and edit your profile information'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {renderField('name', user.name, 'Name')}
          {renderField('email', user.email, 'Email', 'email')}
          {renderField('phone', user.phone, 'Phone', 'tel')}
          
          {user.role === 'kiosk' && (
            <>
              {renderField('location', user.location, 'Location')}
              {renderField('address', user.address, 'Address', 'textarea')}
            </>
          )}
          
          {user.role === 'worker' && (
            <>
              {renderField('birthdate', user.birthdate, 'Birth Date', 'date')}
              {renderField('location', user.location, 'Location')}
              {renderField('address', user.address, 'Address', 'textarea')}
              {renderField('aadhaarNumber', user.aadhaarNumber, 'Aadhaar Number')}
              {renderField('panNumber', user.panNumber, 'PAN Number')}
              {renderField('voterCard', user.voterCard, 'Voter Card')}
              {renderField('preferredLanguage', user.preferredLanguage, 'Preferred Language', 'select')}
              {renderField('travellableDistance', user.travellableDistance, 'Travellable Distance (km)', 'number')}
              <div className="space-y-2">
                <Label>Work Categories</Label>
                <div className="text-sm bg-muted p-2 rounded">
                  {user.workCategory?.join(', ') || 'Not specified'}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="text-sm bg-muted p-2 rounded">
                  {user.skills?.join(', ') || 'Not specified'}
                </div>
              </div>
              {user.gigLevel && (
                <div className="space-y-2">
                  <Label>Gig Level</Label>
                  <Badge variant="secondary">Level {user.gigLevel}</Badge>
                </div>
              )}
            </>
          )}
          
          {user.role === 'employer' && (
            <>
              {renderField('type', user.type, 'Type', 'select')}
              {renderField('location', user.location, 'Location')}
              {renderField('address', user.address, 'Address', 'textarea')}
              {user.type === 'business' && (
                <>
                  {renderField('panCard', user.panCard, 'PAN Card')}
                  {renderField('gstinNumber', user.gstinNumber, 'GSTIN Number')}
                  {renderField('cinNumber', user.cinNumber, 'CIN Number')}
                </>
              )}
            </>
          )}
        </div>

        {isEditing && (
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleRequestUpdate}>
              {user.role === 'worker' && user.createdBy === 'kiosk' ? 'Request Update' : 'Save Changes'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}