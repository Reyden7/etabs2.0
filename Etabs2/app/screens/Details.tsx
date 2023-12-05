import { View, Text } from 'react-native';
import React from 'react';
import { RouteProp } from '@react-navigation/native';

// Define the StackParamList (if not already defined)
type StackParamList = {
  Details: { itemId: string };
  // Add other screens if necessary
};

// Define the route prop type
type DetailsScreenRouteProp = RouteProp<StackParamList, 'Details'>;

const Details: React.FC<{ route: DetailsScreenRouteProp }> = ({ route }) => {
  // Access the itemId parameter from the route
  const { itemId } = route.params;

  return (
    <View>
      <Text>Details Screen</Text>
      <Text>Item ID: {itemId}</Text>
      {/* Render other details based on the itemId */}
    </View>
  );
};

export default Details;
