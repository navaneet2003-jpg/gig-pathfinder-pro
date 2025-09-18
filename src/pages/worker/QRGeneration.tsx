import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Share2, Printer, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';

// Mock worker profile data
const workerProfile = {
  id: 'WRK001',
  name: 'John Doe',
  phone: '+91 9876543210',
  email: 'john.doe@email.com',
  aadhaar: '****-****-1234',
  skills: ['Carpentry', 'Plumbing', 'Electrical Work'],
  workCategory: ['Construction', 'Maintenance'],
  location: 'Mumbai, Maharashtra',
  gigLevel: 3,
  verified: true,
  backgroundCheck: 'Completed',
  documentsVerified: true
};

export default function QRGeneration() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [qrDataURL, setQrDataURL] = useState<string>('');

  useEffect(() => {
    generateQRCode();
  }, []);

  const generateQRCode = async () => {
    try {
      const profileData = JSON.stringify(workerProfile);
      const canvas = canvasRef.current;
      
      if (canvas) {
        await QRCode.toCanvas(canvas, profileData, {
          width: 300,
          margin: 2,
          color: {
            dark: '#0891b2', // Primary color
            light: '#FFFFFF'
          }
        });
        
        // Convert canvas to data URL for download
        const dataURL = canvas.toDataURL('image/png');
        setQrDataURL(dataURL);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (qrDataURL) {
      const link = document.createElement('a');
      link.download = `${workerProfile.name}-QRCode.png`;
      link.href = qrDataURL;
      link.click();
      
      toast({
        title: "Download Started",
        description: "QR Code image has been downloaded.",
      });
    }
  };

  const handlePrint = () => {
    if (canvasRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Worker QR Code - ${workerProfile.name}</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  text-align: center; 
                  padding: 20px;
                }
                .header { margin-bottom: 20px; }
                .profile-info { 
                  margin: 20px 0; 
                  text-align: left; 
                  max-width: 400px; 
                  margin-left: auto; 
                  margin-right: auto;
                }
                .qr-code { margin: 20px 0; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>JobPortal Worker Profile</h1>
                <h2>${workerProfile.name}</h2>
              </div>
              
              <div class="qr-code">
                <img src="${qrDataURL}" alt="Worker QR Code" />
              </div>
              
              <div class="profile-info">
                <p><strong>ID:</strong> ${workerProfile.id}</p>
                <p><strong>Phone:</strong> ${workerProfile.phone}</p>
                <p><strong>Location:</strong> ${workerProfile.location}</p>
                <p><strong>Skills:</strong> ${workerProfile.skills.join(', ')}</p>
                <p><strong>Gig Level:</strong> ${workerProfile.gigLevel}</p>
                <p><strong>Status:</strong> Verified ✓</p>
              </div>
              
              <p style="margin-top: 30px; font-size: 12px; color: #666;">
                Scan this QR code to view complete worker profile
              </p>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
    
    toast({
      title: "Print Dialog Opened",
      description: "QR Code is ready to print.",
    });
  };

  const handleShare = (platform: string) => {
    const message = `Check out my JobPortal worker profile: ${workerProfile.name}\nID: ${workerProfile.id}\nSkills: ${workerProfile.skills.join(', ')}\n\nScan the QR code to view my complete verified profile!`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?text=${encodeURIComponent(message)}`;
        break;
      case 'discord':
        // For Discord, we'll copy to clipboard as there's no direct share URL
        navigator.clipboard.writeText(message);
        toast({
          title: "Copied to Clipboard",
          description: "Message copied! Paste it in Discord.",
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
    
    toast({
      title: "Share Initiated",
      description: `Opening ${platform} to share your profile.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-secondary-light p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/worker/background-check')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-primary">QR Code Generation</h1>
          <div className="w-20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle>Your QR Code Profile</CardTitle>
              <CardDescription>
                Scan this code to view your complete verified profile
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg shadow-inner">
                  <canvas ref={canvasRef} />
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Profile ID: <span className="font-mono font-medium">{workerProfile.id}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  This QR code contains your complete verified profile information
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Profile Summary</CardTitle>
              <CardDescription>
                Information encoded in your QR code
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{workerProfile.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{workerProfile.phone}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{workerProfile.location}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gig Level:</span>
                  <span className="font-medium">Level {workerProfile.gigLevel}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {workerProfile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-secondary-light text-secondary text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Work Categories:</p>
                <div className="flex flex-wrap gap-2">
                  {workerProfile.workCategory.map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-primary-light text-primary text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-elegant mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Share Your Profile
            </CardTitle>
            <CardDescription>
              Share your verified worker profile with potential employers
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex justify-center gap-4">
              <Button
                variant="success"
                size="lg"
                onClick={() => handleShare('whatsapp')}
                className="flex-1 max-w-xs"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={() => handleShare('telegram')}
                className="flex-1 max-w-xs"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Telegram
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleShare('discord')}
                className="flex-1 max-w-xs"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Discord
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <Button variant="hero" size="xl" onClick={() => navigate('/worker/dashboard')}>
            Complete Registration
          </Button>
        </div>
      </div>
    </div>
  );
}