import Image from 'next/image';
import { Character, ResultProps } from '../../utils/types';
import CheckboxManager from '../../components/checkbox/CheckboxManager';
import styles from './Result.module.css';

const Result = ({ data, onPersonClick }: ResultProps) => {
  return (
    <div className={styles.results} data-testid="result-component">
      {data.results.map((character: Character) => {
        const personId = character.id;
        return (
          <div key={personId} className={styles.resultItemWrapper}>
            <div
              className={styles.resultItem}
              onClick={() => onPersonClick(personId)}
            >
              <Image
                width={200}
                height={200}
                className={styles.itemImg}
                src={character.image}
                alt={character.name}
              />
              <h2 className={styles.itemName}>{character.name}</h2>
            </div>
            <CheckboxManager person={character} />
          </div>
        );
      })}
    </div>
  );
};

export default Result;
