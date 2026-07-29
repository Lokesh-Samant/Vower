import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Check } from 'lucide-react';
import './AddPaymentMethodPage.css';

const AddPaymentMethodPage = () => {
    const navigate = useNavigate();
    const [method, setMethod] = useState('card');
    const [saved, setSaved] = useState(false);
    const handleBack = () => navigate(-1);
    const handleSave = async () => { await new Promise(r => setTimeout(r, 1000)); setSaved(true); setTimeout(() => navigate(-1), 1500); };
    const methods = [{ id: 'card', label: 'Credit/Debit Card' }, { id: 'upi', label: 'UPI' }, { id: 'wallet', label: 'Wallet' }, { id: 'netbanking', label: 'Net Banking' }];

    return (
        <div className="add-pay-page">
            <header className="add-pay-header"><button className="add-pay-header__back" onClick={handleBack}><ArrowLeft size={22} strokeWidth={2.2} /></button><h1 className="add-pay-header__title">Add Payment Method</h1></header>
            <main className="add-pay-main">
                {saved ? (<div className="add-pay-success"><Check size={48} /><h3>Payment Method Added!</h3></div>) : (<><div className="add-pay-methods">{methods.map(m => (<label key={m.id} className={`add-pay-option ${method === m.id ? 'add-pay-option--selected' : ''}`}><input type="radio" name="method" checked={method === m.id} onChange={() => setMethod(m.id)} hidden /><CreditCard size={20} /><span>{m.label}</span></label>))}</div><div className="add-pay-form"><input type="text" placeholder={method === 'card' ? 'Card Number' : method === 'upi' ? 'UPI ID' : 'Account'} className="add-pay-input" /><input type="text" placeholder="Name on Card" className="add-pay-input" disabled={method !== 'card'} /></div><button className="add-pay-save-btn" onClick={handleSave}>Save Payment Method</button></>)}
            </main>
        </div>
    );
};
export default AddPaymentMethodPage;
