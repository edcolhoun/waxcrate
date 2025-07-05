import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { 
  User, 
  Settings, 
  BarChart3, 
  Heart, 
  Share2, 
  Download,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Disc3
} from 'lucide-react-native';

interface StatCard {
  title: string;
  value: string;
  subtitle: string;
  color: string;
}

const stats: StatCard[] = [
  {
    title: 'Wax in Crate',
    value: '247',
    subtitle: 'Records collected',
    color: '#8B5CF6',
  },
  {
    title: 'Crate Value',
    value: '$3,240',
    subtitle: 'Estimated worth',
    color: '#10B981',
  },
  {
    title: 'This Month',
    value: '12',
    subtitle: 'New additions',
    color: '#F59E0B',
  },
  {
    title: 'Dig List',
    value: '34',
    subtitle: 'Records wanted',
    color: '#EF4444',
  },
];

const menuItems = [
  { icon: BarChart3, title: 'Crate Analytics', subtitle: 'View collection insights' },
  { icon: Heart, title: 'Dig List', subtitle: 'Records you want to find' },
  { icon: Share2, title: 'Share Crate', subtitle: 'Show off your collection' },
  { icon: Download, title: 'Export Crate', subtitle: 'Download your data' },
  { icon: Bell, title: 'Notifications', subtitle: 'Manage alerts' },
  { icon: Settings, title: 'Settings', subtitle: 'App preferences' },
  { icon: HelpCircle, title: 'Help & Support', subtitle: 'Get assistance' },
];

export default function ProfileScreen() {
  const StatCard = ({ stat }: { stat: StatCard }) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
        <View style={[styles.statDot, { backgroundColor: stat.color }]} />
      </View>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statTitle}>{stat.title}</Text>
      <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
    </View>
  );

  const MenuItem = ({ item }: { item: typeof menuItems[0] }) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuIconContainer}>
        <item.icon color="#8B5CF6" size={24} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
      </View>
      <ChevronRight color="#9CA3AF" size={20} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Disc3 color="#8B5CF6" size={32} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Vinyl Collector</Text>
            <Text style={styles.profileEmail}>collector@waxcrate.com</Text>
            <Text style={styles.memberSince}>Digging since March 2023</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Crate Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <LogOut color="#EF4444" size={20} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={styles.brandingFooter}>
          <Disc3 color="#8B5CF6" size={24} />
          <Text style={styles.brandingText}>WaxCrate</Text>
          <Text style={styles.brandingSubtext}>Keep digging, keep collecting</Text>
        </View>

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
    paddingBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 2,
  },
  memberSince: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  menuSection: {
    marginBottom: 32,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  brandingFooter: {
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  brandingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginTop: 8,
    letterSpacing: -0.5,
  },
  brandingSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontStyle: 'italic',
  },
  bottomPadding: {
    height: 100,
  },
});
