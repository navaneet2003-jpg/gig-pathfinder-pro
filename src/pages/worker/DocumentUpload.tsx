import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Upload, CheckCircle, XCircle, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  name: string;
  file: File | null;
  verified: boolean | null; // null = pending, true = verified, false = rejected
}

export default function DocumentUpload() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Aadhaar Card', file: null, verified: null },
    { id: '2', name: 'Photo', file: null, verified: null },
  ]);

  const handleFileUpload = (docId: string, file: File) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, file, verified: null } : doc
    ));
    
    // Simulate verification status (in real app, this would be handled by backend)
    setTimeout(() => {
      setDocuments(prev => prev.map(doc => 
        doc.id === docId ? { ...doc, verified: Math.random() > 0.3 } : doc
      ));
    }, 2000);
  };

  const addNewDocument = () => {
    const newDoc: Document = {
      id: Date.now().toString(),
      name: 'Additional Document',
      file: null,
      verified: null
    };
    setDocuments(prev => [...prev, newDoc]);
  };

  const handleContinue = () => {
    const uploadedDocs = documents.filter(doc => doc.file);
    if (uploadedDocs.length === 0) {
      toast({
        title: "No Documents Uploaded",
        description: "Please upload at least one document to continue.",
        variant: "destructive",
      });
      return;
    }

    navigate('/worker/background-check');
  };

  const getVerificationIcon = (verified: boolean | null) => {
    if (verified === null) return null;
    return verified 
      ? <CheckCircle className="h-4 w-4 text-success" />
      : <XCircle className="h-4 w-4 text-destructive" />;
  };

  const getVerificationBadge = (verified: boolean | null) => {
    if (verified === null) return <Badge variant="warning">Pending</Badge>;
    return verified 
      ? <Badge variant="success">Verified</Badge>
      : <Badge variant="destructive">Rejected</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-secondary-light p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/worker/register')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-primary">Document Upload</h1>
          <div className="w-20" />
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Upload Your Documents</CardTitle>
            <CardDescription>
              Upload your identity and qualification documents for verification
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {documents.map((doc) => (
                <Card key={doc.id} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{doc.name}</h4>
                      {getVerificationIcon(doc.verified)}
                    </div>
                    {getVerificationBadge(doc.verified)}
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor={`file-${doc.id}`}>
                      Choose File
                    </Label>
                    <Input
                      id={`file-${doc.id}`}
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(doc.id, file);
                        }
                      }}
                      className="cursor-pointer"
                    />
                    {doc.file && (
                      <div className="text-sm text-muted-foreground">
                        Selected: {doc.file.name} ({(doc.file.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline" onClick={addNewDocument}>
                <Plus className="h-4 w-4 mr-2" />
                Add Another Document
              </Button>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Document Guidelines:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Upload clear, high-quality images or PDF files</li>
                <li>• Ensure all text is readable and the document is not damaged</li>
                <li>• Maximum file size: 5MB per document</li>
                <li>• Supported formats: JPG, PNG, PDF</li>
                <li>• Documents will be verified by our admin team</li>
              </ul>
            </div>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={() => navigate('/worker/register')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <Button variant="hero" size="lg" onClick={handleContinue}>
                Continue to Background Check
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}