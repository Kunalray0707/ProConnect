import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload, FileText, CheckCircle, X, Camera, Award,
  ChevronRight, ChevronLeft, Shield, AlertCircle
} from 'lucide-react';
import { toast } from 'react-toastify';

interface VerificationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

interface DocumentType {
  id: string;
  name: string;
  description: string;
  required: boolean;
  uploaded: boolean;
  file?: File;
}

const VerificationWizard: React.FC<VerificationWizardProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [documents, setDocuments] = useState<DocumentType[]>([
    {
      id: 'id_proof',
      name: 'Government ID Proof',
      description: 'Aadhaar Card, Passport, or Driving License',
      required: true,
      uploaded: false
    },
    {
      id: 'address_proof',
      name: 'Address Proof',
      description: 'Utility bill, Bank statement, or Rental agreement',
      required: true,
      uploaded: false
    },
    {
      id: 'qualification',
      name: 'Educational Qualification',
      description: 'Degree certificate or Marksheet',
      required: true,
      uploaded: false
    },
    {
      id: 'experience',
      name: 'Experience Certificate',
      description: 'Previous employment letter or Offer letter',
      required: false,
      uploaded: false
    },
    {
      id: 'certification',
      name: 'Professional Certification',
      description: 'Industry-specific certifications (optional)',
      required: false,
      uploaded: false
    }
  ]);

  const steps = [
    { title: 'Document Selection', description: 'Choose documents to upload' },
    { title: 'Upload Documents', description: 'Upload your verification documents' },
    { title: 'Review & Submit', description: 'Review and submit for verification' },
    { title: 'Verification Complete', description: 'Your documents are being reviewed' }
  ];

  const handleFileUpload = (documentId: string, file: File) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('File size must be less than 5MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload JPEG, PNG, or PDF files only');
      return;
    }

    setDocuments(documents.map(doc =>
      doc.id === documentId
        ? { ...doc, uploaded: true, file }
        : doc
    ));
    toast.success('Document uploaded successfully!');
  };

  const handleNext = () => {
    if (currentStep === 1) {
      const requiredDocs = documents.filter(doc => doc.required && !doc.uploaded);
      if (requiredDocs.length > 0) {
        toast.error('Please upload all required documents');
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    // Simulate submission
    toast.success('Verification documents submitted successfully!');
    onComplete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[hsl(var(--border))]">
          <div className="flex items-center gap-3">
            <Shield className="text-[hsl(var(--cp-blue))]" size={24} />
            <div>
              <h2 className="font-heading font-semibold text-lg text-[hsl(var(--foreground))]">
                Verification Wizard
              </h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Earn your verified badge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-[hsl(var(--muted))]/30">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep
                    ? 'bg-[hsl(var(--cp-blue))] text-white'
                    : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]'
                }`}>
                  {index < currentStep ? <CheckCircle size={16} /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    index < currentStep ? 'bg-[hsl(var(--cp-blue))]' : 'bg-[hsl(var(--muted))]'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))]">
            {steps.map((step, index) => (
              <span key={index} className={index === currentStep ? 'text-[hsl(var(--foreground))] font-medium' : ''}>
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {currentStep === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="text-center mb-6">
                <Award className="text-[hsl(var(--cp-blue))] mx-auto mb-3" size={48} />
                <h3 className="font-heading font-semibold text-[hsl(var(--foreground))] mb-2">
                  Get Verified
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">
                  Upload your documents to earn the verified badge and build trust with clients
                </p>
              </div>

              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-start gap-3 p-4 border border-[hsl(var(--border))] rounded-lg">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                      doc.required ? 'bg-red-100 dark:bg-red-900/20' : 'bg-blue-100 dark:bg-blue-900/20'
                    }`}>
                      {doc.required ? (
                        <span className="text-red-600 dark:text-red-400 text-xs font-bold">*</span>
                      ) : (
                        <span className="text-blue-600 dark:text-blue-400 text-xs">○</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[hsl(var(--foreground))]">{doc.name}</h4>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">{doc.description}</p>
                      {doc.required && (
                        <span className="text-xs text-red-500 font-medium">Required</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="text-blue-500 mt-0.5" size={16} />
                  <div>
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-400">Important Notes</p>
                    <ul className="text-xs text-blue-600 dark:text-blue-300 mt-1 space-y-1">
                      <li>• All documents must be clear and legible</li>
                      <li>• Files should be under 5MB each</li>
                      <li>• Verification typically takes 2-3 business days</li>
                      <li>• You'll receive a notification once verified</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h3 className="font-heading font-semibold text-[hsl(var(--foreground))] mb-4">
                Upload Documents
              </h3>

              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border border-[hsl(var(--border))] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-[hsl(var(--foreground))]">{doc.name}</h4>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">{doc.description}</p>
                      </div>
                      {doc.uploaded ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <span className="text-xs text-red-500 font-medium">Required</span>
                      )}
                    </div>

                    {!doc.uploaded ? (
                      <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-[hsl(var(--border))] rounded-lg cursor-pointer hover:border-[hsl(var(--cp-blue))] transition-colors">
                        <Upload className="text-[hsl(var(--muted-foreground))]" size={20} />
                        <span className="text-sm text-[hsl(var(--muted-foreground))]">
                          Click to upload {doc.name.toLowerCase()}
                        </span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,application/pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(doc.id, file);
                          }}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="text-green-500" size={16} />
                          <span className="text-sm text-green-700 dark:text-green-400">
                            {doc.file?.name}
                          </span>
                        </div>
                        <button
                          onClick={() => setDocuments(documents.map(d =>
                            d.id === doc.id ? { ...d, uploaded: false, file: undefined } : d
                          ))}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h3 className="font-heading font-semibold text-[hsl(var(--foreground))] mb-4">
                Review & Submit
              </h3>

              <div className="space-y-3">
                {documents.filter(doc => doc.uploaded).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-[hsl(var(--muted))]/40 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500" size={16} />
                      <div>
                        <p className="font-medium text-[hsl(var(--foreground))]">{doc.name}</p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">{doc.file?.name}</p>
                      </div>
                    </div>
                    <span className="text-xs text-green-600 font-medium">Uploaded</span>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="text-amber-500 mt-0.5" size={16} />
                  <div>
                    <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Review Checklist</p>
                    <ul className="text-xs text-amber-600 dark:text-amber-300 mt-1 space-y-1">
                      <li>• Ensure all documents are clear and readable</li>
                      <li>• Check that personal information is visible</li>
                      <li>• Verify file sizes are under 5MB</li>
                      <li>• Make sure documents are not expired</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
              <CheckCircle className="text-green-500 mx-auto" size={64} />
              <h3 className="font-heading font-semibold text-xl text-[hsl(var(--foreground))]">
                Documents Submitted!
              </h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                Your verification documents have been submitted successfully. Our team will review them within 2-3 business days.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  You'll receive a notification once your verification is complete. The verified badge will appear on your profile.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        {currentStep < 3 && (
          <div className="flex items-center justify-between p-6 border-t border-[hsl(var(--border))]">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[hsl(var(--border))] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[hsl(var(--muted))] transition-colors"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>

            <button
              onClick={currentStep === 2 ? handleSubmit : handleNext}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--cp-blue))] text-white text-sm font-medium hover:bg-[hsl(var(--cp-blue))]/90 transition-colors"
            >
              {currentStep === 2 ? 'Submit Documents' : 'Next'}
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="p-6 border-t border-[hsl(var(--border))]">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-lg bg-[hsl(var(--cp-blue))] text-white font-medium hover:bg-[hsl(var(--cp-blue))]/90 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VerificationWizard;