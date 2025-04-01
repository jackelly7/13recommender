import { useState } from 'react';
import Selector from './components/Selector';
import RecommendationList from './components/RecommendationList';

function App() {
  const [userId, setUserId] = useState('');

  type Recommendations = {
    collaborative: string[];
    content: string[];
    azure: string[];
  };

  const [recommendations, setRecommendations] = useState<Recommendations>({
    collaborative: [],
    content: [],
    azure: [],
  });

  const fetchRecommendations = async () => {
    // Placeholder logic — replace with real API calls later
    setRecommendations({
      collaborative: ['101', '102', '103', '104', '105'],
      content: ['201', '202', '203', '204', '205'],
      azure: ['301', '302', '303', '304', '305'],
    });
  };

  return (
    <div className="App" style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>News Recommender</h1>
      <Selector
        userId={userId}
        setUserId={setUserId}
        onFetch={fetchRecommendations}
      />
      <RecommendationList
        title="Collaborative Filtering"
        items={recommendations.collaborative}
      />
      <RecommendationList
        title="Content-Based Filtering"
        items={recommendations.content}
      />
      <RecommendationList
        title="Azure ML Model"
        items={recommendations.azure}
      />
    </div>
  );
}

export default App;
