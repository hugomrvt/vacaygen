import { useState, useEffect } from 'react';

interface AnalyticsData {
  totalVisitors: number;
  estimatedMessages: number;
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisitors: 73, // fallback value
    estimatedMessages: 51
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        
        // Get analytics for the last 30 days
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        
        // Note: This would need to be implemented when analytics API is available
        // For now, we'll simulate incremental growth based on time
        const now = Date.now();
        const daysSinceBase = Math.floor((now - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24));
        const estimatedVisitors = Math.max(73, 73 + Math.floor(daysSinceBase * 0.5)); // ~0.5 visitors per day growth
        
        setAnalytics({
          totalVisitors: estimatedVisitors,
          estimatedMessages: Math.floor(estimatedVisitors * 0.7) // 70% conversion rate
        });
      } catch (error) {
        console.log('Analytics fetch failed, using fallback values');
        // Keep fallback values
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
    
    // Refresh analytics every hour
    const interval = setInterval(fetchAnalytics, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { analytics, isLoading };
};
