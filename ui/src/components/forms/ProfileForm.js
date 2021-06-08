import React, { useState } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListFieldGroup from '../common/SelectListFieldGroup';
import InputFieldGroup from '../common/InputFieldGroup';
import { Link } from 'react-router-dom';

const ProfileForm = ({ formData, setFormData, onSubmit, errors, heading, subheading }) => {

    const [showSocialInputs, setShowSocialInputs] = useState(false)
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const loadSocialInputs = () => (
        <div>
            <InputFieldGroup
                placeholder="Twitter Profile URL"
                name="twitter"
                icon="fab fa-twitter"
                value={formData.twitter}
                onChange={onChange}
                error={errors.twitter}
            />
            <InputFieldGroup
                placeholder="Facebook Page URL"
                name="facebook"
                icon="fab fa-facebook"
                value={formData.facebook}
                onChange={onChange}
                error={errors.facebook}
            />

            <InputFieldGroup
                placeholder="Linkedin Profile URL"
                name="linkedin"
                icon="fab fa-linkedin"
                value={formData.linkedin}
                onChange={onChange}
                error={errors.linkedin}
            />
            <InputFieldGroup
                placeholder="Youtube Channel URL"
                name="youtube"
                icon="fab fa-youtube"
                value={formData.youtube}
                onChange={onChange}
                error={errors.youtube}
            />

            <InputFieldGroup
                placeholder="Instagram Page URL"
                name="instagram"
                icon="fab fa-instagram"
                value={formData.instagram}
                onChange={onChange}
                error={errors.instagram}
            />
        </div>
    );

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
                            <TextFieldGroup
                                placeholder="* Profile handle"
                                name="handle"
                                value={formData.handle}
                                onChange={onChange}
                                error={errors.handle}
                                info="A unique handle for your profile URL. Your full name,
                      company name, nickname, etc (This CAN'T be changed later)"
                            />

                            <SelectListFieldGroup
                                name="status"
                                value={formData.status}
                                onChange={onChange}
                                error={errors.status}
                                info=" Give us an idea of where you are at in your career"
                                options={options}
                            />

                            <TextFieldGroup
                                placeholder="Company"
                                name="company"
                                value={formData.company}
                                onChange={onChange}
                                error={errors.company}
                                info="Could be your own company or one you work for"
                            />

                            <TextFieldGroup
                                placeholder="Website"
                                name="website"
                                value={formData.website}
                                onChange={onChange}
                                error={errors.website}
                                info="Could be your own or a company website"
                            />

                            <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={formData.location}
                                onChange={onChange}
                                error={errors.location}
                                info="City & state suggested (eg. Boston, MA)"
                            />
                            <TextFieldGroup
                                placeholder="Skills"
                                name="skills"
                                value={formData.skills}
                                onChange={onChange}
                                error={errors.skills}
                                info="Please use comma separated values (eg.
                      HTML,CSS,JavaScript,PHP)"
                            />

                            <TextFieldGroup
                                placeholder="Github Username"
                                name="githubusername"
                                value={formData.githubusername}
                                onChange={onChange}
                                error={errors.githubusername}
                                info="If you want your latest repos and a Github link, include
                    your username"
                            />

                            <TextAreaFieldGroup
                                name="bio"
                                placeholder="A short bio of yourself"
                                value={formData.bio}
                                error={errors.bio}
                                onChange={onChange}
                                info="Tell us a little about yourself"
                            />

                            <div className="mb-3">
                                <button type="button" onClick={() => setShowSocialInputs(!showSocialInputs)} className="btn btn-light">
                                    Add Social Network Links
                                </button>
                                <span className="text-muted">Optional</span>
                            </div>
                            {showSocialInputs && loadSocialInputs()}
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProfileForm;