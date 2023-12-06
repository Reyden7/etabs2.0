import { View, Text } from 'react-native';
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Title } from 'react-native-paper';

// Define the StackParamList (if not already defined)
type StackParamList = {
  Details: { itemId: string, title:string };
  // Add other screens if necessary
};

// Define the route prop type
type DetailsScreenRouteProp = RouteProp<StackParamList, 'Details'>;

const Details: React.FC<{ route: DetailsScreenRouteProp }> = ({ route }) => {
  // Access the itemId parameter from the route
  const { itemId } = route.params;
  const {title} = route.params;
  return (
    <View>
      <Title style={{textAlign:"center",top:10}}>{title}</Title>
      {/* Render other details based on the itemId */}
    </View>
  );
};

export default Details;
