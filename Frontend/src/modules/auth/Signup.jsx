import { useState } from 'react'
import BrandPanel from './components/BrandPanel.jsx'
import MethodSelect from './components/MethodSelect.jsx'
import SignupEmailPage from './components/SignupEmailPage.jsx'
import PhoneForm from './components/PhoneForm.jsx'
import OtpStep from './components/OtpStep.jsx'

export default function Signup() {
  const [step, setStep] = useState('method')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  function handleMethodSelect(method) {
    if (method === 'email') setStep('emailForm')
    else if (method === 'phone') setStep('phoneForm')
    else if (method === 'google') {
      alert('Google sign-up coming soon!')
    }
  }

  function renderStep() {
    switch (step) {
      case 'method':
        return <MethodSelect onSelect={handleMethodSelect} />

      case 'emailForm':
        return (
          <SignupEmailPage
            onBack={() => setStep('method')}
            onSubmitted={(values) => {
              setEmail(values.email)
              setStep('emailOtp')
            }}
          />
        )

      case 'emailOtp':
        return (
          <OtpStep
            mode="email"
            contact={email}
            onBack={() => setStep('emailForm')}
            onVerified={() => {
              alert('Account verified. Welcome to Vower!')
            }}
          />
        )

      case 'phoneForm':
        return (
          <PhoneForm
            onBack={() => setStep('method')}
            onSubmitted={(values) => {
              setPhone(values.phone)
              setStep('phoneOtp')
            }}
          />
        )

      case 'phoneOtp':
        return (
          <OtpStep
            mode="phone"
            contact={phone}
            onBack={() => setStep('phoneForm')}
            onVerified={() => {
              alert('Account verified. Welcome to Vower!')
            }}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-[#F5F5F7]">
      <BrandPanel />

      <div className="flex w-full flex-1 items-center justify-center px-6 py-12 lg:w-1/2 bg-[#F5F5F7]">
        {renderStep()}
      </div>
    </div>
  )
}
