import { H1, H2 } from '@expo/html-elements'
import { Image, Pressable, StyleSheet, Text } from 'react-native'
import { View } from './Themed'

type ButtonProps = {
  title: string
  onPress?: () => void
}

function Button(props: ButtonProps) {
  return (
    <Pressable style={[styles.button, styles.shadow]} onPress={props.onPress}>
      <Text style={styles.buttonText} selectable={false}>
        {props.title}
      </Text>
    </Pressable>
  )
}

function ActionBar(props) {
  function handleThumbsDownPress() {
    console.log('thumbs down')
    return null
  }

  function handleThumbsUpPress() {
    console.log('thumbs up')
    return null
  }

  return (
    <View style={styles.actionBar}>
      <Button title="👎" onPress={handleThumbsDownPress} />
      <Button title="👍" onPress={handleThumbsUpPress} />
    </View>
  )
}

type CardProps = {
  index: number
  title: string
}

const getProfileImageUrl = (gender: string, index: number): string => {
  const IMAGE_API_ENDPOINT =
    'https://xsgames.co/randomusers/assets/avatars/pixel'
  let url = IMAGE_API_ENDPOINT
  url += `/${index}.jpg`
  return url
}

export default function Card({ index, title }: CardProps) {
  return (
    <View style={[styles.card, styles.shadow]}>
      <View style={[styles.content]}>
        <Image
          style={{ height: '100%', width: '100%', borderRadius: 20 }}
          source={{ uri: getProfileImageUrl('F', index) }}
        />
        <View style={styles.details}>
          <View style={styles.text}>
            <H1 selectable={false}>{title}</H1>
            <H2 selectable={false}>id: {index}</H2>
          </View>
          <ActionBar />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    borderRadius: 20,
    position: 'relative',
  },
  details: {
    borderRadius: 20,
    backgroundColor: 'rgba(218, 218, 218, 0)',
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  text: {
    paddingHorizontal: '2rem',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: 'rgba(218, 218, 218, 0.5)',
  },
  button: {
    width: '10rem',
    height: '10rem',
    borderRadius: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 72,
  },
  actionBar: {
    backgroundColor: 'rgba(218, 218, 218, 0.5)',
    paddingVertical: '2rem',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '6rem',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    marginHorizontal: '2rem',
    margin: '1rem',
    height: '50rem',
    borderRadius: 20,
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
  },
})
