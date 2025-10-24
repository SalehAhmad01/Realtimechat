import { Text, StatusBar, View, Animated } from 'react-native';
import Title from '../common/Title';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';
import { useFonts, LeckerliOne_400Regular } from '@expo-google-fonts/leckerli-one';

// 👇 child animation component
function AnimatedSplash() {
  const translateY = new Animated.Value(0);
  const duration = 5000;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 300,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -300,
          duration: duration,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}
    >
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Title text="RealChat 🚀" color="white" />
      </Animated.View>
    </SafeAreaView>
  );
}

// 👇 main exported SplashScreen
export default function SplashScreen() {
  const [fontsLoaded] = useFonts({
    LeckerliOne: LeckerliOne_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <AnimatedSplash />;
}
