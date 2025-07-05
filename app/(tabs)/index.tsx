import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Modal,
  Pressable,
} from 'react-native';
import { Filter, Grid, List, Search, ChevronDown, Check, ChevronRight, Music } from 'lucide-react-native';

interface Track {
  id: string;
  title: string;
  duration: string;
  side: 'A' | 'B';
  trackNumber: number;
}

interface VinylRecord {
  id: string;
  title: string;
  artist: string;
  genre: string;
  year: number;
  condition: string;
  coverImage: string;
  label: string;
  format: string;
  tracks: Track[];
}

const mockRecords: VinylRecord[] = [
  {
    id: '1',
    title: 'Abbey Road',
    artist: 'The Beatles',
    genre: 'Rock',
    year: 1969,
    condition: 'Near Mint',
    coverImage: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg',
    label: 'Apple Records',
    format: '12" LP',
    tracks: [
      { id: '1-1', title: 'Come Together', duration: '4:20', side: 'A', trackNumber: 1 },
      { id: '1-2', title: 'Something', duration: '3:03', side: 'A', trackNumber: 2 },
      { id: '1-3', title: 'Maxwell\'s Silver Hammer', duration: '3:27', side: 'A', trackNumber: 3 },
      { id: '1-4', title: 'Oh! Darling', duration: '3:26', side: 'A', trackNumber: 4 },
      { id: '1-5', title: 'Octopus\'s Garden', duration: '2:51', side: 'A', trackNumber: 5 },
      { id: '1-6', title: 'I Want You (She\'s So Heavy)', duration: '7:47', side: 'A', trackNumber: 6 },
      { id: '1-7', title: 'Here Comes the Sun', duration: '3:05', side: 'B', trackNumber: 1 },
      { id: '1-8', title: 'Because', duration: '2:45', side: 'B', trackNumber: 2 },
      { id: '1-9', title: 'You Never Give Me Your Money', duration: '4:02', side: 'B', trackNumber: 3 },
      { id: '1-10', title: 'Sun King', duration: '2:26', side: 'B', trackNumber: 4 },
      { id: '1-11', title: 'Mean Mr. Mustard', duration: '1:06', side: 'B', trackNumber: 5 },
      { id: '1-12', title: 'Polythene Pam', duration: '1:12', side: 'B', trackNumber: 6 },
      { id: '1-13', title: 'She Came in Through the Bathroom Window', duration: '1:57', side: 'B', trackNumber: 7 },
      { id: '1-14', title: 'Golden Slumbers', duration: '1:31', side: 'B', trackNumber: 8 },
      { id: '1-15', title: 'Carry That Weight', duration: '1:36', side: 'B', trackNumber: 9 },
      { id: '1-16', title: 'The End', duration: '2:05', side: 'B', trackNumber: 10 },
      { id: '1-17', title: 'Her Majesty', duration: '0:23', side: 'B', trackNumber: 11 },
    ],
  },
  {
    id: '2',
    title: 'Kind of Blue',
    artist: 'Miles Davis',
    genre: 'Jazz',
    year: 1959,
    condition: 'Very Good+',
    coverImage: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    label: 'Columbia',
    format: '12" LP',
    tracks: [
      { id: '2-1', title: 'So What', duration: '9:22', side: 'A', trackNumber: 1 },
      { id: '2-2', title: 'Freddie Freeloader', duration: '9:46', side: 'A', trackNumber: 2 },
      { id: '2-3', title: 'Blue in Green', duration: '5:37', side: 'B', trackNumber: 1 },
      { id: '2-4', title: 'All Blues', duration: '11:33', side: 'B', trackNumber: 2 },
      { id: '2-5', title: 'Flamenco Sketches', duration: '9:26', side: 'B', trackNumber: 3 },
    ],
  },
  {
    id: '3',
    title: 'The Dark Side of the Moon',
    artist: 'Pink Floyd',
    genre: 'Progressive Rock',
    year: 1973,
    condition: 'Mint',
    coverImage: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    label: 'Harvest',
    format: '12" LP',
    tracks: [
      { id: '3-1', title: 'Speak to Me', duration: '1:30', side: 'A', trackNumber: 1 },
      { id: '3-2', title: 'Breathe (In the Air)', duration: '2:43', side: 'A', trackNumber: 2 },
      { id: '3-3', title: 'On the Run', duration: '3:36', side: 'A', trackNumber: 3 },
      { id: '3-4', title: 'Time', duration: '6:53', side: 'A', trackNumber: 4 },
      { id: '3-5', title: 'The Great Gig in the Sky', duration: '4:36', side: 'A', trackNumber: 5 },
      { id: '3-6', title: 'Money', duration: '6:23', side: 'B', trackNumber: 1 },
      { id: '3-7', title: 'Us and Them', duration: '7:49', side: 'B', trackNumber: 2 },
      { id: '3-8', title: 'Any Colour You Like', duration: '3:26', side: 'B', trackNumber: 3 },
      { id: '3-9', title: 'Brain Damage', duration: '3:49', side: 'B', trackNumber: 4 },
      { id: '3-10', title: 'Eclipse', duration: '2:03', side: 'B', trackNumber: 5 },
    ],
  },
  {
    id: '4',
    title: 'Thriller',
    artist: 'Michael Jackson',
    genre: 'Pop',
    year: 1982,
    condition: 'Very Good',
    coverImage: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    label: 'Epic',
    format: '12" LP',
    tracks: [
      { id: '4-1', title: 'Wanna Be Startin\' Somethin\'', duration: '6:02', side: 'A', trackNumber: 1 },
      { id: '4-2', title: 'Baby Be Mine', duration: '4:20', side: 'A', trackNumber: 2 },
      { id: '4-3', title: 'The Girl Is Mine', duration: '3:42', side: 'A', trackNumber: 3 },
      { id: '4-4', title: 'Thriller', duration: '5:57', side: 'A', trackNumber: 4 },
      { id: '4-5', title: 'Beat It', duration: '4:18', side: 'B', trackNumber: 1 },
      { id: '4-6', title: 'Billie Jean', duration: '4:54', side: 'B', trackNumber: 2 },
      { id: '4-7', title: 'Human Nature', duration: '4:06', side: 'B', trackNumber: 3 },
      { id: '4-8', title: 'P.Y.T. (Pretty Young Thing)', duration: '3:58', side: 'B', trackNumber: 4 },
      { id: '4-9', title: 'The Lady in My Life', duration: '4:59', side: 'B', trackNumber: 5 },
    ],
  },
  {
    id: '5',
    title: 'What\'s Going On',
    artist: 'Marvin Gaye',
    genre: 'Soul',
    year: 1971,
    condition: 'Near Mint',
    coverImage: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg',
    label: 'Tamla',
    format: '12" LP',
    tracks: [
      { id: '5-1', title: 'What\'s Going On', duration: '3:53', side: 'A', trackNumber: 1 },
      { id: '5-2', title: 'What\'s Happening Brother', duration: '2:55', side: 'A', trackNumber: 2 },
      { id: '5-3', title: 'Flyin\' High (In the Friendly Sky)', duration: '3:29', side: 'A', trackNumber: 3 },
      { id: '5-4', title: 'Save the Children', duration: '4:03', side: 'A', trackNumber: 4 },
      { id: '5-5', title: 'God Is Love', duration: '1:43', side: 'A', trackNumber: 5 },
      { id: '5-6', title: 'Mercy Mercy Me (The Ecology)', duration: '3:16', side: 'B', trackNumber: 1 },
      { id: '5-7', title: 'Right On', duration: '7:33', side: 'B', trackNumber: 2 },
      { id: '5-8', title: 'Wholy Holy', duration: '3:05', side: 'B', trackNumber: 3 },
      { id: '5-9', title: 'Inner City Blues (Make Me Wanna Holler)', duration: '5:04', side: 'B', trackNumber: 4 },
    ],
  },
  {
    id: '6',
    title: 'Nevermind',
    artist: 'Nirvana',
    genre: 'Grunge',
    year: 1991,
    condition: 'Very Good+',
    coverImage: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg',
    label: 'DGC',
    format: '12" LP',
    tracks: [
      { id: '6-1', title: 'Smells Like Teen Spirit', duration: '5:01', side: 'A', trackNumber: 1 },
      { id: '6-2', title: 'In Bloom', duration: '4:14', side: 'A', trackNumber: 2 },
      { id: '6-3', title: 'Come as You Are', duration: '3:39', side: 'A', trackNumber: 3 },
      { id: '6-4', title: 'Breed', duration: '3:03', side: 'A', trackNumber: 4 },
      { id: '6-5', title: 'Lithium', duration: '4:17', side: 'A', trackNumber: 5 },
      { id: '6-6', title: 'Polly', duration: '2:57', side: 'A', trackNumber: 6 },
      { id: '6-7', title: 'Territorial Pissings', duration: '2:22', side: 'B', trackNumber: 1 },
      { id: '6-8', title: 'Drain You', duration: '3:43', side: 'B', trackNumber: 2 },
      { id: '6-9', title: 'Lounge Act', duration: '2:36', side: 'B', trackNumber: 3 },
      { id: '6-10', title: 'Stay Away', duration: '3:32', side: 'B', trackNumber: 4 },
      { id: '6-11', title: 'On a Plain', duration: '3:16', side: 'B', trackNumber: 5 },
      { id: '6-12', title: 'Something in the Way', duration: '3:47', side: 'B', trackNumber: 6 },
    ],
  },
  {
    id: '7',
    title: 'Blue Train',
    artist: 'John Coltrane',
    genre: 'Jazz',
    year: 1957,
    condition: 'Very Good',
    coverImage: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    label: 'Blue Note',
    format: '12" LP',
    tracks: [
      { id: '7-1', title: 'Blue Train', duration: '10:42', side: 'A', trackNumber: 1 },
      { id: '7-2', title: 'Moment\'s Notice', duration: '9:10', side: 'A', trackNumber: 2 },
      { id: '7-3', title: 'Locomotion', duration: '7:13', side: 'B', trackNumber: 1 },
      { id: '7-4', title: 'I\'m Old Fashioned', duration: '7:58', side: 'B', trackNumber: 2 },
      { id: '7-5', title: 'Lazy Bird', duration: '7:00', side: 'B', trackNumber: 3 },
    ],
  },
  {
    id: '8',
    title: 'Pet Sounds',
    artist: 'The Beach Boys',
    genre: 'Pop',
    year: 1966,
    condition: 'Near Mint',
    coverImage: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    label: 'Capitol',
    format: '12" LP',
    tracks: [
      { id: '8-1', title: 'Wouldn\'t It Be Nice', duration: '2:31', side: 'A', trackNumber: 1 },
      { id: '8-2', title: 'You Still Believe in Me', duration: '2:30', side: 'A', trackNumber: 2 },
      { id: '8-3', title: 'That\'s Not Me', duration: '2:28', side: 'A', trackNumber: 3 },
      { id: '8-4', title: 'Don\'t Talk (Put Your Head on My Shoulder)', duration: '2:53', side: 'A', trackNumber: 4 },
      { id: '8-5', title: 'I\'m Waiting for the Day', duration: '3:15', side: 'A', trackNumber: 5 },
      { id: '8-6', title: 'Let\'s Go Away for Awhile', duration: '2:19', side: 'A', trackNumber: 6 },
      { id: '8-7', title: 'Sloop John B', duration: '2:58', side: 'A', trackNumber: 7 },
      { id: '8-8', title: 'God Only Knows', duration: '2:51', side: 'B', trackNumber: 1 },
      { id: '8-9', title: 'I Know There\'s an Answer', duration: '3:09', side: 'B', trackNumber: 2 },
      { id: '8-10', title: 'Here Today', duration: '2:56', side: 'B', trackNumber: 3 },
      { id: '8-11', title: 'I Just Wasn\'t Made for These Times', duration: '3:12', side: 'B', trackNumber: 4 },
      { id: '8-12', title: 'Pet Sounds', duration: '2:20', side: 'B', trackNumber: 5 },
      { id: '8-13', title: 'Caroline, No', duration: '2:52', side: 'B', trackNumber: 6 },
    ],
  },
];

type SortOption = 'artist-alpha' | 'album-alpha' | 'year' | 'genre';

export default function LibraryScreen() {
  const [records] = useState<VinylRecord[]>(mockRecords);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<SortOption>('artist-alpha');
  const [showSortModal, setShowSortModal] = useState(false);
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);

  const genres = ['All', 'Rock', 'Jazz', 'Pop', 'Soul', 'Progressive Rock', 'Grunge'];
  const sortOptions = [
    { key: 'artist-alpha' as SortOption, label: 'Artist Name (A-Z)' },
    { key: 'album-alpha' as SortOption, label: 'Album Name (A-Z)' },
    { key: 'genre' as SortOption, label: 'Genre (A-Z)' },
    { key: 'year' as SortOption, label: 'Year (Chronological)' },
  ];

  const sortedAndFilteredRecords = useMemo(() => {
    // First filter the records
    let filtered = records.filter(record => {
      const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           record.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           record.tracks.some(track => track.title.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesGenre = selectedGenre === 'All' || record.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });

    // Then sort the filtered records
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'artist-alpha') {
        // Sort by artist name alphabetically (A-Z)
        const artistComparison = a.artist.toLowerCase().localeCompare(b.artist.toLowerCase());
        if (artistComparison !== 0) {
          return artistComparison;
        }
        // If artists are the same, sort by album title
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }
      
      if (sortBy === 'album-alpha') {
        // Sort by album title alphabetically (A-Z)
        const albumComparison = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        if (albumComparison !== 0) {
          return albumComparison;
        }
        // If album titles are the same, sort by artist
        return a.artist.toLowerCase().localeCompare(b.artist.toLowerCase());
      }
      
      if (sortBy === 'genre') {
        // Sort by genre, then artist, then album
        const genreComparison = a.genre.toLowerCase().localeCompare(b.genre.toLowerCase());
        if (genreComparison !== 0) {
          return genreComparison;
        }
        const artistComparison = a.artist.toLowerCase().localeCompare(b.artist.toLowerCase());
        if (artistComparison !== 0) {
          return artistComparison;
        }
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }
      
      if (sortBy === 'year') {
        // Sort by year (chronological - oldest first)
        const yearComparison = a.year - b.year;
        if (yearComparison !== 0) {
          return yearComparison;
        }
        // If years are the same, sort by artist
        return a.artist.toLowerCase().localeCompare(b.artist.toLowerCase());
      }
      
      return 0;
    });

    return sorted;
  }, [records, searchQuery, selectedGenre, sortBy]);

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Mint': return '#10B981';
      case 'Near Mint': return '#059669';
      case 'Very Good+': return '#F59E0B';
      case 'Very Good': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const handleSortSelection = (option: SortOption) => {
    setSortBy(option);
    setShowSortModal(false);
  };

  const toggleRecordExpansion = (recordId: string) => {
    setExpandedRecord(expandedRecord === recordId ? null : recordId);
  };

  const getTotalDuration = (tracks: Track[]) => {
    const totalSeconds = tracks.reduce((total, track) => {
      const [minutes, seconds] = track.duration.split(':').map(Number);
      return total + (minutes * 60) + seconds;
    }, 0);
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${(totalSeconds % 60).toString().padStart(2, '0')}`;
    }
    return `${minutes}:${(totalSeconds % 60).toString().padStart(2, '0')}`;
  };

  const TrackList = ({ tracks }: { tracks: Track[] }) => {
    const sideATracks = tracks.filter(track => track.side === 'A');
    const sideBTracks = tracks.filter(track => track.side === 'B');

    return (
      <View style={styles.trackListContainer}>
        {sideATracks.length > 0 && (
          <View style={styles.sideContainer}>
            <Text style={styles.sideTitle}>Side A</Text>
            {sideATracks.map((track) => (
              <View key={track.id} style={styles.trackItem}>
                <View style={styles.trackInfo}>
                  <Text style={styles.trackNumber}>{track.trackNumber}.</Text>
                  <Text style={styles.trackTitle} numberOfLines={1}>{track.title}</Text>
                </View>
                <Text style={styles.trackDuration}>{track.duration}</Text>
              </View>
            ))}
          </View>
        )}
        
        {sideBTracks.length > 0 && (
          <View style={styles.sideContainer}>
            <Text style={styles.sideTitle}>Side B</Text>
            {sideBTracks.map((track) => (
              <View key={track.id} style={styles.trackItem}>
                <View style={styles.trackInfo}>
                  <Text style={styles.trackNumber}>{track.trackNumber}.</Text>
                  <Text style={styles.trackTitle} numberOfLines={1}>{track.title}</Text>
                </View>
                <Text style={styles.trackDuration}>{track.duration}</Text>
              </View>
            ))}
          </View>
        )}
        
        <View style={styles.totalDuration}>
          <Music color="#8B5CF6" size={16} />
          <Text style={styles.totalDurationText}>
            Total: {getTotalDuration(tracks)} • {tracks.length} tracks
          </Text>
        </View>
      </View>
    );
  };

  const RecordCard = ({ record }: { record: VinylRecord }) => {
    const isExpanded = expandedRecord === record.id;
    
    return (
      <View style={viewMode === 'grid' ? styles.gridCard : styles.listCard}>
        <TouchableOpacity 
          style={viewMode === 'grid' ? styles.gridCardContent : styles.listCardContent}
          onPress={() => toggleRecordExpansion(record.id)}
        >
          <Image source={{ uri: record.coverImage }} style={viewMode === 'grid' ? styles.gridImage : styles.listImage} />
          <View style={viewMode === 'grid' ? styles.gridInfo : styles.listInfo}>
            <Text style={styles.recordTitle} numberOfLines={1}>{record.title}</Text>
            <Text style={styles.recordArtist} numberOfLines={1}>{record.artist}</Text>
            <View style={styles.recordDetails}>
              <Text style={styles.recordYear}>{record.year}</Text>
              <Text style={styles.recordGenre}>{record.genre}</Text>
              <Text style={styles.trackCount}>{record.tracks.length} tracks</Text>
            </View>
            <View style={styles.conditionBadge}>
              <View style={[styles.conditionDot, { backgroundColor: getConditionColor(record.condition) }]} />
              <Text style={styles.conditionText}>{record.condition}</Text>
            </View>
          </View>
          <ChevronRight 
            color="#8B5CF6" 
            size={20} 
            style={[
              styles.expandIcon,
              isExpanded && styles.expandIconRotated
            ]} 
          />
        </TouchableOpacity>
        
        {isExpanded && <TrackList tracks={record.tracks} />}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WaxCrate</Text>
        <Text style={styles.headerSubtitle}>{sortedAndFilteredRecords.length} of {records.length} records</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color="#6B7280" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Dig through your crate..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity 
          style={styles.viewToggle}
          onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
        >
          {viewMode === 'grid' ? <List color="#8B5CF6" size={24} /> : <Grid color="#8B5CF6" size={24} />}
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreFilter}>
          {genres.map((genre) => (
            <TouchableOpacity
              key={genre}
              style={[
                styles.genreChip,
                selectedGenre === genre && styles.genreChipActive
              ]}
              onPress={() => setSelectedGenre(genre)}
            >
              <Text style={[
                styles.genreChipText,
                selectedGenre === genre && styles.genreChipTextActive
              ]}>
                {genre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sortContainer}>
          <TouchableOpacity 
            style={styles.sortButton}
            onPress={() => setShowSortModal(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.sortButtonText}>
              Sort: {sortOptions.find(opt => opt.key === sortBy)?.label}
            </Text>
            <ChevronDown color="#8B5CF6" size={16} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.recordsList} showsVerticalScrollIndicator={false}>
        <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
          {sortedAndFilteredRecords.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </View>
        
        {sortedAndFilteredRecords.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No records found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search or filter criteria
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Sort Modal */}
      <Modal
        visible={showSortModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSortModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowSortModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort Records</Text>
            </View>
            
            {sortOptions.map((option, index) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.modalOption,
                  index === sortOptions.length - 1 && styles.modalOptionLast
                ]}
                onPress={() => handleSortSelection(option.key)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.modalOptionText,
                  sortBy === option.key && styles.modalOptionTextActive
                ]}>
                  {option.label}
                </Text>
                {sortBy === option.key && (
                  <Check color="#8B5CF6" size={20} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
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
    marginBottom: 16,
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
  viewToggle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  genreFilter: {
    paddingLeft: 20,
    marginBottom: 12,
  },
  genreChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  genreChipActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  genreChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  genreChipTextActive: {
    color: '#FFFFFF',
  },
  sortContainer: {
    paddingHorizontal: 20,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sortButtonText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  recordsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 100,
  },
  listContainer: {
    paddingBottom: 100,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  gridCardContent: {
    padding: 16,
  },
  listCardContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  gridImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },
  listImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  gridInfo: {
    flex: 1,
  },
  listInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  recordArtist: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  recordDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordYear: {
    fontSize: 12,
    color: '#9CA3AF',
    marginRight: 12,
  },
  recordGenre: {
    fontSize: 12,
    color: '#9CA3AF',
    marginRight: 12,
  },
  trackCount: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  conditionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conditionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  conditionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  expandIcon: {
    marginLeft: 8,
    transform: [{ rotate: '0deg' }],
  },
  expandIconRotated: {
    transform: [{ rotate: '90deg' }],
  },
  trackListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  sideContainer: {
    marginBottom: 16,
  },
  sideTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
    marginBottom: 8,
    marginTop: 8,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  trackInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  trackNumber: {
    fontSize: 12,
    color: '#9CA3AF',
    width: 20,
    fontWeight: '500',
  },
  trackTitle: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    marginLeft: 8,
  },
  trackDuration: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  totalDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  totalDurationText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalOptionLast: {
    borderBottomWidth: 0,
  },
  modalOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  modalOptionTextActive: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
});
