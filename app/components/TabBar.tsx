import { View, Platform  } from 'react-native'
import React from 'react'
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

type IconProps = {
    color: string;
  };

export default function TabBar({state, descriptors, navigation}: any) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const icons: Record<string, React.FC<IconProps>> = {
    index: (props) => <Entypo name="home" size={24} {...props} />,
    meals: (props) => <Entypo name="bowl" size={24} {...props} />,
    progress: (props) => <Entypo name="line-graph" size={24} {...props} />,
    settings: (props) => <Entypo name="cog" size={24} {...props} />,
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.name}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            {icons[route.name]?.({
              color: isFocused ? colors.primary : colors.text,
            })}
            <Text style={{ color: isFocused ? colors.primary : colors.text }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  )
}

const styles = StyleSheet.create({
    tabBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
     
    },
    tabBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
  });