'use client';

import React, { useState } from 'react';
import { Upload, FileText, Calendar } from 'lucide-react';

// Progress Bar Component
const ProgressBar = ({ currentStep = 1, totalSteps = 2 }) => {
  return (
    <div className="flex  items-center justify-center mb-8">
  <div className="flex items-center space-x-4">
    {/* Step 1 */}
    <div className="flex flex-col items-center">
      <div className={`w-24 h-1 rounded-full ${currentStep >= 1 ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
      <span className={`mt-2 text-sm font-medium ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
        ID Proof
      </span>
    </div>

    {/* Step 2 */}
    <div className="flex flex-col items-center">
      <div className={`w-24 h-1 rounded-full ${currentStep >= 2 ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
      <span className={`mt-2 text-sm font-medium ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
        Address Proof
      </span>
    </div>
  </div>
</div>

  );
};

// ID Form Component (Left Side)
type IDFormProps = {
  formData: {
    idType: string;
    idNumber: string;
    issueDate: string;
    expiryDate: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors: {
    idType?: string;
    idNumber?: string;
    issueDate?: string;
    expiryDate?: string;
  };
};

const IDForm: React.FC<IDFormProps> = ({ formData, onInputChange, errors }) => {
  const idTypes = [
    { value: 'passport', label: 'Passport' },
    { value: 'drivers-license', label: "Driver's License" },
    { value: 'national-id', label: 'National ID' },
    { value: 'voter-id', label: 'Voter ID' },
  ];

  return (
    <div className="space-y-6">
      {/* ID Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">ID Type</label>
        <select
          name="idType"
          value={formData.idType}
          onChange={onInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${
            errors.idType ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select ID Type</option>
          {idTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        {errors.idType && <p className="text-red-500 text-sm mt-1">{errors.idType}</p>}
      </div>

      {/* ID Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">ID Number</label>
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={onInputChange}
          className={`w-full px-4 py-3 border bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.idNumber ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter ID Number"
        />
        {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
      </div>

      {/* Issue Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
        <input
          type="date"
          name="issueDate"
          value={formData.issueDate}
          onChange={onInputChange}
          className={`w-full px-4 py-3 border bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.issueDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.issueDate && <p className="text-red-500 text-sm mt-1">{errors.issueDate}</p>}
      </div>

      {/* Expiry Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={onInputChange}
          className={`w-full px-4 py-3 border bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.expiryDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
      </div>
    </div>
  );
};

// File Upload Component (Right Side)
type FileUploadProps = {
  name: string;
  label: string;
  file: File | null;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ 
  name, 
  label, 
  file, 
  error, 
  onChange 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
};

const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
};

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      // Create a DataTransfer to simulate file input change
      const input = document.createElement('input');
      input.type = 'file';

      // Create a new DataTransfer and assign the dropped file
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(droppedFile);
      input.files = dataTransfer.files;

      // Create a real event and dispatch it
      const event = new Event('change', { bubbles: true });
      Object.defineProperty(event, 'target', { writable: false, value: input });

      // Call the onChange handler with the input event
      onChange({
        ...e,
        target: input,
        currentTarget: input,
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div 
        className={`border-2 border-dashed bg-white rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : error 
              ? 'border-red-300 hover:border-red-400' 
              : 'border-gray-300 hover:border-blue-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          name={name}
          accept="image/*,application/pdf"
          onChange={onChange}
          className="hidden"
          id={name}
        />
        <label htmlFor={name} className="cursor-pointer block">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">
              {file ? file.name : 'Browse Files'}
            </p>
            <p className="text-xs text-gray-500">Drag and drop files here</p>
          </div>
        </label>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

// Main ID Verification Component
type IdVerificationProps = {
  onSubmit?: (formData: {
    idType: string;
    idNumber: string;
    issueDate: string;
    expiryDate: string;
    idFrontFile: File | null;
    idBackFile: File | null;
  }) => void;
  initialData?: {
    idType?: string;
    idNumber?: string;
    issueDate?: string;
    expiryDate?: string;
    idFrontFile?: File | null;
    idBackFile?: File | null;
  };
};

const IdVerification: React.FC<IdVerificationProps> = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    idType: initialData.idType || '',
    idNumber: initialData.idNumber || '',
    issueDate: initialData.issueDate || '',
    expiryDate: initialData.expiryDate || '',
    idFrontFile: initialData.idFrontFile || null,
    idBackFile: initialData.idBackFile || null,
  });

  type Errors = {
    idType?: string;
    idNumber?: string;
    issueDate?: string;
    expiryDate?: string;
    idFrontFile?: string;
    idBackFile?: string;
    [key: string]: string | undefined;
  };
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLSelectElement> {
  customField?: string;
}

interface FormData {
    idType: string;
    idNumber: string;
    issueDate: string;
    expiryDate: string;
    idFrontFile?: File | null;
    idBackFile?: File | null;
}

const handleInputChange = (e: InputChangeEvent): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
    }
};

interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {customField?: string;}

interface HandleFileChange {
    (e: FileChangeEvent, fieldName: 'idFrontFile' | 'idBackFile'): void;
}

const handleFileChange: HandleFileChange = (e, fieldName) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [fieldName]: file }));

    if (errors[fieldName]) {
        setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
};

  const validateForm = () => {
    const newErrors: Errors = {};
    
    if (!formData.idType) newErrors.idType = 'ID type is required';
    if (!formData.idNumber.trim()) newErrors.idNumber = 'ID number is required';
    if (!formData.issueDate) newErrors.issueDate = 'Issue date is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.idFrontFile) newErrors.idFrontFile = 'ID front image is required';
    if (!formData.idBackFile) newErrors.idBackFile = 'ID back image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

interface HandleSubmitEvent extends React.MouseEvent<HTMLButtonElement, MouseEvent> {customField?: string;}

interface SubmitFormData {
    idType: string;
    idNumber: string;
    issueDate: string;
    expiryDate: string;
    idFrontFile: File | null;
    idBackFile: File | null;
}

const handleSubmit = async (e: HandleSubmitEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    setIsSubmitting(true);
    
    try {
        // Simulate API call
        await new Promise<void>(resolve => setTimeout(resolve, 1000));
        if (onSubmit) {
            onSubmit(formData as SubmitFormData);
        } else {
            alert('Form submitted successfully!');
        }
    } catch (error) {
        console.error('Submission error:', error);
        alert('An error occurred while submitting the form. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
};

  return (
    <div className="min-h-screen bg-[#f1f1f1] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">

        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={1} totalSteps={2} />

        {/* Form Card */}
        <div className="bg-[#f1f1f1] rounded-xl  overflow-hidden">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload your Identity Proof</h2>
              <p className="text-gray-600">Passports and driving licenses are accepted</p>
            </div>

            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column - Form Fields */}
                <div className="space-y-6">
                  <IDForm 
                    formData={formData}
                    onInputChange={handleInputChange}
                    errors={errors}
                  />
                </div>

                {/* Right Column - File Uploads */}
                <div className="space-y-6">
                  <FileUpload
                    name="idFrontFile"
                    label="ID Front"
                    file={formData.idFrontFile}
                    error={errors.idFrontFile}
                    onChange={(e) => handleFileChange(e, 'idFrontFile')}
                  />
                  
                  <FileUpload
                    name="idBackFile"
                    label="ID Back"
                    file={formData.idBackFile}
                    error={errors.idBackFile}
                    onChange={(e) => handleFileChange(e, 'idBackFile')}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-12">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="px-20 py-4 bg-black text-white rounded-full font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? 'Processing...' : 'Continue '}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdVerification;