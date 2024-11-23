import { View, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { Link, LinkProps } from 'expo-router';

export const CustomButton = ({
  href,
  children,
}: {
  href: LinkProps['href']; // Ensure 'href' matches valid Link prop types - is a string though
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.button}>
        <View style={styles.buttonContent}>{children}</View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});