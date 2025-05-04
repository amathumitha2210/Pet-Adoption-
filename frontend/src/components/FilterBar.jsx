import { Button, ButtonGroup } from 'react-bootstrap';
import { usePets } from '../context/PetContext';

const FilterBar = () => {
  const { moodFilter, filterByMood } = usePets();

  const moodOptions = [
    { value: 'all', label: 'All Pets', variant: 'outline-primary' },
    { value: 'happy', label: 'Happy', variant: 'outline-success' },
    { value: 'excited', label: 'Excited', variant: 'outline-warning' },
    { value: 'sad', label: 'Sad', variant: 'outline-danger' }
  ];

  return (
    <div className="mb-4">
      <h5 className="mb-2">Filter by Mood:</h5>
      <ButtonGroup className="flex-wrap">
        {moodOptions.map((mood) => (
          <Button
            key={mood.value}
            variant={moodFilter === mood.value ? mood.value === 'all' ? 'primary' : mood.variant.replace('outline-', '') : mood.variant}
            onClick={() => filterByMood(mood.value)}
            className="text-capitalize m-1"
          >
            {mood.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default FilterBar;