'use client'; // Указываем, что это клиентский компонент

import { useDispatch, useSelector } from 'react-redux';
import { toggleItem } from '../../store/selectedItemsSlice';
import { RootState } from '../../store/store';
import Checkbox from '../../components/checkbox/Checkbox';
import { Person } from '../../utils/types';

interface ResultClientProps {
  person: Person;
}

const CheckboxManager = ({ person }: ResultClientProps) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );

  const handleCheckboxChange = () => {
    dispatch(toggleItem(person));
  };

  return (
    <Checkbox
      checked={selectedItems.some((item) => item.url === person.url)}
      onChange={handleCheckboxChange}
    />
  );
};

export default CheckboxManager;
