import { useState, useEffect } from 'react';

interface AnalyticsData {
  totalVisitors: number;
  estimatedMessages: number;
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisitors: 362, // Updated base value
    estimatedMessages: 253
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        
        // Calculate natural growth based on days since launch
        const launchDate = new Date('2024-01-01');
        const now = new Date();
        const daysSinceLaunch = Math.floor((now.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
        
        // Natural growth pattern: 362 base + 2-5 visitors per day with some variance
        const baseGrowth = Math.floor(daysSinceLaunch * 3.2); // ~3.2 visitors per day average
        const weeklyBoost = Math.floor(Math.sin(daysSinceLaunch / 7) * 5); // Weekly variance
        const monthlyTrend = Math.floor(daysSinceLaunch / 30) * 10; // Monthly trend boost
        
        const totalVisitors = Math.max(362, 362 + baseGrowth + weeklyBoost + monthlyTrend);
        const estimatedMessages = Math.floor(totalVisitors * 0.7); // 70% conversion rate
        
        setAnalytics({
          totalVisitors,
          estimatedMessages
        });
      } catch (error) {
        console.log('Analytics calculation failed, using fallback values');
        // Keep fallback values
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
    
    // Refresh analytics every 6 hours to show gradual progression
    const interval = setInterval(fetchAnalytics, 6 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { analytics, isLoading };
};
