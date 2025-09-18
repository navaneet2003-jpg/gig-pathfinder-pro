import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Shield, CheckCircle, Clock, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BackgroundCheck() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'in_progress' | 'completed'>('pending');

  const handleStartVerification = () => {
    setVerificationStatus('in_progress');
    
    toast({
      title: "Background Check Initiated",
      description: "Your profile has been sent to the police station for verification.",
    });
    
    // Simulate background check progress
    setTimeout(() => {
      setVerificationStatus('completed');
      toast({
        title: "Background Check Complete",
        description: "Your background verification has been completed successfully!",
      });
    }, 3000);
  };

  const handleContinue = () => {
    navigate('/worker/qr-generation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-secondary-light p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/worker/documents')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-primary">Background Check</h1>
          <div className="w-20" />
        </div>

        <Card className="shadow-elegant">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 rounded-full bg-primary-light w-fit">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Police Background Verification</CardTitle>
            <CardDescription>
              Your profile will be sent to the nearby police station for background verification
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-muted/50 p-6 rounded-lg">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Verification Details
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Police Station:</span>
                  <span className="font-medium">Central Police Station, Mumbai</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Verification Type:</span>
                  <span className="font-medium">Background Check</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Time:</span>
                  <span className="font-medium">2-5 working days</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  {verificationStatus === 'pending' && <Badge variant="warning">Not Started</Badge>}
                  {verificationStatus === 'in_progress' && <Badge variant="secondary">In Progress</Badge>}
                  {verificationStatus === 'completed' && <Badge variant="success">Completed</Badge>}
                </div>
              </div>
            </div>

            {verificationStatus === 'pending' && (
              <div className="text-center space-y-4">
                <div className="bg-warning-light p-4 rounded-lg">
                  <h4 className="font-medium mb-2">What happens next?</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 text-left">
                    <li>• Your profile will be sent to the police station</li>
                    <li>• Police will verify your background and address</li>
                    <li>• You may be contacted for additional information</li>
                    <li>• Verification usually takes 2-5 working days</li>
                    <li>• You'll receive updates on the verification status</li>
                  </ul>
                </div>
                
                <Button variant="hero" size="lg" onClick={handleStartVerification}>
                  <Shield className="h-4 w-4 mr-2" />
                  Start Background Verification
                </Button>
              </div>
            )}

            {verificationStatus === 'in_progress' && (
              <div className="text-center space-y-4">
                <div className="animate-pulse">
                  <Clock className="h-12 w-12 mx-auto text-secondary mb-4" />
                </div>
                <h4 className="font-medium">Verification in Progress</h4>
                <p className="text-muted-foreground">
                  Your profile has been sent to the police station. Please wait for the verification to complete.
                </p>
                <div className="bg-secondary-light p-4 rounded-lg">
                  <p className="text-sm">
                    We'll notify you once the verification is complete. This usually takes 2-5 working days.
                  </p>
                </div>
              </div>
            )}

            {verificationStatus === 'completed' && (
              <div className="text-center space-y-4">
                <CheckCircle className="h-12 w-12 mx-auto text-success mb-4" />
                <h4 className="font-medium text-success">Background Check Completed</h4>
                <p className="text-muted-foreground">
                  Your background verification has been successfully completed by the police station.
                </p>
                <div className="bg-success-light p-4 rounded-lg">
                  <p className="text-sm">
                    Congratulations! You can now proceed to generate your QR code profile.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={() => navigate('/worker/documents')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              {verificationStatus === 'completed' && (
                <Button variant="hero" size="lg" onClick={handleContinue}>
                  Generate QR Code
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}