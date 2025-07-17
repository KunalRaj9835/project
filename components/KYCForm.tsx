'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import IdVerification from './IdVerification';
import AddressVerification from './AddressVerification';

interface IdFormData {
  idType: string;
  idNumber: string;
  issueDate: string;
  expiryDate: string;
  idFrontFile: File | null;
  idBackFile: File | null;
}

interface AddressFormData {
  addressType: string;
  addressIssueDate: string;
  addressFrontFile: File | null;
  addressBackFile: File | null;
  termsAccepted: boolean;
}

interface CompleteFormData extends IdFormData, AddressFormData {}

const KYCForm: React.FC = () => {
  const router = useRouter(); // ✅ Added router
  const [currentStep, setCurrentStep] = useState<'id' | 'address' | 'complete'>('id');
  const [idData, setIdData] = useState<IdFormData | null>(null);
  const [addressData, setAddressData] = useState<AddressFormData | null>(null);

  const handleIdSubmit = (data: IdFormData) => {
    setIdData(data);
    setCurrentStep('address');
  };

  const handleAddressSubmit = (data: AddressFormData) => {
    setAddressData(data);

    if (idData) {
      const completeData: CompleteFormData = {
        ...idData,
        ...data
      };

      console.log('Complete KYC data:', completeData);

      // ✅ Automatically redirect without alert
      router.push('/dashboard');
    }
  };

  const handleBackToId = () => {
    setCurrentStep('id');
  };

  if (currentStep === 'id') {
    return (
      <IdVerification
        onSubmit={handleIdSubmit}
        initialData={idData || {}}
      />
    );
  }

  if (currentStep === 'address') {
    return (
      <AddressVerification
        onSubmit={handleAddressSubmit}
        onBack={handleBackToId}
        initialData={addressData || {}}
      />
    );
  }

  return null;
};

export default KYCForm;
