import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, DollarSign, Receipt, AlertCircle, CheckCircle } from 'lucide-react';
import './PaymentHelp.css';

const PaymentHelp = () => {
  const navigate = useNavigate();

  const paymentMethods = [
    {
      icon: <CreditCard size={24} />,
      title: 'Credit/Debit Cards',
      description: 'Visa, Mastercard, American Express accepted. Securely stored for quick checkout.'
    },
    {
      icon: <DollarSign size={24} />,
      title: 'Digital Wallets',
      description: 'Apple Pay, Google Pay, and PayPal supported for contactless payments.'
    },
    {
      icon: <Receipt size={24} />,
      title: 'Automatic Billing',
      description: 'Charges are automatically applied after each charging session ends.'
    }
  ];

  const faqs = [
    {
      question: 'When am I charged?',
      answer: 'You are charged automatically when your charging session ends. The final amount is calculated based on energy delivered and time spent.'
    },
    {
      question: 'How do I view my payment history?',
      answer: 'Go to Profile > Payment History to see all your past transactions and download receipts.'
    },
    {
      question: 'Can I get a refund?',
      answer: 'Refunds for billing errors or overcharges are processed within 5-7 business days. Contact support through the ticket system.'
    },
    {
      question: 'What if my payment fails?',
      answer: 'If payment fails, you\'ll be notified immediately. Update your payment method in Settings > Payment Methods to continue using our services.'
    },
    {
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees. You pay only for the energy consumed and any applicable session fees displayed before charging begins.'
    }
  ];

  return (
    <div className="payment-help-page">
      {/* Header */}
      <div className="payment-header">
        <button className="back-button" onClick={() => navigate('/help')}>
          <ChevronLeft size={24} />
        </button>
        <h1>Payment Help</h1>
        <div style={{ width: 24 }}></div>
      </div>

      <div className="payment-content">
        {/* Introduction */}
        <div className="payment-intro">
          <h2>Payment Information</h2>
          <p>Everything you need to know about payments and billing.</p>
        </div>

        {/* Payment Methods */}
        <div className="payment-methods">
          <h2>Accepted Payment Methods</h2>
          {paymentMethods.map((method, index) => (
            <div key={index} className="method-card">
              <div className="method-icon">{method.icon}</div>
              <div className="method-text">
                <h3>{method.title}</h3>
                <p>{method.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="payment-faqs">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-card">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="payment-actions">
          <button 
            className="btn-secondary"
            onClick={() => navigate('/settings/payment')}
          >
            Manage Payment Methods
          </button>
          <button 
            className="btn-primary"
            onClick={() => navigate('/history')}
          >
            View Payment History
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentHelp;
