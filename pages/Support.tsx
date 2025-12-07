import React, { useState } from 'react';
import { COMPANY_DETAILS } from '../constants';
import { Mail, MapPin, Phone, Send, MessageSquare } from 'lucide-react';

const Support: React.FC = () => {
  const [formData, setFormData] = useState({ subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Logic to send email would go here
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900">How can we help you?</h2>
        <p className="text-slate-500 mt-2 text-lg">Our dedicated team at Rakesh Associates is here to assist you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-lg">
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-200 mt-1" />
                <div>
                  <p className="font-semibold text-blue-100 text-sm uppercase tracking-wide">Office Address</p>
                  <p className="mt-1 leading-relaxed">{COMPANY_DETAILS.address}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <UserCard name={COMPANY_DETAILS.fundManager} role="Fund Manager" />
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-blue-200 mt-1" />
                <div>
                  <p className="font-semibold text-blue-100 text-sm uppercase tracking-wide">Email Us</p>
                  <p className="mt-1">{COMPANY_DETAILS.email}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h4 className="font-semibold text-slate-900 mb-2">Business Hours</h4>
            <p className="text-slate-500 text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-slate-500 text-sm">Saturday: 10:00 AM - 2:00 PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <MessageSquare className="text-blue-600" size={24} />
              <h3 className="text-xl font-bold text-slate-900">Send us a message</h3>
            </div>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-100 rounded-xl p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <Send className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-green-900">Message Sent Successfully!</h3>
                <p className="mt-2 text-green-600">We have received your query and will get back to you within 24 hours.</p>
                <button 
                  onClick={() => { setSubmitted(false); setFormData({subject: '', message: ''}) }}
                  className="mt-6 px-4 py-2 text-sm font-medium text-green-700 bg-white border border-green-200 rounded-lg hover:bg-green-50"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                  <select 
                    required
                    className="block w-full border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  >
                    <option value="">Select a topic</option>
                    <option value="withdrawal">Withdrawal Query</option>
                    <option value="investment">New Investment</option>
                    <option value="profile">Profile Update</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    className="block w-full border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-3"
                    placeholder="Describe your query in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                  >
                    Send Message
                    <Send className="ml-2 -mr-1 h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserCard = ({ name, role }: any) => (
  <div className="flex items-center">
    <div className="flex-shrink-0">
      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold border-2 border-blue-400">
        {name.charAt(0)}
      </div>
    </div>
    <div className="ml-3">
      <p className="text-sm font-medium text-white">{name}</p>
      <p className="text-xs text-blue-200">{role}</p>
    </div>
  </div>
);

export default Support;