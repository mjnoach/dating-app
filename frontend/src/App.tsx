import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { View } from './components/Themed'

import { MantineProvider } from '@mantine/core'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import storage from './storage'

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  storage.get('user').then((user) => {
    console.log('🚀 ~ file: App.tsx ~ line 16 ~ App ~ user', user)
  })

  if (!isLoadingComplete) {
    return null
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <View style={[styles.app]}>
        <View style={styles.centered}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </View>
      </View>
    </MantineProvider>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    paddingTop: '4rem',
  },
  centered: {
    marginHorizontal: 'auto',
    flex: 1,
    width: '40rem',
    maxWidth: '90%',
    maxHeight: '60rem',
    borderStyle: 'solid',
    borderWidth: 20,
    borderRadius: 20,
  },
})
