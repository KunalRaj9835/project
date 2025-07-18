'use client';

import React, { useState } from 'react';
import { Upload, MapPin, CheckCircle } from 'lucide-react';
import './AddressVerification.css';

const ProgressBar = ({ currentStep = 2, totalSteps = 2 }) => {
  return (
    <div className="progressContainer">
      <div className="progressWrapper">
        {/* Step 1 */}
        <div className="progressStep">
          <div className={`progressBar ${currentStep >= 1 ? 'progressBarActive' : 'progressBarInactive'}`}></div>
          <span className={`progressLabel ${currentStep >= 1 ? 'progressLabelActive' : 'progressLabelInactive'}`}>
            ID Proof
          </span>
        </div>

        {/* Step 2 */}
        <div className="progressStep">
          <div className={`progressBar ${currentStep >= 2 ? 'progressBarActive' : 'progressBarInactive'}`}></div>
          <span className={`progressLabel ${currentStep >= 2 ? 'progressLabelActive' : 'progressLabelInactive'}`}>
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
      <div className="fileUploadContainer">
        <label className="inputLabel">{label}</label>
        <div 
          className={`fileUploadArea ${
            isDragOver 
              ? 'fileUploadAreaDragOver' 
              : error 
                ? 'fileUploadAreaError' 
                : ''
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
            className="fileUploadInput"
            id={name}
          />
          <label htmlFor={name} className="fileUploadLabel">
            <Upload className="fileUploadIcon" />
            <div className="fileUploadContent">
              <p className="fileUploadMainText">
                {file ? file.name : 'Browse Files'}
              </p>
              <p className="fileUploadSubText">Drag and drop files here</p>
            </div>
          </label>
        </div>
        {error && <p className="errorMessage">{error}</p>}
      </div>
    );
  };

  return (
    <div className="pageContainer">
      <div className="contentWrapper">
        {/* Progress Bar */}
        <ProgressBar currentStep={2} totalSteps={2} />

        {/* Form Card */}
        <div className="formCard">
          <div className="formContent">
            <div className="headerContainer">
              <h2 className="headerTitle">Upload your Address Proof</h2>
              <p className="headerSubtitle">Passports and driving licenses are accepted</p>
            </div>

            <div className="spacingContainer">
              {/* Address Type and Issue Date */}
              <div className="formGrid">
                <div>
                  <label className="inputLabel">Address Type</label>
                  <select
                    name="addressType"
                    value={formData.addressType}
                    onChange={handleInputChange}
                    className={`selectInput ${errors.addressType ? 'selectInputError' : ''}`}
                  >
                    <option value="">Select Address Type</option>
                    {addressTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  {errors.addressType && <p className="errorMessage">{errors.addressType}</p>}
                </div>
                
                <div>
                  <label className="inputLabel">Issue Date</label>
                  <input
                    type="date"
                    name="addressIssueDate"
                    value={formData.addressIssueDate}
                    onChange={handleInputChange}
                    placeholder="dd-----yyyy"
                    className={`dateInput ${errors.addressIssueDate ? 'dateInputError' : ''}`}
                  />
                  {errors.addressIssueDate && <p className="errorMessage">{errors.addressIssueDate}</p>}
                </div>
              </div>

              {/* Proof of Address Section */}
              <div>
                <h3 className="sectionTitle">Proof Of address</h3>
                <div className="formGrid">
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
              <div className="noteContainer">
                <p className="noteText">
                  Please note that the documents should not be older then 75 days
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="buttonContainer">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="submitButton"
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