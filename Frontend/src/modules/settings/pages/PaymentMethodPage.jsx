import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Plus, Trash2, Star } from 'lucide-react';
import './PaymentMethodPage.css';

const PaymentMethodPage = () => {
    const navigate = useNavigate();
    const [methods, setMethods] = useState([{ id: 1, type: 'card', last4: '4242', brand: 'Visa', default: true }, { id: 2, type: 'upi', upiId: 'user@oksbi', default: false }]);
    const handleBack = () => navigate(-1);
    const handleAdd = () => navigate('/profile/settings/add-payment');
    const handleRemove = (id) => setMethods(m => m.filter(x => x.id !== id));
    const handleSetDefault = (id) => setMethods(m => m.map(x => ({ ...x, default: x.id === id })));

    return (
        <div className="pay-page">
            <header className="pay-header"><button className="pay-header__back" onClick={handleBack}><ArrowLeft size={22} strokeWidth={2.2} /></button><h1 className="pay-header__title">Payment Methods</h1></header>
            <main className="pay-main">
                <div className="pay-list">{methods.map(m => (<div key={m.id} className="pay-item"><div className="pay-item__info"><CreditCard size={24} /><div><span className="pay-item__label">{m.type === 'card' ? `${m.brand} ••${m.last4}` : `UPI: ${m.upiId}`}</span>{m.default && <span className="pay-item__default">Default</span>}</div></div><div className="pay-item__actions">{!m.default && <button className="pay-item__btn" onClick={() => handleSetDefault(m.id)}><Star size={18} /> Set Default</button>}<button className="pay-item__btn pay-item__btn--danger" onClick={() => handleRemove(m.id)}><Trash2 size={18} /> Remove</button></div></div>))}</div>
                <button className="pay-add-btn" onClick={handleAdd}><Plus size={20} /> Add Payment Method</button>
            </main>
        </div>
    );
};
export default PaymentMethodPage;
