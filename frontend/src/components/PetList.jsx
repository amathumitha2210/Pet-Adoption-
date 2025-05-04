import PetCard from './PetCard';

const PetList = ({ pets, onAdopt, onEdit, onDelete, isManagement = false }) => {
  if (pets.length === 0) {
    return (
      <div className="alert alert-info">
        No pets available. Please check back later!
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {pets.map((pet) => (
        <div className="col" key={pet.id}>
          <PetCard
            pet={pet}
            onAdopt={onAdopt}
            onEdit={onEdit}
            onDelete={onDelete}
            isManagement={isManagement}
          />
        </div>
      ))}
    </div>
  );
};

export default PetList;
