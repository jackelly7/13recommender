type RecommendationListProps = {
  title: string;
  items: string[];
};

function RecommendationList({ title, items }: RecommendationListProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>{title}</h2>
      <ul>
        {items.map((id, index) => (
          <li key={index}>Item ID: {id}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationList;
