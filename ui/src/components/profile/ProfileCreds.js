import React from 'react';
import Moment from 'react-moment';
import isEmpty from '../../validation/is-empty';

const ProfileCreds = ({ experience, education }) => {

  const loadExperience = () => {
    return experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{exp.from.split('T')[0]}</Moment>{'- '}
          {!exp.to ? (' Present') : (<Moment format="YYYY/MM/DD">{exp.to.split('T')[0]}</Moment>)}
        </p>
        <p><strong>Position: </strong>{exp.title}</p>
        <p>{!isEmpty(exp.location) && (<span><strong>Location: </strong>{exp.location}</span>)}</p>
        <p>{!isEmpty(exp.description) && (<span><strong>Description: </strong>{exp.description}</span>)}</p>
      </li>
    ));
  };

  const loadEducation = () => {
    return education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from.split('T')[0]}</Moment>{'- '}
          {!edu.to ? (' Present') : (<Moment format="YYYY/MM/DD">{edu.to.split('T')[0]}</Moment>)}
        </p>
        <p><strong>Degree: </strong>{edu.degree}</p>
        <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
        <p>{!isEmpty(edu.description) && (<span><strong>Description: </strong>{edu.description}</span>)}</p>
      </li>
    ));
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">{loadExperience()}</ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">{loadEducation()}</ul>
        </div>
      </div>
    </div>
  );
}
export default ProfileCreds;
