import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { storageService } from '@/services/localStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Users, Edit, Trash2, Eye, AlertTriangle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function ManageWorkers() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [workers, setWorkers] = useState<any[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const kioskWorkers = storageService.getWorkersByKioskId(user.id);
      setWorkers(kioskWorkers);
    }
  }, [user]);

  const getTrustScore = (workerId: string) => {
    const docs = storageService.getDocumentsByUserId(workerId);
    const verifiedDocs = docs.filter(doc => doc.verified).length;
    return Math.min(100, verifiedDocs * 20);
  };

  const handleEdit = (worker: any) => {
      toast({
        title: "Feature Pending",
        description: "Profile editing requires admin approval. This feature will be available soon.",
      });
  };

  const handleDelete = (worker: any) => {
    setSelectedWorker(worker);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedWorker) {
      toast({
        title: "Delete Request Submitted",
        description: "Worker deletion request has been submitted to admin for approval.",
      });
      setIsDeleteDialogOpen(false);
      setSelectedWorker(null);
    }
  };

  const handleViewProfile = (worker: any) => {
    // For now, show basic info in a toast
    toast({
      title: worker.name,
      description: `Phone: ${worker.phone}\nLocation: ${worker.location || 'Not specified'}\nGig Level: ${worker.gigLevel || 1}`,
    });
  };

  return (
    <DashboardLayout title="Manage Workers">
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate('/kiosk/dashboard')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Manage Workers
              </CardTitle>
              <CardDescription>
                View and manage workers registered by your kiosk centre
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {workers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No workers registered yet.</p>
              <Button 
                className="mt-4" 
                onClick={() => navigate('/kiosk/register-worker')}
              >
                Register First Worker
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {workers.map((worker) => (
                <Card key={worker.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{worker.name}</h4>
                        <Badge variant="secondary">
                          Trust Score: {getTrustScore(worker.id)}%
                        </Badge>
                        <Badge variant="outline">
                          Level {worker.gigLevel || 1}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>
                          <strong>Phone:</strong> {worker.phone}
                        </div>
                        <div>
                          <strong>Location:</strong> {worker.location || 'Not specified'}
                        </div>
                        <div>
                          <strong>Categories:</strong> {worker.workCategory?.join(', ') || 'None'}
                        </div>
                      </div>
                      
                      {worker.skills && worker.skills.length > 0 && (
                        <div className="mt-2">
                          <strong className="text-sm">Skills:</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {worker.skills.slice(0, 3).map((skill: string) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {worker.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{worker.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProfile(worker)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(worker)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(worker)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Confirm Delete
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedWorker?.name}? This action requires admin approval and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Submit Delete Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}