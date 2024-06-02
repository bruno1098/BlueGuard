import React, { useEffect, useRef, useState } from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Animated, View, Easing } from 'react-native';
import Particle from './Particle';

type MaterialIconsName = keyof typeof MaterialIcons.glyphMap;
type MaterialCommunityIconsName = keyof typeof MaterialCommunityIcons.glyphMap;

interface TabBarIconProps {
  library: 'MaterialIcons' | 'MaterialCommunityIcons';
  name: MaterialIconsName | MaterialCommunityIconsName;
  focused: boolean;
  color: string;
}

const colors = ['#FF6F61', '#6B5B95', '#88B04B', '#FFA07A', '#FF4500'];

export function TabBarIcon({ library, name, focused, color }: TabBarIconProps) {
  const [particleKey, setParticleKey] = useState(0);
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    // Reset animation values
    scale.setValue(1);
    rotate.setValue(0);

    // Start animations
    Animated.parallel([
      Animated.timing(scale, {
        toValue: focused ? 1.5 : 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(rotate, {
        toValue: focused ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]).start();

    if (focused) {
      // Ensure particleKey is incremented to force re-render
      setParticleKey(prevKey => prevKey + 1);
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1000); // Hide particles after animation duration
    }
  }, [focused]);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const IconComponent = library === 'MaterialIcons' ? MaterialIcons : MaterialCommunityIcons;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={{ transform: [{ scale }, { rotate: rotation }] }}>
        <IconComponent size={28} name={name as any} color={color} />
      </Animated.View>
      {focused && showParticles && (
        <View key={particleKey} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          {colors.map((color, index) => (
            <Particle key={`${particleKey}-${index}`} x={Math.random() * 50 - 25} y={Math.random() * 50 - 25} color={color} />
          ))}
        </View>
      )}
    </View>
  );
}
