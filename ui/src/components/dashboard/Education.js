import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

const Education = ({ data, deleteEducation }) => {
  const loadEducation = () => data.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from.split('T')[0]}</Moment> -{' '}
        {!edu.to ? (' Present') : (
          <Moment format="YYYY/MM/DD">{edu.to.split('T')[0]}</Moment>
        )}
      </td>
      <td>
        <button onClick={() => deleteEducation(edu._id)} className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h4 className="mb-4">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{loadEducation()}</tbody>
      </table>
    </div>
  );
}

Education.propTypes = {
  data: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
