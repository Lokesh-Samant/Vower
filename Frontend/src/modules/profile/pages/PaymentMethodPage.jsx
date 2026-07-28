import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Check, Loader2, Plus, X, Trash2, Star } from 'lucide-react';
import '../styles/PaymentMethodPage.css';

const PaymentMethodPage = () => {
    const navigate = useNavigate();
    
    const [methods, setMethods] = useState([
        { id: 1, type: 'card', name: 'Visa ending in 4242', isDefault: true },
        { id: 2, type: 'upi', name: 'user@okaxis', isDefault: false },
    ]);
    const [selectedId, setSelectedId] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [newPayment, setNewPayment] = useState({ cardNumber: '', expiry: '', cvv: '', name: '' });
    const [errors, setErrors] = useState({});

    const methodTypes = [
        { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, class: 'pay-method--card' },
        { id: 'upi', name: 'UPI', icon: Star, class: 'pay-method--upi' },
        { id: 'wallet', name: 'Wallet', icon: Star, class: 'pay-method--wallet' },
        { id: 'netbanking', name: 'Net Banking', icon: Star, class: 'pay-method--netbanking' },
    ];

    const handleBack = () => {
        if (!saving && !saved) {
            navigate(-1);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        localStorage.setItem('paymentMethods', JSON.stringify(methods));
        localStorage.setItem('defaultPaymentId', selectedId);
        await new Promise((r) => setTimeout(r, 1000));
        setSaving(false);
        setSaved(true);

        setTimeout(() => {
            navigate('/settings');
        }, 1500);
    };

    const handleSetDefault = (id) => {
        setMethods(methods.map(m => ({ ...m, isDefault: m.id === id })));
        setSelectedId(id);
    };

    const handleRemove = (id) => {
        if (methods.length <= 1) return;
        setMethods(methods.filter(m => m.id !== id));
        if (selectedId === id) {
            setSelectedId(methods[0]?.id);
        }
    };

    const validateCard = () => {
        const e = {};
        if (!newPayment.cardNumber.trim() || newPayment.cardNumber.replace(/\s/g, '').length !== 16) {
            e.cardNumber = 'Enter valid 16-digit card number';
        }
        if (!newPayment.expiry.trim()) {
            e.expiry = 'Expiry date required';
        }
        if (!newPayment.cvv.trim() || newPayment.cvv.length < 3) {
            e.cvv = 'Valid CVV required';
        }
        if (!newPayment.name.trim()) {
            e.name = 'Cardholder name required';
        }
        return e;
    };

    const handleAddCard = () => {
        const validationErrors = validateCard();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newId = Math.max(...methods.map(m => m.id), 0) + 1;
        setMethods([...methods, { 
            id: newId, 
            type: 'card', 
            name: `Card ending in ${newPayment.cardNumber.slice(-4)}`,
            isDefault: methods.length === 0
        }]);
        setShowModal(false);
        setNewPayment({ cardNumber: '', expiry: '', cvv: '', name: '' });
        setErrors({});
    };

    const disabled = saving || saved;

    return (
        <div className="payment-page">
            <header className="pay-header">
                <button 
                    className="pay-header__back" 
                    onClick={handleBack} 
                    aria-label="Go back"
                    disabled={disabled}
                >
                    <ArrowLeft size={22} strokeWidth={2.2} />
                </button>
                <h1 className="pay-header__title">Payment Methods</h1>
            </header>

            <div className="pay-content">
                {saved ? (
                    <div className="pay-success">
                        <div className="pay-success__icon">
                            <Check size={40} strokeWidth={3} />
                        </div>
                        <h2 className="pay-success__title">Payment Updated!</h2>
                        <p className="pay-success__desc">Your payment preferences have been saved.</p>
                    </div>
                ) : (
                    <>
                        <div className="pay-info-card">
                            <div className="pay-info-card__icon">
                                <CreditCard size={40} strokeWidth={2} />
                            </div>
                            <h2 className="pay-info-card__title">Payment Methods</h2>
                            <p className="pay-info-card__desc">
                                Add and manage your payment methods for quick and secure transactions.
                            </p>
                        </div>

                        <div className="pay-section">
                            <h3 className="pay-section__title">Saved Methods</h3>
                            {methods.map((method) => {
                                const TypeIcon = methodTypes.find(t => t.id === method.type)?.icon || CreditCard;
                                const methodClass = methodTypes.find(t => t.id === method.type)?.class || '';
                                return (
                                    <div
                                        key={method.id}
                                        className={`pay-method ${methodClass} ${selectedId === method.id ? 'pay-method--selected' : ''}`}
                                        onClick={() => setSelectedId(method.id)}
                                    >
                                        <div className="pay-method__icon">
                                            <TypeIcon size={24} strokeWidth={2} />
                                        </div>
                                        <div className="pay-method__content">
                                            <h4 className="pay-method__title">{method.name}</h4>
                                            <p className="pay-method__desc">{method.isDefault ? 'Default Payment Method' : ''}</p>
                                        </div>
                                        <div className="pay-method__actions">
                                            {!method.isDefault && (
                                                <button 
                                                    className="pay-method__btn pay-method__btn--default"
                                                    onClick={(e) => { e.stopPropagation(); handleSetDefault(method.id); }}
                                                >
                                                    Set Default
                                                </button>
                                            )}
                                            {methods.length > 1 && (
                                                <button 
                                                    className="pay-method__btn pay-method__btn--remove"
                                                    onClick={(e) => { e.stopPropagation(); handleRemove(method.id); }}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            
                            <button 
                                className="pay-add-btn"
                                onClick={() => setShowModal(true)}
                            >
                                <Plus size={20} />
                                Add Payment Method
                            </button>
                        </div>
                    </>
                )}
            </div>

            {!saved && (
                <div className="pay-footer">
                    <button
                        className="pay-footer__save"
                        onClick={handleSave}
                        disabled={disabled}
                    >
                        {saving ? (
                            <>
                                <Loader2 size={18} className="pay-footer__spinner" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Check size={18} />
                                Save Changes
                            </>
                        )}
                    </button>
                    <button
                        className="pay-footer__cancel"
                        onClick={handleBack}
                        disabled={disabled}
                    >
                        Cancel
                    </button>
                </div>
            )}

            {/* Add Payment Modal */}
            {showModal && (
                <div className="pay-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="pay-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="pay-modal__header">
                            <h2 className="pay-modal__title">Add Card</h2>
                            <button className="pay-modal__close" onClick={() => setShowModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="pay-modal__form">
                            <div className="pay-field">
                                <label className="pay-field__label">Card Number</label>
                                <input
                                    type="text"
                                    className={`pay-field__input ${errors.cardNumber ? 'pay-field__input--error' : ''}`}
                                    placeholder="1234 5678 9012 3456"
                                    value={newPayment.cardNumber}
                                    onChange={(e) => setNewPayment({...newPayment, cardNumber: e.target.value})}
                                    maxLength={19}
                                />
                                {errors.cardNumber && (
                                    <span className="pay-field__error">
                                        <X size={12} /> {errors.cardNumber}
                                    </span>
                                )}
                            </div>

                            <div className="pay-field">
                                <label className="pay-field__label">Cardholder Name</label>
                                <input
                                    type="text"
                                    className={`pay-field__input ${errors.name ? 'pay-field__input--error' : ''}`}
                                    placeholder="John Doe"
                                    value={newPayment.name}
                                    onChange={(e) => setNewPayment({...newPayment, name: e.target.value})}
                                />
                                {errors.name && (
                                    <span className="pay-field__error">
                                        <X size={12} /> {errors.name}
                                    </span>
                                )}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="pay-field">
                                    <label className="pay-field__label">Expiry Date</label>
                                    <input
                                        type="text"
                                        className={`pay-field__input ${errors.expiry ? 'pay-field__input--error' : ''}`}
                                        placeholder="MM/YY"
                                        value={newPayment.expiry}
                                        onChange={(e) => setNewPayment({...newPayment, expiry: e.target.value})}
                                        maxLength={5}
                                    />
                                    {errors.expiry && (
                                        <span className="pay-field__error">
                                            <X size={12} /> {errors.expiry}
                                        </span>
                                    )}
                                </div>

                                <div className="pay-field">
                                    <label className="pay-field__label">CVV</label>
                                    <input
                                        type="text"
                                        className={`pay-field__input ${errors.cvv ? 'pay-field__input--error' : ''}`}
                                        placeholder="123"
                                        value={newPayment.cvv}
                                        onChange={(e) => setNewPayment({...newPayment, cvv: e.target.value})}
                                        maxLength={4}
                                    />
                                    {errors.cvv && (
                                        <span className="pay-field__error">
                                            <X size={12} /> {errors.cvv}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pay-modal__footer">
                            <button 
                                className="pay-modal__btn pay-modal__btn--secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="pay-modal__btn pay-modal__btn--primary"
                                onClick={handleAddCard}
                            >
                                <Plus size={18} />
                                Add Card
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentMethodPage;
