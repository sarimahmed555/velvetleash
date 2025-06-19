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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS, FONT_POPPINS } from '../../utils/theme';
import { CustomIcon } from '../../components/CustomIcon';
import { useNavigation } from '@react-navigation/native';

interface PetDetailsForm {
  petType: 'dog' | 'cat' | '';
  name: string;
  weight: string;
  ageYears: string;
  ageMonths: string;
  sex: 'male' | 'female' | '';
  breed: string;
  additionalDetails: {
    microChipped: 'yes' | 'no' | '';
    spayedNeutered: 'yes' | 'no' | '';
    friendlyWithChildren: 'yes' | 'no' | 'unsure' | '';
    friendlyWithDogs: 'yes' | 'no' | 'unsure' | '';
    friendlyWithCats: 'yes' | 'no' | 'unsure' | '';
  };
  adoptionStatus: string;
  aboutPet: string;
  careInfo: {
    energyLevel: 'high' | 'moderate' | 'low' | '';
    feedingSchedule: string;
    canBeLeftAlone: string;
  };
  medicationInfo: {
    allergies: string;
    anythingElse: string;
  };
  healthInfo: {
    veterinaryInfo: string;
    petInsuranceProvider: string;
  };
}

const PetDetailsScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<PetDetailsForm>({
    petType: '',
    name: '',
    weight: '',
    ageYears: '',
    ageMonths: '',
    sex: '',
    breed: '',
    additionalDetails: {
      microChipped: '',
      spayedNeutered: '',
      friendlyWithChildren: '',
      friendlyWithDogs: '',
      friendlyWithCats: '',
    },
    adoptionStatus: '',
    aboutPet: '',
    careInfo: {
      energyLevel: '',
      feedingSchedule: '',
      canBeLeftAlone: '',
    },
    medicationInfo: {
      allergies: '',
      anythingElse: '',
    },
    healthInfo: {
      veterinaryInfo: '',
      petInsuranceProvider: '',
    },
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNestedFormData = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof PetDetailsForm] as any),
        [field]: value,
      },
    }));
  };

  const PetTypeSelector = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>What type of Pet?</Text>
      <View style={styles.petTypeContainer}>
        <TouchableOpacity
          style={[
            styles.petTypeButton,
            formData.petType === 'dog' && styles.petTypeButtonSelected,
          ]}
          onPress={() => updateFormData('petType', 'dog')}
        >
          <CustomIcon
            icon="dog"
            type="MaterialCommunityIcons"
            size={RFValue(24)}
            color={formData.petType === 'dog' ? COLORS.Primary : COLORS.NeutralGrey60}
          />
          <Text style={[
            styles.petTypeText,
            formData.petType === 'dog' && styles.petTypeTextSelected,
          ]}>
            Dog
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.petTypeButton,
            formData.petType === 'cat' && styles.petTypeButtonSelected,
          ]}
          onPress={() => updateFormData('petType', 'cat')}
        >
          <CustomIcon
            icon="cat"
            type="MaterialCommunityIcons"
            size={RFValue(24)}
            color={formData.petType === 'cat' ? COLORS.Primary : COLORS.NeutralGrey60}
          />
          <Text style={[
            styles.petTypeText,
            formData.petType === 'cat' && styles.petTypeTextSelected,
          ]}>
            Cat
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const InputField = ({ 
    label, 
    value, 
    onChangeText, 
    placeholder = '',
    multiline = false,
    numberOfLines = 1,
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    multiline?: boolean;
    numberOfLines?: number;
  }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[
          styles.textInput,
          multiline && { height: hp('8%'), textAlignVertical: 'top' },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.NeutralGrey60}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );

  const OptionSelector = ({
    label,
    options,
    selectedValue,
    onSelect,
  }: {
    label: string;
    options: { label: string; value: string }[];
    selectedValue: string;
    onSelect: (value: string) => void;
  }) => (
    <View style={styles.optionContainer}>
      <Text style={styles.optionLabel}>{label}</Text>
      <View style={styles.optionButtonsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              selectedValue === option.value && styles.optionButtonSelected,
            ]}
            onPress={() => onSelect(option.value)}
          >
            <Text
              style={[
                styles.optionButtonText,
                selectedValue === option.value && styles.optionButtonTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionHeaderSubtitle}>{subtitle}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CustomIcon
            icon="arrow-left"
            type="Feather"
            size={RFValue(20)}
            color={COLORS.TextPrimary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pet Details</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PetDetails' as never)}>
          <Text style={styles.headerAction}>Add a Pet</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Pet Type Selection */}
        <PetTypeSelector />

        {/* Basic Information */}
        <InputField
          label="Name"
          value={formData.name}
          onChangeText={(text) => updateFormData('name', text)}
        />

        <InputField
          label="Weight (lbs)"
          value={formData.weight}
          onChangeText={(text) => updateFormData('weight', text)}
        />

        {/* Age */}
        <View style={styles.ageContainer}>
          <View style={styles.ageInputContainer}>
            <InputField
              label="Age (Yr.)"
              value={formData.ageYears}
              onChangeText={(text) => updateFormData('ageYears', text)}
            />
          </View>
          <View style={styles.ageInputContainer}>
            <InputField
              label="Age (Mo.)"
              value={formData.ageMonths}
              onChangeText={(text) => updateFormData('ageMonths', text)}
            />
          </View>
        </View>

        {/* Sex */}
        <OptionSelector
          label="Sex"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
          selectedValue={formData.sex}
          onSelect={(value) => updateFormData('sex', value)}
        />

        <InputField
          label="Breed (*)"
          value={formData.breed}
          onChangeText={(text) => updateFormData('breed', text)}
        />

        {/* Additional Details */}
        <SectionHeader title="Additional details" />

        <OptionSelector
          label="Micro-chipped?"
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ]}
          selectedValue={formData.additionalDetails.microChipped}
          onSelect={(value) => updateNestedFormData('additionalDetails', 'microChipped', value)}
        />

        <OptionSelector
          label="Spayed/Neutered?"
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ]}
          selectedValue={formData.additionalDetails.spayedNeutered}
          onSelect={(value) => updateNestedFormData('additionalDetails', 'spayedNeutered', value)}
        />

        <OptionSelector
          label="Friendly with children?"
          options={[
            { label: 'Friendly with children', value: 'yes' },
            { label: 'Not friendly with children', value: 'no' },
            { label: 'Unsure if friendly with children', value: 'unsure' },
          ]}
          selectedValue={formData.additionalDetails.friendlyWithChildren}
          onSelect={(value) => updateNestedFormData('additionalDetails', 'friendlyWithChildren', value)}
        />

        <OptionSelector
          label="Friendly with dogs?"
          options={[
            { label: 'Friendly with dogs', value: 'yes' },
            { label: 'Not friendly with dogs', value: 'no' },
            { label: 'Unsure if friendly with dogs', value: 'unsure' },
          ]}
          selectedValue={formData.additionalDetails.friendlyWithDogs}
          onSelect={(value) => updateNestedFormData('additionalDetails', 'friendlyWithDogs', value)}
        />

        <OptionSelector
          label="Friendly with cats?"
          options={[
            { label: 'Friendly with cats', value: 'yes' },
            { label: 'Not friendly with cats', value: 'no' },
            { label: 'Unsure if friendly with cats', value: 'unsure' },
          ]}
          selectedValue={formData.additionalDetails.friendlyWithCats}
          onSelect={(value) => updateNestedFormData('additionalDetails', 'friendlyWithCats', value)}
        />

        <InputField
          label="Adoption status"
          value={formData.adoptionStatus}
          onChangeText={(text) => updateFormData('adoptionStatus', text)}
        />

        {/* About your pet */}
        <SectionHeader title="About your pet" />
        <InputField
          label=""
          value={formData.aboutPet}
          onChangeText={(text) => updateFormData('aboutPet', text)}
          placeholder="Tell us about your pet..."
          multiline={true}
          numberOfLines={4}
        />

        {/* Care Info */}
        <SectionHeader title="Care info" subtitle="Let us know the basics for walking, boarding and sitting" />

        <OptionSelector
          label="Energy Level"
          options={[
            { label: 'High energy level', value: 'high' },
            { label: 'Moderate energy level', value: 'moderate' },
            { label: 'Low energy level', value: 'low' },
          ]}
          selectedValue={formData.careInfo.energyLevel}
          onSelect={(value) => updateNestedFormData('careInfo', 'energyLevel', value)}
        />

        <InputField
          label="Feeding schedule"
          value={formData.careInfo.feedingSchedule}
          onChangeText={(text) => updateNestedFormData('careInfo', 'feedingSchedule', text)}
          placeholder="Needs to be fed twice in the morning"
        />

        <InputField
          label="Can be left alone"
          value={formData.careInfo.canBeLeftAlone}
          onChangeText={(text) => updateNestedFormData('careInfo', 'canBeLeftAlone', text)}
          placeholder="Can be left alone for 1 hour or less"
        />

        {/* Medication */}
        <SectionHeader title="Medication (select all that apply)" />

        <InputField
          label="Allergies"
          value={formData.medicationInfo.allergies}
          onChangeText={(text) => updateNestedFormData('medicationInfo', 'allergies', text)}
        />

        <InputField
          label="Anything else a sitter should know"
          value={formData.medicationInfo.anythingElse}
          onChangeText={(text) => updateNestedFormData('medicationInfo', 'anythingElse', text)}
          placeholder="Tell us anything a sitter should know"
          multiline={true}
          numberOfLines={3}
        />

        {/* Health Info */}
        <SectionHeader title="Health info" subtitle="For emergencies" />

        <InputField
          label="Veterinary info"
          value={formData.healthInfo.veterinaryInfo}
          onChangeText={(text) => updateNestedFormData('healthInfo', 'veterinaryInfo', text)}
        />

        <InputField
          label="Pet insurance provider"
          value={formData.healthInfo.petInsuranceProvider}
          onChangeText={(text) => updateNestedFormData('healthInfo', 'petInsuranceProvider', text)}
          placeholder="Select a provider"
        />

        {/* Photo Gallery */}
        <SectionHeader title="Photo gallery" />
        <View style={styles.photoGalleryContainer}>
          <TouchableOpacity style={styles.addPhotoButton}>
            <CustomIcon
              icon="plus"
              type="Feather"
              size={RFValue(24)}
              color={COLORS.NeutralGrey60}
            />
            <Text style={styles.addPhotoText}>Add photos</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <View style={{ height: hp('5%') }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.StaticWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.NeutralGrey10,
  },
  headerTitle: {
    fontFamily: FONT_POPPINS.mediumFont,
    fontSize: RFValue(16),
    color: COLORS.TextPrimary,
  },
  headerAction: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: COLORS.Primary,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: wp('5%'),
  },
  sectionContainer: {
    marginVertical: hp('2%'),
  },
  sectionTitle: {
    fontFamily: FONT_POPPINS.mediumFont,
    fontSize: RFValue(14),
    color: COLORS.TextPrimary,
    marginBottom: hp('1%'),
  },
  petTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp('1%'),
  },
  petTypeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('35%'),
    height: hp('8%'),
    borderRadius: RFValue(8),
    borderWidth: 1,
    borderColor: COLORS.NeutralGrey20,
    backgroundColor: COLORS.StaticWhite,
  },
  petTypeButtonSelected: {
    borderColor: COLORS.Primary,
    backgroundColor: COLORS.Primary + '10',
  },
  petTypeText: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(12),
    color: COLORS.NeutralGrey60,
    marginTop: hp('0.5%'),
  },
  petTypeTextSelected: {
    color: COLORS.Primary,
  },
  inputContainer: {
    marginVertical: hp('1%'),
  },
  inputLabel: {
    fontFamily: FONT_POPPINS.mediumFont,
    fontSize: RFValue(14),
    color: COLORS.TextPrimary,
    marginBottom: hp('0.5%'),
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.NeutralGrey20,
    borderRadius: RFValue(8),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: COLORS.TextPrimary,
    backgroundColor: COLORS.StaticWhite,
  },
  ageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('1%'),
  },
  ageInputContainer: {
    flex: 0.48,
  },
  optionContainer: {
    marginVertical: hp('1%'),
  },
  optionLabel: {
    fontFamily: FONT_POPPINS.mediumFont,
    fontSize: RFValue(14),
    color: COLORS.TextPrimary,
    marginBottom: hp('1%'),
  },
  optionButtonsContainer: {
    gap: hp('0.5%'),
  },
  optionButton: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    borderRadius: RFValue(8),
    borderWidth: 1,
    borderColor: COLORS.NeutralGrey20,
    backgroundColor: COLORS.StaticWhite,
  },
  optionButtonSelected: {
    borderColor: COLORS.Primary,
    backgroundColor: COLORS.Primary + '10',
  },
  optionButtonText: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: COLORS.NeutralGrey60,
  },
  optionButtonTextSelected: {
    color: COLORS.Primary,
  },
  sectionHeaderContainer: {
    marginTop: hp('3%'),
    marginBottom: hp('1%'),
  },
  sectionHeaderTitle: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(16),
    color: COLORS.TextPrimary,
  },
  sectionHeaderSubtitle: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(12),
    color: COLORS.NeutralGrey60,
    marginTop: hp('0.5%'),
  },
  photoGalleryContainer: {
    marginVertical: hp('2%'),
  },
  addPhotoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('12%'),
    borderRadius: RFValue(8),
    borderWidth: 2,
    borderColor: COLORS.NeutralGrey20,
    borderStyle: 'dashed',
    backgroundColor: COLORS.NeutralGrey0,
  },
  addPhotoText: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: COLORS.NeutralGrey60,
    marginTop: hp('0.5%'),
  },
  saveButton: {
    backgroundColor: COLORS.Primary,
    paddingVertical: hp('2%'),
    borderRadius: RFValue(25),
    alignItems: 'center',
    marginTop: hp('3%'),
    marginHorizontal: wp('10%'),
  },
  saveButtonText: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(16),
    color: COLORS.StaticWhite,
  },
});

export default PetDetailsScreen;