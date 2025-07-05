import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
} from 'react-native';
import { Search, Filter, TrendingUp, Clock, Star } from 'lucide-react-native';

interface SearchResult {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: string;
  coverImage: string;
  popularity: number;
}

const trendingRecords: SearchResult[] = [
  {
    id: '1',
    title: 'Rumours',
    artist: 'Fleetwood Mac',
    year: 1977,
    genre: 'Rock',
    coverImage: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    popularity: 95,
  },
  {
    id: '2',
    title: 'Blue Train',
    artist: 'John Coltrane',
    year: 1958,
    genre: 'Jazz',
    coverImage: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    popularity: 88,
  },
  {
    id: '3',
    title: 'Pet Sounds',
    artist: 'The Beach Boys',
    year: 1966,
    genre: 'Pop',
    coverImage: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg',
    popularity: 92,
  },
];

const recentSearches = [
  'Miles Davis',
  'Blue Note Records',
  'Motown',
  'Pink Floyd',
  'Jazz Fusion',
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setIsSearching(true);
      // Simulate search results
      setTimeout(() => {
        setSearchResults(trendingRecords.filter(record => 
          record.title.toLowerCase().includes(query.toLowerCase()) ||
          record.artist.toLowerCase().includes(query.toLowerCase())
        ));
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  const SearchResultCard = ({ record }: { record: SearchResult }) => (
    <TouchableOpacity style={styles.resultCard}>
      <Image source={{ uri: record.coverImage }} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle} numberOfLines={1}>{record.title}</Text>
        <Text style={styles.resultArtist} numberOfLines={1}>{record.artist}</Text>
        <View style={styles.resultMeta}>
          <Text style={styles.resultYear}>{record.year}</Text>
          <Text style={styles.resultGenre}>{record.genre}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add to Crate</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const TrendingCard = ({ record }: { record: SearchResult }) => (
    <TouchableOpacity style={styles.trendingCard}>
      <Image source={{ uri: record.coverImage }} style={styles.trendingImage} />
      <View style={styles.trendingInfo}>
        <Text style={styles.trendingTitle} numberOfLines={1}>{record.title}</Text>
        <Text style={styles.trendingArtist} numberOfLines={1}>{record.artist}</Text>
        <View style={styles.popularityBadge}>
          <TrendingUp color="#10B981" size={12} />
          <Text style={styles.popularityText}>{record.popularity}% match</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dig for Wax</Text>
        <Text style={styles.headerSubtitle}>Discover records to add to your crate</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color="#6B7280" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search artists, albums, labels..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color="#8B5CF6" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {searchQuery.length > 0 && searchResults.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            {searchResults.map((record) => (
              <SearchResultCard key={record.id} record={record} />
            ))}
          </View>
        )}

        {searchQuery.length === 0 && (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <TrendingUp color="#8B5CF6" size={20} />
                <Text style={styles.sectionTitle}>Trending in Crates</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.trendingContainer}>
                  {trendingRecords.map((record) => (
                    <TrendingCard key={record.id} record={record} />
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Clock color="#8B5CF6" size={20} />
                <Text style={styles.sectionTitle}>Recent Searches</Text>
              </View>
              <View style={styles.recentSearches}>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.recentSearchChip}
                    onPress={() => handleSearch(search)}
                  >
                    <Text style={styles.recentSearchText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Star color="#8B5CF6" size={20} />
                <Text style={styles.sectionTitle}>Collector Favorites</Text>
              </View>
              <Text style={styles.sectionDescription}>
                Records that vinyl collectors are adding to their crates this week
              </Text>
              {trendingRecords.map((record) => (
                <SearchResultCard key={`fav-${record.id}`} record={record} />
              ))}
            </View>
          </>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    marginTop: -8,
  },
  trendingContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  trendingCard: {
    width: 140,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trendingImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  trendingInfo: {
    padding: 12,
  },
  trendingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  trendingArtist: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  popularityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularityText: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '500',
    marginLeft: 4,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  resultArtist: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  resultMeta: {
    flexDirection: 'row',
  },
  resultYear: {
    fontSize: 12,
    color: '#9CA3AF',
    marginRight: 12,
  },
  resultGenre: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  addButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  recentSearches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recentSearchChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  recentSearchText: {
    fontSize: 14,
    color: '#6B7280',
  },
  bottomPadding: {
    height: 100,
  },
});
