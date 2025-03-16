import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const FormSubmitted = () => {
  const formSubmitted = useSelector(
    (state: RootState) => state.form.submittedData
  );

  return (
    <div className="form-submitted">
      {formSubmitted.map((data, index) => (
        <div
          key={index}
          className={`form-item ${index === formSubmitted.length - 1 ? 'last-item' : ''}`}
        >
          {data.img && (
            <div className="img-submitted">
              <img src={URL.createObjectURL(data.img)} alt="Uploaded" />
            </div>
          )}
          <p>Name: {data.name}</p>
          <p>Age: {data.age}</p>
          <p>Email: {data.email}</p>
          <p>Password: {data.password}</p>
          <p>Gender: {data.gender}</p>
          <p>Country: {data.country}</p>
          <p>Terms: {data.terms ? 'Agree' : 'Not Agree'}</p>
        </div>
      ))}
    </div>
  );
};
