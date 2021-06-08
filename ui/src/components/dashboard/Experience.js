import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

const Experience = ({ data, deleteExperience }) => {
  const loadExperience = () => data.map(exp => (
    <tr key={exp._id}>
      <td>{exp.title}</td>
      <td>{exp.company}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from.split('T')[0]}</Moment> -{' '}
        {!exp.to ? (' Present') : (
          <Moment format="YYYY/MM/DD">{exp.to.split('T')[0]}</Moment>
        )}
      </td>
      <td>
        <button onClick={() => deleteExperience(exp._id)} className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h4 className="mb-4">Experience Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{loadExperience()}</tbody>
      </table>
    </div>
  );
}

Experience.propTypes = {
  data: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
