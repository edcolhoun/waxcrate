import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Camera, Save } from 'lucide-react-native';

interface RecordForm {
  title: string;
  artist: string;
  genre: string;
  year: string;
  condition: string;
  format: string;
  label: string;
  notes: string;
}

export default function AddRecordScreen() {
  const [form, setForm] = useState<RecordForm>({
    title: '',
    artist: '',
    genre: '',
    year: '',
    condition: '',
    format: '',
    label: '',
    notes: '',
  });

  const updateForm = (field: keyof RecordForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Basic validation
    if (!form.title.trim()) {
      Alert.alert('Missing Information', 'Please enter the album title.');
      return;
    }
    
    if (!form.artist.trim()) {
      Alert.alert('Missing Information', 'Please enter the artist name.');
      return;
    }

    // Show success message
    Alert.alert(
      'Record Added Successfully!',
      `"${form.title.trim()}" by ${form.artist.trim()} has been added to your crate.`,
      [
        {
          text: 'Add Another Record',
          onPress: () => {
            setForm({
              title: '',
              artist: '',
              genre: '',
              year: '',
              condition: '',
              format: '',
              label: '',
              notes: '',
            });
          }
        },
        { 
          text: 'Done', 
          style: 'default'
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add New Wax</Text>
        <Text style={styles.headerSubtitle}>Expand your crate collection</Text>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.photoSection}>
          <TouchableOpacity style={styles.photoButton}>
            <Camera color="#8B5CF6" size={32} />
            <Text style={styles.photoButtonText}>Add Cover Photo</Text>
            <Text style={styles.photoButtonSubtext}>Tap to capture or select</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Album Title *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter album title"
              value={form.title}
              onChangeText={(value) => updateForm('title', value)}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Artist *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter artist name"
              value={form.artist}
              onChangeText={(value) => updateForm('artist', value)}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>Year</Text>
              <TextInput
                style={styles.textInput}
                placeholder="1970"
                value={form.year}
                onChangeText={(value) => updateForm('year', value)}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>Label</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Record label"
                value={form.label}
                onChangeText={(value) => updateForm('label', value)}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Genre</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter genre"
              value={form.genre}
              onChangeText={(value) => updateForm('genre', value)}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Condition</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter condition"
              value={form.condition}
              onChangeText={(value) => updateForm('condition', value)}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Format</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter format"
              value={form.format}
              onChangeText={(value) => updateForm('format', value)}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Notes</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Add any notes about this record..."
              value={form.notes}
              onChangeText={(value) => updateForm('notes', value)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Save color="#FFFFFF" size={20} />
            <Text style={styles.saveButtonText}>Add to Crate</Text>
          </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  photoSection: {
    marginBottom: 32,
  },
  photoButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  photoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
    marginTop: 12,
  },
  photoButtonSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
  },
  actions: {
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomPadding: {
    height: 100,
  },
});
