import { useEffect, useState } from 'react';
import {Formik, Form, Field} from "formik";
import {Route, Routes, Link } from 'react-router-dom';
import '../style/App.scss';
import { login, get_posts_id, register } from '../ducks/actions';
import Diary from './Diary';

function App() {

  const [user, setUser] = useState();

  const ValidateLogin = () => {return true}
  const ValidatePassword = () => {}
  const handleLogin = async (values, actions) => {
    const result = await login(values);
    if (result.status === 200){
      setUser({login: values.login, id: result.data.id});
    }
  }
  const handleRegister = async (values, actions) => {
    const result = await register(values);
    if (result.status === 200){
      console.log(result)
      setUser({login: values.login, id: result.data});
    }
  }

  useEffect(() => {
    
  },[user])

    
  return (
    <div className="App">
      <div className="back" />
      <div className="head">My Diary</div>
      <div className="content">
        {user ? (
          <div className="book">
            {/* <DiaryPage user={user}/>
            <div className="pod">
              <div className="hello">Hello {user.login}!</div>
              <DiaryForm user={user}/>
            </div> */}
            <Diary user={user}/>
          </div>
          
        ):(
          <div className="pod">
            <Formik
                initialValues={{
                    login: '',
                    password: ''
                }}
                onSubmit={(values,actions) => handleLogin(values,actions)}
                enableReinitialize = {true} className="Formik">
                {({ errors, touched, isValidating }) => (
                    <Form className="Form" id="col">
                      {/* <div className="hello">Welcome</div> */}
                        <div className="hello">login</div>
                        <Field name="login" className="pole"/>
                        {/* {errors.login && touched.login && <div className="sorry">{errors.login}</div>}
                        {login_error !== "" && <div className="sorry">{login_error}</div>} */}
                        {/* <div className="pole">password</div> */}
                        <Field type="password" name="password" className="pole"/>
                        {/* {errors.password && touched.password && <div className="sorry">{errors.password}</div>}
                        {password_error !== "" && <div className="sorry">{password_error}</div>} */}
                        <button type="submit" className="pole">
                          submit
                        </button>
                    </Form>
                )}
            </Formik>
            <Formik
                initialValues={{
                    login: '',
                    password: ''
                }}
                onSubmit={(values,actions) => handleRegister(values,actions)}
                enableReinitialize = {true} className="Formik">
                {({ errors, touched, isValidating }) => (
                    <Form className="Form" id="col">
                        <div className="hello">register</div>
                        <Field name="login" className="pole"/>
                        <Field type="password" name="password" className="pole"/>
                        <button type="submit" className="pole">
                          submit
                        </button>
                    </Form>
                )}
            </Formik>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;
