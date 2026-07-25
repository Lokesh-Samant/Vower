import  LoginForm  from './LoginForm'
import  RegisterForm  from './RegisterForm'
export default function AuthPage(){
  return (<>
    <LoginForm/>      //Edit this in such a way that it will show only one form at a time.
    <RegisterForm/>
  </>
}