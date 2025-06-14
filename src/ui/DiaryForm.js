import {Formik, Form, Field} from "formik";
import { post_post } from "../ducks/actions";
import '../style/DiaryForm.scss';

function DiaryForm(props) {

    const user = props.user;
    var today = new Date().toLocaleDateString('en-GB');
    // var currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    const handleSubmit = async (values, actions) => {
        const new_post = {
            text: values.content,
            date: new Date(),
            author: user.id
        }
        const result = await post_post(new_post)
        if (result.status === 200){
            actions.resetForm({
                content: ''
            })
        }

    }

    return (
        <div className="DiaryForm">
            <Formik
                initialValues={{
                    content: ''
                }}
                onSubmit={(values,actions) => handleSubmit(values,actions)}>
                {({ errors, touched, isValidating }) => (
                    <Form className="Form" id="col">
                        <div className="pole" id="opt">
                            <div className="fancy">Date:</div>
                            <div>{today}</div>
                        </div>
                        <Field name="content" className="pole" id="textarea" as="textarea"/>
                        <div className="pole" id="opt">
                            <div className="fancy">By:</div>
                            <div>{user.login}</div>
                        </div>
                        <button type="submit" className="pole">
                        submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default DiaryForm;
