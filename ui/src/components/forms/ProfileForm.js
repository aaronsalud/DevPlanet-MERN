import React, { useState } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListFieldGroup from '../common/SelectListFieldGroup';
import InputFieldGroup from '../common/InputFieldGroup';
import { Link } from 'react-router-dom';

const ProfileForm = ({ formData, setFormData, onSubmit, errors, heading, subheading }) => {

    const [showSocialInputs, setShowSocialInputs] = useState(false)
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const formInputs = [
        { name: 'handle', placeholder: '* Profile handle', info: 'A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN\'T be changed later)', type: 'text' },
        { name: 'status', info: 'Give us an idea of where you are at in your career', type: 'select' },
        { name: 'company', placeholder: 'Company', info: 'Could be your own company or one you work for', type: 'text' },
        { name: 'website', placeholder: 'Website', info: 'Could be your own or a company website', type: 'text' },
        { name: 'location', placeholder: 'Location', info: 'City & state suggested (eg. Toronto, ON)' , type: 'text'},
        { name: 'skills', placeholder: 'Skills', info: 'Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)' , type: 'text'},
        { name: 'githubusername', placeholder: 'GitHub Username', info: 'If you want your latest repos and a Github link, include your username' , type: 'text'},
        { name: 'bio', placeholder: 'A short bio of yourself"', info: 'Tell us about yourself' , type: 'textarea'}
    ];

    const socialInputs = [
        { name: 'twitter', placeholder: 'Twitter Profile URL' },
        { name: 'facebook', placeholder: 'Facebook Page URL' },
        { name: 'linkedin', placeholder: 'LinkedIn Profile URL' },
        { name: 'youtube', placeholder: 'Youtube Channel URL' },
        { name: 'instagram', placeholder: 'Instagram Page URL' },
    ];

    // Select options for status
    const options = [
        { label: '* Select Professional Status', value: '0' },
        { label: 'Developer', value: 'Developer' },
        { label: 'Junior Developer', value: 'Junior Developer' },
        { label: 'Senior Developer', value: 'Senior Developer' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Student or Learning', value: 'Student or Learning' },
        { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Other', value: 'Other' }
    ];

    const loadInputs = (inputs) => {
        return <div>
            {inputs.map(({ name, placeholder, info, type }) => {
                switch (type) {
                    case 'select':
                        return <SelectListFieldGroup name={name} value={formData[name]} onChange={onChange} error={errors[name]} info={info} options={options} />
                    case 'text':
                        return <TextFieldGroup placeholder={placeholder} name={name} value={formData[name]} onChange={onChange} error={errors[name]} info={info} />
                    case 'textarea':
                        return <TextAreaFieldGroup placeholder={placeholder} name={name} value={formData[name]} onChange={onChange} error={errors[name]} info={info} />
                    default:
                        return <InputFieldGroup placeholder={placeholder} name={name} icon={`fab fa-${name}`} value={formData[name]} onChange={onChange} error={errors[name]} info={info} />
                }
            })}
        </div>
    };

    return (
        <div className="profile-form">
            <div className="container">
                <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                <div className="row">
                    <div className="col-md-8 m-auto">
                        {heading && <h1 className="display-4 text-center">{heading}</h1>}
                        {subheading && <p className="lead text-center">{subheading}</p>}
                        <small className="d-block pb-3">* = required field</small>
                        <form onSubmit={onSubmit}>
                            {loadInputs(formInputs)}
                            <div className="mb-3">
                                <button type="button" onClick={() => setShowSocialInputs(!showSocialInputs)} className="btn btn-light">
                                    Add Social Network Links
                                </button>
                                <span className="text-muted">Optional</span>
                            </div>
                            {showSocialInputs && loadInputs(socialInputs)}
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProfileForm;