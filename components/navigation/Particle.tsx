import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

interface ParticleProps {
  x: number;
  y: number;
  color: string;
}

const Particle: React.FC<ParticleProps> = ({ x, y, color }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: x,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: y,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [x, y]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: color,
        transform: [{ translateX }, { translateY }],
        opacity,
      }}
    />
  );
};

export default Particle;
