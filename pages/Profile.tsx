import React from 'react';
import { MOCK_USER } from '../constants';
import { User, Mail, CreditCard, Shield, Edit2 } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">My Profile</h2>
        <p className="text-slate-500 mt-2">Manage your personal information and account settings.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Profile Header Background */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400"></div>
        
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="flex items-end">
              <div className="bg-white p-2 rounded-full shadow-md">
                <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-50 text-slate-400">
                  <User size={48} />
                </div>
              </div>
              <div className="ml-4 mb-2">
                <h3 className="text-2xl font-bold text-slate-900">{MOCK_USER.name}</h3>
                <p className="text-slate-500">Investor</p>
              </div>
            </div>
            <button className="hidden sm:flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors">
              <Edit2 size={16} className="mr-2" />
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl p-6">
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Personal Information
                </h4>
                <div className="space-y-4">
                  <ProfileField label="Full Name" value={MOCK_USER.name} icon={User} />
                  <ProfileField label="Email Address" value={MOCK_USER.email} icon={Mail} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl p-6">
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                  KYC & Tax Details
                </h4>
                <div className="space-y-4">
                  <ProfileField label="PAN Number" value={MOCK_USER.panNumber} icon={CreditCard} mono />
                  <div className="flex items-center space-x-2 text-sm text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg mt-2">
                    <Shield size={14} />
                    <span className="font-medium">KYC Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value, icon: Icon, mono }: any) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mt-1">
      <Icon className="h-5 w-5 text-slate-400" />
    </div>
    <div className="ml-3 w-full border-b border-slate-200 pb-2">
      <p className="text-xs font-medium text-slate-500 uppercase">{label}</p>
      <p className={`text-base text-slate-900 mt-0.5 ${mono ? 'font-mono' : 'font-medium'}`}>{value}</p>
    </div>
  </div>
);

export default Profile;