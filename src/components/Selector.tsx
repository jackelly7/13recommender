type SelectorProps = {
  userId: string;
  setUserId: (id: string) => void;
  onFetch: () => void;
};

function Selector({ userId, setUserId, onFetch }: SelectorProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <label>User ID or Item ID: </label>
      <input
        value={userId}
        onChange={e => setUserId(e.target.value)}
        placeholder="Enter an ID"
        style={{ marginRight: '1rem' }}
      />
      <button onClick={onFetch}>Get Recommendations</button>
    </div>
  );
}

export default Selector;
