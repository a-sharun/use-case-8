import React, { memo } from "react";
import { useSelector } from "react-redux";

const UserFormDataList = () => {
  const userFormData = useSelector((state) => state.userFormData);

  return userFormData.length ? (
    <table>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Message</th>
      </tr>
      {userFormData.map(({ firstName, lastName, email, message }) => (
        <tr key={`${firstName + lastName + email}`}>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{email}</td>
          <td>{message}</td>
        </tr>
      ))}
    </table>
  ) : null;
};

export default memo(UserFormDataList);
