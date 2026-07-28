import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Car, Edit2, Trash2, Star, X, Check, AlertTriangle } from 'lucide-react';
import '../styles/VehiclePage.css';

const VehiclePage = () => {
    const navigate = useNavigate();
    
    const [vehicles, setVehicles] = useState([
        {
            id: 1,
            name: 'My Tesla',
            manufacturer: 'Tesla',
            model: 'Model 3',
            year: '2023',
            battery: '75 kWh',
            connector: 'CCS2',
            registration: 'ABC-1234',
            color: 'Pearl White',
            isDefault: true
        }
    ]);
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [formData, setFormData] = useState({
        name: '', manufacturer: '', model: '', year: '',
        battery: '', connector: '', registration: '', color: ''
    });
    const [errors, setErrors] = useState({});

    const handleBack = () => navigate(-1);

    const openAddModal = () => {
        setFormData({
            name: '', manufacturer: '', model: '', year: '',
            battery: '', connector: '', registration: '', color: ''
        });
        setErrors({});
        setEditingVehicle(null);
        setShowAddModal(true);
    };

    const openEditModal = (vehicle) => {
        setFormData(vehicle);
        setErrors({});
        setEditingVehicle(vehicle);
        setShowAddModal(true);
    };

    const validateForm = () => {
        const e = {};
        if (!formData.name.trim()) e.name = 'Vehicle name required';
        if (!formData.manufacturer.trim()) e.manufacturer = 'Manufacturer required';
        if (!formData.model.trim()) e.model = 'Model required';
        if (!formData.year.trim()) e.year = 'Year required';
        if (!formData.registration.trim()) e.registration = 'Registration required';
        return e;
    };

    const handleSave = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (editingVehicle) {
            setVehicles(vehicles.map(v => v.id === editingVehicle.id ? { ...formData, id: v.id, isDefault: v.isDefault } : v));
        } else {
            const newId = Math.max(...vehicles.map(v => v.id), 0) + 1;
            setVehicles([...vehicles, { ...formData, id: newId, isDefault: vehicles.length === 0 }]);
        }
        setShowAddModal(false);
    };

    const handleSetDefault = (id) => {
        setVehicles(vehicles.map(v => ({ ...v, isDefault: v.id === id })));
    };

    const handleDelete = () => {
        if (deleteConfirm) {
            setVehicles(vehicles.filter(v => v.id !== deleteConfirm));
            setDeleteConfirm(null);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => { const copy = { ...prev }; delete copy[field]; return copy; });
        }
    };

    return (
        <div className="vehicle-page">
            <header className="vehicle-header">
                <div className="vehicle-header__left">
                    <button className="vehicle-header__back" onClick={handleBack} aria-label="Go back">
                        <ArrowLeft size={22} strokeWidth={2.2} />
                    </button>
                    <h1 className="vehicle-header__title">My Vehicles</h1>
                </div>
                <button className="vehicle-header__add" onClick={openAddModal} aria-label="Add vehicle">
                    <Plus size={22} strokeWidth={2.2} />
                </button>
            </header>

            <div className="vehicle-content">
                {vehicles.length === 0 ? (
                    <div className="vehicle-empty">
                        <div className="vehicle-empty__icon">
                            <Car size={50} strokeWidth={1.5} />
                        </div>
                        <h2 className="vehicle-empty__title">No Vehicles Yet</h2>
                        <p className="vehicle-empty__desc">Add your first vehicle to start tracking<br/>charging sessions and reservations.</p>
                        <button className="vehicle-empty__btn" onClick={openAddModal}>
                            <Plus size={18} /> Add Your Vehicle
                        </button>
                    </div>
                ) : (
                    <div className="vehicle-list">
                        {vehicles.map((vehicle) => (
                            <div key={vehicle.id} className={`vehicle-card ${vehicle.isDefault ? 'vehicle-card--default' : ''}`}>
                                <div className="vehicle-card__header">
                                    <div className="vehicle-card__image">
                                        <Car size={40} strokeWidth={1.5} />
                                    </div>
                                    <div className="vehicle-card__info">
                                        <h3 className="vehicle-card__name">{vehicle.name}</h3>
                                        <p className="vehicle-card__manufacturer">{vehicle.manufacturer} {vehicle.model}</p>
                                        {vehicle.isDefault && (
                                            <span className="vehicle-card__badge">
                                                <Star size={12} fill="white" /> Default
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="vehicle-card__details">
                                    <div className="vehicle-detail">
                                        <span className="vehicle-detail__label">Year</span>
                                        <span className="vehicle-detail__value">{vehicle.year}</span>
                                    </div>
                                    <div className="vehicle-detail">
                                        <span className="vehicle-detail__label">Battery</span>
                                        <span className="vehicle-detail__value">{vehicle.battery}</span>
                                    </div>
                                    <div className="vehicle-detail">
                                        <span className="vehicle-detail__label">Connector</span>
                                        <span className="vehicle-detail__value">{vehicle.connector}</span>
                                    </div>
                                    <div className="vehicle-detail">
                                        <span className="vehicle-detail__label">Registration</span>
                                        <span className="vehicle-detail__value">{vehicle.registration}</span>
                                    </div>
                                </div>
                                <div className="vehicle-card__actions">
                                    {!vehicle.isDefault && (
                                        <button className="vehicle-action-btn vehicle-action-btn--default" onClick={() => handleSetDefault(vehicle.id)}>
                                            <Star size={16} /> Set Default
                                        </button>
                                    )}
                                    <button className="vehicle-action-btn vehicle-action-btn--edit" onClick={() => openEditModal(vehicle)}>
                                        <Edit2 size={16} /> Edit
                                    </button>
                                    <button className="vehicle-action-btn vehicle-action-btn--delete" onClick={() => setDeleteConfirm(vehicle.id)}>
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div className="vehicle-modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="vehicle-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="vehicle-modal__header">
                            <h2 className="vehicle-modal__title">{editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
                            <button className="vehicle-modal__close" onClick={() => setShowAddModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="vehicle-form">
                            <div className="vehicle-field vehicle-form__full">
                                <label className="vehicle-field__label">Vehicle Name</label>
                                <input type="text" className={`vehicle-field__input ${errors.name ? 'vehicle-field__input--error' : ''}`} placeholder="e.g., My Tesla" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                                {errors.name && <span className="vehicle-field__error"><X size={12} /> {errors.name}</span>}
                            </div>
                            <div className="vehicle-field">
                                <label className="vehicle-field__label">Manufacturer</label>
                                <input type="text" className={`vehicle-field__input ${errors.manufacturer ? 'vehicle-field__input--error' : ''}`} placeholder="Tesla" value={formData.manufacturer} onChange={(e) => handleChange('manufacturer', e.target.value)} />
                                {errors.manufacturer && <span className="vehicle-field__error"><X size={12} /> {errors.manufacturer}</span>}
                            </div>
                            <div className="vehicle-field">
                                <label className="vehicle-field__label">Model</label>
                                <input type="text" className={`vehicle-field__input ${errors.model ? 'vehicle-field__input--error' : ''}`} placeholder="Model 3" value={formData.model} onChange={(e) => handleChange('model', e.target.value)} />
                                {errors.model && <span className="vehicle-field__error"><X size={12} /> {errors.model}</span>}
                            </div>
                            <div className="vehicle-field">
                                <label className="vehicle-field__label">Year</label>
                                <input type="text" className={`vehicle-field__input ${errors.year ? 'vehicle-field__input--error' : ''}`} placeholder="2023" value={formData.year} onChange={(e) => handleChange('year', e.target.value)} />
                                {errors.year && <span className="vehicle-field__error"><X size={12} /> {errors.year}</span>}
                            </div>
                            <div className="vehicle-field">
                                <label className="vehicle-field__label">Battery Capacity</label>
                                <input type="text" className="vehicle-field__input" placeholder="75 kWh" value={formData.battery} onChange={(e) => handleChange('battery', e.target.value)} />
                            </div>
                            <div className="vehicle-field">
                                <label className="vehicle-field__label">Connector Type</label>
                                <select className="vehicle-field__select" value={formData.connector} onChange={(e) => handleChange('connector', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="CCS2">CCS2</option>
                                    <option value="Type 2">Type 2</option>
                                    <option value="CHAdeMO">CHAdeMO</option>
                                    <option value="Auto Detect">Auto Detect</option>
                                </select>
                            </div>
                            <div className="vehicle-field vehicle-form__full">
                                <label className="vehicle-field__label">Registration Number</label>
                                <input type="text" className={`vehicle-field__input ${errors.registration ? 'vehicle-field__input--error' : ''}`} placeholder="ABC-1234" value={formData.registration} onChange={(e) => handleChange('registration', e.target.value)} />
                                {errors.registration && <span className="vehicle-field__error"><X size={12} /> {errors.registration}</span>}
                            </div>
                            <div className="vehicle-field vehicle-form__full">
                                <label className="vehicle-field__label">Vehicle Color</label>
                                <input type="text" className="vehicle-field__input" placeholder="Pearl White" value={formData.color} onChange={(e) => handleChange('color', e.target.value)} />
                            </div>
                        </div>
                        <div className="vehicle-modal__footer">
                            <button className="vehicle-modal__btn vehicle-modal__btn--secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="vehicle-modal__btn vehicle-modal__btn--primary" onClick={handleSave}>
                                <Check size={18} /> {editingVehicle ? 'Save Changes' : 'Add Vehicle'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            {deleteConfirm && (
                <div className="delete-dialog-overlay" onClick={() => setDeleteConfirm(null)}>
                    <div className="delete-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="delete-dialog__icon">
                            <AlertTriangle size={30} />
                        </div>
                        <h3 className="delete-dialog__title">Delete Vehicle?</h3>
                        <p className="delete-dialog__desc">This action cannot be undone. Are you sure you want to delete this vehicle?</p>
                        <div className="delete-dialog__actions">
                            <button className="delete-dialog__btn delete-dialog__btn--cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                            <button className="delete-dialog__btn delete-dialog__btn--delete" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VehiclePage;
