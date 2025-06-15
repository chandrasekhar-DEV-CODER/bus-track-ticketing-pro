
import { useState, useEffect, useMemo } from 'react';

interface Route {
  id: string;
  name: string;
  status: 'on-time' | 'delayed' | 'cancelled';
  ridership: number;
}

interface Stop {
  id: string;
  name: string;
  routes: string[];
}

export const useBusSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'on-time' | 'delayed'>('all');
  const [routes] = useState<Route[]>([
    { id: '42A', name: 'Central Station → Airport', status: 'on-time', ridership: 85 },
    { id: '15B', name: 'Downtown → University', status: 'on-time', ridership: 92 },
    { id: '33C', name: 'Mall Plaza → Tech Park', status: 'delayed', ridership: 76 },
    { id: '88D', name: 'Railway → Beach Resort', status: 'on-time', ridership: 68 },
    { id: '101X', name: 'Airport → City Center', status: 'on-time', ridership: 88 },
  ]);
  const [stops] = useState<Stop[]>([
    { id: '001', name: 'Central Station', routes: ['42A', '101X'] },
    { id: '002', name: 'Downtown Plaza', routes: ['15B', '42A'] },
    { id: '003', name: 'Mall Plaza', routes: ['33C'] },
    { id: '004', name: 'Tech Park', routes: ['33C', '15B'] },
    { id: '005', name: 'Airport Terminal', routes: ['42A', '101X'] },
  ]);

  const filteredResults = useMemo(() => {
    let filtered = routes;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(route => route.status === filterStatus);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(route => 
        route.id.toLowerCase().includes(query) ||
        route.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [routes, searchQuery, filterStatus]);

  const popularRoutes = useMemo(() => {
    return [...routes]
      .sort((a, b) => b.ridership - a.ridership)
      .slice(0, 5);
  }, [routes]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    
    const query = searchQuery.toLowerCase();
    const routeSuggestions = routes
      .filter(route => 
        route.id.toLowerCase().includes(query) ||
        route.name.toLowerCase().includes(query)
      )
      .map(route => ({ type: 'route', ...route }));

    const stopSuggestions = stops
      .filter(stop => stop.name.toLowerCase().includes(query))
      .map(stop => ({ type: 'stop', ...stop }));

    return [...routeSuggestions, ...stopSuggestions].slice(0, 8);
  }, [searchQuery, routes, stops]);

  return {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filteredResults,
    popularRoutes,
    searchSuggestions,
  };
};
