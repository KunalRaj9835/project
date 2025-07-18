'use client';

import React, { useState } from 'react';
import { Upload, FileText, Calendar } from 'lucide-react';
import './IdVerification.css';

// Progress Bar Component
const ProgressBar = ({ currentStep = 1, totalSteps = 2 }) => {
  return (
    <div className="progressContainer">
      <div className="progressWrapper">
        {/* Step 1 */}
        <div className="stepContainer">
          <div className={`progressBar ${currentStep >= 1 ? 'progressBarActive' : 'progressBarInactive'}`}></div>
          <span className={`stepLabel ${currentStep >= 1 ? 'stepLabelActive' : 'stepLabelInactive'}`}>
            ID Proof
          </span>
        </div>

        {/* Step 2 */}
        <div className="stepContainer">
          <div className={`progressBar ${currentStep >= 2 ? 'progressBarActive' : 'progressBarInactive'}`}></div>
          <span className={`stepLabel ${currentStep >= 2 ? 'stepLabelActive' : 'stepLabelInactive'}`}>
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
    <div className="formFieldsContainer">
      {/* ID Type */}
      <div>
        <label className="fieldLabel">ID Type</label>
        <select
          name="idType"
          value={formData.idType}
          onChange={onInputChange}
          className={`selectField ${errors.idType ? 'fieldError' : 'fieldNormal'}`}
        >
          <option value="">Select ID Type</option>
          {idTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        {errors.idType && <p className="errorText">{errors.idType}</p>}
      </div>

      {/* ID Number */}
      <div>
        <label className="fieldLabel">ID Number</label>
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={onInputChange}
          className={`inputField ${errors.idNumber ? 'fieldError' : 'fieldNormal'}`}
          placeholder="Enter ID Number"
        />
        {errors.idNumber && <p className="errorText">{errors.idNumber}</p>}
      </div>

      {/* Issue Date */}
      <div>
        <label className="fieldLabel">Issue Date</label>
        <input
          type="date"
          name="issueDate"
          value={formData.issueDate}
          onChange={onInputChange}
          className={`inputField ${errors.issueDate ? 'fieldError' : 'fieldNormal'}`}
        />
        {errors.issueDate && <p className="errorText">{errors.issueDate}</p>}
      </div>

      {/* Expiry Date */}
      <div>
        <label className="fieldLabel">Expiry Date</label>
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={onInputChange}
          className={`inputField ${errors.expiryDate ? 'fieldError' : 'fieldNormal'}`}
        />
        {errors.expiryDate && <p className="errorText">{errors.expiryDate}</p>}
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

  const getUploadAreaClasses = () => {
    if (isDragOver) return 'uploadArea uploadAreaDragOver';
    if (error) return 'uploadArea uploadAreaError';
    return 'uploadArea uploadAreaNormal';
  };

  return (
    <div className="uploadContainer">
      <label className="fieldLabel">{label}</label>
      <div 
        className={getUploadAreaClasses()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          name={name}
          accept="image/*,application/pdf"
          onChange={onChange}
          className="hiddenInput"
          id={name}
        />
        <label htmlFor={name} className="uploadLabel">
          <Upload className="uploadIcon" />
          <div className="uploadTextContainer">
            <p className="uploadMainText">
              {file ? file.name : 'Browse Files'}
            </p>
            <p className="uploadSubText">Drag and drop files here</p>
          </div>
        </label>
      </div>
      {error && <p className="errorText">{error}</p>}
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
    <div className="pageContainer">
      <div className="contentContainer">
        {/* Header */}
        <div className="headerContainer">

        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={1} totalSteps={2} />

        {/* Form Card */}
        <div className="formCard">
          <div className="formContent">
            <div className="formHeader">
              <h2 className="formTitle">Upload your Identity Proof</h2>
              <p className="formSubtitle">Passports and driving licenses are accepted</p>
            </div>

            <div>
              <div className="formGrid">
                {/* Left Column - Form Fields */}
                <div className="formFieldsContainer">
                  <IDForm 
                    formData={formData}
                    onInputChange={handleInputChange}
                    errors={errors}
                  />
                </div>

                {/* Right Column - File Uploads */}
                <div className="formFieldsContainer">
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
              <div className="submitButtonContainer">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="submitButton"
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