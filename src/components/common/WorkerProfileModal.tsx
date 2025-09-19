import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Award, Briefcase, Star, Check, X } from 'lucide-react'

interface WorkerProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  skills: string[];
  workCategory: string[];
  location: string;
  aadhaarNumber: string;
  isBackgroundVerified: boolean;
  verificationStatus: 'pending' | 'in-progress' | 'completed' | 'failed';
  gigLevel: number;
}

interface WorkerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: WorkerProfile;
}

export default function WorkerProfileModal({ isOpen, onClose, profile }: WorkerProfileModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{profile.name}'s Profile</DialogTitle>
          <DialogDescription>
            Verified Worker Profile
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Basic Info Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                  {profile.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.email}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>Level {profile.gigLevel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {profile.isBackgroundVerified ? (
                      <Badge variant="success" className="flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <X className="h-3 w-3" />
                        Unverified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Categories */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold">Skills</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold">Work Categories</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.workCategory.map((category) => (
                      <Badge key={category} variant="outline">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              Contact Worker
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}