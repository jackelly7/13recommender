import { useState, useEffect } from 'react';
import Selector from './components/Selector';
import RecommendationList from './components/RecommendationList';
import Papa from 'papaparse';

type Recommendations = {
  collaborative: string[];
  content: string[];
  azure: string[];
};

const App = () => {
  const [userId, setUserId] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendations>({
    collaborative: [],
    content: [],
    azure: [],
  });
  const [userIds, setUserIds] = useState<string[]>([]);

  useEffect(() => {
    const loadUserIds = async () => {
      const response = await fetch('/content_recommendations.csv');
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        complete: results => {
          const ids = (results.data as any[])
            .map(row => (row as any).userId)
            .filter(Boolean);
          setUserIds(ids);
          if (ids.length > 0) setUserId(ids[0]);
        },
      });
    };

    loadUserIds();
  }, []);

  const fetchAllRecommendations = async (
    userId: string
  ): Promise<Recommendations> => {
    const fetchFromCSV = async (fileName: string): Promise<string[]> => {
      const response = await fetch(`/${fileName}`);
      const csvText = await response.text();

      return new Promise(resolve => {
        Papa.parse(csvText, {
          header: true,
          complete: results => {
            const match = (results.data as any[]).find(row => {
              if (fileName.includes('collaborative')) {
                return (row as any).personId === userId;
              } else {
                return (row as any).userId === userId;
              }
            });

            if (match) {
              const recs = fileName.includes('collaborative')
                ? [
                    (match as any).title1,
                    (match as any).title2,
                    (match as any).title3,
                    (match as any).title4,
                    (match as any).title5,
                  ]
                : [
                    (match as any).rec_1,
                    (match as any).rec_2,
                    (match as any).rec_3,
                    (match as any).rec_4,
                    (match as any).rec_5,
                  ];

              resolve(recs.filter(Boolean));
            } else {
              resolve([]);
            }
          },
        });
      });
    };

    const [collaborative, content] = await Promise.all([
      fetchFromCSV('collaborative_recommendations.csv'),
      fetchFromCSV('content_recommendations.csv'),
    ]);

    const azure = ['999', '998', '997', '996', '995']; // placeholder

    return {
      collaborative,
      content,
      azure,
    };
  };

  const handleFetch = async () => {
    const recs = await fetchAllRecommendations(userId);
    setRecommendations(recs);
  };

  return (
    <div className="App" style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>News Recommender</h1>
      <Selector
        userId={userId}
        setUserId={setUserId}
        onFetch={handleFetch}
        userIds={userIds}
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
};

export default App;
