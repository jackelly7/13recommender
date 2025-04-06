type SelectorProps = {
  userId: string;
  userIds: string[];
  setUserId: (id: string) => void;
  onFetch: () => void;
};

function Selector({ userId, userIds, setUserId, onFetch }: SelectorProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <label>Select User ID: </label>
      <select
        value={userId}
        onChange={e => setUserId(e.target.value)}
        style={{ marginRight: '1rem' }}
      >
        {userIds.map(id => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      <button onClick={onFetch}>Get Recommendations</button>
    </div>
  );
}

export default Selector;
