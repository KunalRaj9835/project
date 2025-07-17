'use client';

import React, { useState } from 'react';
import { Upload, MapPin, CheckCircle } from 'lucide-react';

const ProgressBar = ({ currentStep = 2, totalSteps = 2 }) => {
  return (
    <div className="flex  items-center justify-center mb-8 pt-8">
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

interface AddressFormData {
  addressType: string;
  addressIssueDate: string;
  addressFrontFile: File | null;
  addressBackFile: File | null;
  termsAccepted: boolean;
}

interface AddressFormErrors {
  [key: string]: string;
}

interface AddressVerificationProps {
  onSubmit: (data: AddressFormData) => void;
  onBack: () => void;
  initialData?: Partial<AddressFormData>;
}

const AddressVerification: React.FC<AddressVerificationProps> = ({ 
  onSubmit, 
  onBack, 
  initialData = {} 
}) => {
  const [formData, setFormData] = useState<AddressFormData>({
    addressType: initialData.addressType || '',
    addressIssueDate: initialData.addressIssueDate || '',
    addressFrontFile: initialData.addressFrontFile || null,
    addressBackFile: initialData.addressBackFile || null,
    termsAccepted: initialData.termsAccepted || false,
  });

  const [errors, setErrors] = useState<AddressFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addressTypes = [
    { value: 'utility-bill', label: 'Utility Bill' },
    { value: 'bank-statement', label: 'Bank Statement' },
    { value: 'rental-agreement', label: 'Rental Agreement' },
    { value: 'govt-letter', label: 'Government Letter' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [fieldName]: file }));
    
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: AddressFormErrors = {};
    
    if (!formData.addressType) newErrors.addressType = 'Address proof type is required';
    if (!formData.addressIssueDate) newErrors.addressIssueDate = 'Issue date is required';
    if (!formData.addressFrontFile) newErrors.addressFrontFile = 'Address proof front is required';
    if (!formData.addressBackFile) newErrors.addressBackFile = 'Address proof back is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(formData);
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileUpload = ({ 
    name, 
    label, 
    file, 
    error, 
    onChange 
  }: {
    name: string;
    label: string;
    file: File | null;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        const input = document.createElement('input');
        input.type = 'file';
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(droppedFile);
        input.files = dataTransfer.files;
        const event = new Event('change', { bubbles: true });
        Object.defineProperty(event, 'target', { writable: false, value: input });
        onChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div 
          className={`border-2 border-dashed bg-white rounded-lg p-6 text-center transition-all duration-200 cursor-pointer ${
            isDragOver 
              ? 'border-blue-500 bg-blue-50' 
              : error 
                ? 'border-red-300 hover:border-red-400' 
                : 'border-gray-300 hover:border-gray-400'
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
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
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

  return (
    <div className="min-h-screen bg-[#f1f1f1] py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <ProgressBar currentStep={2} totalSteps={2} />

        {/* Form Card */}
        <div className="bg-[#f1f1f1] rounded-xl  overflow-hidden">
          <div className="p-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload your Address Proof</h2>
              <p className="text-gray-600">Passports and driving licenses are accepted</p>
            </div>

            <div className="space-y-6">
              {/* Address Type and Issue Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                  <select
                    name="addressType"
                    value={formData.addressType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${
                      errors.addressType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Address Type</option>
                    {addressTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  {errors.addressType && <p className="text-red-500 text-sm mt-1">{errors.addressType}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
                  <input
                    type="date"
                    name="addressIssueDate"
                    value={formData.addressIssueDate}
                    onChange={handleInputChange}
                    placeholder="dd-----yyyy"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${
                      errors.addressIssueDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.addressIssueDate && <p className="text-red-500 text-sm mt-1">{errors.addressIssueDate}</p>}
                </div>
              </div>

              {/* Proof of Address Section */}
              <div>
                <h3 className="text-lg  font-medium text-gray-900 mb-4">Proof Of address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileUpload
                    name="addressFrontFile"
                    label="ID Front"
                    file={formData.addressFrontFile}
                    error={errors.addressFrontFile}
                    onChange={(e) => handleFileChange(e, 'addressFrontFile')}
                  />
                  
                  <FileUpload
                    name="addressBackFile"
                    label="ID Back"
                    file={formData.addressBackFile}
                    error={errors.addressBackFile}
                    onChange={(e) => handleFileChange(e, 'addressBackFile')}
                  />
                </div>
              </div>

              {/* Note */}
              <div className="text-center">
                <p className="text-sm text-gray-600 italic">
                  Please note that the documents should not be older then 75 days
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-20 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isSubmitting ? 'Processing...' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressVerification;