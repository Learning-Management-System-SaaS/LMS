// src/App.tsx

import React, { useState } from 'react';
import ManageSubscriptions from '../components/manageSubscription';
import AddSubscriptionForm from '../components/subscriptionForm';
import { Subscription,mockSubscriptions } from '../../../data/mockData';
type CurrentView = 'manage' | 'add';

const SubscriptionPage = () => {
  const [currentView, setCurrentView] = useState<CurrentView>('manage');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);

  const handleAddSubscriptionClick = () => {
    setCurrentView('add');
  };

  const handleBackToManage = () => {
    setCurrentView('manage');
  };

  const handleSubmitNewSubscription = (formData: any) => {
    // In a real app, you'd send this to an API and get a real ID.
    // For now, generate a mock ID and add it to the list.
    const newSubscription: Subscription = {
      id: `SUB${String(subscriptions.length + 1).padStart(3, '0')}`,
      user: formData.user,
      plan: formData.plan,
      status: 'Active', // Default status for new subscriptions
      renewalDate: new Date(formData.startDate).toISOString().split('T')[0], // Simplified
    };
    setSubscriptions((prev) => [...prev, newSubscription]);
    setCurrentView('manage'); // Go back to the table view
    alert('Subscription added successfully!');
  };

  const handleDeleteSubscription = (idToDelete: string) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== idToDelete));
    alert(`Subscription ${idToDelete} deleted successfully!`);
  };

  // Placeholder for edit functionality - not fully implemented based on image scope
  const handleEditSubscription = (subscriptionId: string) => {
    alert(`Editing subscription: ${subscriptionId} (Not fully implemented yet)`);
    // Here you would likely navigate to an edit form, pre-populating fields.
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* <HeaderNav activeTab="Subscriptions" /> */}

      <div className="px-8 py-4">
        {currentView === 'manage' && (
          <ManageSubscriptions
            onAddSubscription={handleAddSubscriptionClick}
            // onEditSubscription={handleEditSubscription}
            onDeleteSubscription={handleDeleteSubscription}
            // subscriptions={subscriptions}
          />
        )}
        {currentView === 'add' && (
          <AddSubscriptionForm
            onBack={handleBackToManage}
            onSubmit={handleSubmitNewSubscription}
          />
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;